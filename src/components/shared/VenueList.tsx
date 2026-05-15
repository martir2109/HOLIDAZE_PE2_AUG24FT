import type { Venue } from "../../interfaces/venue";
import VenueCard from "./VenueCard";
import { motion } from "framer-motion";

interface VenueListProps {
  venues: Venue[];
}

/**
 * Displays a list of venues in a responsive grid layout.
 * Each card fades in and slides up when scrolled into view,
 * with each card animating slightly after the previous one.
 *
 * @param venues The list of venues to display.
 * @returns A grid of VenueCard components, one for each venue.
 */
export default function VenueList({ venues }: VenueListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {venues.map((venue, index) => (
        <motion.div
          key={venue.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: index * 0.08,
          }}
        >
          <VenueCard venue={venue} />
        </motion.div>
      ))}
    </div>
  );
}
