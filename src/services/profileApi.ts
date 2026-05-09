import type { SingleApiResponse } from "../interfaces/user";
import { useAuthStore } from "../stores/authStore";
import { config } from "./config";

/**
 * Get a user profile by name, including their bookings and venues.
 *
 * @param name The username of the profile to fetch.
 * @throws If the request fails.
 * @returns The user profile data from the API.
 */
export async function getUser(name: string): Promise<SingleApiResponse> {
  const { token, apiKey } = useAuthStore.getState();

  const response = await fetch(
    `${config.apiBaseUrl}/holidaze/profiles/${name}?_bookings=true&_venues=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey ?? "",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }

  const result: SingleApiResponse = await response.json();
  return result;
}

/**
 * Update the avatar and banner of the logged in user.
 *
 * @param avatarUrl The URL of the new avatar image.
 * @param bannerUrl The URL of the new banner image.
 * @throws If the user is not logged in.
 * @returns The updated profile data from the API.
 */
export async function editProfile(avatarUrl: string, bannerUrl: string) {
  const { token, apiKey, user } = useAuthStore.getState();

  if (!user) throw new Error("User not logged in");

  const response = await fetch(
    `${config.apiBaseUrl}/holidaze/profiles/${user.name}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Noroff-API-Key": apiKey ?? "",
      },
      body: JSON.stringify({
        avatar: { url: avatarUrl, alt: "User avatar" },
        banner: { url: bannerUrl, alt: "User banner" },
      }),
    },
  );
  const data = await response.json();

  if (response.ok) {
    const { user, token, apiKey, login } = useAuthStore.getState();
    if (user && token && apiKey) {
      login(
        { ...user, avatar: data.data.avatar, banner: data.data.banner },
        token,
        apiKey,
      );
    }
  }
  return data;
}
