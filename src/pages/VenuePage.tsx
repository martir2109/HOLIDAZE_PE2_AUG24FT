import { useEffect, useState } from "react";
import { getVenue, editVenue, deleteVenue } from "../services/venueApi";
import type { Venue, Booking } from "../interfaces/venue";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MoveLeft, MapPin, Users } from "lucide-react";
import { Button } from "../components/shared/Button";
import { useAuthStore } from "../stores/authStore";
import "react-day-picker/style.css";
import VenueForm from "../components/venue/createandedit/VenueForm";
import BookingForm from "../components/venue/booking/BookingForm";
import NotLoggedIn from "../components/venue/NotLoggedIn";
import ImageDisplay from "../components/venue/ImageDisplay";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import AmenitiesDisplay from "../components/venue/AmenitiesDisplay";
import DisplayBookings from "../components/venue/BookingDisplay";
import MapDisplay from "../components/venue/MapDisplay";
import RatingDisplay from "../components/venue/RatingDisplay";
import ConfirmDeleteCard from "../components/venue/ConfirmDeleteCard";

/**
 * Single venue page
 *
 * Displays a single venue with its details:
 * - Images (if there is more than one image, arrow buttons will show)
 * - Name of the venue
 * - Venue description
 * - Rating
 * - Amenities (if there are no amenities, a message will show)
 * - Location (if the venue has location address and city a google map with iframe will show)
 * - Booking form (only visible to logged in users and non-owners)
 * - Edit button (only visible to the venue owner)
 * - The user's existing bookings with options to edit or delete (if they have any bookings on the venue)
 * - Venue owners can view all bookings for their venue.
 * - A message asking the user to log in if they are not logged in
 * - Name of the owner for the venue.
 *
 * Fetches the venue by ID from the URL, and lets logged-in users pick dates and guests to book.
 * Venue owners can edit or delete their venue. On successful delete, the user is redirected to their profile page.
 *
 * @returns The venue page
 */
export default function VenuePage() {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const isLoggedIn = !!user;
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVenue() {
      try {
        const result = await getVenue(id!);
        setVenue(result.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchVenue();
  }, [id]);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showForm]);

  async function handleDeleteVenue(venueId: string) {
    try {
      setDeletingId(venueId);
      await deleteVenue(venueId);
      navigate("/profile");
    } catch {
      setDeleteError("Failed to delete venue. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex pb-10 text-red-700 h-screen w-full items-center justify-center">
        <p>Could not load the venue. Try again later.</p>
      </div>
    );
  }

  if (!venue) return null;

  const isOwner = venue.owner?.name === user?.name;
  const userBookings =
    venue.bookings?.filter(
      (booking) => booking.customer?.name === user?.name,
    ) ?? [];

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div className="bg-white min-h-screen max-w-286.5 w-full p-4 flex flex-col gap-6">
        <div className="mt-2 gap-4 flex flex-col sm:flex-row justify-between">
          <div>
            <Link
              to="/"
              className="flex items-center cursor-pointer hover:underline gap-2"
            >
              <MoveLeft /> Back to venues
            </Link>
          </div>
          {isOwner && (
            <Button onClick={() => setShowForm(true)}>Edit venue</Button>
          )}
        </div>

        <div className="h-fit w-full flex flex-col gap-2">
          <ImageDisplay venue={venue} />

          <div className="flex flex-col gap-8">
            <h1 className="text-h5 font-bold">{venue.name}</h1>

            <div className="flex items-center gap-2">
              <MapPin />
              <div className="flex items-center text-secondary text-medium-text">
                <p>
                  {venue.location.city}, {venue.location.country}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-secondary">
              <Users />
              <p>Max {venue.maxGuests} guests</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-h5 font-bold">About this venue</h3>
              <p>{venue.description}</p>
            </div>

            <RatingDisplay venue={venue} />

            <AmenitiesDisplay venue={venue} />

            <div className="flex flex-col gap-2">
              <h4 className="text-h5 font-bold">Address</h4>
              <p>
                {venue.location.address}, {venue.location.city}{" "}
                {venue.location.zip}
              </p>
            </div>

            <MapDisplay venue={venue} />

            {!isLoggedIn ? (
              <NotLoggedIn />
            ) : isOwner ? (
              <div className="flex flex-col gap-4">
                <h3 className="text-h5 font-bold">Bookings for this venue</h3>
                {venue.bookings && venue.bookings.length > 0 ? (
                  venue.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border-[0.5px] border-medium-dark-grey rounded-[10px] p-4 flex flex-col gap-2"
                    >
                      <p className="font-semibold">
                        {booking.customer?.name ?? "Unknown"}
                      </p>
                      <div className="flex gap-2">
                        <p className="text-sm text-dark-grey">
                          {new Date(booking.dateFrom).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-dark-grey">to</p>
                        <p className="text-sm text-dark-grey">
                          {new Date(booking.dateTo).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm">Total guests: {booking.guests}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-dark-grey text-center">No bookings yet.</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {userBookings.length > 0 && (
                  <DisplayBookings
                    bookings={userBookings}
                    onEdit={setEditingBooking}
                  />
                )}

                <BookingForm
                  key={editingBooking?.id ?? "New booking"}
                  venue={venue}
                  bookings={venue.bookings}
                  existingBooking={editingBooking ?? undefined}
                  onCancel={() => setEditingBooking(null)}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-dark-grey text-small-text">
            Venue owner: {venue.owner?.name ?? "Unknown"}
          </p>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
          <VenueForm
            mode="edit"
            initialValues={venue}
            onClose={() => setShowForm(false)}
            onSubmit={(values) => editVenue(venue.id, values)}
            onDelete={() => setConfirmDeleteId(venue.id)}
          />
        </div>
      )}

      {confirmDeleteId && (
        <ConfirmDeleteCard
          type="venue"
          onConfirm={() => handleDeleteVenue(confirmDeleteId)}
          onCancel={() => {
            setConfirmDeleteId(null);
            setDeleteError(null);
          }}
          isDeleting={deletingId === confirmDeleteId}
          error={deleteError}
        />
      )}
    </main>
  );
}
