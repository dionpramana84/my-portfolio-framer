import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";

export default function ImageGifCard({
  name,
  image_thumbnail,
  type,
  start_date,
  end_date,
  url,
  index,
}: {
  name?: string;
  image_thumbnail?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  type?: string;
  url?: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as any, { once: true });
  const MotionDiv = motion.div as any;
  return (
    <Link href={url ?? "/"}>
      <MotionDiv
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          transitionDelay: `${index}00ms`,
        }}
        className="relative w-full h-full p-[24px] border-solid border-right border-[0.5px] hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer"
      >
        {name && (
          <div className="font-black mb-[16px]">
            <p>{name?.toLocaleUpperCase()}</p>
          </div>
        )}
        <div className="relative w-full aspect-square object-cover rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
          <MotionDiv
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={image_thumbnail ?? "/images/barong-black.webp"}
              alt={name ?? "this is image thumbnail"}
              fill
              className="w-full h-full object-cover"
              quality={40}
              priority
            />
          </MotionDiv>
        </div>
        {start_date && (
          <div className="flex justify-between mt-[16px]">
            <p>{type}</p>
            <p>
              {format(start_date, "MMM y")} -{" "}
              {end_date ? format(end_date, "MMM y") : "Now"}
            </p>
          </div>
        )}
      </MotionDiv>
    </Link>
  );
}
