import { useState } from "react";
import { Button } from "../shared/Button";
import { config } from "../../services/config";
import { InputField } from "../shared/InputField";
import { Link, useNavigate } from "react-router-dom";
import { MessageBanner } from "../shared/MessageBanner";
import type { MessageType } from "../shared/MessageBanner";
import { Eye, EyeOff } from "lucide-react";

/**
 * Register form component that handles user creation.
 *
 * Validates:
 * - Name is at least 2 characters and contains only letters, spaces, hyphens and apostrophes.
 * - Email is valid "@noroff.no" or "@stud.noroff.no" address.
 * - Password is at least 8 characters and matches the confirm password field.
 *
 * POSTs to "/auth/register".
 * On success, redirects to "/login".
 *
 * @returns A register form with name, email, password and confirm password inputs and error feedback.
 */
export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [alert, setAlert] = useState<{
    type: MessageType;
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name) {
      setAlert({
        type: "error",
        text: "Name is required.",
      });
      return;
    } else if (name.length < 2) {
      setAlert({
        type: "error",
        text: "Name must be at least 2 characters long.",
      });
      return;
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)) {
      setAlert({
        type: "error",
        text: "Name can only contain letters, spaces, hyphens, and apostrophes.",
      });
      return;
    }

    if (!email) {
      setAlert({
        type: "error",
        text: "Email is required.",
      });
      return;
    } else if (!/^[^\s@]+@(stud\.noroff\.no|noroff\.no)$/.test(email)) {
      setAlert({
        type: "error",
        text: "Email must be a valid @noroff.no or @stud.noroff.no address.",
      });
      return;
    }

    if (!password) {
      setAlert({
        type: "error",
        text: "Password is required.",
      });
      return;
    } else if (password.length < 8) {
      setAlert({
        type: "error",
        text: "Password must be at least 8 characters long.",
      });
      return;
    } else if (password !== confirmPassword) {
      setAlert({ type: "error", text: "Password do not match" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${config.apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          venueManager,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.errors?.[0]?.message || data.message || "Registration failed";
        setAlert({ type: "error", text: errorMessage });
        return;
      }

      setAlert({
        type: "success",
        text: "Account created successfully. You can now log in.",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setAlert({ type: "error", text: error.message });
      } else {
        setAlert({ type: "error", text: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        className="w-full max-w-116 h-fit bg-white px-5 py-9 shadow-sm rounded-[10px] border-[0.5px] border-medium-dark-grey flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <h5 className="text-center font-bold text-h5">Register</h5>
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
                name="name"
                placeholder="Name"
                type="text"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
              >
                Name*
              </InputField>
            </div>

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
                autoComplete="new-password"
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
            <div className="relative">
              <InputField
                name="confirmPassword"
                placeholder="************"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              >
                Confirm password*
              </InputField>
              <button
                type="button"
                className="absolute right-2 top-15 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            <div className="flex items-start w-full gap-2 ">
              <input
                type="checkbox"
                title="checkbox for venue manager"
                className="mt-1 h-4.5 w-4.5 cursor-pointer"
                checked={venueManager}
                onChange={(e) => setVenueManager(e.target.checked)}
              />
              <div className="flex flex-col">
                <p className="text-normal-text">Register as a venue manager</p>
                <p className="text-[12px] text-medium-dark-grey">
                  Click this if you want to list and manage venues
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <Button
              variant="primary"
              className="max-w-61.5 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </div>
          <div className="w-full flex flex-col no-account:flex-row items-center justify-center gap-2 text-center">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="font-medium flex gap-2 text-blue-600 hover:underline "
            >
              Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
