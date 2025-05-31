"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Plus, Search } from "lucide-react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants";
import UGCAdsList from "@/components/ugc-ad-list";

const ugcAds = [
  {
    id: "84594t464-464rr34-9485",
    title: "Shoes Campign",
    hook: " Unlock the power of AI to create stunning UGC ads in minutes.",
    createdAt: "2023-01-01",
    videoUrl:
      "https://res.cloudinary.com/dgn6edv1k/video/upload/v1741272463/samples/cld-sample-video.mp4",
  },
];

const Page = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateAd = () => {
    // Redirect to the create ad page
    router.push(Routes.newAiUgc);
  };

  return (
    <DashboardLayout label="AI UGC Ad">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* search bar */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute top-1/2 left-2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI"
            className="px-10 py-2 border border-gray-300 rounded-lg outline-cOrange w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="md:w-fit w-full">
          <Button
            label={"Create AI UGC Ad"}
            icon={<Plus />}
            onClick={handleCreateAd}
          />
        </div>
      </div>

      {/* TODO: implement ads empty state */}
      {ugcAds.length === 0 && (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <p className="text-gray-500">No AI UGC Ads found</p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <UGCAdsList ugcAds={ugcAds} />
      </div>
    </DashboardLayout>
  );
};

export default Page;
