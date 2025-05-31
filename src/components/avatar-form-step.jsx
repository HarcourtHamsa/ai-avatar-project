"use client";

import clsx from "clsx";
import { BadgeCheck } from "lucide-react";

const AiAvatarFormStep = ({ currentStep, steps }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {steps.map((step, index) => {
        const currentIndex = steps.findIndex((s) => s.id === currentStep);
        const isActive = index <= currentIndex;

        return (
          <div
            key={step.id}
            className={clsx(
              "text-sm w-full",
              isActive ? "text-cOrange" : "text-gray-500"
            )}
          >
            <div className="flex gap-2 mb-2 items-center">
              <BadgeCheck />
              <span className="text-sm line-clamp-1">{step.label}</span>
            </div>
            <div
              className={clsx(
                "w-full h-2 rounded-full",
                isActive ? "bg-cOrange" : "bg-gray-300"
              )}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default AiAvatarFormStep;
