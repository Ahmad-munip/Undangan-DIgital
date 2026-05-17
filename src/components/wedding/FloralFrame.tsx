import { motion } from "framer-motion";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface FloralFrameProps {
  positions?: Position[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: { w: 60, h: 60 }, md: { w: 100, h: 100 }, lg: { w: 140, h: 140 } };

const positionClasses: Record<Position, string> = {
  "top-left": "top-0 left-0", "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0", "bottom-right": "bottom-0 right-0",
};

const rotationMap: Record<Position, number> = {
  "top-left": 0, "top-right": 90, "bottom-left": -90, "bottom-right": 180,
};

const VineCorner = ({ size, position, delay }: { size: "sm" | "md" | "lg"; position: Position; delay: number }) => {
  const { w, h } = sizeMap[size];
  const rotation = rotationMap[position];

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none z-10`}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    >
      <svg width={w} height={h} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotation}deg)` }} className="md:scale-100 scale-75 origin-top-left">
        <motion.path d="M5 5 Q5 40 20 60 Q35 80 60 90 Q80 98 110 105" stroke="hsl(40 72% 52%)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.35" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: delay + 0.3, ease: "easeInOut" }} />
        <motion.path d="M5 5 Q15 15 18 35 Q20 50 30 65" stroke="hsl(40 72% 52%)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: delay + 0.6, ease: "easeInOut" }} />
        <motion.path d="M25 50 Q30 45 35 50 Q30 55 25 50" stroke="hsl(40 72% 52%)" strokeWidth="0.8" fill="none" opacity="0.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: delay + 0.8 }} />
        <motion.path d="M20 60 Q40 65 55 75" stroke="hsl(40 72% 52%)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: delay + 0.9 }} />
        <motion.path d="M18 35 Q25 28 30 35 Q25 42 18 35Z" fill="hsl(40 72% 52%)" opacity="0.2" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: delay + 1 }} />
        <motion.path d="M40 72 Q50 62 55 72 Q50 82 40 72Z" fill="hsl(40 72% 52%)" opacity="0.2" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.2 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: delay + 1.2 }} />
        <motion.path d="M70 88 Q78 80 84 88 Q78 96 70 88Z" fill="hsl(40 72% 52%)" opacity="0.15" initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 0.15 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: delay + 1.4 }} />
        <circle cx="60" cy="90" r="2" fill="hsl(40 90% 65%)" opacity="0.3" />
        <circle cx="30" cy="65" r="1.5" fill="hsl(40 90% 65%)" opacity="0.25" />
        <circle cx="90" cy="100" r="1.8" fill="hsl(40 90% 65%)" opacity="0.2" />
        <circle cx="10" cy="20" r="1" fill="hsl(40 90% 65%)" opacity="0.15" />
        <circle cx="45" cy="80" r="1.2" fill="hsl(40 90% 65%)" opacity="0.15" />
        <circle cx="75" cy="95" r="1" fill="hsl(40 90% 65%)" opacity="0.12" />
      </svg>
    </motion.div>
  );
};

const FloralFrame = ({ positions = ["top-left", "top-right", "bottom-left", "bottom-right"], size = "md", className = "" }: FloralFrameProps) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {positions.map((pos, i) => (
      <VineCorner key={pos} size={size} position={pos} delay={i * 0.15} />
    ))}
  </div>
);

// Mandala ring component
export const MandalaRing = ({ size = 200, className = "" }: { size?: number; className?: string }) => (
  <motion.div className={`absolute pointer-events-none ${className}`}
    initial={{ opacity: 0, scale: 0.5, rotate: 0 }} whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
    viewport={{ once: true }} transition={{ duration: 3, ease: "easeOut" }}>
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className="animate-rotate-slow" style={{ animationDuration: "40s" }}>
      <circle cx="100" cy="100" r="90" stroke="hsl(40 72% 52%)" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="100" r="80" stroke="hsl(40 72% 52%)" strokeWidth="0.3" opacity="0.1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse key={angle} cx="100" cy="55" rx="8" ry="15" fill="hsl(40 72% 52%)" opacity="0.08" transform={`rotate(${angle} 100 100)`} />
      ))}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse key={`inner-${angle}`} cx="100" cy="72" rx="5" ry="10" fill="hsl(40 72% 52%)" opacity="0.06" transform={`rotate(${angle} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="3" fill="hsl(40 90% 65%)" opacity="0.15" />
      <circle cx="100" cy="100" r="6" stroke="hsl(40 72% 52%)" strokeWidth="0.5" opacity="0.1" />
    </svg>
  </motion.div>
);

// Floating diamonds component
export const FloatingDiamonds = () => {
  const diamonds = [
    { left: "5%", top: "15%", size: 8, duration: 6, delay: 0 },
    { left: "90%", top: "25%", size: 6, duration: 7, delay: 1 },
    { left: "15%", top: "45%", size: 10, duration: 8, delay: 2 },
    { left: "85%", top: "55%", size: 7, duration: 5, delay: 0.5 },
    { left: "10%", top: "70%", size: 5, duration: 9, delay: 3 },
    { left: "92%", top: "80%", size: 8, duration: 6, delay: 1.5 },
    { left: "50%", top: "90%", size: 6, duration: 7, delay: 2.5 },
    { left: "30%", top: "20%", size: 5, duration: 8, delay: 4 },
    { left: "70%", top: "35%", size: 7, duration: 6, delay: 1.2 },
    { left: "20%", top: "85%", size: 6, duration: 7, delay: 3.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {diamonds.map((d, i) => (
        <div key={i} className="absolute animate-float-diamond"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, background: "hsl(40 72% 52% / 0.2)", animationDuration: `${d.duration}s`, animationDelay: `${d.delay}s` }} />
      ))}
    </div>
  );
};

// Ambient glow helper component
export const AmbientGlows = ({ variant = "default" }: { variant?: "default" | "warm" | "subtle" }) => {
  const configs = {
    default: [
      { width: 350, height: 350, top: "10%", right: "-8%", className: "ambient-glow" },
      { width: 280, height: 280, bottom: "15%", left: "-6%", className: "ambient-glow" },
    ],
    warm: [
      { width: 400, height: 400, top: "5%", left: "-10%", className: "ambient-glow-warm" },
      { width: 300, height: 300, bottom: "10%", right: "-8%", className: "ambient-glow-warm" },
    ],
    subtle: [
      { width: 250, height: 250, top: "20%", right: "-5%", className: "ambient-glow" },
      { width: 200, height: 200, bottom: "20%", left: "-5%", className: "ambient-glow" },
    ],
  };

  return (
    <>
      {configs[variant].map((glow, i) => (
        <div key={i} className={glow.className} style={glow as React.CSSProperties} />
      ))}
    </>
  );
};

// Floral divider - variant A (default vine with kawung)
export const FloralDivider = ({ className = "", variant = "default" }: { className?: string; variant?: "default" | "simple" | "ornate" }) => {
  if (variant === "simple") {
    return (
      <motion.div className={`flex items-center justify-center gap-4 my-4 ${className}`}
        initial={{ opacity: 0, scaleX: 0 }} whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}>
        <div className="divider-gold w-24 md:w-32" />
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: "hsl(40 90% 65%)", boxShadow: "0 0 10px hsl(40 72% 52% / 0.5)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="divider-gold w-24 md:w-32" />
      </motion.div>
    );
  }

  return (
    <motion.div className={`flex items-center justify-center gap-0 my-4 ${className}`}
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      <svg width="300" height="32" viewBox="0 0 300 32" fill="none" className="w-64 md:w-80">
        <ellipse cx="20" cy="16" rx="4" ry="7" fill="hsl(40 72% 52%)" opacity="0.1" />
        <ellipse cx="20" cy="16" rx="7" ry="4" fill="hsl(40 72% 52%)" opacity="0.07" />
        <circle cx="20" cy="16" r="1.5" fill="hsl(40 90% 65%)" opacity="0.12" />
        <ellipse cx="55" cy="16" rx="5" ry="9" fill="hsl(40 72% 52%)" opacity="0.15" />
        <ellipse cx="55" cy="16" rx="9" ry="5" fill="hsl(40 72% 52%)" opacity="0.1" />
        <circle cx="55" cy="16" r="2" fill="hsl(40 90% 65%)" opacity="0.15" />
        <motion.path d="M5 16 Q18 16 30 12 Q45 7 65 10 Q80 12 95 14 Q110 15 120 16" stroke="hsl(40 72% 52%)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
        <path d="M72 9 Q77 4 82 9 Q77 14 72 9Z" fill="hsl(40 72% 52%)" opacity="0.18" />
        <path d="M95 12 Q99 8 103 12 Q99 16 95 12Z" fill="hsl(40 72% 52%)" opacity="0.12" />
        <circle cx="40" cy="10" r="1" fill="hsl(40 72% 52%)" opacity="0.15" />
        <circle cx="85" cy="8" r="0.8" fill="hsl(40 72% 52%)" opacity="0.12" />
        <circle cx="110" cy="13" r="0.8" fill="hsl(40 72% 52%)" opacity="0.1" />
        <motion.g initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}>
          <motion.path d="M140 16 Q144 8 150 5 Q156 8 160 16 Q156 24 150 27 Q144 24 140 16Z" fill="hsl(40 72% 52%)" opacity="0.25" />
          <ellipse cx="150" cy="8" rx="3" ry="5" fill="hsl(40 72% 52%)" opacity="0.1" />
          <ellipse cx="150" cy="24" rx="3" ry="5" fill="hsl(40 72% 52%)" opacity="0.1" />
          <ellipse cx="140" cy="16" rx="5" ry="3" fill="hsl(40 72% 52%)" opacity="0.08" />
          <ellipse cx="160" cy="16" rx="5" ry="3" fill="hsl(40 72% 52%)" opacity="0.08" />
          <circle cx="150" cy="16" r="3" fill="hsl(40 90% 65%)" opacity="0.45" />
          <circle cx="150" cy="16" r="1.5" fill="hsl(40 95% 72%)" opacity="0.6" />
        </motion.g>
        <motion.path d="M295 16 Q282 16 270 12 Q255 7 235 10 Q220 12 205 14 Q190 15 180 16" stroke="hsl(40 72% 52%)" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
        <path d="M218 9 Q223 4 228 9 Q223 14 218 9Z" fill="hsl(40 72% 52%)" opacity="0.18" />
        <path d="M197 12 Q201 8 205 12 Q201 16 197 12Z" fill="hsl(40 72% 52%)" opacity="0.12" />
        <circle cx="260" cy="10" r="1" fill="hsl(40 72% 52%)" opacity="0.15" />
        <circle cx="215" cy="8" r="0.8" fill="hsl(40 72% 52%)" opacity="0.12" />
        <circle cx="190" cy="13" r="0.8" fill="hsl(40 72% 52%)" opacity="0.1" />
        <ellipse cx="245" cy="16" rx="5" ry="9" fill="hsl(40 72% 52%)" opacity="0.15" />
        <ellipse cx="245" cy="16" rx="9" ry="5" fill="hsl(40 72% 52%)" opacity="0.1" />
        <circle cx="245" cy="16" r="2" fill="hsl(40 90% 65%)" opacity="0.15" />
        <ellipse cx="280" cy="16" rx="4" ry="7" fill="hsl(40 72% 52%)" opacity="0.1" />
        <ellipse cx="280" cy="16" rx="7" ry="4" fill="hsl(40 72% 52%)" opacity="0.07" />
        <circle cx="280" cy="16" r="1.5" fill="hsl(40 90% 65%)" opacity="0.12" />
      </svg>
    </motion.div>
  );
};

export default FloralFrame;
