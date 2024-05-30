"use client";
import UpdateFile from "./updateFileButton";
import Makefile from "./makeFileButton";
import { useState } from "react";
import { GithubUser } from "src/lib/github";

export default function renderPath({
  token,
  userProfile,
}: {
  token: string;
  userProfile: GithubUser | null;
}) {
  const [pathName, setPathName] = useState("");
  return (
    <>
      <input
        placeholder="Enter file name here"
        value={pathName}
        onChange={(e) => setPathName(e.target.value)}
        className="border border-colour-black"
      />
      <Makefile token={token} path={pathName} userProfile={userProfile}>
        Make File
      </Makefile>
      <UpdateFile token={token} path={pathName} userProfile={userProfile}>
        Update File
      </UpdateFile>
    </>
  );
}
