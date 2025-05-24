"use client"

import { ChevronRight } from "lucide-react";


const NavItem = ({
  icon,
  label,
  isActive,
  onClick,
  hasSubItems = false,
}) => {
  return (
    <div
      className={`flex items-center gap-2 hover:bg-cLightOrange hover:text-cOrange px-2 py-2  rounded-md cursor-pointer ${isActive ? "bg-cOrange  text-cWhite" : "text-cWhite"
        }`}
      onClick={onClick}
    >
      {icon}
      <p>{label}</p>

      {hasSubItems && (
        <div className="ml-auto">
          <ChevronRight />
        </div>
      )}
    </div>
  );
};

export default NavItem;
