"use client";

import { auth } from "@/lib/firebase";

const Avi = () => {
  const firstAlphabetInName = auth?.currentUser?.email?.charAt(0) || "A";

  return (
    <div className="flex gap-2 cursor-pointer opacity-70">
      <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-cOrange">
        <h2>{firstAlphabetInName.toUpperCase()}</h2>
      </div>

    </div>
  );
};

export default Avi;
