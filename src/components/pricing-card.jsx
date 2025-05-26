import React from "react";
import Button from "./button";
import { CheckCircle2 } from "lucide-react";

const PricingCard = ({ type, price, period, description, benfits, banner }) => {
  return (
    <div className="flex-1 bg-white border border-black/10 shadow-custom-sm rounded-2xl overflow-hidden w-full max-w-[400px] mx-auto sm:max-w-full">
      {banner && (
        <div className="w-full bg-cPink py-2 text-center">
          <p className="text-white font-bold text-sm sm:text-base uppercase">
            Most Popular
          </p>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="border border-[#D5D7DA] py-0.5 px-2 gap-1.5 rounded-md flex items-center">
          <div className="border-4 border-[#F4EBFF] h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-cOrange" />
          <p className="text-[#414651] font-medium text-xs sm:text-sm">{type}</p>
        </div>

        <div className="flex flex-col gap-1 sm:gap-2 items-center text-center">
          <h2 className="font-medium text-3xl sm:text-5xl text-[#181D27]">
            {price} <span className="text-cGray text-sm sm:text-xl">{period}</span>
          </h2>
          <p className="text-[#535862] font-normal text-sm sm:text-base">
            {description}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <div className="border-y border-[#E9EAEB] flex flex-col py-4 sm:py-6 gap-3 sm:gap-4">
          {benfits?.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="text-cOrange min-w-5" />
              <p className="text-[#535862] text-sm sm:text-base font-normal flex-1">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <Button label={"Buy Now"} className={"w-full"} />
      </div>
    </div>
  );
};

export default PricingCard;
