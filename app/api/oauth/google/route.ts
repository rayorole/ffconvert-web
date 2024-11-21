//route.ts
import { lucia } from "@/lib/auth";
import { google } from "@/lib/oauth";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type GoogleUser = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing code or state",
        },
        {
          status: 400,
        }
      );
    }

    // Retrieve the cookies securely
    const codeVerifier = cookies().get("code_verifier")?.value;
    const storedState = cookies().get("state")?.value;

    if (!codeVerifier || !storedState) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing code verifier or state",
        },
        {
          status: 400,
        }
      );
    }

    if (state !== storedState) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid state",
        },
        {
          status: 400,
        }
      );
    }

    // Validate the authorization code with Google
    const { accessToken, idToken, refreshToken, accessTokenExpiresAt } =
      await google.validateAuthorizationCode(code, codeVerifier);

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
        cache: "no-store",
      }
    );

    const googleData = (await googleRes.json()) as GoogleUser;

    const user = await prisma.user.findFirst({
      where: {
        email: googleData.email,
      },
    });

    let session = null;

    if (!user) {
      const userCreated = await prisma.user.create({
        data: {
          email: googleData.email,
          name: googleData.name,
          image: googleData.picture,
          emailVerified: googleData.verified_email,
        },
      });

      session = await lucia.createSession(userCreated.id, {
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 30),
      });

      if (!userCreated) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to create user",
          },
          {
            status: 500,
          }
        );
      }

      const createdOauthAccountRes = await prisma.oauthAccountUser.create({
        data: {
          provider: "google",
          providerAccountId: googleData.id,
          userId: userCreated.id,
          accessToken,
          refreshToken,
          accessTokenExpires: accessTokenExpiresAt,
        },
      });

      if (!createdOauthAccountRes) {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to create OAuth account",
          },
          {
            status: 500,
          }
        );
      }

      const sessionCookie = lucia.createSessionCookie(session.id);

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      return NextResponse.redirect(new URL('/', req.url))
    }

    // Create a session for existing user
    session = await lucia.createSession(user.id, {
      expiresAt: new Date(Date.now() + 60 * 60 * 24 * 30),
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    console.log(new URL("/", process.env.NEXT_PUBLIC_BASE_URL).href);

    return NextResponse.redirect(new URL('/', req.url))
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to authenticate user",
      },
      {
        status: 500,
      }
    );
  }
};
