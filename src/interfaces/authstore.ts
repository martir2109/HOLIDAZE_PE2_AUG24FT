import type { User } from "./user";

export interface AuthStore {
  user: User | null;
  token: string | null;
  apiKey: string | null;
  login: (user: User, token: string, apiKey: string) => void;
  logout: () => void;
}
