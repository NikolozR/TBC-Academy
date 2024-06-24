"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ProfileIcon from "../../../public/profile.svg";
import ThemeSwitcher from "./ThemeSwitcher";

function ProfileDropDown({ isAuthorized }: { isAuthorized: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src={ProfileIcon}
        className="cursor-pointer"
        width={24}
        height={24}
        alt="Profile Icon"
        onClick={toggleDropDown}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 z-50 bg-white rounded-md shadow-lg">
          <div className="py-1">
            <div className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-700">Theme</span>
              <ThemeSwitcher></ThemeSwitcher>
            </div>
            {isAuthorized ? (
              <>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </a>
                <a
                  href="/api/auth/logout"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </a>
              </>
            ) : (
              <>
                <a
                  href="/api/auth/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log In
                </a>
                <a
                  href="/api/auth/signup"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropDown;
