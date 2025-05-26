"use client";

import { useState } from "react";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { CloudUpload, X } from "lucide-react";
import Button from "./button";
import { ICON_SIZE } from "@/constants";
import Input from "./input";
import { useFetchAvatars } from "@/app/hooks/use-fetch-avatars";
import Image from "next/image";

const MAX_FILE_SIZE_MB = 2;
const PAGE_SIZE = 12;

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
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedAvatar, setUploadedAvatar] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showGeneratedAvatars, setShowGeneratedAvatars] = useState(false);

  const { data: avatars, isLoading, isError, error } = useFetchAvatars();
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
      setUploadError("File size exceeds 2MB limit.");
      setUploadedAvatar(null);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedAvatar(imageUrl);
    setUploadError(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedAvatar(imageUrl);
    }
  };

  const handleRemoveUpload = () => {
    setUploadedAvatar(null);
  };

  const handleGenerateAvatars = () => {
    setShowGeneratedAvatars(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  console.log({ avatars });

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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {paginatedAvatars?.map((avatar, index) => (
                <div
                  key={`default-${avatar?.avatar_id}`}
                  className={clsx(
                    "w-[100px] h-[100px] rounded-md flex items-center justify-center text-sm cursor-pointer transition-all relative overflow-hidden",
                    selectedAvatar === `default-${index}`
                      ? "border-2 border-orange-500 bg-orange-100"
                      : "bg-gray-300"
                  )}
                  onClick={() => setSelectedAvatar(`default-${index}`)}
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

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`saved-${index}`}
                  className={clsx(
                    "w-14 h-14 rounded-md flex items-center justify-center text-sm cursor-pointer transition-all",
                    selectedAvatar === `saved-${index}`
                      ? "border-2 border-orange-500 bg-orange-100"
                      : "bg-gray-300"
                  )}
                  onClick={() => setSelectedAvatar(`saved-${index}`)}
                  tabIndex={0}
                >
                  <span className="text-xs text-white">{index + 1}</span>
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
            <p className="text-gray-400 text-sm">
              PNG or JPG (max. 2MB, 800x400px recommended)
            </p>
          </div>

          <small className="text-gray-400">
            For best results, upload a 9:16 Image (TikTok standard vertical
            video ratio)
          </small>

          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}

          <div className="mt-4">
            {uploadedAvatar ? (
              <div className="flex flex-col items-start gap-4 relative w-fit">
                <img
                  src={uploadedAvatar}
                  alt="Uploaded Avatar"
                  className="w-28 h-28 object-cover rounded-lg border-2 border-orange-500"
                />
                <div className="flex items-center gap-4">
                  <Input type="checkbox" />
                  <div>
                    <p className="mb-0">Save Image as Avatar</p>
                    <p className="-mt-1 text-sm text-gray-400">
                      Reuse this image for future usage
                    </p>
                  </div>
                </div>
                <div
                  onClick={handleRemoveUpload}
                  className="cursor-pointer text-sm underline absolute left-24 bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                >
                  <X size={ICON_SIZE - 5} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {selectedOption === 2 && (
        <div>
          <div>
            <label>Describe the avatar you want:</label>
            <textarea className="w-full  border rounded-lg p-4" cols={20} />
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
            <button className="border w-fit border-cOrange px-4 py-2 rounded-lg text-cOrange text-sm hover:opacity-50">
              AI Credits Remaining: 49
            </button>

            <div className="md:w-fit">
              <Button
                label={"Generate Avatar"}
                onClick={handleGenerateAvatars}
              />
            </div>
          </div>
          {showGeneratedAvatars && (
            <div className="mt-8">
              <p className="text-center">Avatar Generation Results</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`gen-${index}`}
                    className={clsx(
                      "h-[250px] bg-gray-300 rounded-lg cursor-pointer transition-all",
                      selectedAvatar === `gen-${index}`
                        ? "ring-4 ring-cOrange"
                        : "hover:ring-2 hover:ring-orange-300"
                    )}
                    onClick={() => setSelectedAvatar(`gen-${index}`)}
                    tabIndex={0}
                  ></div>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-2">
                <Input type="checkbox" />
                <div>
                  <p className="mb-0">Save Image as Avatar</p>
                  <p className="-mt-1 text-sm text-gray-400">
                    Reuse this image for future usage
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvatarSelectionStep;
