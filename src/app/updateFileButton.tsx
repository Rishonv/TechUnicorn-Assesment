"use client";
import { useState } from "react";
import { Button } from "src/components/ui/button";
import { GithubUser } from "src/lib/github";

export default function updateFileButton({
  token,
  userProfile,
  children,
  path,
}: {
  token: string;
  userProfile: GithubUser | null;
  children: string;
  path: string;
}) {
  const [fileContent, setFileContent] = useState("");
  return (
    <>
      <input
        placeholder="Put your text here"
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        className="border border-colour-black"
      />
      <Button
        onClick={async () => {
          const owner = userProfile?.login;
          const repo = "Notes";
          const message = "my commit message";
          const committer = {
            name: "Rishon Dsouza",
            email: "rishonv.dsouza@gmail.com",
          };

          const content = Buffer.from(fileContent!).toString("base64");
          console.log(content);
          const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

          const getSHA = async () => {
            const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

            const requestOptions: RequestInit = {
              method: "GET",
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
                "X-GitHub-Api-Version": "2022-11-28",
              },
            };

            try {
              const response = await fetch(url, requestOptions);

              if (response.ok) {
                const data = await response.json();
                const sha = data.sha;
                console.log(`SHA of the file: ${sha}`);
                return sha;
              } else {
                console.error(
                  "Failed to retrieve SHA:",
                  response.status,
                  response.statusText
                );
                return null;
              }
            } catch (error) {
              console.error("Error:", error);
              return null;
            }
          };

          const sha = await getSHA();

          const requestOptions = {
            method: "PUT",
            headers: {
              Accept: "application/vnd.github+json",
              Authorization: `Bearer ${token}`,
              "X-GitHub-Api-Version": "2022-11-28",
            },
            body: JSON.stringify({
              message,
              committer,
              content,
              sha,
            }),
          };

          console.log(requestOptions);
          fetch(url, requestOptions)
            .then((response) => {
              if (response.ok) {
                console.log("File created or updated successfully");
              } else {
                console.error("Failed to create or update file");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }}
      >
        {children}
      </Button>
    </>
  );
}
