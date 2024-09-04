import { m, useInView } from "framer-motion";
import { useRef } from "react";

export default function BottomToTopFadingAnimation({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay?: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: isInView ? "none" : "translateY(20px)",
          opacity: isInView ? 1 : 0,
          transition: "all 300ms ease-in-out",
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
