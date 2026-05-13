import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "../../shared/Button";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

/**
 * StarRating component that renders 5 clickable stars.
 *
 * Hovering over a star highlights it and all stars before it.
 * Clicking a star sets the rating to that value.
 * A "Clear" button appears when a rating is selected, allowing the user to reset it to 0.
 *
 * @param value The current rating (0–5).
 * @param onChange Called when the user picks or clears a rating.
 * @returns A row of 5 stars with an optional Clear button.
 */
export function StarRating({ value, onChange }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-medium-text font-bold">Rating</p>
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              title="Star rating"
              type="button"
              key={starValue}
              className="cursor-pointer"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={24}
                strokeWidth={0}
                fill={starValue <= (hover || value) ? "#facc15" : "#d1d5db"}
              />
            </button>
          );
        })}
        {value > 0 && (
          <Button
            type="button"
            onClick={() => onChange(0)}
            variant="clearRating"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
