import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ChooseBackgroundMusic = ({ onClose }) => {
  const [isGeneratedHook, setIsGeneratedHook] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-50 bg-white w-full max-w-3xl rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl sm:text-2xl font-bold text-black text-center">
          Choose Background Music
        </h3>

        <div className="w-full mt-10 flex flex-wrap gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <button
              key={index}
              className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)] border border-cGray/30 bg-white py-5 px-4 rounded-lg flex items-center justify-between gap-5 min-w-0"
            >
              <div className="w-12 h-12 rounded-full border border-cGray shrink-0" />
              <div className="text-right truncate">
                <h5 className="text-black text-base font-medium truncate">
                  American Boy
                </h5>
                <p className="text-gray-400 text-sm font-normal truncate">
                  Voyage
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseBackgroundMusic;
