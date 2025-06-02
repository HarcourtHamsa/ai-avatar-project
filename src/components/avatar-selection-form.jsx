"use client";

import { useState } from "react";
import clsx from "clsx";
import { CloudUpload, X } from "lucide-react";
import Button from "./button";
import { AvatarSource, Collections, ICON_SIZE } from "@/constants";
import Input from "./input";
import { useFetchAvatars } from "@/app/hooks/use-fetch-default-avatars";
import Image from "next/image";
import { useUploadAsset } from "@/app/hooks/use-upload-asset";
import { useFetchSavedAvatars } from "@/app/hooks/use-fetch-saved-avatars";
import { useGenerateAvatar } from "@/app/hooks/use-generate-avatar";
import PercentageLoader from "./percentage-loader"; // Import the new component
import Spinner from "./spinner";
import { extractNumber, getImageData } from "@/utils/global";
import useStore from "@/store";
import { useFirestore } from "@/app/hooks/use-firestore";
import { auth } from "@/lib/firebase";

const MAX_FILE_SIZE_MB = 2;
const PAGE_SIZE = 15;

const avatarOptions = [
  {
    label: "Default Avatars",
    description: "Select from a gallery of pre-generated avatars",
  },
  {
    label: "Upload Avatar",
    description: "Upload a selfie or face image",
  },
  {
    label: "Generate by Prompt",
    description: "Type a description to create a custom avatar",
  },
];

const AvatarSelectionStep = () => {
  const { addDocument } = useFirestore();
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGeneratedAvatars, setShowGeneratedAvatars] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [showPercentageLoader, setShowPercentageLoader] = useState(false);
  const [isProcessingWorkflow, setIsProcessingWorkflow] = useState(false);
  const [workflowError, setWorkflowError] = useState(null);

  // store
  const { preset, setPreset } = useStore();

  const { data: avatars, isLoading, isError, error } = useFetchAvatars();
  const { data: savedAvatars, isLoading: isLoadingSavedAvatars } =
    useFetchSavedAvatars();

  const {
    mutate: uploadAsset,
    isPending: isUploading,
    isSuccess: isUploadSuccess,
    isError: isUploadError,
    error: uploadError,
    data: uploadedAsset,
  } = useUploadAsset({
    onSuccess: async (data) => {
      try {
        // await addDocument(Collections.savedAvatars, {
        //   ...data.data,
        //   uid: auth.currentUser.uid,
        // });

        handleUseDefaultAvatar(data.data, AvatarSource.uploaded);

        setIsProcessingWorkflow(true);
        setWorkflowError(null);

        const result = await processAvatarWorkflow(
          data.data,
          auth.currentUser.uid
        );

        console.log("Workflow completed successfully:", result);
      } catch (error) {
        console.error("Workflow failed:", error);
        setWorkflowError(error.message);
      } finally {
        setIsProcessingWorkflow(false);
      }
    },
  });

  const {
    mutate: generateAvatar,
    isPending: isGenerating,
    isSuccess: isGenerateSuccess,
    isError: isGenerateError,
    error: generateError,
    data: generatedAvatars,
  } = useGenerateAvatar({
    onMutate: () => {
      setShowPercentageLoader(true);
    },
    onSuccess: () => {
      setShowPercentageLoader(false);
    },
    onError: () => {
      // Stop percentage loader on error
      setShowPercentageLoader(false);
      console.error("Avatar generation failed:", error.message);
    },
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil((avatars?.length || 0) / PAGE_SIZE);

  // Get current avatars
  const paginatedAvatars = avatars?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleFile = (file) => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setUploadedFile(null);
      setUploadedAvatar(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedAvatar(imageUrl);
    setUploadedFile(file);
  };

  const handleRemoveUpload = () => {
    setUploadedAvatar(null);
    setUploadedFile(null);
  };

  const handleGenerateAvatars = () => {
    generateAvatar({
      appearance: prompt,
    });
  };

  const handleUpload = () => {
    if (uploadedFile) {
      uploadAsset(uploadedFile);
    }
  };

  const handlePercentageComplete = () => {
    console.log(
      "Percentage loader completed - still waiting for generation..."
    );
  };

  const handleUseGeneratedAvatar = () => {
    const avatarIndex = extractNumber(selectedAvatar);
    const result = getImageData(generatedAvatars.data, avatarIndex);
    setPreset(result);
  };

  const handleUseDefaultAvatar = (avatar, source) => {
    setPreset({
      source: source,
      id: avatar.avatar_id || avatar.id,
      image_url: avatar.preview_image_url || avatar.url,
      image_key: avatar.image_key,
    });
  };

  // Helper function for sequential avatar processing
  const processAvatarWorkflow = async (avatarData, uid) => {
    try {
      // step 1: create photo avatar group
      // console.log("Step 1: Creating avatar group...");

      // const avatarGroupResponse = await fetch("/api/avatars/create-group", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: avatarData.name,
      //     image_key: avatarData.image_key,
      //   }),
      // });

      // if (!avatarGroupResponse.ok) {
      //   const error = await avatarGroupResponse.json();
      //   throw new Error(`avatar group step failed: ${error.message}`);
      // }

      // console.log("Avatar group response: ", avatarGroupResponse);

      // const { group_id } = avatarGroupResponse.data;

      const group_id = "930678434473480a839e4bd92996723c";

      console.log({ group_id });

      // step 2: Train avatar group
      // console.log("Step 2: Training avatar group...");

      // const trainingGroupResponse = await fetch("/api/avatars/train", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     group_id: group_id,
      //   }),
      // });

      // if (!trainingGroupResponse.ok) {
      //   const error = await trainingGroupResponse.json();
      //   throw new Error(`Training step failed: ${error.message}`);
      // }

      // console.log("Training group response: ", trainingGroupResponse);

      // TODO: test endpoints below

      // Step 3: Check training status
      console.log("Step 3: Checking training status...");

      const trainingStatusData = await pollForStatus(
        "/api/avatars/train/status",
        group_id
      );

      if (trainingStatusData.data.status !== "completed") {
        throw new Error("Training status failed");
      }

      console.log("Training status data: ", trainingStatusData.data);

      // // Step 1: Add motion to the avatar
      // console.log("Step 1: Adding motion to avatar...");

      // const motionResponse = await fetch("/api/avatars/add-motion", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: avatarData.id,
      //     prompt: "Be expressive",
      //     motion_type: "expressive",
      //   }),
      // });

      // if (!motionResponse.ok) {
      //   const error = await motionResponse.json();
      //   throw new Error(`Motion step failed: ${error.message}`);
      // }

      // const motionData = await motionResponse.json();

      // console.log("Motion step completed:", motionData);

      // // Step 2: Check motion status (with polling if needed)
      // console.log("Step 2: Checking motion status...");

      // const motionStatusData = await pollForStatus(
      //   "/api/avatars/add-motion/status",
      //   motionData.data.id
      // );

      // if (motionStatusData.data.status !== "completed") {
      //   throw new Error("Motion processing failed");
      // }

      // // Step 3: Add sound effect
      // console.log("Step 3: Adding sound effect...");
      // const soundResponse = await fetch("/api/avatars/add-sound-effect", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: motionData.data.id,
      //   }),
      // });

      // if (!soundResponse.ok) {
      //   const error = await soundResponse.json();
      //   throw new Error(`Sound effect step failed: ${error.message}`);
      // }

      // const soundData = await soundResponse.json();

      // console.log("Sound effect step completed:", soundData);

      // // Step 4: Check sound effect status
      // console.log("Step 4: Checking sound effect status...");

      // const soundStatusData = await pollForStatus(
      //   "/api/avatars/add-sound-effect/status",
      //   motionData.data.id
      // );

      // if (soundStatusData.status !== "completed") {
      //   throw new Error("Sound effect processing failed");
      // }

      // console.log("Avatar processing workflow completed successfully!");
      // return {
      //   success: true,
      //   data: {
      //     ...avatarData,
      //     motion_data: motionStatusData,
      //     sound_data: soundStatusData,
      //   },
      // };
    } catch (error) {
      console.error("Avatar processing workflow failed:", error);
      throw error;
    }
  };

  const pollForStatus = async (
    endpoint,
    id,
    maxAttempts = 30,
    interval = 60000
  ) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await fetch(`${endpoint}?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Status check failed: ${error.message}`);
        }

        const data = await response.json();

        if (data.data.status === "completed") {
          return data.data;
        } else if (data.data.status === "failed") {
          throw new Error("Processing failed on server");
        }

        // Still processing, wait before next attempt
        console.log(
          `Attempt ${attempt}: Status is ${data.data.status}, waiting...`
        );

        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, interval));
        }
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error;
        }
        console.warn(
          `Status check attempt ${attempt} failed, retrying...`,
          error
        );
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }

    throw new Error("Status polling timed out");
  };

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="px-4 py-2 border rounded-lg bg-white">
      <h1 className="text-xl md:text-2xl">Choose Your AI Avatar</h1>
      <p>Pick or create a face to represent your brand's UGC ad.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {avatarOptions.map((option, index) => (
          <div
            key={index}
            className={clsx(
              "p-4 border rounded-lg cursor-pointer transition-colors",
              selectedOption === index
                ? "border-cOrange ring-2 ring-cOrange"
                : "border-gray-200"
            )}
            onClick={() => setSelectedOption(index)}
          >
            <label className="flex items-start space-x-2 cursor-pointer">
              <input
                type="radio"
                name="avatarOption"
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                className="accent-orange-500 mt-1"
              />
              <div>
                <p className="font-medium">{option.label}</p>
                <small className="text-gray-400">{option.description}</small>
              </div>
            </label>
          </div>
        ))}
      </div>

      {/* Default Avatars */}
      {selectedOption === 0 && (
        <div>
          <div className="border rounded-lg p-4">
            <p>Default Avatars </p>
            <small className="text-gray-400">
              Browse and select from ready-to-use faces.
            </small>

            {/* TODO: Show loading spinner */}
            {isLoading && (
              <div className="w-full flex justify-center mt-4">
                <Spinner color="text-cOrange" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              {paginatedAvatars?.map((avatar, index) => (
                <div
                  key={`default-${avatar?.avatar_id}`}
                  className={clsx(
                    "w-full md:w-[180px] h-[250px] md:h-[180px] rounded-md flex items-center justify-center text-sm cursor-pointer transition-all relative overflow-hidden",
                    selectedAvatar === `default-${index}`
                      ? "border-2 border-orange-500 bg-orange-100"
                      : "bg-gray-300"
                  )}
                  onClick={() => {
                    setSelectedAvatar(`default-${index}`);
                    handleUseDefaultAvatar(avatar, AvatarSource.default);
                  }}
                  tabIndex={0}
                >
                  <Image
                    src={avatar?.preview_image_url}
                    alt={`Default Avatar ${index}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="text-sm px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="text-sm px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 mt-4">
            <p>My Saved Avatars</p>
            <small className="text-gray-400">
              Reuse your previously generated or uploaded avatars
            </small>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              {savedAvatars?.map((avatar, index) => (
                <div
                  key={`default-${avatar?.id}`}
                  className={clsx(
                    "w-full md:w-[180px] h-[250px] md:h-[180px] rounded-md flex items-center justify-center text-sm cursor-pointer transition-all relative overflow-hidden",
                    selectedAvatar === `default-${index}`
                      ? "border-2 border-orange-500 bg-orange-100"
                      : "bg-gray-300"
                  )}
                  onClick={() => {
                    setSelectedAvatar(`default-${index}`);
                    handleUseDefaultAvatar(avatar, AvatarSource.uploaded);
                  }}
                  tabIndex={0}
                >
                  <Image
                    src={avatar?.url}
                    alt={`Default Avatar ${index}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload Avatar */}
      {selectedOption === 1 && (
        <div>
          <div
            className={clsx(
              "border rounded-lg p-4 flex flex-col items-center transition",
              isDragging ? "border-orange-500 bg-orange-50" : ""
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFile(file);
            }}
          >
            <CloudUpload size={ICON_SIZE} />

            <div className="flex gap-2 mt-4">
              <label className="cursor-pointer text-cOrange">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleFile(file);
                  }}
                  className="hidden"
                />
                Click to upload
              </label>
              <p className="text-gray-400">or drag and drop</p>
            </div>
            <p className="text-gray-400 text-center text-sm">
              PNG or JPG (max. 2MB, 800x400px recommended)
            </p>
          </div>

          <small className="text-gray-400">
            For best results, upload a 9:16 Image (TikTok standard vertical
            video ratio)
          </small>

          <div className="mt-4">
            {uploadedAvatar ? (
              <div className="flex flex-col items-start gap-4 relative w-fit">
                <img
                  src={uploadedAvatar}
                  alt="Uploaded Avatar"
                  className="w-28 h-28 object-cover rounded-lg border-2 border-orange-500"
                />
                <div className="flex items-center gap-4 mb-4">
                  <Input type="checkbox" />
                  <div>
                    <p className="mb-0">Save Image as Avatar</p>
                    <p className="-mt-1 text-sm text-gray-400">
                      Reuse this image for future usage
                    </p>
                  </div>
                </div>

                {isUploadError && (
                  <p className="text-red-500 bg-red-100 w-full text-sm mt-2 px-4 py-2 rounded-lg">
                    Error: {uploadError.message}
                  </p>
                )}

                {isUploadSuccess && (
                  <p className="text-green-500 bg-green-100 w-full text-sm mt-2 px-4 py-2 rounded-lg">
                    Asset Uploaded Successfully!
                  </p>
                )}

                <Button
                  label={"Upload"}
                  theme="pink"
                  onClick={handleUpload}
                  isLoading={isUploading}
                  disabled={!uploadedFile}
                />

                <div
                  onClick={handleRemoveUpload}
                  className="cursor-pointer text-sm underline absolute left-24 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                >
                  <X size={ICON_SIZE - 5} />
                </div>
              </div>
            ) : null}
          </div>

          <div>
            {isProcessingWorkflow && (
              <PercentageLoader
                isActive={isProcessingWorkflow}
                onComplete={handlePercentageComplete}
                duration={120000}
              />
            )}
          </div>
        </div>
      )}

      {/* Generate Avatar by Prompt */}
      {selectedOption === 2 && (
        <div>
          <div>
            <label>Describe the avatar you want:</label>
            <textarea
              className="w-full  border rounded-lg p-4"
              cols={20}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          {isGenerateError && (
            <p className="text-red-500 bg-red-100 w-full text-sm mt-2 px-4 py-2 rounded-lg">
              Error: {generateError.message}
            </p>
          )}
          <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
            <button className="border w-fit border-cOrange px-4 py-2 rounded-lg text-cOrange text-sm hover:opacity-50">
              AI Credits Remaining: 49
            </button>

            <div className="md:w-fit">
              <Button
                label={"Generate Avatar"}
                onClick={handleGenerateAvatars}
                isLoading={isGenerating}
                disabled={isGenerating}
              />
            </div>
          </div>

          {/* Show percentage loader during generation */}
          {showPercentageLoader && (
            <div className="mt-8">
              <PercentageLoader
                isActive={showPercentageLoader}
                onComplete={handlePercentageComplete}
                duration={120000} // 90 seconds - longer than expected polling time
              />
            </div>
          )}

          {/* Show success state when generation completes */}
          {isGenerateSuccess && !showPercentageLoader && (
            <div className="mt-8">
              <p className="text-center text-2xl">Generated Avatars</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {generatedAvatars?.data?.image_url_list?.map((url, index) => (
                  <div
                    key={`default-${index}`}
                    className={clsx(
                      "w-full md:w-[200px] h-[250px]  md:h-[200px] rounded-md flex items-center justify-center text-sm cursor-pointer transition-all relative overflow-hidden",
                      selectedAvatar === `default-${index}`
                        ? "border-2 border-orange-500 bg-orange-100"
                        : "bg-gray-300"
                    )}
                    onClick={() => {
                      setSelectedAvatar(`default-${index}`);
                      handleUseGeneratedAvatar();
                    }}
                    tabIndex={0}
                  >
                    <Image
                      src={url}
                      alt={`Default Avatar ${index}`}
                      fill
                      sizes="(min-width: 768px) 200px, 100vw"
                      className="object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarSelectionStep;
