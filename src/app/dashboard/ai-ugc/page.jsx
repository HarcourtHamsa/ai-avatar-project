"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { useState } from "react";
import clsx from "clsx";
import { BadgeCheck, CheckCircle, CloudUpload, X } from "lucide-react";
import { ICON_SIZE } from "@/constants";
import Input from "@/components/input";
import Button from "@/components/button";
import AiAvatarFormStep from "@/components/avatar-form-step";
import AvatarSelectionStep from "@/components/avatar-selection-form";
import AnimateAvatarStep from "@/components/animate-avatar-form";
import HookDemoBuilderForm from "@/components/hook-demo-builder-form";

const STEPS = [
  {
    id: 0,
    label: "Avatar Selection",
  },
  {
    id: 1,
    label: "Animate Avatar",
  },
  {
    id: 2,
    label: "Hook + Demo Builder",
  },
];

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneratingVideo,setIsGeneratingVideo] = useState(false)

  const handleSubmit = ()=>{
    if(currentStep === STEPS.length - 1){
      setIsGeneratingVideo(true)

      setTimeout(()=>{
        setCurrentStep(0)
        setIsGeneratingVideo(false)
    },5000)
    }else{
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))

    }
  }

  return (
    <DashboardLayout label="Create New AI Ad">
      {/* TODO: Implement steps here */}
      <AiAvatarFormStep currentStep={currentStep} steps={STEPS} />

      {currentStep === 0 && <AvatarSelectionStep />}
      {currentStep === 1 && <AnimateAvatarStep />}
      {currentStep === 2 && <HookDemoBuilderForm setIsGeneratingVideo={setIsGeneratingVideo} isGeneratingVideo={isGeneratingVideo} />}

     {!isGeneratingVideo && <div className="flex justify-between mt-8">
        <div className="w-fit">
          <Button label={"Save Draft"} theme="secondary" />
        </div>

        <div className="w-fit">
          {/* Next step */}
          <Button
            label={ currentStep === STEPS.length - 1 ? "Finalize & Export (Use 1 Credit)" : "Next"}
            onClick={handleSubmit
            }
          />
        </div>
      </div>}
    </DashboardLayout>
  );
};

export default Page;
