import Image from "next/image";
import { SignInButton } from "./signInButton";
import { cookies } from "next/headers";
import ProfilePage from "src/app/userProfile";
import { Button } from "src/components/ui/button";
import { GithubUser, getUserProfile } from "src/lib/github";
import MakeUpdateButton from "src/app/make-updateButton";
import { useState } from "react";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const userProfile: GithubUser | null = await getUserProfile();
  return (
    <div>
      {token ? (
        <div>
          <ProfilePage></ProfilePage>
          <MakeUpdateButton
            token={token}
            userProfile={userProfile}
          ></MakeUpdateButton>
        </div>
      ) : (
        <SignInButton></SignInButton>
      )}
      <div></div>
    </div>
  );
}
