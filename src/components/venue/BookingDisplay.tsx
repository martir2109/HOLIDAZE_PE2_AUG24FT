import { useState } from "react";
import type { Booking } from "../../interfaces/venue";
import { deleteBooking } from "../../services/bookingApi";
import { Pen, Trash2 } from "lucide-react";
import ConfrimDeleteCard from "../booking/ConfirmDeleteCard";

interface Props {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
}

/**
 * Shows a list of bookings with options to edit or delete a booking.
 * Deleting a booking asks for confirmation before deleting it.
 *
 * @param bookings The list of bookings to display.
 * @param onEdit called when the user clicks the edit button on a booking.
 * @returns A list of bookings with edit and delete buttons.
 */
export default function DisplayBookings({ bookings, onEdit }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  async function handleDeleteBooking(bookingId: string) {
    try {
      setDeletingId(bookingId);
      await deleteBooking(bookingId);
      window.location.reload();
    } catch {
      setDeleteError(
        `Failed to delete booking ${bookingId}. Please try again.`,
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-3 border-[0.5px] border-medium-dark-grey rounded-[10px] p-4">
      <h5 className="text-h5 font-bold">Your bookings here</h5>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex flex-col bookings:flex-row justify-between gap-1 bg-gray-100 border border-gray-200 rounded-md p-3 text-normal-text"
        >
          <div className="flex flex-col">
            <p>
              <span className="font-semibold">Check-in:</span>{" "}
              {new Date(booking.dateFrom).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Check-out:</span>{" "}
              {new Date(booking.dateTo).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Guests:</span> {booking.guests}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <button
              title="edit booking"
              type="button"
              onClick={() => onEdit(booking)}
              className="cursor-pointer text-sm underline text-secondary hover:text-primary"
            >
              <Pen />
            </button>
            {confirmDeleteId === booking.id ? (
              <ConfrimDeleteCard
                onConfirm={() => handleDeleteBooking(confirmDeleteId)}
                onCancel={() => {
                  setConfirmDeleteId(null);
                  setDeleteError(null);
                }}
                isDeleting={deletingId === confirmDeleteId}
                error={deleteError}
              />
            ) : (
              <button
                title="delete booking"
                type="button"
                onClick={() => setConfirmDeleteId(booking.id)}
                className="cursor-pointer text-sm underline text-left text-red-600 hover:text-gray-800"
              >
                <Trash2 />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
