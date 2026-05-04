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
