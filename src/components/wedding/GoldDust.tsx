import { useMemo } from "react";

const GoldDust = ({ count = 50 }: { count?: number }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 12,
        opacity: 0.1 + Math.random() * 0.2,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-dust"
          style={{
            left: `${p.left}%`,
            bottom: "-2%",
            width: p.size,
            height: p.size,
            background: `hsl(40 80% 60% / ${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default GoldDust;
