"use client";

import Button from "@/components/button";
import DashboardLayout from "@/components/dashboard-layout";
import FaqSection from "@/components/faq-section";
import PricingCard from "@/components/pricing-card";
import { ArrowRight } from "lucide-react";

const planDataPrice = [
  {
    type: "Starter Plan",
    price: "$29",
    period: "/ Month",
    description:
      "Perfect for brands trying AI-powered content for the first time.",
    benfits: [
      "Generate 10 UGC Videos per month",
      "Generate AI avatars (25 images, 5 videos)",
      "Access 20+ Default Avatars",
      "Unlimited Hook Generations",
      "Add background music to ads",
    ],
  },
  {
    type: "Growth Plan",
    price: "$59",
    period: "/ Month",
    description:
      "Ideal for scaling brands that need consistent creative output.",
    benfits: [
      "Generate 40 UGC Videos per month",
      "Generate AI avatars (40 images, 10 videos)",
      "Access 20+ Default Avatars",
      "Unlimited Hook Generations",
      "Add background music to ads",
    ],
    banner: true,
  },
  {
    type: "Scale Plan",
    price: "$99",
    period: "/ Month",
    description:
      "Built for agencies and content-heavy brands with high demand.",
    benfits: [
      "Generate 150 UGC Videos per month",
      "Generate AI avatars (100 images, 30 videos)",
      "Access 20+ Default Avatars",
      "Unlimited Hook Generations",
      "Add background music to ads",
      "Priority Support",
    ],
  },
];

const SettingsPage = () => {
  return (
    <DashboardLayout label={"Settings"}>
      <div className="flex flex-col items-center gap-10 space-y-4 sm:gap-14 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
            Create More, Spend Less with AI-Powered UGC
          </h2>
          <p className="text-base sm:text-lg font-normal text-black max-w-2xl">
            Choose a plan to create animated avatars, catchy hook videos, and
            swipe-stopping UGC ads — all in one place.
          </p>
          <div className="w-fit">
            <Button
              label={"Learn More"}
              icon={<ArrowRight width={20} height={20} />}
              className={"gap-2"}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {planDataPrice.map((item, index) => (
            <PricingCard key={index} {...item} />
          ))}
        </div>

        <FaqSection />
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
