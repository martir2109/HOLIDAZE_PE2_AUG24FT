import { Link } from "react-router-dom";
import { Button } from "../shared/Button";

/**
 * Shown when user is not logged in.
 * Displays a message and a login button.
 *
 * @returns A card with login message and a button.
 */
export default function NotLoggedIn() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 border-[0.5px] border-medium-dark-grey w-fit h-fit px-8 py-4 items-center justify-center rounded-[10px]">
        <p>Login to book this venue</p>
        <Link to="/login">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      </div>
    </div>
  );
}
