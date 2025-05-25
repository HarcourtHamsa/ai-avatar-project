"use client";
import Button from "@/components/button";
import ChooseBackgroundMusic from "@/components/ChooseBackgroundMusic";
import DashboardLayout from "@/components/dashboard-layout";
import GenerateHookModal from "@/components/GenerateHookModal";
import Input from "@/components/input";
import Spinner from "@/components/spinner";
import SwitchToggle from "@/components/SwitchToggle";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const hookPlacementData = ["Top", "Center", "Bottom"];

const HookDemoBuilderPage = () => {
    const router = useRouter()
  const [selectedHookPlacement, setSelectedHookPlacement] = useState("Center");
  const [openGenerateHookModal,setOpenGenerateHookModal] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false);
  const [isGeneratingVideo,setIsGeneratingVideo] = useState(false)
  const [formData, setFormData] = useState({
    adTitle: "",
  });

  const handleGenerateVideo = ()=>{
    setIsGeneratingVideo(true)

    setTimeout(()=>{
        router.push("/dashboard/ai-ugc")
    },5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <DashboardLayout label="Create New AI Ad">
      <div className="border border-cOrange rounded-lg bg-white h-full px-8 py-10">
        
      {isGeneratingVideo && <div className="min-h-[500px] flex flex-col items-center gap-6">
        <Spinner color="text-cOrange" size={200} />
        <h2 className="text-3xl font-medium text-black text-center">Generating Video</h2>
        </div>}

       {!isGeneratingVideo && <div className="border rounded-lg h-full px-8 py-10 flex items-start justify-between w-full gap-12">
          <div className="flex-1 w-full flex flex-col gap-5 h-full">
            <Input
              label="1. Ad Title"
              name="adTitle"
              type="text"
              value={formData.adTitle}
              onChange={handleChange}
              required
            />
            <div className="w-full flex flex-col gap-2.5">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-black font-medium text-sm">2. Hook</h2>
                <button onClick={()=>setOpenGenerateHookModal(true)} className="text-cOrange text-sm font-medium">
                  Generate Hook
                </button>
              </div>
              <textarea
                className="bg-white text-cGray border py-2 px-3 rounded-lg w-full h-28 text-sm"
                placeholder="Type an Attention Grabbing Hook that will show on the Avatar"
              />
            </div>
            <div className="w-full flex flex-col gap-2.5">
              <h2 className="text-black font-medium text-sm">
                3.Hook Placement
              </h2>
              <div className="flex items-center gap-2.5 w-full">
                {hookPlacementData.map((placement, index) => (
                  <button
                    onClick={() => setSelectedHookPlacement(placement)}
                    key={index}
                    className={`w-fit ${
                      selectedHookPlacement === placement
                        ? "bg-cOrange"
                        : "border border-cGray"
                    } rounded-xl py-2 px-4 flex items-center gap-2.5`}
                  >
                    <div
                      className={` ${
                        selectedHookPlacement === placement
                          ? "bg-white"
                          : "border border-cGray"
                      } h-4 w-4 rounded-full`}
                    />
                    <p
                      className={`${
                        selectedHookPlacement === placement
                          ? "text-white"
                          : "text-cGray"
                      } font-medium text-sm `}
                    >
                      {placement}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col gap-2.5 h-72">
              <h2 className="text-black font-medium text-sm">
                4. Demo Video
              </h2>

              <div className="flex items-start gap-2.5 h-full">
                <div className="flex-1 border border-cGray/30 rounded-xl h-full flex flex-col items-center justify-center">
                  <p className="text-sm text-cGray font-medium">
                    Upload Demo Video
                  </p>
                </div>
                <div className="flex-1 border border-cGray/30 rounded-xl h-full flex flex-col items-center justify-center">
                  <p className="text-sm text-cGray font-medium">
                    Upload Demo Video
                  </p>
                </div>
                <div className="flex-1 border border-cGray/30 rounded-xl h-full flex flex-col items-center justify-center">
                  <p className="text-sm text-cGray font-medium">
                    Upload Demo Video
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2.5">
              <h2 className="text-black font-medium text-sm">
                5.Background Music{" "}
                <span className="text-cGray">(Optional)</span>
              </h2>
              <div className="flex items-center gap-2">
                <h2 className="text-cGray font-medium text-sm">
                  Add Background Music to video?
                </h2>
                <SwitchToggle enabled={isEnabled} onToggle={() => setIsEnabled(!isEnabled)} />
              </div>
            </div>
          </div>
          <div className="flex-1 border-4 border-cOrange min-h-[700px] rounded-xl flex-col items-stretch justify-between"></div>
        </div>}
      </div>
     {!isGeneratingVideo && <div className="flex items-center justify-between mt-8">
        <Button
          label="Save Draft"
          theme="secondary"
          // isLoading={loading}
          type="button"
          className={"w-36"}
        />
        <Button
          label="Finalize & Export (Use 1 Credit)"
          theme="primary"
          // isLoading={loading}
          type="button"
          className={"w-fit"}
          onClick={handleGenerateVideo}
        />
      </div>}

     
  {openGenerateHookModal &&  <GenerateHookModal onClose={()=>setOpenGenerateHookModal(false)} />}
   {isEnabled && <ChooseBackgroundMusic onClose={()=>setIsEnabled(false)} />}
    </DashboardLayout>
  );
};

export default HookDemoBuilderPage;
