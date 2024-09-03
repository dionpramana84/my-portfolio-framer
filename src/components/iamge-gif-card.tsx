import { useState } from "react";
import Image from "next/image";
import FrontEndDeveloperProject from "@/models/FrontEndDeveloperProject";
import dayjs from "dayjs";

export default function ImageGifCard({
  project,
  onClick,
}: {
  project: FrontEndDeveloperProject;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full p-[24px] border-solid border-right border-[0.5px] border-2 border-[#1c1c1c] hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-1xl font-black mb-[16px]">
        {project.name.toLocaleUpperCase()}
      </div>
      <div className="relative w-full aspect-square object-cover rounded-3xl">
        <Image
          src={
            project.image_gif && isHovered
              ? project.image_gif
              : project.image_thumbnail
          }
          alt={project.name}
          fill
          className="w-full h-full object-cover rounded-3xl"
          quality={50}
        />
      </div>

      <div className="flex justify-between mt-[16px]">
        <p>{project.type}</p>
        <p>
          {dayjs(project.started_on).format("MMM YYYY")} -{" "}
          {project.finished_on
            ? dayjs(project.finished_on).format("MMM YYYY")
            : "Now"}
        </p>
      </div>
    </div>
  );
}
