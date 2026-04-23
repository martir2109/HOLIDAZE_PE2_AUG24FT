import { useMemo } from "react";
import type { Venue } from "../interfaces/venue";
import type { Filters } from "../interfaces/Filters";

/**
 * Filters a list of venues based on location, guests, price and date availability.
 * Only recalculates when venues or filters change.
 *
 * @param venues The full list of venues to filter
 * @param filters The active filters (location, guests, max price and date range)
 * @returns A filtered array of venues that match all the given criteria.
 */
export function useVenueFilters(venues: Venue[], filters: Filters) {
  return useMemo(() => {
    return venues.filter((venue) => {
      const matchesLocation =
        filters.location === "" ||
        venue.location.city
          ?.toLowerCase()
          .includes(filters.location.toLowerCase()) ||
        venue.location.country
          ?.toLowerCase()
          .includes(filters.location.toLowerCase());

      const matchesGuests = venue.maxGuests >= filters.guests;
      const matchesPrice =
        filters.maxPrice === "" || venue.price <= filters.maxPrice;

      const matchesDate = (() => {
        if (!filters.dateRange?.from || !filters.dateRange?.to) return true;

        const filterFrom = filters.dateRange.from;
        const filterTo = filters.dateRange.to;

        if (!venue.bookings || venue.bookings.length === 0) return true;

        const hasConflict = venue.bookings.some((booking) => {
          const bookingStart = new Date(booking.dateFrom);
          const bookingEnd = new Date(booking.dateTo);
          return bookingStart < filterTo && bookingEnd > filterFrom;
        });

        return !hasConflict;
      })();

      return matchesLocation && matchesGuests && matchesPrice && matchesDate;
    });
  }, [
    venues,
    filters.location,
    filters.guests,
    filters.maxPrice,
    filters.dateRange,
  ]);
}
