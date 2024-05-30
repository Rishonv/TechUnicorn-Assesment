"use client";

import { redirect } from "next/navigation";
import { Button } from "src/components/ui/button";
import { NextRouter, useRouter } from "next/router";

// Sign In func
function GetUserAuth() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/github-callback";

  const authorizationUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=user,repo`;
  window.location.href = authorizationUrl;
}

export function SignInButton() {
  return <Button onClick={GetUserAuth}>Sign In</Button>;
}
