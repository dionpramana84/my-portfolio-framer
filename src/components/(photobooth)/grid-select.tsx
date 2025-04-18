"use client";
import { Button } from "@/components/ui/button";
import { usePhotoBooth } from "../../app/self-project/photobooth/context";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const gridPresets = [
  { label: "2 Grid (Vertical)", value: 2, type: "vertical" },
  { label: "3 Grid (Vertical)", value: 3, type: "vertical" },
  { label: "2x2 Grid", value: 4, type: "2x2" },
  { label: "4 Grid (Horizontal)", value: 4, type: "horizontal" },
  { label: "4 Grid (Vertical)", value: 4, type: "vertical" },
];

export default function GridSelect() {
  const { setGrid, setStep, setGridType } = usePhotoBooth();

  return (
    <div className="w-[400px] space-y-4">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Please select the number of grid you want to use.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        {gridPresets.map((preset, idx) => (
          <div key={idx} className="grid grid-cols-2 items-center">
            <Button
              key={idx}
              onClick={() => {
                setGrid(preset.value);
                setGridType(preset.type);
                setStep(3);
              }}
              variant="outline"
            >
              <span className="text-left font-medium">{preset.label}</span>
            </Button>
            <div className="ml-4 flex-shrink-0">
              <GridPreview type={preset.type} count={preset.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🧩 Small visual preview component
function GridPreview({ type, count }: { type: string; count: number }) {
  const boxClass = "bg-gray-300 border border-white rounded w-full h-full";

  if (type === "2x2") {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-[2px] w-16 h-16">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={boxClass} />
          ))}
      </div>
    );
  }

  if (type === "horizontal") {
    return (
      <div className="flex gap-[2px] w-24 h-10">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-full bg-gray-300 border border-white rounded"
            />
          ))}
      </div>
    );
  }

  if (type === "vertical") {
    return (
      <div className="flex flex-col gap-[2px] w-10 h-24">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-full bg-gray-300 border border-white rounded"
            />
          ))}
      </div>
    );
  }

  return null;
}
