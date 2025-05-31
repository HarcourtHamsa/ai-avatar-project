import Image from "next/image";
import React from "react";
import womanKitchen from "../assets/img/woman-kitchen.png";
import { Play, Trash2 } from "lucide-react";

const privacyPolicyRules = [
  {
    title: "Avoid Harmful Content",
    subTitle: "Don’t include violent, adult, or discriminatory language.",
  },
  {
    title: "Avoid Typos",
    subTitle:
      "Clear spelling helps the AI actor pronounce your message correctly.",
  },
  {
    title: "Use Proper Punctuation",
    subTitle:
      "Punctuation affects tone. Add periods and question marks for better delivery.",
  },
];

const ConfirmGenerationForm = () => {
  return (
    <div className="border rounded-lg bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-10 max-w-full mx-auto w-full">
      <div className="border rounded-lg px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col gap-8">
        <div>
          <h2 className="text-black text-2xl sm:text-3xl font-medium">
            Final Check Before Generating
          </h2>
          <p className="text-cGray text-base sm:text-lg font-medium mt-2">
            Make sure everything’s good to go — these quick tips help you get
            the best result.
          </p>
        </div>

        {/* Preview Voiceover */}
        <div className="p-4 sm:p-5 flex flex-col gap-4 bg-gray-50 rounded-lg">
          <p className="text-black text-lg font-medium">Preview Voiceover</p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 rounded-full overflow-hidden">
                <Image
                  src={womanKitchen}
                  className="h-full w-full rounded-full"
                  fill
                  alt="Voiceover"
                />
              </div>
              <div>
                <p className="text-black text-base sm:text-lg font-medium">
                  Violet (Default)
                </p>
                <p className="text-cGray text-sm sm:text-base font-medium">
                  Text to Speech Mode
                </p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center self-start sm:self-auto">
              <Play size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-full w-[40%]" />
            </div>
            <span className="text-sm w-10 text-right">0:10</span>
            <button className="text-gray-600 hover:text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Rules */}
        <div className="flex flex-col gap-4">
          {privacyPolicyRules.map((rule, index) => (
            <div
              key={index}
              className="border border-cGray/30 p-4 sm:p-5 bg-[#FBFBFB] flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg"
            >
              <div className="bg-cOrange w-2.5 h-2.5 rounded-full mt-1 sm:mt-0" />
              <div className="flex flex-col gap-1.5 items-start">
                <h2 className="text-black font-medium text-base sm:text-xl">
                  {rule.title}
                </h2>
                <p className="text-cGray text-sm">{rule.subTitle}</p>
                <button className="text-base font-medium text-cOrange underline w-fit">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Credits */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-black text-center">
          💳 This generation will use 1 Credit. You have 10 Credits left.
        </h2>
      </div>
    </div>
  );
};

export default ConfirmGenerationForm;
