import { useMemo } from "react";

const leafShapes = [
  "M0,8 Q4,0 8,8 Q4,16 0,8Z",         // simple leaf
  "M0,6 Q3,-2 10,6 Q3,14 0,6Z",        // elongated
  "M2,10 Q5,0 8,4 Q12,0 10,10 Q8,14 6,14 Q2,14 2,10Z", // double leaf
];

const FloatingLeaves = ({ count = 18 }: { count?: number }) => {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 10,
        size: 8 + Math.random() * 10,
        shape: leafShapes[i % leafShapes.length],
        rotate: Math.random() * 360,
        opacity: 0.08 + Math.random() * 0.12,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {leaves.map((l) => (
        <div
          key={l.id}
          className="absolute animate-petal"
          style={{
            left: `${l.left}%`,
            top: "-3%",
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
          }}
        >
          <svg
            width={l.size}
            height={l.size}
            viewBox="0 0 14 16"
            fill="none"
            style={{ transform: `rotate(${l.rotate}deg)` }}
          >
            <path d={l.shape} fill={`hsl(40 72% 52% / ${l.opacity})`} />
            <path
              d={l.shape}
              stroke="hsl(40 72% 52%)"
              strokeWidth="0.3"
              fill="none"
              opacity={l.opacity * 2}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
