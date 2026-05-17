import { motion } from "framer-motion";

// Reusable section vine accent - small vine that grows from a corner
export const SectionVine = ({ side = "left", className = "" }: { side?: "left" | "right"; className?: string }) => {
  const isLeft = side === "left";
  return (
    <motion.svg
      className={`absolute pointer-events-none z-[1] ${isLeft ? "left-0 bottom-0" : "right-0 bottom-0"} w-20 h-32 md:w-28 md:h-44 ${className}`}
      viewBox="0 0 60 100"
      fill="none"
      style={isLeft ? {} : { transform: "scaleX(-1)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <motion.path
        d="M0,100 Q5,80 8,60 Q12,40 18,25 Q22,15 28,8"
        stroke="hsl(40 72% 52%)"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.6"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M5,70 Q12,62 10,55"
        stroke="hsl(40 72% 52%)"
        strokeWidth="0.6"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.8 }}
      />
      <motion.path
        d="M12,42 Q18,35 15,28"
        stroke="hsl(40 72% 52%)"
        strokeWidth="0.6"
        opacity="0.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
      />
      <motion.ellipse
        cx="28" cy="8" rx="4" ry="2"
        fill="hsl(40 72% 52%)"
        opacity="0.4"
        transform="rotate(-20 28 8)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.8 }}
      />
      <motion.ellipse
        cx="10" cy="55" rx="3" ry="1.5"
        fill="hsl(40 72% 52%)"
        opacity="0.3"
        transform="rotate(15 10 55)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
      />
      <circle cx="15" cy="30" r="1" fill="hsl(40 90% 65%)" opacity="0.4" />
      <circle cx="6" cy="65" r="0.8" fill="hsl(40 90% 65%)" opacity="0.3" />
    </motion.svg>
  );
};

// Local gold dust for individual sections
export const LocalGoldDust = ({ count = 8 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={`lgd-${i}`}
        className="absolute rounded-full pointer-events-none animate-dust"
        style={{
          left: `${10 + Math.random() * 80}%`,
          bottom: 0,
          width: 2,
          height: 2,
          background: `hsl(40 80% 60% / ${0.3 + Math.random() * 0.4})`,
          animationDuration: `${8 + Math.random() * 8}s`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      />
    ))}
  </>
);
