export interface Venue {
  url: string;
  id: string;
  name: string;
  description: string;
  media: {
    url: string;
    alt: string;
  }[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
  bookings?: Booking[];
  owner?: {
    name: string;
    email: string;
    avatar?: { url: string; alt: string };
  };
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  venue?: Venue;
  customer?: {
    name: string;
  };
}

export interface ApiResponse {
  data: Venue[];
}

export interface SingleApiResponse {
  data: Venue;
}

export interface CreateVenue {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating?: number;
  media?: { url: string; alt: string }[];
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    country?: string;
    zip?: string;
  };
}

export type EditVenue = Partial<CreateVenue>;
