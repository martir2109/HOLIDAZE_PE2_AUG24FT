import { Button } from "../shared/Button";
import { InputField } from "../shared/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { MessageBanner } from "../shared/MessageBanner";
import type { MessageType } from "../shared/MessageBanner";
import { config } from "../../services/config";
import { useAuthStore } from "../../stores/authStore";

/**
 * Login form component that handles user authentication.
 *
 * Validates:
 * - That both input fields are filled in.
 * - That the email contains "@".
 *
 * POSTs to "/auth/login".
 * On success, stores the token via "useAuthStore" and redirects to "/".
 *
 * @returns A login form with email and password inputs and error feedback.
 */
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);

    if (!email.trim() || !password.trim()) {
      setAlert({ type: "error", text: "Email and password are required" });

      return;
    }

    if (!email.includes("@")) {
      setAlert({ type: "error", text: "Please enter a valid email." });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${config.apiBaseUrl}/auth/login?_holidaze=true`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setAlert({
          type: "error",
          text: data.message || "Invalid credentials",
        });
        return;
      }

      const token = data.data.accessToken;
      const apiKey = config.apiKey;

      login(
        {
          name: data.data.name,
          email: data.data.email,
          avatar: data.data.avatar ?? { url: "", alt: "" },
          banner: data.data.banner ?? { url: "", alt: "" },
          venueManager: data.data.venueManager ?? false,
          _count: { venues: 0, bookings: 0 },
        },
        token,
        apiKey
      );
      setAlert({
        type: "success",
        text: "Login successful!",
      });
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setAlert({
          type: "error",
          text: error.message,
        });
      } else {
        setAlert({
          type: "error",
          text: "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="w-full max-w-116 h-fit bg-white px-5 py-9 shadow-sm rounded-[10px] border-[0.5px] border-medium-dark-grey flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <h5 className="text-center font-bold text-h5">Login</h5>
        </div>
        <div>
          {alert && (
            <MessageBanner messageType={alert.type} message={alert.text} />
          )}
        </div>
        <div className="gap-8 flex flex-col">
          <div className="gap-4 flex flex-col">
            <div>
              <InputField
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              >
                Email*
              </InputField>
            </div>
            <div className="relative">
              <InputField
                name="password"
                placeholder="************"
                type={showPassword ? "text" : "password"}
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              >
                Password*
              </InputField>
              <button
                type="button"
                className="absolute right-2 top-15 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button
              variant="primary"
              className="max-w-61.5 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </div>
          <div className="w-full flex flex-col no-account:flex-row items-center justify-center gap-2 text-center">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="font-medium flex gap-2 text-blue-600 hover:underline "
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
