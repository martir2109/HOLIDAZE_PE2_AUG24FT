import { Mail, MapPin, MoveRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Footer component
 *
 * @returns A responsive footer with three columns: Contact Info, Explore, and Policies.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-white h-fit md:h-97 border-t border-[0.2px] border-medium-dark-grey gap-10 py-10 px-4 sm:px-6 flex flex-col items-center break-all sm:break-normal">
      <div className="max-w-272.75 w-full h-full flex items-center">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-between w-full">
          <div className="flex flex-col gap-2 sm:items-center items-start">
            <div className="text-left">
              <h5 className="font-bold">Contact Info</h5>
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-2">
                  <Phone size={20} /> +47 123 456 78
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={20} /> holidaze@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={20} /> Oslo, Norway
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start sm:items-center">
            <div className="text-left">
              <h5 className="font-bold">Explore</h5>
              <div className="flex flex-col gap-2">
                <Link
                  to="/aboutus"
                  className="font-medium flex gap-2 text-secondary hover:underline"
                >
                  <MoveRight /> About us
                </Link>
                <Link
                  to="/contactus"
                  className="font-medium flex gap-2 text-secondary hover:underline"
                >
                  <MoveRight /> Contact us
                </Link>
                <Link
                  to="/help"
                  className="font-medium flex gap-2 text-secondary hover:underline"
                >
                  <MoveRight /> Help
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-center items-start">
            <div className="text-left">
              <h5 className="font-bold">Policies</h5>
              <div className="flex flex-col gap-2">
                <Link
                  to="/termsandconditions"
                  className="font-medium flex gap-2 text-secondary hover:underline"
                >
                  <MoveRight /> Terms and conditions
                </Link>
                <Link
                  to="/privacypolicy"
                  className="font-medium flex gap-2 text-secondary hover:underline"
                >
                  <MoveRight /> Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="w-full text-center mt-10 sm:mt-auto text-small-text text-gray-700">
        &copy; {new Date().getFullYear()} Holidaze. All rights reserved.
      </p>
    </footer>
  );
}
