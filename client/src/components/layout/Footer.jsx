// src/components/layout/Footer.jsx
import AppStoreBadge   from "../../assets/images/store_apple.svg";
import GooglePlayBadge from "../../assets/images/store_google.svg";

import {
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

const Footer = () => (
  <footer className="w-full bg-gray-400 border-t border-gray-400">
    <div className="mx-auto max-w-7xl px-4 py-16 grid gap-6 md:grid-cols-3">

      {/* column 1 – contact */}
      <div>
        <h6 className="mb-2 font-semibold text-gray-700">Contact Us</h6>
        <div className="grid grid-cols-2 gap-1">
          <a href="tel:+94xxxxxxxxx" aria-label="Call us" className="justify-self-start">
            <PhoneIcon className="h-6 w-6 text-blue-800 hover:text-blue-600" />
          </a>
          <a href="mailto:info@coderella.lk" aria-label="Email us" className="justify-self-end">
            <EnvelopeIcon className="h-6 w-6 text-blue-800 hover:text-blue-600" />
          </a>
          <a
            href="https://www.coderella.lk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our website"
            className="justify-self-start"
          >
            <GlobeAltIcon className="h-6 w-6 text-blue-800 hover:text-blue-600" />
          </a>
          <a
            href="https://maps.google.com?q=Mathugama,+Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Our location"
            className="justify-self-end"
          >
            <MapPinIcon className="h-6 w-6 text-blue-800 hover:text-blue-600" />
          </a>
        </div>
      </div>

      {/* column 2 – login status */}
      <div className="text-center">
        <p className="text-gray-700">
          You are logged in as{" "}
          <button className="font-medium text-gray-900">Lokupathirage I.M</button>
        </p>
        <button className="mt-2  hover:text-blue-600 text-gray-600">
          Log Out
        </button>
      </div>

      {/* column 3 – mobile app links */}
      <div className="md:text-right">
        <h6 className="mb-2 font-semibold text-gray-700">Get the mobile app</h6>
        <div className="flex md:justify-end gap-2">
          <a href="#playstore" aria-label="Get it on Google Play">
            <img
              src={GooglePlayBadge}
              alt="Get it on Google Play"
              className="h-10"
            />
          </a>
          <a href="#appstore" aria-label="Download on the App Store">
            <img
              src={AppStoreBadge}
              alt="Download on the App Store"
              className="h-10"
            />
          </a>
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;
