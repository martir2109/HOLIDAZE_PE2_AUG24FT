import { useEffect, useState } from "react";
import ProfileCard from "../components/profile/Profile";
import { getUser } from "../services/profileApi";
import { useAuthStore } from "../stores/authStore";
import type { User } from "../interfaces/user";
import LoadingSpinner from "../components/shared/LoadingSpinner";

/**
 * Profile page for the logged in user.
 *
 * Fetches the user's profile data from the API and displays it in the ProfileCard component.
 *
 * @returns The profile page.
 */
export default function ProfilePage() {
  const name = useAuthStore((state) => state.user?.name);
  const [, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    async function fetchProfile() {
      try {
        const result = await getUser(name!);
        setUser(result.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [name]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex pb-10 text-red-700 h-screen w-full items-center justify-center">
        <p>Could not load the profile. Try again later.</p>
      </div>
    );
  }
  return (
    <main className="w-full min-h-screen flex justify-center">
      <ProfileCard />
    </main>
  );
}
