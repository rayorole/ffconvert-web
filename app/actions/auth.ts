"use server";

import { lucia } from "@/lib/auth";
import { isValidEmail, sendVerificationCode } from "@/lib/mail";
import { google } from "@/lib/oauth";
import prisma from "@/lib/prisma";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hash, verify } from "@node-rs/argon2";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { User } from "lucia";

async function generateEmailVerificationCode(
  userId: string,
  email: string
): Promise<string> {
  // Delete any existing codes using prisma
  await prisma.emailVerificationCode.deleteMany({
    where: {
      userId,
    },
  });

  const code = generateRandomString(6, alphabet("0-9"));
  await prisma.emailVerificationCode.create({
    data: {
      userId,
      email,
      code,
      expiredAt: new Date(new Date().getTime() + 15 * 60000), // 15 minutes
    },
  });
  return code;
}

export async function createAuthorizationUrl() {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("code_verifier", codeVerifier, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    cookies().set("state", state, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    const authorizationUrl = await google.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["profile", "email"],
      }
    );

    return {
      success: true,
      data: authorizationUrl.href,
    };
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to create authorization URL",
    };
  }
}

export async function invalidateSession() {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  await lucia.invalidateSession(sessionId!);
}

export async function getSessionId() {
  return cookies().get(lucia.sessionCookieName)?.value;
}

export async function registerUser(email: string, password: string) {
  try {
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return {
        success: false,
        error: "Invalid email",
      };
    }

    if (!password || typeof password !== "string") {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    // Check if the user already exists
    const userCheck = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userCheck) {
      return {
        success: false,
        error: "User already exists",
      };
    }

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    const verificationCode = await generateEmailVerificationCode(
      user.id,
      email
    );

    await sendVerificationCode(email, verificationCode);

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(lucia.sessionCookieName, sessionCookie.value, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: "Failed to register user",
    };
  }
}

export async function login(email: string, password: string) {
  try {
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return {
        success: false,
        error: "Invalid email",
      };
    }

    if (!password || typeof password !== "string") {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const isValid = await verify(user.passwordHash!, password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!isValid) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(lucia.sessionCookieName, sessionCookie.value, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: "Failed to login",
    };
  }
}

export async function emailVerification(code: string) {
  const sessionId = await getSessionId();
  const { user } = await lucia.validateSession(sessionId!);
  if (!user) {
    return {
      success: false,
      error: "Invalid session",
    };
  }

  if (!code) {
    return {
      success: false,
      error: "Invalid code",
    };
  }

  const validCode = await verifyVerificationCode(user, code);
  if (!validCode) {
    return {
      success: false,
      error: "Invalid code",
    };
  }

  await lucia.invalidateUserSessions(user.id);

  // Update the user's email to be verified
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: true,
    },
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(lucia.sessionCookieName, sessionCookie.value, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    success: true,
    data: user,
  };
}

async function verifyVerificationCode(user: User, code: string) {
  const validCode = await prisma.emailVerificationCode.findFirst({
    where: {
      userId: user.id,
      code: code,
    },
  });

  if (!validCode) {
    return false;
  }

  await prisma.emailVerificationCode.delete({
    where: {
      id: validCode.id,
    },
  });

  if (!isWithinExpirationDate(validCode.expiredAt)) {
    return false;
  }

  if (validCode.email !== user.email) {
    return false;
  }

  return true;
}
