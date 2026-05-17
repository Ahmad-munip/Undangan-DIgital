import { useMemo } from "react";

const BokehCircles = ({ count = 8 }: { count?: number }) => {
  const circles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 120 + 60,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.06 + 0.03,
        hue: 35 + Math.random() * 15,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {circles.map((c) => (
        <div
          key={c.id}
          className="absolute rounded-full animate-bokeh"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: c.size,
            height: c.size,
            background: `radial-gradient(circle, hsl(${c.hue} 60% 55% / ${c.opacity}), transparent 70%)`,
            filter: "blur(20px)",
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default BokehCircles;
