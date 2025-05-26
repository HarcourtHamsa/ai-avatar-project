import React from "react";
import FaqItem from "./faq-item";

const faqLists = [
  {
    question: "What’s the difference between an AI Avatar and a UGC Ad Video?",
    answer: `An AI Avatar is a short, AI-generated video with subtle facial movements. It doesn’t speak — your hook text appears on screen while the avatar grabs attention.
A UGC Video combines that avatar intro with a real product demo, creating an ad that feels both authentic and polished.`,
  },
  {
    question: "Do I have to use an AI Avatar to create a UGC Ad?",
    answer: `Yes — all UGC ads start by selecting or creating an AI Avatar. It helps personalize your ads and makes them feel natural for platforms like TikTok.`,
  },
  {
    question: "What happens if I use up all my avatar or ad credits?",
    answer: `You can easily purchase additional credits or upgrade your plan at any time from your dashboard.`,
  },
  {
    question: "How long are the AI Avatar videos?",
    answer: `AI Avatars are typically short, around 3–6 seconds, designed to capture attention quickly while blending into social media feeds.`,
  },
  {
    question: "Can I upload my own photos to create avatars?",
    answer: `Yes! You can upload a clear, front-facing image and animate it into a video avatar. We also offer a gallery of pre-generated avatars if you prefer.`,
  },
  {
    question: "Can I download the videos I create?",
    answer: `Absolutely. All generated avatars and Hook + Demo ads can be downloaded and used in your marketing campaigns across platforms.`,
  },
  {
    question: "Are unused credits rolled over to the next month?",
    answer: `No — credits reset every month based on your plan. We recommend using all your available credits to maximize your subscription!`,
  },
];

const FaqSection = () => {
  return (
    <div className="mt-14 border bg-white rounded-lg w-full py-10 px-4 sm:px-8">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-black text-center sm:text-left">
        Frequently Asked Questions
      </h2>

      <div className="w-full mt-8 flex flex-col gap-6">
        {faqLists.map((faq, index) => (
          <FaqItem key={index} isFirst={index === 0} {...faq} />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
