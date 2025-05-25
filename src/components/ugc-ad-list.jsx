import { useState, useRef } from "react";
import { EllipsisVertical, Play } from "lucide-react";
import { ICON_SIZE } from "@/constants";
import Modal from "@/components/modal";
import Button from "./button";

const UGCAdsList = ({ ugcAds: initialAds }) => {
  const [ugcAds, setUgcAds] = useState(initialAds);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [playingAdId, setPlayingAdId] = useState(null);
  const [modalAd, setModalAd] = useState(null);
  const videoRefs = useRef({});
  const modalVideoRef = useRef(null);

  const handleCardClick = (adId) => setSelectedAdId(adId);

  const handlePlayClick = (adId) => {
    // Pause currently playing video
    if (playingAdId && playingAdId !== adId) {
      const currentPlayingVideo = videoRefs.current[playingAdId];
      if (currentPlayingVideo) {
        currentPlayingVideo.pause();
      }
    }

    // Play the selected video
    const video = videoRefs.current[adId];
    if (video) {
      video.play();
      setPlayingAdId(adId); // mark as currently playing
      setSelectedAdId(adId); // highlight the card
    }
  };

  const handlePlay = (adId) => setPlayingAdId(adId);

  const handlePause = () => {
    setPlayingAdId(null);
  };

  const handleOpenModal = (ad) => {
    setModalAd(ad);
    setTimeout(() => modalVideoRef.current?.pause(), 100);
  };

  const handleModalPlay = () => modalVideoRef.current?.play();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = modalAd.videoUrl;
    link.download = `${modalAd.title || "video"}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDuplicate = () => {
    const duplicated = {
      ...modalAd,
      id: crypto.randomUUID(),
      title: `${modalAd.title} (copy)`,
    };
    setUgcAds([duplicated, ...ugcAds]);
    setModalAd(null);
  };

  const handleDelete = () => {
    setUgcAds(ugcAds.filter((ad) => ad.id !== modalAd.id));
    setModalAd(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ugcAds.map((ad) => (
          <div key={ad.id} className="p-2 bg-white border rounded-lg">
            <div
              className={`relative h-[300px] border rounded-lg overflow-hidden cursor-pointer transition-shadow ${
                selectedAdId === ad.id
                  ? "ring-4 ring-cOrange"
                  : "hover:shadow-lg"
              }`}
              onClick={() => handleCardClick(ad.id)}
            >
              <video
                ref={(el) => (videoRefs.current[ad.id] = el)}
                src={ad.videoUrl}
                className="w-full h-full object-cover"
                controls={false}
                onPlay={() => handlePlay(ad.id)}
                onPause={handlePause}
                onEnded={handlePause}
              />

              {playingAdId !== ad.id && (
                <div
                  className="absolute inset-0 flex justify-center items-center bg-black/40"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayClick(ad.id);
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center">
                    <Play className="text-cOrange" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="text-sm font-medium">{ad.title}</p>
                <p className="text-xs text-gray-500">{ad.createdAt}</p>
              </div>
              <EllipsisVertical
                size={ICON_SIZE - 5}
                className="cursor-pointer hover:opacity-50"
                onClick={() => handleOpenModal(ad)}
              />
            </div>
          </div>
        ))}
      </div>

      {modalAd && (
        <Modal onClose={() => setModalAd(null)}>
          <div className="p-4">
            <div className="text-center">
              <p>{modalAd.title}</p>
              <p className="text-sm text-cOrange">AD Id: #{modalAd.id}</p>
            </div>
            <div className="relative md:w-[50%] w-[60%] m-auto rounded-lg overflow-hidden h-[300px] my-4">
              <video
                ref={modalVideoRef}
                src={modalAd.videoUrl}
                className="w-full h-full object-cover rounded-lg"
                controls={false}
              />
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40"
                onClick={handleModalPlay}
              >
                <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center">
                  <Play className="text-cOrange" />
                </div>
              </div>
            </div>

            <p className="text-lg font-semibold">Hook: {modalAd.hook}</p>
            <p className="text-sm text-gray-600 mb-6">
              Uploaded: {modalAd.createdAt}
            </p>

            <div className="flex justify-between gap-2">
              <Button onClick={handleDownload} label={"Download"} />

              <Button
                onClick={handleDuplicate}
                label={"Duplicate"}
                theme="pink"
              />

              <Button onClick={handleDelete} label={"Delete"} theme="danger" />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UGCAdsList;
