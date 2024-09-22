import { useRef, useState } from "react";
import Image from "next/image";
import FrontEndDeveloperProject from "@/models/FrontEndDeveloperProject";
import dayjs from "dayjs";
import { motion, useInView } from "framer-motion";

export default function ImageGifCard({
  name,
  image_gif,
  image_thumbnail,
  type,
  started_on,
  finished_on,
  onClick,
  index,
}: {
  name?: string;
  image_gif?: string;
  image_thumbnail: string;
  started_on?: string;
  finished_on?: string;
  type?: string;
  onClick?: () => void;
  index?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateY(100px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        transitionDelay: `${index}00ms`,
      }}
      className="relative w-full h-full p-[24px] border-solid border-right border-[0.5px] border-2 border-[#1c1c1c] hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name && (
        <div className="font-black mb-[16px]">
          <p>{name?.toLocaleUpperCase()}</p>
        </div>
      )}
      <div className="relative w-full aspect-square object-cover rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={image_gif && isHovered ? image_gif : image_thumbnail}
            alt={name!}
            blurDataURL={image_thumbnail}
            fill
            className="w-full h-full object-cover"
            quality={40}
            placeholder="blur"
            priority
          />
        </motion.div>
      </div>
      {started_on && (
        <div className="flex justify-between mt-[16px]">
          <p>{type}</p>
          <p>
            {dayjs(started_on).format("MMM YYYY")} -{" "}
            {finished_on ? dayjs(finished_on).format("MMM YYYY") : "Now"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
