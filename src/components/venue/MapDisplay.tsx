import type { Venue } from "../../interfaces/venue";

interface MapDisplayProps {
  venue: Venue;
}

/**
 * Shows a Google Maps embed for a venue's address.
 *
 * @param venue - The venue whose show the map.
 * @returns A map iframe with the venue's location.
 */
export default function MapDisplay({ venue }: MapDisplayProps) {
  return (
    <>
      {(venue.location.address || venue.location.city) && (
        <div className="flex flex-col gap-2">
          <h2 className="text-h5 font-bold">Map</h2>
          <iframe
            title="Venue location"
            width="100%"
            height="300"
            loading="lazy"
            className="rounded-md border border-medium-dark-grey"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${venue.location.address}, ${venue.location.city}, ${venue.location.zip}, ${venue.location.country}`,
            )}&z=15&output=embed`}
          />
        </div>
      )}
    </>
  );
}
