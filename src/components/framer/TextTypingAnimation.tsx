import { motion } from "framer-motion";

export default function TextTypingAnimation({
  el,
  index,
}: {
  el: string;
  index: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.25,
        delay: index / 10,
      }}
      key={index}
    >
      {el}{" "}
    </motion.span>
  );
}
