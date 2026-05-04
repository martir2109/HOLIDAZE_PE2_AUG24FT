import type { Venue, Booking } from "./venue";

export interface User {
  name: string;
  email: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
  _count: {
    venues: number;
    bookings: number;
  };
  venues?: Venue[];
  bookings?: Booking[];
}

export interface SingleApiResponse {
  data: User;
}
