import React, { useRef, useState, useCallback, useEffect } from "react";

interface CameraPreviewProps {
  onCapture: (imageSrc: string) => void;
  capturedImage?: string | null;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  onCapture,
  capturedImage,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(!!capturedImage);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsCameraOn(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      streamRef.current = stream;
      // Wait for next render so the video element is in the DOM
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    } catch {
      setIsCameraOn(false);
      setError("Camera access denied. Please allow camera permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOn(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // function capture(
  //   videoRef: React.RefObject<HTMLVideoElement>,
  //   canvasRef: React.RefObject<HTMLCanvasElement>,
  //   stopCamera: () => void,
  //   setVerifying: (v: boolean) => void
  // ): string | null {
  //   if (!videoRef.current || !canvasRef.current) return null;

  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;

  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return null;

  //   ctx.drawImage(video, 0, 0);
  //   const dataUrl = canvas.toDataURL("image/jpeg");

  //   stopCamera();
  //   setVerifying(true);
  //   return dataUrl;
  // }

  // function retake(
  //   setVerified: (v: boolean) => void,
  //   startCamera: () => void
  // ) {
  //   setVerified(false);
  //   startCamera();
  // }

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");

    stopCamera();
    setVerifying(true);

    // Simulate liveness verification
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      onCapture(dataUrl);
    }, 2000);
  }, [onCapture, stopCamera]);

  const retake = useCallback(() => {
    setVerified(false);
    startCamera();
  }, [startCamera]);

  // const [pendingImage, setPendingImage] = useState<string | null>(null);

  // // Simulate liveness verification
  // useEffect(() => {
  //   if (!verifying || !pendingImage) return;

  //   const timer = setTimeout(() => {
  //     setVerifying(false);
  //     setVerified(true);
  //     onCapture(pendingImage);
  //     setPendingImage(null);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [verifying, pendingImage, onCapture]);

  // // Usage:
  // const handleCapture = () => {
  //   const dataUrl = capture(videoRef, canvasRef, stopCamera, setVerifying);
  //   if (dataUrl) setPendingImage(dataUrl);
  // };

  // const handleRetake = () => retake(setVerified, startCamera);

  if (capturedImage && verified && !isCameraOn) {
    return (
      <div className="flex flex-col items-center gap-3">
        <img
          src={capturedImage}
          alt="Captured face"
          className="w-48 h-48 rounded-full object-cover border-4 border-green-500"
        />
        <div className="flex items-center gap-2 text-green-500 font-medium">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Liveness Verified
        </div>
        <button
          type="button"
          onClick={retake}
          className="text-sm text-blue-600 hover:underline"
        >
          Retake Photo
        </button>
      </div>
    );
  }

  if (verifying) {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="text-gray-600 font-medium">Verifying liveness...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      {isCameraOn ? (
        <>
          <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-72 h-56 object-cover"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={capture}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={startCamera}
          className="flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors w-full"
        >
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm text-gray-500">
            Click to start face liveness verification
          </span>
        </button>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
