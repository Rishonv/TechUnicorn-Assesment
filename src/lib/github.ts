// lib/github.ts

import { cookies } from "next/headers";

const GITHUB_API_URL = "https://api.github.com";

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export async function getUserProfile(): Promise<GithubUser | null> {
  const accessToken = cookies().get("token")?.value;

  if (!accessToken) {
    console.log("No access token");
    return null; // Handle the case when the access token is not available
  }

  const response = await fetch(`${GITHUB_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }

  const data: GithubUser = await response.json();
  return data;
}
