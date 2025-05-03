"use client";
import { Button } from "@/components/ui/button";
import { usePhotoBooth } from "../../app/self-project/photobooth/context";
import { useRef } from "react";
import Image from "next/image";

export default function Done() {
  const { photos, gridType } = usePhotoBooth();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const boxSize = 400;
  const padding = 16;
  const scale = 3;
  const imgSize = boxSize - padding * 2;

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scaledBoxSize = boxSize * scale;
    const scaledPadding = padding * scale;
    const scaledImgSize = imgSize * scale;
    const headerHeight = 100 * scale;
    const footerHeight = 50 * scale;

    // Calculate layout
    let cols = 1,
      rows = photos.length;
    if (gridType === "horizontal") {
      cols = photos.length;
      rows = 1;
    } else if (gridType === "2x2") {
      cols = 2;
      rows = 2;
    } else if (gridType === "4x4-horizontal") {
      cols = 4;
      rows = Math.ceil(photos.length / 4);
    } else if (gridType === "4x4-vertical") {
      rows = 4;
      cols = Math.ceil(photos.length / 4);
    }

    canvas.width = cols * scaledBoxSize;
    canvas.height = rows * scaledBoxSize + headerHeight + footerHeight;

    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Optional: add header/footer text

    ctx.fillStyle = "#000";
    ctx.font = `${14 * scale}px sans`;
    ctx.textAlign = "center";
    ctx.fillText("Photobooth 2025", canvas.width / 2, headerHeight / 2);
    ctx.fillText(
      "Created by Dion Pramana",
      canvas.width / 2,
      canvas.height - footerHeight / 2
    );

    photos.forEach((src, index) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * scaledBoxSize + scaledPadding;
        const y = row * scaledBoxSize + scaledPadding + headerHeight;

        // Object-fit: cover logic
        const aspect = img.width / img.height;
        let sx = 0,
          sy = 0,
          sw = img.width,
          sh = img.height;
        if (aspect > 1) {
          sw = img.height;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width;
          sy = (img.height - sh) / 2;
        }

        ctx.drawImage(img, sx, sy, sw, sh, x, y, scaledImgSize, scaledImgSize);

        if (index === photos.length - 1) {
          const link = document.createElement("a");
          link.download = "photobooth-collage-hd.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      };
      img.src = src;
    });
  };

  // Render preview layout
  const renderPreview = () => {
    if (gridType === "horizontal") {
      return (
        <div className="flex overflow-x-auto">
          {photos.map((src, i) => (
            <ImageCard key={i} src={src} />
          ))}
        </div>
      );
    }
    if (gridType === "2x2") {
      return (
        <div className="grid grid-cols-2">
          {photos.map((src, i) => (
            <ImageCard key={i} src={src} />
          ))}
        </div>
      );
    }
    if (gridType === "4x4-horizontal") {
      return (
        <div className="grid grid-cols-4">
          {photos.map((src, i) => (
            <ImageCard key={i} src={src} />
          ))}
        </div>
      );
    }
    if (gridType === "4x4-vertical") {
      return (
        <div className="grid grid-rows-4">
          {photos.map((src, i) => (
            <ImageCard key={i} src={src} />
          ))}
        </div>
      );
    }
    // Default: vertical
    return (
      <div className="flex flex-col items-center">
        {photos.map((src, i) => (
          <ImageCard key={i} src={src} />
        ))}
      </div>
    );
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col items-center bg-white">
        <div className="h-[100px] text-gray-500 text-sm flex items-center">
          Photobooth 2025
        </div>
        {renderPreview()}
        <div className="h-[50px] text-gray-500 text-sm flex items-center">
          Created by Dion Pramana
        </div>
      </div>

      <Button onClick={downloadImage} className="w-full">
        Download
      </Button>
      <Button
        onClick={() => window.location.reload()}
        className="w-full"
        variant="destructive"
      >
        Done
      </Button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}

function ImageCard({ src }: { src: string }) {
  return (
    <div className="bg-white p-4 w-[400px] h-[400px] shadow overflow-hidden">
      <Image
        width={400}
        height={400}
        src={src}
        alt="photo"
        objectFit="cover"
        className="rounded"
      />
    </div>
  );
}
