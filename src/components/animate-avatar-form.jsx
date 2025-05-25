"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";
import Button from "./button";
import { ICON_SIZE } from "@/constants";

const AnimateAvatarStep = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://res.cloudinary.com/dgn6edv1k/video/upload/v1741272463/samples/cld-sample-video.mp4"
  );
  const [savedVideoUrls, setSavedVideoUrls] = useState([]);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleSaveVideo = () => {
    if (
      videoUrl &&
      !savedVideoUrls.includes(videoUrl) &&
      savedVideoUrls.length < 3
    ) {
      setSavedVideoUrls((prev) => [...prev, videoUrl]);
    }
  };

  const handleDeleteIconClick = (url) => {
    setVideoToDelete(url);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    setSavedVideoUrls((prev) => prev.filter((url) => url !== videoToDelete));
    setVideoToDelete(null);
    setShowDeletePopup(false);
  };

  const cancelDelete = () => {
    setVideoToDelete(null);
    setShowDeletePopup(false);
  };

  return (
    <div className="border p-4 rounded-lg bg-white">
      {/* Info Banner */}
      <div className="px-4 py-2 rounded-lg bg-orange-100 text-orange-800 mb-4 flex gap-2 justify-center items-center">
        <Info className="text-cOrange" />
        <p>
          Bring your avatar to life with subtle movements perfect for TikTok
          ads.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 border p-4 rounded-lg bg-white">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <button className="border w-fit border-cOrange px-4 py-2 rounded-lg text-cOrange text-sm hover:opacity-50">
            AI Credits Remaining: 49
          </button>

          <div className="mt-4">
            <label>Video Prompt</label>
            <textarea className="w-full border rounded-lg p-4" cols={20} />
          </div>

          <div className="mt-4">
            <label>
              Negative Prompt <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea className="w-full border rounded-lg p-4" cols={20} />
          </div>

          <div className="space-y-2 mt-4">
            <Button label={"Use Default Prompt"} theme="pink" />
            <Button label={"Regenerate Video"} />
          </div>
        </div>

        {/* RIGHT SIDE (VIDEO PREVIEW) */}
        <div className="flex-1 flex items-center justify-center">
          {videoUrl ? (
            <div className="w-[70%] md:w-[70%] h-[350px] md:h-full md:ml-auto m-auto border-4 border-cOrange rounded-lg shadow-lg shadow-cOrange/40 transition hover:scale-[1.02] duration-300 relative">
              <video
                src={videoUrl}
                autoPlay
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute bottom-4 w-full px-4 m-auto justify-center flex gap-4">
                <Button label={"Save Video"} onClick={handleSaveVideo} />
              </div>
            </div>
          ) : (
            <div className="w-[70%] h-full ml-auto aspect-video bg-gray-300 rounded-lg border flex items-center justify-center text-gray-500 text-sm">
              No preview available
            </div>
          )}
        </div>
      </div>

      {/* SAVED VIDEOS */}
      <div className="mt-4 border p-4 rounded-lg bg-white">
        <div className="flex flex-col md:flex-row  gap-4 justify-between items-center mb-4">
          <div>
            <p>Saved AI Generated Videos for Avatar</p>
            <p className="text-sm text-gray-400">
              {savedVideoUrls.length === 0
                ? "No videos yet. Generate to see results here"
                : "Click a video to preview"}
            </p>
          </div>
          <p className="text-sm text-cOrange">
            {savedVideoUrls.length}/3 saved videos
          </p>
        </div>

        <div>
          {/* Saved Video Thumbnails */}
          <div className="flex gap-4 flex-wrap max-h-[100px] overflow-x-auto items-center">
            {savedVideoUrls.map((url, index) => (
              <div key={index} className="relative w-1/4 h-full">
                <video
                  src={url}
                  className="h-full aspect-video rounded-lg object-cover border shadow cursor-pointer"
                />

                <div
                  onClick={() => handleDeleteIconClick(url)}
                  className="absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer shadow-lg"
                >
                  <X size={ICON_SIZE - 5} />
                </div>
              </div>
            ))}
          </div>

          {/* Delete Confirmation Modal */}
          {showDeletePopup && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 shadow-lg md:max-w-md w-[90%]">
                <h2 className="text-xl text-center md:text-left  font-bold mb-4">
                  Confirm Delete
                </h2>
                <p className="text-center mb-4">
                  Are you sure you want to delete this avatar animation?
                </p>
                <div className="flex justify-center gap-4">
                  <Button label="Cancel" onClick={cancelDelete} theme="white" />
                  <Button
                    label="Delete"
                    onClick={confirmDelete}
                    theme="danger"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimateAvatarStep;
