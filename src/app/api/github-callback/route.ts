import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import querystring from "querystring";

interface AccessTokenResponse {
  access_token: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  let redirectedPath: string | null = null;

  if (!code) {
    return NextResponse.json(
      { error: "Missing code parameter" },
      { status: 400 }
    );
  }

  try {
    const accessToken = await exchangeCodeForAccessToken(code);
    cookies().set("token", accessToken!);
    redirectedPath = "/";
  } catch (error) {
    console.error("Error exchanging code for access token:", error);
    return NextResponse.json(
      { error: "Failed to exchange code for access token" },
      { status: 500 }
    );
  } finally {
    return redirect(redirectedPath!);
  }
}

async function exchangeCodeForAccessToken(
  code: string
): Promise<string | null> {
  const data = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData: AccessTokenResponse = await response.json();
  const accessToken = responseData.access_token;

  if (!accessToken) {
    console.log(responseData);
    throw new Error("Failed to obtain access token from GitHub");
  }

  return accessToken;
}
