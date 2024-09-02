import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function ProgressCard({
  src,
  title,
  value,
}: {
  src: string;
  title: string;
  value: number;
}) {
  return (
    <div className="grid grid-cols-4 gap-[16px]">
      <div className="w-full rounded-full">
        <AspectRatio ratio={1 / 1} className="rounded-full">
          <Image
            src={src}
            alt="Image"
            className="rounded-full object-cover"
            fill
          />
        </AspectRatio>
      </div>
      <div className="flex flex-col justify-center col-span-3">
        <p className="text-lg font-bold w-full mb-[4px]">{title}</p>

        <Progress className="w-full" value={value} />
      </div>
    </div>
  );
}
