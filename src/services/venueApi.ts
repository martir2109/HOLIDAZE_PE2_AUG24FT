import type {
  ApiResponse,
  SingleApiResponse,
  CreateVenue,
  EditVenue,
} from "../interfaces/venue";
import { config } from "./config";
import { useAuthStore } from "../stores/authStore";

/**
 * Fetches all venues, sorted by newest first.
 * Pass "bookings: true" to include booking data for each venue.
 *
 * @returns A list of venues.
 */
export async function getVenues(options?: {
  bookings?: boolean;
}): Promise<ApiResponse> {
  const params = new URLSearchParams();
  if (options?.bookings) params.set("_bookings", "true");
  params.set("sort", "created");
  params.set("sortOrder", "desc");

  const response = await fetch(
    `${config.apiBaseUrl}/holidaze/venues?${params}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }

  const result: ApiResponse = await response.json();
  return result;
}

/**
 * Fetches a single venue by its ID.
 *
 * @param id The ID of the venue to fetch.
 * @throws If the request fails.
 * @returns The matching venue.
 */
export async function getVenue(id: string): Promise<SingleApiResponse> {
  const response = await fetch(
    `${config.apiBaseUrl}/holidaze/venues/${id}?_owner=true&_bookings=true&_customer=true`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }

  const result: SingleApiResponse = await response.json();
  return result;
}

/**
 * Create a new venue.
 *
 * @param data The venue details.
 * @throws If the request fails.
 * @returns The created venue data from the API.
 */
export async function createVenue(data: CreateVenue) {
  const { token, apiKey } = useAuthStore.getState();

  const response = await fetch(`${config.apiBaseUrl}/holidaze/venues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey ?? "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create venue: ${response.status}`);
  }

  return response.json();
}

/**
 * Edit an existing venue.
 *
 * @param id The ID of the venue to edit.
 * @param data The updated venue details.
 * @throws If the request fails.
 * @returns The updated venue data from the API.
 */
export async function editVenue(id: string, data: EditVenue) {
  const { token, apiKey } = useAuthStore.getState();

  const response = await fetch(`${config.apiBaseUrl}/holidaze/venues/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey ?? "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to edit venue: ${response.status}`);
  }

  return response.json();
}

/**
 * Delete a venue.
 *
 * @param id The ID of the venue to delete.
 * @throws If the request fails.
 */
export async function deleteVenue(id: string) {
  const { token, apiKey } = useAuthStore.getState();

  const response = await fetch(`${config.apiBaseUrl}/holidaze/venues/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey ?? "",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete venue: ${response.status}`);
  }
}
