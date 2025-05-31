"use client";

import Button from "@/components/button";
import ComparePlans from "@/components/compare-plans";
import DashboardLayout from "@/components/dashboard-layout";
import FaqSection from "@/components/faq-section";
import LastPricingCard from "@/components/last-pricing-card";
import PricingCard from "@/components/pricing-card";
import { ArrowRight } from "lucide-react";

const planDataPrice = [
  {
    type: "Basic Plan",
    price: "FREE",
    period: "/ 7 Days",
    description: "Then $99/month",
    benfits: [
      "Creator Marketplace Access",
      "Priority Support",
      "10 AI Videos / Month",
      "Generate 1 Custom AI Actor",
      "Access 300+ Natural AI Actors",
      "2 Minute Wait Time",
      "AI Reactions",
      "Use 35 Languages",
      "Play Videos Up To 90 Seconds",
    ],
  },
  {
    type: "Starter Plan",
    price: "$170",
    period: "/ Month",
    description:
      "Perfect for brands trying AI-powered content for the first time.",
    benfits: [
      "Creator Marketplace Access",
      "10 AI Videos / Month",
      "Generate 1 Custom AI Actor",
      "Access 300+ Natural AI Actors",
      "2 Minute Wait Time",
      "AI Reactions",
      "Use 35 Languages",
      "Play Videos Up To 90 Seconds",
      "Priority Support",
    ],
    banner: true,
  },
  {
    type: "Growth Plan",
    price: "$340",
    period: "/ Month",
    description:
      "Ideal for scaling brands that need consistent creative output.",
    benfits: [
      "Creator Marketplace Access",
      "10 AI Videos / Month",
      "Generate 1 Custom AI Actor",
      "Access 300+ Natural AI Actors",
      "2 Minute Wait Time",
      "AI Reactions",
      "Use 35 Languages",
      "Play Videos Up To 90 Seconds",
      "Priority Support",
    ],
  },
  {
    type: "Scale Plan",
    price: "Custom",
    description:
      "Built for agencies and content-heavy brands with high demand.",
    benfits: [
      "Creator Marketplace Access",
      "10 AI Videos / Month",
      "Generate 1 Custom AI Actor",
      "Access 300+ Natural AI Actors",
      "2 Minute Wait Time",
      "AI Reactions",
      "Use 35 Languages",
      "Play Videos Up To 90 Seconds",
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
          {planDataPrice.slice(0, 3).map((item, index) => (
            <PricingCard key={index} {...item} />
          ))}
        </div>

        <LastPricingCard item={planDataPrice[3]} />

        <ComparePlans />
        {/* <FaqSection /> */}
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
