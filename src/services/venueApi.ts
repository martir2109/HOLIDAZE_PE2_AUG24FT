import type { ApiResponse } from "../interfaces/venue";
import { config } from "./config";

/**
 * Fetches all venues.
 * Pass "bookings: true" to include booking data for each venue.
 *
 * @returns A list of venues.
 */
export async function getVenues(options?: {
  bookings?: boolean;
}): Promise<ApiResponse> {
  const params = new URLSearchParams();
  if (options?.bookings) params.set("_bookings", "true");

  const query = params.size > 0 ? `?${params}` : "";
  const response = await fetch(`${config.apiBaseUrl}/holidaze/venues${query}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }

  const result: ApiResponse = await response.json();
  return result;
}
