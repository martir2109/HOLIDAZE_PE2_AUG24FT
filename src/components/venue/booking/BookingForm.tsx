import { useState, useEffect, useRef } from "react";
import { createBooking, editBooking } from "../../../services/bookingApi";
import type { Venue, Booking } from "../../../interfaces/venue";
import { Button } from "../../shared/Button";
import { DayPicker, type DateRange } from "react-day-picker";
import { Users, CalendarDays } from "lucide-react";
import { MessageBanner } from "../../shared/MessageBanner";
import type { MessageType } from "../../shared/MessageBanner";

interface BookingFormProps {
  venue: Venue;
  bookings?: Booking[];
  existingBooking?: Booking;
  onCancel?: () => void;
}

/**
 * Form for booking and editing a venue.
 *
 * Shows a date range picker and a guest count input.
 * Disables already booked dates so the user cannot pick unavailable dates.
 * Validates that the number of guests does not exceed the venue's max guests.
 * If an existing booking is provided, the form will be pre-filled and save changes on submit.
 *
 * @param venue The venue to book.
 * @param bookings Existing bookings for the venue to disable already booked dates.
 * When editing, the booking's own dates are excluded from the disabled range.
 *
 * @param existingBooking The booking to edit. If not provided, a new booking will be created.
 * @param onCancel Called when the user clicks cancel while editing a booking.
 */
export default function BookingForm({
  venue,
  bookings = [],
  existingBooking,
  onCancel,
}: BookingFormProps) {
  const [alert, setAlert] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);
  const isEditBooking = !!existingBooking;
  const [dates, setDates] = useState<DateRange | undefined>(
    existingBooking
      ? {
          from: new Date(existingBooking.dateFrom),
          to: new Date(existingBooking.dateTo),
        }
      : undefined,
  );
  const [guests, setGuests] = useState<number | "">(
    existingBooking ? existingBooking.guests : "",
  );
  const calendarRef = useRef<HTMLDivElement>(null);
  const isBookingReady = !!dates?.from && !!dates?.to && guests !== "";
  const [showCalendar, setShowCalendar] = useState(false);

  const bookedDates = bookings.flatMap((booking) => {
    if (isEditBooking && booking.id === existingBooking.id) return [];
    const dates = [];
    const current = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDates(range);
  };

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

  async function handleBooking() {
    if (!dates?.from || !dates?.to || guests === "") return;

    if (Number(guests) > venue.maxGuests) {
      setAlert({
        type: "error",
        text: `Max guests for this venue is ${venue.maxGuests}`,
      });
      return;
    }

    try {
      if (isEditBooking) {
        await editBooking(existingBooking.id, {
          dateFrom: dates.from.toISOString(),
          dateTo: dates.to.toISOString(),
          guests: Number(guests),
        });
      } else {
        await createBooking({
          dateFrom: dates.from.toISOString(),
          dateTo: dates.to.toISOString(),
          guests: Number(guests),
          venueId: venue.id,
        });
      }
      setTimeout(() => {
        setAlert({
          type: "success",
          text: isEditBooking ? "Booking updated!" : "Booking confirmed!",
        });
        window.location.reload();
      }, 1000);
    } catch (error) {
      if (error instanceof Error && error.message.includes("409")) {
        setAlert({
          type: "error",
          text: "These dates are already booked. Please choose different dates.",
        });
      } else {
        setAlert({
          type: "error",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 border-[0.5px] border-medium-dark-grey rounded-[10px] p-4 ${showCalendar ? "pb-96" : ""}`}
      >
        <h5 className="text-h5 font-bold">Check availability</h5>
        {alert && (
          <MessageBanner messageType={alert.type} message={alert.text} />
        )}

        {/* Date range */}
        <div
          className="relative w-full md:w-fit search-filters:w-fit"
          ref={calendarRef}
        >
          <button
            type="button"
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
                disabled={[{ before: new Date() }, ...bookedDates]}
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
              setGuests(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="outline-none bg-transparent w-full"
          />
        </div>
        <p className="text-dark-grey text-small-text">
          Select booking dates and number of guests
        </p>

        <Button
          className={`w-full transition-opacity ${
            isBookingReady ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isBookingReady}
          onClick={handleBooking}
        >
          {isEditBooking ? "Save changes" : "Book now"}
        </Button>

        {isEditBooking && onCancel && (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer text-normal-text hover:underline text-secondary hover:text-primary text-left"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}
