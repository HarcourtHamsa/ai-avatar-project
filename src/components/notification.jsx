"use client";

import { ICON_SIZE } from "@/constants";
import { Bell } from "lucide-react";

const Notification = ({ count }) => {
  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-full">
      <div className="relative">
        <Bell size={ICON_SIZE + 2} />
        <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white absolute text-sm -top-4 -right-3">
          {20}
        </span>
      </div>
    </div>
  );
};

export default Notification;
