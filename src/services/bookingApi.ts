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

/**
 * Edit an existing booking.
 *
 * @param id The ID of the booking to edit.
 * @param data The updated booking details.
 * @throws If the edit request fails.
 * @returns The updated booking data from the API.
 */
export async function editBooking(
  id: string,
  data: { dateFrom: string; dateTo: string; guests: number },
) {
  const { token, apiKey } = useAuthStore.getState();

  const response = await fetch(`${config.apiBaseUrl}/holidaze/bookings/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey ?? "",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to edit booking: ${response.status}`);
  }

  return response.json();
}

/**
 * Delete a booking.
 *
 * @param id The ID of the booking to delete.
 * @throws If the delete request fails.
 */
export async function deleteBooking(id: string) {
  const { token, apiKey } = useAuthStore.getState();

  const response = await fetch(`${config.apiBaseUrl}/holidaze/bookings/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey ?? "",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete booking: ${response.status}`);
  }
}
