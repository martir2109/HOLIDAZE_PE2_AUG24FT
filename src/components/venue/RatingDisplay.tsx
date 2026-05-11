import type { Venue } from "../../interfaces/venue";
import { Star } from "lucide-react";

interface RatingDisplayProps {
  venue: Venue;
}

/**
 * Displays the rating for the venue as stars and a score out of 5.
 * Displays filled stars based on the rating, rounded to the nearest whole number.
 * If the venue has no rating, a message is shown instead.
 *
 * @param venue The venue whose rating to display.
 * @returns The rating for the venue.
 */
export default function RatingDisplay({ venue }: RatingDisplayProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-h5 font-bold">Rating</h2>
      {venue.rating ? (
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={24}
              strokeWidth={0}
              fill={
                index + 1 <= Math.round(venue.rating) ? "#facc15" : "#d1d5db"
              }
            />
          ))}
          <p className="text-secondary">{venue.rating} / 5</p>
        </div>
      ) : (
        <p className="text-dark-grey">This venue has no rating.</p>
      )}
    </div>
  );
}
