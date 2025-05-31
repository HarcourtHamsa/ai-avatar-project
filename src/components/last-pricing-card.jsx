import React from "react";
import Button from "./button";
import { CheckCircle2 } from "lucide-react";

const LastPricingCard = ({ item }) => {
  return (
    <div className="bg-black w-full rounded-2xl flex flex-col lg:flex-row items-start lg:items-center p-4 sm:p-6 gap-6">
      {/* Left Content */}
      <div className="flex flex-col gap-4 sm:gap-6 flex-1">
        <div className="bg-white w-fit border border-[#D5D7DA] py-0.5 px-2 gap-1.5 rounded-md flex items-center">
          <div className="border-4 border-[#F4EBFF] h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-cOrange" />
          <p className="text-[#414651] font-medium text-xs sm:text-sm">
            {item?.type}
          </p>
        </div>

        <div className="flex flex-col gap-1 sm:gap-2">
          <h2 className="font-medium text-3xl sm:text-5xl text-white">
            {item?.price}
          </h2>
          <p className="text-white font-light text-sm sm:text-base">
            {item?.description}
          </p>
        </div>

        <Button label={"Buy Now"} className="w-full" />
      </div>

      {/* Right Content (Benefits) */}
      <div className="flex flex-col gap-3 w-full lg:w-2/6">
        {item?.benfits?.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3">
            <CheckCircle2 className="text-cOrange min-w-5" />
            <p className="text-[#FFF9F6] text-sm font-normal flex-1">
              {benefit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastPricingCard;
