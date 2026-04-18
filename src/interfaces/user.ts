export interface User {
  id: string;
  name: string;
  email: string;
  avatar: { url: string; alt?: string } | null;
  banner: { url: string; alt?: string } | null;
  venueManager: boolean;
}
