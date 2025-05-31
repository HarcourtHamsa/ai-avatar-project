import { useState } from "react";
import Input from "./input";
import Button from "./button";

const SUPPORTED_PLATFORMS = [
  "Facebook",
  "Instagram Reels",
  "YouTube Shorts",
  "TikTok",
];

const VideoSetupStep = () => {
  const [formData, setFormData] = useState({
    adName: "",
    adGoal: "",
  });

  const [selectedPlatform, setSelectedPlatform] = useState(
    SUPPORTED_PLATFORMS[0]
  );
  const [product, setProduct] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg bg-white min-h-[60vh] h-fit">
      <div className="max-w-lg mx-auto">
        <div className="space-y-4 py-8">
          <Input
            label="Name of your Ad"
            name="adName"
            type="text"
            value={formData.adName}
            onChange={handleChange}
            required
          />

          <div>
            <label htmlFor="adGoal" className="block  mb-1">
              What's the goal of this Ad?
            </label>
            <textarea
              className="w-full p-2 border rounded-md outline-cOrange focus:outline-none focus:ring-2 focus:ring-cOrange"
              name="adGoal"
              rows="4"
              placeholder="Describe your ad goal"
              value={formData.adGoal}
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex flex-col gap-2.5">
            <h2 className="text-black font-medium ">Target Platform ?</h2>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2.5 w-full">
              {SUPPORTED_PLATFORMS.map((platform, index) => (
                <div
                  onClick={() => setSelectedPlatform(platform)}
                  key={index}
                  tabIndex={0}
                  className={`w-fit ${
                    selectedPlatform === platform ? "bg-cOrange" : "border "
                  } rounded-xl py-2 px-4 flex items-center gap-2.5 cursor-pointer`}
                >
                  <div
                    className={`${
                      selectedPlatform === platform ? "bg-white" : "border"
                    } h-4 w-4 rounded-full`}
                  />
                  <p
                    className={`${
                      selectedPlatform === platform
                        ? "text-white"
                        : "text-cGray"
                    } font-medium `}
                  >
                    {platform}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Input
            label="Product (optional)"
            name="product"
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <div className="mt-8">
            <Button label={"Save Changes"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSetupStep;
