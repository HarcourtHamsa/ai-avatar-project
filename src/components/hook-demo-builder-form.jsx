"use client";

import React, { useState } from "react";
import Button from "./button";
import GenerateHookModal from "./generate-hook-modal";
import ChooseBackgroundMusic from "./choose-background-music";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";
import SwitchToggle from "./switch-toggle";
import { Mic, Play, Plus, Users, WandSparkles } from "lucide-react";
import TagButton from "./tag-button";
import { ICON_SIZE } from "@/constants";
import SliderPanel from "./slider-panel";
import womanKitchen from "../assets/img/woman-kitchen.png";
import Image from "next/image";
import AudioPlayer from "./audio-player";
import { useGenerateVeoContent } from "@/app/hooks/use-generate-veo-content";
import PercentageLoader from "./percentage-loader";

const hookPlacementData = ["Top", "Center", "Bottom"];

const tagList = ["Text to Speech", "Speech to Speech"];

const HookDemoBuilderForm = ({ isGeneratingVideo, setIsGeneratingVideo }) => {
  const router = useRouter();
  const [selectedHookPlacement, setSelectedHookPlacement] = useState("Center");
  const [openGenerateHookModal, setOpenGenerateHookModal] = useState(false);
  const [showPercentageLoader, setShowPercentageLoader] = useState(false);
  const [activeTag, setActiveTag] = useState("Text to Speech");
  const [videoUrl, setVideoUrl] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const { isPending, error, isError, mutate } = useGenerateVeoContent({
    onMutate: () => {
      setShowPercentageLoader(true);
    },
    onSuccess: (data) => {
      setShowPercentageLoader(false);
      setVideoUrl(data.data.video_url);
    },
    onError: () => {
      setShowPercentageLoader(false);
    },
  });

  const handleGenerateVideo = () => {
    const payload = {
      instances: [
        {
          prompt: formData.prompt,
          image: {
            gcsUri:
              "https://res.cloudinary.com/deqfgp7hg/image/upload/v1748821458/avatar/man/pkdu5dqqroeblqf2hdek.jpg",
            mimeType: "string",
          },
        },
      ],
      parameters: {
        aspectRatio: "9:16",
        durationSeconds: 20,
      },
    };

    mutate(payload);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePercentageComplete = () => {
    console.log("dONE");
  };

  return (
    <div>
      <div className="border rounded-lg bg-white h-full px-4 sm:px-6 md:px-7 py-8 sm:py-7">
        {isGeneratingVideo ? (
          <div className="min-h-[500px] flex flex-col items-center gap-6">
            <Spinner color="text-cOrange" size={200} />
            <h2 className="text-3xl font-medium text-black text-center">
              Generating Video
            </h2>
          </div>
        ) : (
          <div className="border rounded-lg h-full px-4 sm:px-6 md:px-6 py-4 sm:py-6 flex flex-col lg:flex-row items-start justify-between w-full gap-10 lg:gap-12">
            {/* LEFT FORM */}
            <div
              style={{ flex: 2 }}
              className="w-full flex flex-col gap-5 h-full"
            >
              <TagButton
                list={tagList}
                handleChange={setActiveTag}
                active={activeTag}
              />

              {/* Hook Input */}
              {activeTag === "Text to Speech" && (
                <div className="w-full flex flex-col gap-2.5">
                  <h2 className="text-black font-medium text-sm sm:text-base">
                    Video Script
                  </h2>

                  <textarea
                    className="bg-white text-cGray border border-gray-300 py-2 px-3 rounded-lg w-full h-28 text-sm sm:text-base"
                    placeholder="Eg. Girl blinking, slight head movement, camera shake."
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                  />

                  {isError && (
                    <p className="text-red-500 text-sm">
                      {error?.response?.data?.message}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 sm:gap-0">
                    <p className="text-[#475467] text-sm sm:text-base font-normal">
                      Max. 2000 Chars
                    </p>

                    <div className="w-fit">
                      <Button
                        label="Generate Script"
                        icon={<WandSparkles size={20} color="white" />}
                        theme="pink"
                        onClick={handleGenerateVideo}
                        isLoading={isPending}
                        disabled={isPending}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTag === "Speech to Speech" && (
                <div className="flex flex-col gap-5">
                  <div className="w-full flex flex-col gap-2.5">
                    <h2 className="text-black font-medium text-sm">Product</h2>
                    <div className="h-11 flex items-center gap-2.5">
                      <select
                        className="bg-white border border-[#D0D5DD] rounded-lg flex-1 h-full text-cGray text-base font-normal px-4"
                        name=""
                        id=""
                      >
                        <option value="">Select a Saved Product</option>
                      </select>
                      <button
                        onClick={() => setOpenGenerateHookModal(true)}
                        className="h-full w-11 border border-cGray/30 rounded-lg flex items-center justify-center"
                      >
                        <Plus color="#667085" size={ICON_SIZE} />
                      </button>
                    </div>
                  </div>

                  <div className="border border-cGray/30 w-full p-4 sm:p-5 rounded-lg">
                    <div className="flex flex-col gap-3 sm:gap-2.5">
                      <h2 className="text-black font-medium text-sm sm:text-base">
                        Record or Upload your Voice
                      </h2>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 w-full">
                        <button className="bg-cOrange py-2.5 px-4 rounded-lg w-full sm:flex-1 h-11 flex items-center justify-center gap-2.5">
                          <Mic size={ICON_SIZE} color="#fff" />
                          <p className="text-white text-sm sm:text-base font-medium">
                            Start Recording
                          </p>
                        </button>

                        <p className="text-cGray text-sm sm:text-base font-medium text-center sm:text-left">
                          -OR-
                        </p>

                        <button className="border border-cGray/30 py-2.5 px-4 rounded-lg w-full sm:flex-1 h-11 flex items-center justify-center gap-2.5">
                          <Mic size={ICON_SIZE} color="#667085" />
                          <p className="text-cGray text-sm sm:text-base font-medium">
                            Upload Audio
                          </p>
                        </button>
                      </div>

                      <AudioPlayer src={"../assets/audio/sample.mp3"} />
                    </div>
                  </div>
                </div>
              )}

              <div className="border border-[#6670854D] p-5 rounded-lg">
                {activeTag === "Text to Speech" && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-4 sm:h-14">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden mx-auto sm:mx-0">
                      <Image
                        src={womanKitchen}
                        className="h-full w-full rounded-full object-cover"
                        fill
                        alt="Voiceover"
                      />
                    </div>

                    <select
                      className="bg-white border border-[#D0D5DD] rounded-lg w-full sm:w-56 h-12 sm:h-full text-cGray text-sm sm:text-base font-normal px-4"
                      name=""
                      id=""
                    >
                      <option value="">Violet (Default)</option>
                    </select>

                    <button className="bg-cOrange w-11 h-11 rounded-full flex items-center justify-center self-center sm:self-auto">
                      <Play size={ICON_SIZE + 4} color="white" />
                    </button>
                  </div>
                )}

                <SliderPanel />
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
            <div className="w-full md:flex-1  md:max-w-full mx-auto">
              {showPercentageLoader ? (
                <div className="flex flex-col items-center justify-center">
                  <PercentageLoader
                    isActive={true}
                    onComplete={handlePercentageComplete}
                    duration={160000}
                  />
                </div>
              ) : (
                <div>
                  <div className="h-[250px] sm:h-[350px] md:h-[550px] bg-red-500 border-4 border-cOrange rounded-xl flex items-center justify-center">
                    <video
                      src={videoUrl}
                      autoPlay
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center mt-6 w-full">
                    <div className="flex items-center justify-between w-full text-sm sm:text-base">
                      <p className="text-black">Violet</p>
                      <span className="text-xs text-cGray bg-[#F2F2F2] px-2 py-1 rounded-full">
                        HD
                      </span>
                    </div>

                    <button className="flex items-center gap-2.5 bg-cBlack text-white font-medium text-base sm:text-lg rounded-lg px-5 sm:px-6 py-2 sm:py-2.5 mt-4 w-full sm:w-auto justify-center">
                      <p>Change Avatar</p>
                      <Users size={20} />
                    </button>
                  </div>
                </div>
              )}
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
