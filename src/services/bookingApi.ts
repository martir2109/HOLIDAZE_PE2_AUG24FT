import { useAuthStore } from "../stores/authStore";
import { config } from "./config";

/**
 * Create a booking for a venue.
 *
 * @param data The booking details.
 * @throws If the booking request fails.
 * @returns The create booking data from the API.
 */
export async function createBooking(data: {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}) {
  const { token, apiKey } = useAuthStore.getState();

  const response = await fetch(`${config.apiBaseUrl}/holidaze/bookings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey ?? "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create booking: ${response.status}`);
  }

  return response.json();
}
