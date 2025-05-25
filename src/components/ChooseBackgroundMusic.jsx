import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ChooseBackgroundMusic = ({ onClose }) => {
  const [isGeneratedHook, setIsGeneratedHook] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-50 bg-white max-w-3xl w-full mx-4 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-black text-center">
            Choose Background Music
          </h3>
        <div className="w-full mt-10 flex items-center gap-2 flex-wrap">
            {Array.from({length:12}).map((_,index)=>(
            <button key={index} className="flex-1 border border-cGray/30 bg-white py-5 px-4 rounded-lg flex items-center justify-between gap-5">
                <div className="w-12 h-12 rounded-full border border-cGray"></div>
                <div className="text-right">
                    <h5 className="text-black text-base font-medium">American Boy</h5>
                    <p className="text-black text-base font-normal">Voyage</p>
                </div>
            </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseBackgroundMusic;
