import { useEffect, useRef, useState } from "react";
import { MapPin, Users, CalendarDays, Wallet } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import { Button } from "./Button";
import "react-day-picker/style.css";

interface VenueFiltersProps {
  onLocationChange: (location: string) => void;
  onGuestsChange: (guests: number) => void;
  onDateChange: (range: DateRange | undefined) => void;
  onPriceChange: (price: number | "") => void;
}

/**
 * Search filters for finding venues.
 *
 * Shows inputs for location, dates (check in/out), guests and max price.
 * Gets the matching venues when the user clicks the "Search" button.
 * Shows a "Clear search" if the user enters anything in any of the inputs.
 *
 * @returns The filters bar.
 */
export default function VenueFilters({
  onLocationChange,
  onGuestsChange,
  onDateChange,
  onPriceChange,
}: VenueFiltersProps) {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [dates, setDates] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const calendarRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, { day: "numeric", month: "short" });

  const dateLabel =
    dates?.from && dates?.to
      ? `${formatDate(dates.from)} - ${formatDate(dates.to)}`
      : "Check in/out";

  const hasActiveFilters =
    location !== "" || guests !== 1 || maxPrice !== "" || dates !== undefined;

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

  function handleDateSelect(range: DateRange | undefined) {
    setDates(range);
    if (range?.from && range?.to) setShowCalendar(false);
  }

  function handleSearch() {
    onLocationChange(location);
    onGuestsChange(guests);
    onPriceChange(maxPrice);
    onDateChange(dates);
  }

  function handleClear() {
    setLocation("");
    setGuests(1);
    setMaxPrice("");
    setDates(undefined);
    onLocationChange("");
    onGuestsChange(1);
    onPriceChange("");
    onDateChange(undefined);
  }

  return (
    <div className="bg-white gap-4 w-full h-fit search-filters:h-21.25 flex search-filters:flex-row flex-col border-b border-medium-dark-grey shadow-sm items-center justify-center p-4">
      {/* Location */}
      <div className="flex items-center cursor-pointer w-full search-filters:w-fit search-filters:justify-center px-4 gap-2 border-[0.5px] border-dark-grey rounded-full py-2 text-normal-text text-secondary">
        <MapPin className="shrink-0" />
        <input
          type="text"
          placeholder="Where to?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="outline-none bg-transparent w-full"
        />
      </div>

      {/* Date range */}
      <div className="relative w-full search-filters:w-fit" ref={calendarRef}>
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
              disabled={{ before: new Date() }}
            />
          </div>
        )}
      </div>

      {/* Guests */}
      <div className="flex items-center cursor-pointer w-full search-filters:w-fit search-filters:justify-center px-4 gap-2 border-[0.5px] border-dark-grey rounded-full py-2 text-normal-text text-secondary">
        <Users className="shrink-0" />
        <input
          type="number"
          min={1}
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="outline-none bg-transparent w-16"
        />
      </div>

      {/* Max price */}
      <div className="flex items-center w-full search-filters:w-fit search-filters:justify-center px-4 gap-2 border-[0.5px] border-dark-grey rounded-full py-2 text-normal-text text-secondary">
        <Wallet className="shrink-0" />
        <span className="shrink-0">Max price</span>
        <input
          type="number"
          min={1}
          placeholder="0"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="outline-none bg-transparent w-16"
        />
      </div>

      <Button
        className="h-10 px-10 flex items-center w-full search-filters:w-fit justify-center"
        onClick={handleSearch}
      >
        Search
      </Button>

      {hasActiveFilters && (
        <Button
          className="h-10 px-10 flex items-center w-full search-filters:w-fit justify-center"
          variant="clear"
          onClick={handleClear}
        >
          Clear search
        </Button>
      )}
    </div>
  );
}
