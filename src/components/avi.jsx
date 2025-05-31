"use client";

import { auth } from "@/lib/firebase";
import { useState } from "react";
import Button from "./button";
import Meter from "./meter";
import { ChevronDown } from "lucide-react";
import { ICON_SIZE } from "@/constants";

const Avi = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const firstAlphabetInName = auth?.currentUser?.email?.charAt(0) || "A";

  return (
    <div className="flex items-center gap-2 relative">
      <div
        className="flex gap-2 cursor-pointer opacity-70"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-cOrange">
          <h2>{firstAlphabetInName.toUpperCase()}</h2>
        </div>
      </div>

      {showDropdown && (
        <div className="absolute top-12 select-none right-0 mt-2 w-[400px] px-4 py-2  bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="flex justify-between">
            <div>
              <p>Social Shake</p>
              <p className="text-sm text-gray-400">socialshake@gmail.com</p>
            </div>

            <div className="text-center">
              <div className="w-fit">
                <Button label="Starter Plan" />
              </div>
              <p className="text-sm text-cOrange select-none">Upgrade Plan</p>
            </div>
          </div>

          <div className="my-4">
            <div className="select-none">
              <div className="flex justify-between">
                <p>AI Videos Available</p>
                <span>2/10</span>
              </div>
              <Meter value={2} max={10} />
            </div>
          </div>
          <div className="select-none mb-2">
            <div className="flex justify-between">
              <p>AI Custom Actor</p>
              <span>1/2</span>
            </div>
            <Meter value={1} max={2} />
          </div>
        </div>
      )}

      {/* TODO: show chevron icon */}
      <ChevronDown size={ICON_SIZE} />
    </div>
  );
};

export default Avi;
