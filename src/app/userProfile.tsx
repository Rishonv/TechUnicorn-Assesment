import { getUserProfile, GithubUser } from "src/lib/github";

export default async function ProfilePage() {
  const userProfile: GithubUser | null = await getUserProfile();

  if (!userProfile) {
    return <div>Failed to fetch user profile</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <img src={userProfile.avatar_url} alt="Avatar" className="size-16" />
      <p>Username: {userProfile.login}</p>
      <p>Name: {userProfile.name}</p>
      <p>Bio: {userProfile.bio}</p>
      {/* Display other profile information as needed */}
    </div>
  );
}
