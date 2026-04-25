import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useAuthStore } from "../../stores/authStore";

/**
 * The navigation bar.
 * Shows links to venues and profile when logged in, or register and login when logged out.
 * Responsive design, shows a hamburger menu on mobile.
 *
 * @returns The navigation bar.
 */
export default function Navigationbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = !!user;

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      logout();
      navigate("/");
      setLoading(false);
    }, 1000);
  };

  return (
    <nav className="w-full fixed bg-white border-b border-gray-200 shadow-sm z-9999">
      <div className="flex items-center justify-between h-14 px-4">
        <Link to="/" className="text-xl font-bold text-primary">
          Holidaze
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/"
                  className="text-medium-text text-secondary hover:font-bold transition-colors"
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-medium-text text-secondary hover:font-bold transition-colors"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Button onClick={handleLogout} disabled={loading}>
                  {loading ? "Logging out..." : "Logout"}
                </Button>{" "}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="text-medium-text text-secondary hover:font-bold transition-colors"
                >
                  Register
                </Link>
              </li>
              <li className="text-medium-text">or</li>
              <li>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
              </li>
            </>
          )}
        </ul>

        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile */}
      {isOpen && (
        <ul className="md:hidden flex flex-col border-t border-gray-100 px-4 py-2 items-center">
          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/"
                  className="block py-2 text-medium-text text-secondary hover:font-bold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Venues
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="block py-2 text-medium-text text-secondary hover:font-bold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li className="py-2 w-full">
                <Button
                  className="w-full"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? "Logging out..." : "Log out"}
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="block py-2 text-medium-text text-secondary hover:font-bold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </li>
              <li className="py-2 w-full">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Login</Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
