import { useState, useRef } from "react";
import { CloudDownload, EllipsisVertical, Play, Repeat } from "lucide-react";
import { ICON_SIZE } from "@/constants";
import Modal from "@/components/modal";
import Button from "./button";

const UGCAdsList = ({ ugcAds: initialAds }) => {
  const [ugcAds, setUgcAds] = useState(initialAds);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [playingAdId, setPlayingAdId] = useState(null);
  const [modalAd, setModalAd] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);

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
    setModalAd(null);
    setAdToDelete(modalAd);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setUgcAds(ugcAds.filter((ad) => ad.id !== adToDelete.id));
    setShowDeleteConfirm(false);
    setAdToDelete(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ugcAds.map((ad) => (
          <div key={ad.id} className="rounded-lg">
            <div
              className={`relative h-[300px] border rounded-lg overflow-hidden cursor-pointer transition-shadow ${
                selectedAdId === ad.id
                  ? "ring-4 ring-cOrange"
                  : "hover:shadow-lg"
              }`}
              onClick={() => {
                handleCardClick(ad.id);
                handleOpenModal(ad);
              }}
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
            </div>

            <div className="flex justify-between items-center mt-2">
              <div>
                <p className="">{ad.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalAd && (
        <Modal
          onClose={() => setModalAd(null)}
          bg="bg-black"
          width="w-[90%] md:w-[60%]"
        >
          <div className="flex flex-col md:flex-row gap-4 h-inherit items-start px-4 overflow-hidden h-[90vh] xl:h-[70vh]">
            <div className="relative flex-1 rounded-lg overflow-hidden h-full w-full py-4">
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

            <div className="md:p-4 flex-1 space-y-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <Button
                  onClick={handleDownload}
                  label={"Download Video"}
                  icon={<CloudDownload />}
                />

                <Button
                  onClick={handleDuplicate}
                  label={"Remix Video"}
                  theme="white"
                  icon={<Repeat />}
                />
              </div>

              <div className="mt-8">
                <p className="text-gray-400">Ad Name</p>
                <p className="text-white">{modalAd.title}</p>
              </div>

              <div className="">
                <p className="text-gray-400">AI Actor</p>
                <p className="text-white">Violet</p>
              </div>

              <div className="">
                <p className="text-gray-400">Product</p>
                <p className="text-white">Sparkly Water</p>
              </div>
              <div className="">
                <p className="text-gray-400">Script</p>
                <p className="text-white line-clamp-2 md:line-clamp-5">
                  Tired of the same old water? Try Sparkly Water, the new way to
                  stay hydrated. Sparkly Water is the perfect balance of taste
                  and refreshment.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showDeleteConfirm && adToDelete && (
        <Modal
          onClose={() => {
            setShowDeleteConfirm(false);
            setAdToDelete(null);
          }}
        >
          <div className="p-4 text-center space-y-4">
            <p className="text-lg font-semibold">
              Delete “{adToDelete.title}”?
            </p>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this generated video?
            </p>
            <div className="flex justify-center gap-4">
              <Button
                label="Cancel"
                theme="white"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setAdToDelete(null);
                }}
              />
              <Button label="Delete" theme="danger" onClick={confirmDelete} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UGCAdsList;
