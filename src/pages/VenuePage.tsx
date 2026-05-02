import { useEffect, useState } from "react";
import { getVenue } from "../services/venueApi";
import type { Venue, Booking } from "../interfaces/venue";
import { Link, useParams } from "react-router-dom";
import { MoveLeft, MapPin, Users } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import "react-day-picker/style.css";
import BookingForm from "../components/booking/BookingForm";
import NotLoggedIn from "../components/venue/NotLoggedIn";
import ImageDisplay from "../components/venue/ImageDisplay";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import AmenitiesDisplay from "../components/venue/AmenitiesDisplay";
import DisplayBookings from "../components/venue/BookingDisplay";
import MapDisplay from "../components/venue/MapDisplay";

/**
 * Single venue page
 *
 * Displays a single venue with its details:
 * - Images (if there is more than one image, arrow buttons will show)
 * - Amenities (if there are no amenities, a message will show)
 * - Location (if the venue has location address and city a google map with iframe will show)
 * - Booking form (only visible to logged in users and non-owners)
 * - The user's existing bookings with options to edit or delete (if they have any bookings on the venue)
 * - A message asking the user to log in if they are not logged in
 *
 * Fetches the venue by ID from the URL, and lets logged-in users pick dates and guests to book.
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
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

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
        <div className="mt-2">
          <Link
            to="/"
            className="flex items-center cursor-pointer hover:underline gap-2"
          >
            <MoveLeft /> Back to venues
          </Link>
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
              <AmenitiesDisplay venue={venue} />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-h5 font-bold">About this venue</h3>
              <p>{venue.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-h5 font-bold">Address</h4>
              <p>
                {venue.location.address}, {venue.location.city}{" "}
                {venue.location.zip}
              </p>
            </div>

            {(venue.location.address || venue.location.city) && (
              <MapDisplay venue={venue} />
            )}

            {!isLoggedIn ? (
              <NotLoggedIn />
            ) : isOwner ? (
              <div className="flex flex-col gap-4 border-[0.5px] border-medium-dark-grey rounded-[10px] p-4">
                <p className="text-dark-grey">
                  You cannot book your own venue.
                </p>
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
      </div>
    </main>
  );
}
