"use client";

import { useRef, useState } from "react";
import { Pause, Play, Trash2 } from "lucide-react";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div className="flex items-center gap-3 p-2 flex-1 rounded-lg w-full max-w-lg">
      <button
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <div className="relative flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-orange-500 rounded-full"
          style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
        />
      </div>

      <span className="text-sm w-10 text-right">{formatTime(currentTime)}</span>

      <button className="text-gray-600 hover:text-red-500">
        <Trash2 size={18} />
      </button>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
