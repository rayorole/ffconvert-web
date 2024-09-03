"use server";

import { google } from "@/lib/oauth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

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
