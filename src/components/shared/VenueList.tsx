import type { Venue } from "../../interfaces/venue";
import VenueCard from "./VenueCard";

interface VenueListProps {
  venues: Venue[];
}

/**
 * Displays a list of venues in a responsive grid layout.
 *
 * @returns A grid of VenueCard components, one for each venue.
 */
export default function VenueList({ venues }: VenueListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
