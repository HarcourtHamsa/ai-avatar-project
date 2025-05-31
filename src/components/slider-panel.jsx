"use client";

import { useState } from "react";
import "../styles/slider.css";
import { InfoIcon } from "lucide-react";
import { ICON_SIZE } from "@/constants";

const SliderPanel = () => {
  const [speed, setSpeed] = useState(1);
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(1);
  const [styleExaggeration, setStyleExaggeration] = useState(0);

  const renderSlider = (
    label,
    value,
    onChange,
    min = 0,
    max = 1,
    step = 0.01
  ) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return (
      <div className="mb-5">
        <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 mb-1">
          <span>{label}</span>
          <div className="flex items-center gap-2.5">
            <InfoIcon size={ICON_SIZE - 5} color="#667085" />
            {label === "Speed" && (
              <span className="text-xs text-cGray bg-[#F2F2F2] px-2 py-1 rounded-full">
                {min} - {max}
              </span>
            )}
          </div>
        </label>
        <input
          type="range"
          className="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          style={{ "--progress": `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <div className="w-full p-4 border rounded-md shadow-sm">
      {renderSlider("Speed", speed, setSpeed, 0.5, 1.5, 0.01)}
      {renderSlider("Stability", stability, setStability)}
      {renderSlider("Similarity", similarity, setSimilarity)}
      {renderSlider(
        "Style Exaggeration",
        styleExaggeration,
        setStyleExaggeration
      )}
    </div>
  );
};

export default SliderPanel;
