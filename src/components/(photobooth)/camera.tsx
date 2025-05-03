"use client";
import Webcam from "react-webcam";
import { usePhotoBooth } from "../../app/self-project/photobooth/context";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Camera() {
  const webcamRef = useRef<Webcam>(null);
  const { grid, photos, setPhotos, setStep } = usePhotoBooth();
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user",
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCaptureClick = () => {
    if (isCountingDown) return;
    setIsCountingDown(true);
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsCountingDown(false);
          capture(); // 👈 Capture after countdown ends
        }
        return prev - 1;
      });
    }, 1000);
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const updated = [...photos, imageSrc];
      setPhotos(updated);
      if (updated.length >= grid) {
        setStep(4);
      } else {
        setCount(count + 1);
      }
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative space-y-4 w-[400px] mx-auto">
      {/* Webcam */}
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="rounded object-cover w-[400px] h-[400px]"
      />

      {/* Countdown Overlay */}
      {isCountingDown && (
        <div className="absolute top-0 left-0 w-full h-[400px] flex items-center justify-center bg-black bg-opacity-50 z-10">
          <span className="text-white text-6xl font-bold animate-pulse">
            {countdown}
          </span>
        </div>
      )}

      {/* Take Button */}
      <Button
        onClick={handleCaptureClick}
        className="bg-red-500 text-white w-full"
        disabled={isCountingDown}
      >
        {isCountingDown
          ? "Get Ready..."
          : `Take Photo (${photos.length}/${grid})`}
      </Button>
    </div>
  );
}
