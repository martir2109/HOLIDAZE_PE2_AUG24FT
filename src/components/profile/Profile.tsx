import { useEffect, useState } from "react";
import type { User as UserType } from "../../interfaces/user";
import { getUser } from "../../services/profileApi";
import { getVenues } from "../../services/venueApi";
import type { Venue } from "../../interfaces/venue";
import { useAuthStore } from "../../stores/authStore";
import ProfileCard from "./ProfileCard";

/**
 * Fetches and displays the logged in user's profile.
 *
 * Retrieves the user's data and the full venue list,
 * then passes them to ProfileCard for rendering.
 *
 * @returns The user's ProfileCard or null if the data has not loaded yet.
 */
export default function User() {
  const user = useAuthStore((state) => state.user);
  const [userData, setUserData] = useState<UserType | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!user?.name) return;
      const [userResult, venuesResult] = await Promise.all([
        getUser(user.name),
        getVenues(),
      ]);
      setUserData(userResult.data);
      setVenues(venuesResult.data);
    }
    fetchData();
  }, [user?.name]);

  if (!userData) return null;

  return (
    <>
      <ProfileCard user={userData} venues={venues} />
    </>
  );
}
