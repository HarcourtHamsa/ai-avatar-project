"use client";

import { ICON_SIZE, Routes } from "@/constants";
import { useState } from "react";
import {
  HomeIcon,
  Folder,
  Award,
  Users,
  MessageCircle,
  CreditCard,
  Sparkles,
  Menu,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import Notification from "./notification";
import Avi from "./avi";
import NavItem from "./nav-item";

const DashboardLayout = ({ children, label }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const menuNavItems = [
    {
      label: "Dashboard",
      icon: <HomeIcon size={ICON_SIZE} />,
      path: Routes.dashboard,
    },
    {
      label: "Projects",
      icon: <Folder size={ICON_SIZE} />,
      path: Routes.projects,
    },
    {
      label: "Contests",
      icon: <Award size={ICON_SIZE} />,
      path: Routes.contests,
    },
    {
      label: "Creators",
      icon: <Users size={ICON_SIZE} />,
      path: Routes.creators,
      subItems: [
        {
          label: "All Creators",
          path: Routes.creators,
        },
        {
          label: "Saved Creators",
          path: Routes.creators,
        },
      ],
    },
    {
      label: "Messages",
      icon: <MessageCircle size={ICON_SIZE} />,
      path: Routes.messages,
    },
    {
      label: "Transactions",
      icon: <CreditCard size={ICON_SIZE} />,
      path: Routes.transactions,
    },
    {
      label: "AI UGC Ad",
      icon: <Sparkles size={ICON_SIZE} />,
      path: Routes.aiUgc,
    },
  ];

  const generalNavItems = [
    {
      label: "Settings",
      icon: <Settings size={ICON_SIZE} />,
      path: Routes.settings,
    },
    {
      label: "Help & Support",
      icon: <HelpCircle size={ICON_SIZE} />,
      path: Routes.help,
    },
  ];

  const renderNavItem = (item) => (
    <NavItem
      key={item.label}
      label={item.label}
      icon={item.icon}
      active={pathname === item.path}
      onClick={() => {
        router.push(item.path);
        setShowMobileNav(false); // close mobile nav on navigation
      }}
    />
  );

  return (
    <div className="grid md:grid-cols-4 grid-cols-1 min-h-screen bg-gray-100">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:block md:col-span-1 border-r border-gray-200 bg-cBlack">
        <div className="h-16 p-4  border-gray-200 flex items-center">
          {/* <Logo /> */}
        </div>

        <div className="p-4">
          {/* <span className="text-gray-500 font-medium">Menu</span> */}
          <div className="mt-2 space-y-1">
            {menuNavItems.map(renderNavItem)}
          </div>
        </div>

        <div className="p-4">
          {/* <span className="text-gray-500 font-medium">General</span> */}
          <div className="mt-2 space-y-1">
            {generalNavItems.map(renderNavItem)}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:col-span-3 col-span-1 bg-cLightOrange">
        {/* Topbar */}
        <div className="h-16 p-4 bg-white flex items-center justify-between border-b border-gray-200">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setShowMobileNav(true)}>
              <Menu size={ICON_SIZE + 3} />
            </button>
            {/* <Logo /> */}
          </div>

          {/* Search + Profile (Desktop) */}
          <div className="hidden md:flex justify-between w-full items-center">
            {/* <SearchBar placeholder="Search" value="" onChange={() => { }} /> */}
            <p className="font-medium text-xl">{label}</p>

            <div className="flex items-center gap-3">
              <Notification count={0} />
              <Avi />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">{children}</div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {showMobileNav && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-cBlack w-64 h-full shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              {/* <Logo /> */}
              <button
                onClick={() => setShowMobileNav(false)}
                className="text-cWhite text-lg"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              {/* <span className="text-gray-500 font-medium">Menu</span> */}
              <div className="mt-2 space-y-1">
                {menuNavItems.map(renderNavItem)}
              </div>
            </div>

            <div>
              {/* <span className="text-gray-500 font-medium">General</span> */}
              <div className="mt-2 space-y-1">
                {generalNavItems.map(renderNavItem)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
