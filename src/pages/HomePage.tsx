import { useEffect, useMemo, useState } from "react";
import VenueList from "../components/shared/VenueList";
import { getVenues } from "../services/venueApi";
import type { Venue } from "../interfaces/venue";
import PaginationControls from "../components/shared/PaginationControls";
import VenueFilters from "../components/shared/VenueFilters";
import type { DateRange } from "react-day-picker";
import { useVenueFilters } from "../hooks/useVenueFilters";
import { SearchX } from "lucide-react";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const VENUES_PER_PAGE = 12;

/**
 * The home page.
 *
 * Fetches and displays all venues with search filters and pagination (12 venues per page).
 * Shows an error message if the venues could not be loaded.
 * If no venues matches the search a message is shown.
 *
 * @returns The home page.
 */
export default function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  useEffect(() => {
    async function fetchVenues() {
      try {
        const result = await getVenues({ bookings: true });
        setVenues(result.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, []);

  const filteredVenues = useVenueFilters(venues, {
    location,
    guests,
    maxPrice,
    dateRange,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVenues.length / VENUES_PER_PAGE),
  );

  const paginatedVenues = useMemo(() => {
    const startIndex = (currentPage - 1) * VENUES_PER_PAGE;
    return filteredVenues.slice(startIndex, startIndex + VENUES_PER_PAGE);
  }, [filteredVenues, currentPage]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex pb-10 text-red-700 h-screen w-full items-center justify-center">
        <p>Could not load the venues. Try again later.</p>
      </div>
    );
  }

  return (
    <main className="w-full pb-10">
      <div className="relative w-full h-88.75">
        <img
          src="/banner.jpg"
          alt="Holidaze banner"
          className="w-full h-full object-cover object-center"
          title="Photo by Manuel Inglez"
          fetchPriority="high"
          loading="eager"
        />

        <h1 className="absolute inset-0 flex items-center justify-center text-white  text-h3 sm:text-h1 font-bold">
          HOLIDAZE
        </h1>
      </div>
      <VenueFilters
        onLocationChange={(location) => {
          setLocation(location);
          setCurrentPage(1);
        }}
        onGuestsChange={(guests) => {
          setGuests(guests);
          setCurrentPage(1);
        }}
        onDateChange={(range) => {
          setDateRange(range);
          setCurrentPage(1);
        }}
        onPriceChange={(price) => {
          setMaxPrice(price);
          setCurrentPage(1);
        }}
      />
      <div className="px-4 sm:px-8 md:px-10 lg:px-20 mt-10 flex flex-col gap-10">
        {filteredVenues.length === 0 ? (
          <div className="h-fit w-full flex justify-center">
            <p className="gap-2 flex flex-col items-center">
              <SearchX size={30} /> No venues match your search.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-large-text font-bold mb-6">
              Find and Book Unique Venues
            </h2>
            <VenueList venues={paginatedVenues} />
          </div>
        )}
        <div className="w-full flex justify-center items-center">
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </main>
  );
}
