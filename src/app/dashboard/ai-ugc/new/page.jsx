"use client";

import { useState } from "react";

import DashboardLayout from "@/components/dashboard-layout";
import Button from "@/components/button";
import AiAvatarFormStep from "@/components/avatar-form-step";
import AvatarSelectionStep from "@/components/avatar-selection-form";
import AnimateAvatarStep from "@/components/animate-avatar-form";
import HookDemoBuilderForm from "@/components/hook-demo-builder-form";

const STEPS = [
  { id: 0, label: "Avatar Selection" },
  { id: 1, label: "Animate Avatar" },
  { id: 2, label: "Hook + Demo Builder" },
];

const Page = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  return (
    <DashboardLayout label="Create New AI Ad">
      <AiAvatarFormStep currentStep={currentStep} steps={STEPS} />

      {currentStep === 0 && <AvatarSelectionStep />}
      {currentStep === 1 && <AnimateAvatarStep />}
      {currentStep === 2 && <HookDemoBuilderForm />}  

      <div className="flex justify-between mt-8">
        <div className="w-fit">
          <Button label="Save Draft" theme="secondary" />
        </div>
        <div className="w-fit">
          <Button label="Next" onClick={handleNext} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
