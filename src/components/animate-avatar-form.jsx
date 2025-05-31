"use client";

import { useState, useRef } from "react";
import { Info, X, Play } from "lucide-react";
import Button from "./button";
import { AvatarSource, ICON_SIZE } from "@/constants";
import useStore from "@/store";
import { useGenerateAvatarVideo } from "@/app/hooks/use-generate-avatar-video";
import PercentageLoader from "./percentage-loader";

const VOICES = [
  {
    voice_id: "26b2064088674c80b1e5fc5ab1a068ec",
    language: "English",
    gender: "male",
    name: "Rex",
    preview_audio:
      "https://resource.heygen.ai/text_to_speech/bCo7SFtTvcJz6udLqHmUKf.mp3",
    support_pause: false,
    emotion_support: true,
    support_interactive_avatar: true,
  },
  {
    voice_id: "42d598350e7a4d339a3875eb1b0169fd",
    language: "English",
    gender: "Male",
    name: "Paul",
    preview_audio:
      "https://static.heygen.ai/voice_preview/gDkZsW4hQZXCqFmUNQPVm4.wav",
    support_pause: false,
    emotion_support: true,
    support_interactive_avatar: true,
  },
];

const AnimateAvatarStep = () => {
  const [videoUrl, setVideoUrl] = useState();
  const [savedVideoUrls, setSavedVideoUrls] = useState([]);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(VOICES[0]);
  const [showPercentageLoader, setShowPercentageLoader] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const videoRef = useRef(null);

  const { preset } = useStore();

  const {
    isError,
    error,
    isPending,
    mutate: generateAvatarVideo,
    data: generatedVideo,
  } = useGenerateAvatarVideo({
    onMutate: () => {
      setShowPercentageLoader(true);
    },
    onSuccess: (data) => {
      setShowPercentageLoader(false);
      setVideoUrl(data.data.video_url);
    },
    onError: () => {
      setShowPercentageLoader(false);
    },
  });

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

  const handlePercentageComplete = () => {
    console.log(
      "Percentage loader completed - still waiting for generation..."
    );
  };

  const handleUseDefaultPrompt = () => {
    setVideoUrl("");

    const payload =
      preset.source === AvatarSource.generated
        ? {
            video_inputs: [
              {
                character: {
                  type: "talking_photo",
                  talking_photo_id: preset.id,
                  talking_style: "expressive",
                  avatar_style: "normal",
                },
                voice: {
                  type: "text",
                  input_text:
                    "Welcome to the HeyGen API! This is a demo video. Feel free to explore and experiment with our API. If you have any questions or need assistance, please don't hesitate to reach out. We're here to help!",
                  voice_id: selectedVoice.voice_id,
                  speed: 1.1,
                },
              },
            ],
          }
        : {
            video_inputs: [
              {
                character: {
                  type: "avatar",
                  avatar_id: preset.id,
                  avatar_style: "normal",
                },
                voice: {
                  type: "text",
                  input_text:
                    "Welcome to the HeyGen API! This is a demo video. Feel free to explore and experiment with our API. If you have any questions or need assistance, please don't hesitate to reach out. We're here to help!",
                  voice_id: selectedVoice.voice_id,
                  speed: 1.1,
                },
              },
            ],
          };

    generateAvatarVideo(payload);
  };

  const handleRegenerateVideo = () => {
    if (!videoPrompt.trim()) {
      alert("Please enter a video prompt before regenerating.");
      return;
    }

    // Clear previous video URL when starting new generation
    setVideoUrl("");

    const payload =
      preset.source === AvatarSource.generated
        ? {
            video_inputs: [
              {
                character: {
                  type: "talking_photo",
                  talking_photo_id: preset.id,
                  talking_style: "expressive",
                  avatar_style: "normal",
                },
                voice: {
                  type: "text",
                  input_text: videoPrompt,
                  voice_id: selectedVoice.voice_id,
                  speed: 1.1,
                },
              },
            ],
          }
        : {
            video_inputs: [
              {
                character: {
                  type: "avatar",
                  avatar_id: preset.id,
                  avatar_style: "normal",
                },
                voice: {
                  type: "text",
                  input_text: videoPrompt,
                  voice_id: selectedVoice.voice_id,
                  speed: 1.1,
                },
              },
            ],
          };

    generateAvatarVideo(payload);
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
            <label className="block text-sm font-medium mb-2">
              Video Prompt
            </label>
            <textarea
              className="w-full border rounded-lg p-4 min-h-[100px] resize-vertical"
              placeholder="Enter your video prompt here..."
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Negative Prompt <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              className="w-full border rounded-lg p-4 min-h-[100px] resize-vertical"
              placeholder="Enter negative prompt (optional)..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2 mt-4">
            <Button
              label={`Use Default Prompt`}
              theme="pink"
              onClick={handleUseDefaultPrompt}
              isLoading={isPending}
              disabled={isPending}
            />
            <Button
              label="Regenerate Video"
              onClick={handleRegenerateVideo}
              isLoading={isPending}
              disabled={isPending}
            />
          </div>

          {/* Status Messages */}
          {isError && (
            <div className="mt-4 text-red-500 px-4 py-2 rounded-lg bg-red-100">
              <p className="font-medium"></p>
              <p>
                {error?.message ||
                  "An error occurred while generating the video."}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Video Preview */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
          {showPercentageLoader ? (
            <div className="flex flex-col items-center justify-center">
              <PercentageLoader
                isActive={true}
                onComplete={handlePercentageComplete}
                duration={160000}
              />
            </div>
          ) : videoUrl ? (
            <div className="w-full max-w-[300px] h-[350px] border-4 border-cOrange rounded-lg shadow-lg shadow-cOrange/40 transition hover:scale-[1.02] duration-300 relative">
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover rounded-md"
                onError={(e) => console.error("Video playback error:", e)}
                controls={false}
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Button
                  label="Save Video"
                  onClick={handleSaveVideo}
                  disabled={
                    savedVideoUrls.includes(videoUrl) ||
                    savedVideoUrls.length >= 3
                  }
                />
              </div>
              {!isPlayingVideo && (
                <div
                  className="absolute top-8 left-1/2 transform translate-y-[100px] -translate-x-1/2 w-14 h-14 bg-gray-200 cursor-pointer rounded-full flex items-center justify-center"
                  onClick={() => {
                    setIsPlayingVideo(true);
                    videoRef.current?.play();
                  }}
                >
                  <Play className="text-cOrange" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 text-center">
              <p className="text-lg font-medium">No video generated yet</p>
              <p className="text-sm">
                Click "Use Default Prompt" or enter a custom prompt to generate
                a video
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SAVED VIDEOS SECTION */}
      <div className="mt-4 border p-4 rounded-lg bg-white">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
          <div>
            <p className="font-medium">Saved AI Generated Videos for Avatar</p>
            <p className="text-sm text-gray-400">
              {savedVideoUrls.length === 0
                ? "No videos yet. Generate to see results here"
                : "Click a video to preview"}
            </p>
          </div>
          <p className="text-sm text-cOrange font-medium">
            {savedVideoUrls.length}/3 saved videos
          </p>
        </div>

        {savedVideoUrls.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {savedVideoUrls.map((url, index) => (
              <div key={index} className="relative w-32 h-20">
                <video
                  src={url}
                  className="w-full h-full rounded-lg object-cover border shadow cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setVideoUrl(url)}
                />
                <button
                  onClick={() => handleDeleteIconClick(url)}
                  className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer shadow-lg transition-colors"
                  aria-label="Delete video"
                >
                  <X size={ICON_SIZE - 8} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No saved videos yet</p>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-[90%] mx-4">
              <h2 className="text-xl text-center md:text-left font-bold mb-4">
                Confirm Delete
              </h2>
              <p className="text-center mb-6">
                Are you sure you want to delete this avatar animation?
              </p>
              <div className="flex justify-center gap-4">
                <Button label="Cancel" onClick={cancelDelete} theme="white" />
                <Button label="Delete" onClick={confirmDelete} theme="danger" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimateAvatarStep;
