import type { DateRange } from "react-day-picker";

export interface Filters {
  location: string;
  guests: number;
  maxPrice: number | "";
  dateRange: DateRange | undefined;
}
