"use client";

import { Progress } from "@/components/ui/progress";
import Camera from "../../../components/(photobooth)/camera";
import { PhotoBoothProvider, usePhotoBooth } from "./context";
import Done from "../../../components/(photobooth)/done";
import EmailForm from "../../../components/(photobooth)/email-form";
import GridSelect from "../../../components/(photobooth)/grid-select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function PhotoBoothFlow() {
  const { step } = usePhotoBooth();

  return (
    <>
      <div className="w-[400px] flex flex-col items-top mb-8 items-center">
        <div className="grid grid-cols-2 gap-2 w-full mb-4">
          <Button variant="secondary">
            <Link href="/self-project" className="w-full">
              Cancel
            </Link>
          </Button>

          <Button
            variant="destructive"
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
        </div>
        <Progress value={(step / 4) * 100} className="mb-4" />
        <p>Step {step} of 4</p>
      </div>
      {step === 1 && <EmailForm />}
      {step === 2 && <GridSelect />}
      {step === 3 && <Camera />}
      {step === 4 && <Done />}
    </>
  );
}

export default function PhotoBoothPage() {
  return (
    <PhotoBoothProvider>
      <div className="min-h-[calc(100vh-84px)] flex flex-col items-center pt-[104px]">
        <PhotoBoothFlow />
      </div>
    </PhotoBoothProvider>
  );
}
