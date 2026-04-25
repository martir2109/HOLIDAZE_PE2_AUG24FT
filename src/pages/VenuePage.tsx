import { useEffect, useRef, useState } from "react";
import { getVenue } from "../services/venueApi";
import type { Venue } from "../interfaces/venue";
import { Link, useParams } from "react-router-dom";
import {
  MoveLeft,
  Heart,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Cat,
  Users,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "../components/shared/Button";
import { useAuthStore } from "../stores/authStore";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useFavorites } from "../hooks/useFavorites";

/**
 * Single venue page
 *
 * Displays a single venue with its details:
 * - Images (if there is more than one image, arrow buttons will show)
 * - Amenities (if there are no amenities, a message will show)
 * - Location (if the venue has location address and city a google map with iframe will show)
 * - Booking form
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
  const [dates, setDates] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<number | "">("");
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const isBookingReady = !!dates?.from && !!dates?.to && guests !== "";
  const { isFavorited, toggleFavorite } = useFavorites();
  const [currentImage, setCurrentImage] = useState(0);

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  const dateLabel =
    dates?.from && dates?.to
      ? `${formatDate(dates.from)} - ${formatDate(dates.to)}`
      : "Check in/out";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDates(range);
  };

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

  if (loading)
    return (
      <div className="flex pb-10 text-secondary h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  if (error) {
    return (
      <div className="flex pb-10 text-red-700 h-screen w-full items-center justify-center">
        <p>Could not load the venue. Try again later.</p>
      </div>
    );
  }

  if (!venue) return null;

  return (
    <main className="w-full min-h-screen flex justify-center">
      <div
        className={`bg-white min-h-screen max-w-286.5 w-full p-4 flex flex-col gap-6 ${showCalendar ? "pb-96" : ""}`}
      >
        <div className="mt-2">
          <Link
            to="/"
            className="flex items-center cursor-pointer hover:underline gap-2"
          >
            <MoveLeft /> Back to venues
          </Link>
        </div>

        <div className="h-fit w-full flex flex-col gap-2">
          <div className="relative overflow-hidden rounded-t-md">
            <img
              src={
                venue.media[currentImage]?.url ||
                "https://placehold.co/650x370?text=No+Image"
              }
              alt={venue.media[currentImage]?.alt || venue.name}
              loading="lazy"
              className="object-cover w-full h-full"
            />

            {venue.media.length > 1 && (
              <div className="absolute flex w-full items-center justify-between px-2 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  title="Previous image"
                  onClick={() =>
                    setCurrentImage(
                      (prev) =>
                        (prev - 1 + venue.media.length) % venue.media.length
                    )
                  }
                  className="bg-white/80 rounded-full p-1 cursor-pointer"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  title="Next image"
                  onClick={() =>
                    setCurrentImage((prev) => (prev + 1) % venue.media.length)
                  }
                  className="bg-white/80 rounded-full p-1 cursor-pointer"
                >
                  <ChevronRight />
                </button>
              </div>
            )}

            {venue.media.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {venue.media.map((_, i) => (
                  <button
                    type="button"
                    title="Go to image"
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-3 h-3 rounded-full ${i === currentImage ? "bg-white" : "bg-white/50"}`}
                  />
                ))}
              </div>
            )}

            <div
              className="absolute bg-light-grey rounded-full p-1 top-2 right-2 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(venue.id);
              }}
            >
              <Heart
                className={
                  isFavorited(venue.id)
                    ? "text-red-600 fill-red-600"
                    : "text-dark-grey"
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h1 className="text-h5 font-bold">{venue.name}</h1>

            <div className="flex items-center gap-2">
              <MapPin />
              <div className="flex items-center text-dark-grey text-medium-text">
                <p>
                  {venue.location.city}, {venue.location.country}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-h5 font-bold">Amenities</h2>
              <div className="flex gap-4 flex-wrap">
                {!venue.meta.wifi &&
                !venue.meta.parking &&
                !venue.meta.breakfast &&
                !venue.meta.pets ? (
                  <p>No amenities</p>
                ) : (
                  <>
                    {venue.meta.wifi && (
                      <span className="flex items-center gap-2">
                        <Wifi /> WiFi
                      </span>
                    )}
                    {venue.meta.parking && (
                      <span className="flex items-center gap-2">
                        <Car /> Parking
                      </span>
                    )}
                    {venue.meta.breakfast && (
                      <span className="flex items-center gap-2">
                        <Coffee /> Breakfast
                      </span>
                    )}
                    {venue.meta.pets && (
                      <span className="flex items-center gap-2">
                        <Cat /> Pets allowed
                      </span>
                    )}
                  </>
                )}
              </div>
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
              <div className="flex flex-col gap-2">
                <h4 className="text-h5 font-bold">Map</h4>
                <iframe
                  title="Venue location"
                  width="100%"
                  height="300"
                  loading="lazy"
                  className="rounded-md border border-medium-dark-grey"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${venue.location.address}, ${venue.location.city}, ${venue.location.zip}, ${venue.location.country}`
                  )}&z=15&output=embed`}
                />
              </div>
            )}

            {isLoggedIn ? (
              <div className="flex flex-col gap-4 border-[0.5px] border-medium-dark-grey rounded-[10px] p-4">
                <h5 className="text-h5 font-bold">Check availability</h5>

                {/* Date range */}
                <div
                  className="relative w-full md:w-fit search-filters:w-fit"
                  ref={calendarRef}
                >
                  <button
                    className="flex items-center w-full search-filters:w-fit search-filters:justify-center px-4 gap-2 border-[0.5px] border-dark-grey rounded-full py-2 text-normal-text text-secondary cursor-pointer"
                    onClick={() => setShowCalendar(!showCalendar)}
                  >
                    <CalendarDays className="shrink-0" />
                    {dateLabel}
                  </button>

                  {showCalendar && (
                    <div className="absolute top-12 z-50 bg-white shadow-lg rounded-xl border border-medium-dark-grey p-2">
                      <DayPicker
                        mode="range"
                        selected={dates}
                        onSelect={handleDateSelect}
                        disabled={{ before: new Date() }}
                      />
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div className="flex items-center md:max-w-40 w-full px-4 gap-2 border-[0.5px] border-dark-grey rounded-full py-2 text-normal-text text-secondary">
                  <Users className="shrink-0" />
                  <input
                    type="number"
                    min={1}
                    max={venue.maxGuests}
                    placeholder="Guests"
                    value={guests}
                    onChange={(e) =>
                      setGuests(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="outline-none bg-transparent w-full"
                  />
                </div>

                <Button
                  className={`w-full transition-opacity ${
                    isBookingReady
                      ? "opacity-100"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!isBookingReady}
                >
                  Book now
                </Button>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className="flex flex-col gap-4 border-[0.5px] border-medium-dark-grey w-fit h-fit px-8 py-4 items-center justify-center rounded-[10px]">
                  <p>Login to book this venue</p>
                  <Link to="/login">
                    <Button className="cursor-pointer">Login</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
