"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const path = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 1.5 }}
          className="flex items-center justify-center h-[calc(100vh-84px)]"
        >
          <div className="flex flex-col items-center">
            <Image
              src={
                path.includes("front-end-developer")
                  ? "/loading-laptop.gif"
                  : path.includes("mining-engineer")
                  ? "/loading-mining.gif"
                  : "/logo-dion.png"
              }
              alt="Loading"
              width={70}
              height={70}
              className="mb-4 md:w-[120px] md:h-[auto] lg:w-[120px] lg:h-[auto]"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
