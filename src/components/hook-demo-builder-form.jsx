"use client";

import React, { useState } from "react";
import Button from "./button";
import GenerateHookModal from "./generate-hook-modal";
import ChooseBackgroundMusic from "./choose-background-music";
import { useRouter } from "next/navigation";
import Input from "./input";
import Spinner from "./spinner";
import SwitchToggle from "./switch-toggle";
import { PlusCircle } from "lucide-react";

const hookPlacementData = ["Top", "Center", "Bottom"];

const HookDemoBuilderForm = ({ isGeneratingVideo, setIsGeneratingVideo }) => {
  const router = useRouter();
  const [selectedHookPlacement, setSelectedHookPlacement] = useState("Center");
  const [openGenerateHookModal, setOpenGenerateHookModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(
    "https://res.cloudinary.com/dgn6edv1k/video/upload/v1741272463/samples/cld-sample-video.mp4"
  );
  const [isEnabled, setIsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    adTitle: "",
  });

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    setTimeout(() => {
      router.push("/dashboard/ai-ugc");
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="border rounded-lg bg-white h-full px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        {isGeneratingVideo ? (
          <div className="min-h-[500px] flex flex-col items-center gap-6">
            <Spinner color="text-cOrange" size={200} />
            <h2 className="text-3xl font-medium text-black text-center">
              Generating Video
            </h2>
          </div>
        ) : (
          <div className="border rounded-lg h-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 flex flex-col lg:flex-row items-start justify-between w-full gap-10 lg:gap-12">
            {/* LEFT FORM */}
            <div className="flex-1 w-full flex flex-col gap-5 h-full">
              <Input
                label="1. Ad Title"
                name="adTitle"
                type="text"
                value={formData.adTitle}
                onChange={handleChange}
                required
              />

              {/* Hook Input */}
              <div className="w-full flex flex-col gap-2.5">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-black font-medium text-sm">2. Hook</h2>
                  <button
                    onClick={() => setOpenGenerateHookModal(true)}
                    className="text-cOrange text-sm font-medium"
                  >
                    Generate Hook
                  </button>
                </div>
                <textarea
                  className="bg-white text-cGray border py-2 px-3 rounded-lg w-full h-28 text-sm"
                  placeholder="Type an Attention Grabbing Hook that will show on the Avatar"
                />
              </div>

              {/* Hook Placement */}
              <div className="w-full flex flex-col gap-2.5">
                <h2 className="text-black font-medium text-sm">
                  3. Hook Placement
                </h2>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2.5 w-full">
                  {hookPlacementData.map((placement, index) => (
                    <button
                      onClick={() => setSelectedHookPlacement(placement)}
                      key={index}
                      className={`w-fit ${
                        selectedHookPlacement === placement
                          ? "bg-cOrange"
                          : "border "
                      } rounded-xl py-2 px-4 flex items-center gap-2.5`}
                    >
                      <div
                        className={`${
                          selectedHookPlacement === placement
                            ? "bg-white"
                            : "border"
                        } h-4 w-4 rounded-full`}
                      />
                      <p
                        className={`${
                          selectedHookPlacement === placement
                            ? "text-white"
                            : "text-cGray"
                        } font-medium text-sm`}
                      >
                        {placement}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Demo Video Uploads */}
              <div className="w-full flex flex-col gap-2.5 h-fit">
                <h2 className="text-black font-medium text-sm">
                  4. Demo Video
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 h-full gap-2 w-full">
                  {[1].map((_, idx) => (
                    <div
                      key={idx}
                      className="flex-1 border border-cGray/30 rounded-xl h-36 sm:h-48 flex flex-col items-center justify-center cursor-pointer px-2"
                    >
                      <PlusCircle className="text-gray mb-2" />
                      <p className="text-sm text-center text-cGray font-medium">
                        Upload Demo Video
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Music */}
              <div className="w-full flex flex-col gap-2.5">
                <h2 className="text-black font-medium text-sm">
                  5. Background Music{" "}
                  <span className="text-cGray">(Optional)</span>
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-cGray font-medium text-sm">
                    Add Background Music to video?
                  </h2>
                  <SwitchToggle
                    enabled={isEnabled}
                    onToggle={() => setIsEnabled(!isEnabled)}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT PREVIEW PANEL */}
            <div className="md:flex-1 h-[350px] w-[80%] md:w-inherit md:h-[550px] bg-red-500 border-4 border-cOrange rounded-xl flex items-center justify-center">
              <video
                src={videoUrl}
                autoPlay
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {openGenerateHookModal && (
        <GenerateHookModal onClose={() => setOpenGenerateHookModal(false)} />
      )}
      {isEnabled && (
        <ChooseBackgroundMusic onClose={() => setIsEnabled(false)} />
      )}
    </div>
  );
};

export default HookDemoBuilderForm;
