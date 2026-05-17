import { motion } from "framer-motion";

const vinePaths = [
  // Left side vines
  { d: "M0,80 Q15,60 10,40 Q5,20 20,5 Q25,0 30,8 Q28,15 22,12", side: "left", delay: 0 },
  { d: "M0,120 Q20,100 15,75 Q10,55 25,35 Q32,25 28,40 Q22,50 18,42", side: "left", delay: 0.3 },
  { d: "M0,200 Q25,180 18,150 Q12,130 30,110 Q35,100 30,115", side: "left", delay: 0.6 },
  { d: "M0,300 Q20,270 12,240 Q8,220 22,200 Q28,190 25,205", side: "left", delay: 0.9 },
  { d: "M0,400 Q18,375 14,345 Q10,325 28,305 Q33,295 29,310", side: "left", delay: 1.2 },
  // Right side vines (mirrored)
  { d: "M100,100 Q85,80 90,55 Q95,35 80,15 Q75,5 78,18", side: "right", delay: 0.2 },
  { d: "M100,180 Q80,160 85,130 Q90,110 75,90 Q70,80 74,95", side: "right", delay: 0.5 },
  { d: "M100,280 Q82,255 88,225 Q92,205 78,185 Q73,175 77,190", side: "right", delay: 0.8 },
  { d: "M100,380 Q84,355 89,325 Q93,305 79,285 Q74,275 78,290", side: "right", delay: 1.1 },
];

// Branch/leaf shapes that sprout from vine tips
const branches = [
  { cx: 22, cy: 10, rx: 5, ry: 2.5, rotate: -30, side: "left", delay: 1.5 },
  { cx: 18, cy: 42, rx: 4, ry: 2, rotate: 20, side: "left", delay: 1.8 },
  { cx: 30, cy: 112, rx: 4.5, ry: 2, rotate: -15, side: "left", delay: 2.0 },
  { cx: 25, cy: 205, rx: 3.5, ry: 2, rotate: 25, side: "left", delay: 2.2 },
  { cx: 78, cy: 18, rx: 5, ry: 2.5, rotate: 30, side: "right", delay: 1.6 },
  { cx: 74, cy: 95, rx: 4, ry: 2, rotate: -20, side: "right", delay: 1.9 },
  { cx: 77, cy: 190, rx: 4, ry: 2, rotate: 15, side: "right", delay: 2.1 },
];

const dots = [
  { cx: 12, cy: 50, r: 1.5, side: "left" },
  { cx: 8, cy: 130, r: 1.2, side: "left" },
  { cx: 15, cy: 250, r: 1, side: "left" },
  { cx: 20, cy: 350, r: 1.3, side: "left" },
  { cx: 88, cy: 70, r: 1.5, side: "right" },
  { cx: 92, cy: 150, r: 1.2, side: "right" },
  { cx: 85, cy: 240, r: 1, side: "right" },
  { cx: 80, cy: 340, r: 1.3, side: "right" },
];

const VineRoots = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Left vine SVG */}
      <svg
        className="absolute left-0 top-0 h-full w-12 md:w-20"
        viewBox="0 0 50 500"
        preserveAspectRatio="none"
        fill="none"
      >
        {vinePaths.filter(v => v.side === "left").map((vine, i) => (
          <motion.path
            key={`lv-${i}`}
            d={vine.d}
            stroke="hsl(40 72% 52%)"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: vine.delay, ease: "easeInOut" }}
          />
        ))}
        {branches.filter(b => b.side === "left").map((b, i) => (
          <motion.ellipse
            key={`lb-${i}`}
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill="hsl(40 72% 52%)"
            opacity="0.1"
            transform={`rotate(${b.rotate} ${b.cx} ${b.cy})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 0.8, delay: b.delay }}
          />
        ))}
        {dots.filter(d => d.side === "left").map((d, i) => (
          <circle key={`ld-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="hsl(40 90% 65%)" opacity="0.12" />
        ))}
      </svg>

      {/* Right vine SVG */}
      <svg
        className="absolute right-0 top-0 h-full w-12 md:w-20"
        viewBox="50 0 50 500"
        preserveAspectRatio="none"
        fill="none"
      >
        {vinePaths.filter(v => v.side === "right").map((vine, i) => (
          <motion.path
            key={`rv-${i}`}
            d={vine.d}
            stroke="hsl(40 72% 52%)"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: vine.delay, ease: "easeInOut" }}
          />
        ))}
        {branches.filter(b => b.side === "right").map((b, i) => (
          <motion.ellipse
            key={`rb-${i}`}
            cx={b.cx}
            cy={b.cy}
            rx={b.rx}
            ry={b.ry}
            fill="hsl(40 72% 52%)"
            opacity="0.1"
            transform={`rotate(${b.rotate} ${b.cx} ${b.cy})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 0.8, delay: b.delay }}
          />
        ))}
        {dots.filter(d => d.side === "right").map((d, i) => (
          <circle key={`rd-${i}`} cx={d.cx} cy={d.cy} r={d.r} fill="hsl(40 90% 65%)" opacity="0.12" />
        ))}
      </svg>
    </div>
  );
};

export default VineRoots;
