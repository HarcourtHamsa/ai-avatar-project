"use client";

import { CheckCircle, CheckCircle2, XCircle } from "lucide-react";
import Button from "./button";

const plans = [
  {
    name: "Basic Plan",
    price: "FREE",
    period: "/ 7 Days",
    buttonText: "Start Free Trial",
    features: {
      projectCampaigns: true,
      contests: true,
      messaging: true,
      aiVideos: false,
      customActor: false,
      naturalActors: false,
      reactions: false,
      videoLength: false,
    },
  },
  {
    name: "Starter Plan",
    price: "$170",
    period: "/ Month",
    buttonText: "Buy Now",
    features: {
      projectCampaigns: true,
      contests: true,
      messaging: true,
      aiVideos: "10 Videos",
      customActor: "1 Actor",
      naturalActors: "300 Actors",
      reactions: true,
      videoLength: "Up to 90 Secs",
    },
  },
  {
    name: "Growth Plan",
    price: "$340",
    period: "/ Month",
    buttonText: "Buy Now",
    features: {
      projectCampaigns: true,
      contests: true,
      messaging: true,
      aiVideos: "20 Videos",
      customActor: "3 Actor",
      naturalActors: "300 Actors",
      reactions: true,
      videoLength: "Up to 90 Secs",
    },
  },
  {
    name: "Scale Plan",
    price: "Custom",
    period: "",
    buttonText: "Contact Us",
    features: {
      projectCampaigns: true,
      contests: true,
      messaging: true,
      aiVideos: "Unlimited Videos",
      customActor: "Unlimited Actors",
      naturalActors: "300 Actors",
      reactions: true,
      videoLength: "Up to 90 Secs",
    },
  },
];

const featureTitles = [
  { key: "projectCampaigns", label: "Project Campaigns" },
  { key: "contests", label: "Contests (Coming Soon)" },
  { key: "messaging", label: "Messaging & Content Review" },
  { key: "aiVideos", label: "AI Videos/Month" },
  { key: "customActor", label: "Custom AI Actor" },
  { key: "naturalActors", label: "Natural AI Actors" },
  { key: "reactions", label: "AI Reactions" },
  { key: "videoLength", label: "Video Length" },
];

const ComparePlans = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-3 text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
          Compare Plans & Features
        </h2>
        <p className="text-base sm:text-lg font-normal text-black max-w-2xl">
          See what’s included in each plan to find the best fit for your brand’s
          UGC strategy.
        </p>
      </div>

      <div className="overflow-x-auto border border-[#6670854D] rounded-xl py-4 px-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-left font-medium text-gray-700 py-3"> </th>
              {plans.map((plan, idx) => (
                <th
                  key={idx}
                  className="text-center px-4 py-3 font-semibold text-black"
                >
                  <div className="bg-white w-fit border border-[#D5D7DA] py-0.5 px-2 gap-1.5 rounded-md flex items-center">
                    <div className="border-4 border-[#F4EBFF] h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-cOrange" />
                    <p className="text-[#414651] font-medium text-xs sm:text-sm">
                      {plan?.name}
                    </p>
                  </div>
                  <div className="text-5xl font-medium mt-1">{plan.price}</div>
                  <div className="text-xl font-medium text-gray-500 mb-4">
                    {plan.period}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <h3 className="text-cGray text-base font-medium">
              Creator Marketplace Access
            </h3>
            {featureTitles.slice(0, 3).map((feature) => (
              <tr key={feature.key} className="">
                <td className="py-3 font-medium text-[#1A1A1A]">
                  {feature.label}
                </td>
                {plans.map((plan, idx) => {
                  const value = plan.features[feature.key];
                  return (
                    <td key={idx} className="text-center py-3">
                      {value ? (
                        value ? (
                          <CheckCircle2 className="w-5 h-5 text-orange-600 inline-block" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400 inline-block" />
                        )
                      ) : (
                        <span className="text-gray-800">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <h3 className="text-cGray text-base font-medium mt-7">AI VIDEOS</h3>
            {featureTitles.slice(3).map((feature) => (
              <tr key={feature.key} className="">
                <td className="py-3 font-medium text-[#1A1A1A]">
                  {feature.label}
                </td>
                {plans.map((plan, idx) => {
                  const value = plan.features[feature.key];
                  return (
                    <td key={idx} className="text-center py-3">
                      {typeof value === "boolean" ? (
                        value ? (
                          <CheckCircle className="w-5 h-5 text-orange-600 inline-block" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400 inline-block" />
                        )
                      ) : (
                        <span className="text-gray-800">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="">
              <td> </td>
              {plans.map((plan, idx) => (
                <td key={idx} className="text-center py-4">
                  <Button label={plan.buttonText} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePlans;
