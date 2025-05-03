import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function ListCard({
  title,
  url,
  index,
}: {
  title: string;
  url?: string | null;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <Link href={url ?? "/"}>
      <motion.div
        ref={ref}
        style={{
          transform: isInView ? "none" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          transitionDelay: `${index}00ms`,
        }}
        className="relative w-full h-full p-[24px] border-solid border-right border-[0.5px] border-2 border-[#1c1c1c] hover:bg-zinc-900 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <div className="flex w-full justify-between">
          <p className="font-black">
            {index + 1}. {title?.toLocaleUpperCase()}
          </p>
          {url && <ArrowTopRightIcon className="self-end" />}
        </div>
      </motion.div>
    </Link>
  );
}
