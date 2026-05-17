import { Heart, Sparkles } from "lucide-react";

/* ─── Corner Ornament ─── */
export const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scaleX(-1)",
    "bottom-left": "scaleY(-1)",
    "bottom-right": "scale(-1,-1)",
  };
  const positions: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <svg
      className={`absolute ${positions[position]} w-20 h-20 pointer-events-none card-corner-ornament`}
      viewBox="0 0 80 80"
      style={{ transform: transforms[position] }}
    >
      <path d="M0,0 C8,12 12,24 14,40 C16,28 20,18 32,10 C20,14 12,12 0,0Z" fill="hsl(35 55% 45% / 0.15)" />
      <path d="M0,0 C8,12 12,24 14,40" stroke="hsl(35 55% 50% / 0.4)" strokeWidth="1" fill="none" />
      <path d="M0,0 C12,8 24,12 40,14" stroke="hsl(35 55% 50% / 0.4)" strokeWidth="1" fill="none" />
      <path d="M4,4 C10,14 14,22 16,34" stroke="hsl(35 55% 50% / 0.2)" strokeWidth="0.6" fill="none" />
      <path d="M4,4 C14,10 22,14 34,16" stroke="hsl(35 55% 50% / 0.2)" strokeWidth="0.6" fill="none" />
      <ellipse cx="20" cy="8" rx="5" ry="2.5" fill="hsl(35 55% 50% / 0.12)" transform="rotate(25 20 8)" />
      <ellipse cx="8" cy="20" rx="2.5" ry="5" fill="hsl(35 55% 50% / 0.12)" transform="rotate(-25 8 20)" />
      <circle cx="10" cy="10" r="1.8" fill="hsl(35 55% 50% / 0.25)" />
      <circle cx="18" cy="18" r="1.2" fill="hsl(35 55% 50% / 0.2)" />
      <circle cx="25" cy="12" r="1" fill="hsl(35 55% 50% / 0.15)" />
      <circle cx="12" cy="25" r="1" fill="hsl(35 55% 50% / 0.15)" />
      <circle cx="30" cy="6" r="0.8" fill="hsl(35 55% 50% / 0.12)" />
      <circle cx="6" cy="30" r="0.8" fill="hsl(35 55% 50% / 0.12)" />
    </svg>
  );
};

/* ─── Floating Mini Hearts ─── */
export const FloatingMiniHearts = () => {
  const items = [
    { left: "10%", top: "15%", size: 8, delay: 0 },
    { left: "85%", top: "20%", size: 6, delay: 1.2 },
    { left: "20%", top: "75%", size: 7, delay: 2.4 },
    { left: "75%", top: "80%", size: 5, delay: 0.8 },
    { left: "50%", top: "10%", size: 6, delay: 1.8 },
    { left: "90%", top: "55%", size: 7, delay: 3.2 },
  ];
  return (
    <>
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-mini-float"
          style={{ left: item.left, top: item.top, animationDelay: `${item.delay}s` }}
        >
          {i % 2 === 0 ? (
            <Heart className="text-[hsl(35_55%_50%)] opacity-20" style={{ width: item.size, height: item.size }} fill="currentColor" />
          ) : (
            <Sparkles className="text-[hsl(35_55%_50%)] opacity-20" style={{ width: item.size, height: item.size }} />
          )}
        </div>
      ))}
    </>
  );
};

/* ─── Filigree Line ─── */
export const FiligreeLine = () => (
  <div className="flex items-center justify-center gap-2 my-3 pointer-events-none">
    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[hsl(35_55%_45%_/_0.3)]" />
    <svg width="24" height="8" viewBox="0 0 24 8">
      <path d="M0,4 Q6,0 12,4 Q18,8 24,4" stroke="hsl(35 55% 50% / 0.3)" strokeWidth="0.8" fill="none" />
      <circle cx="12" cy="4" r="1.5" fill="hsl(35 55% 50% / 0.3)" />
    </svg>
    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[hsl(35_55%_45%_/_0.3)]" />
  </div>
);

/* ─── Dotted Arcs ─── */
export const DottedArcs = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <svg className="absolute w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="none">
      <path d="M-20,80 Q150,20 320,80" fill="none" stroke="hsl(35 55% 50% / 0.08)" strokeWidth="1" strokeDasharray="3 6" />
      <path d="M-20,320 Q150,380 320,320" fill="none" stroke="hsl(35 55% 50% / 0.08)" strokeWidth="1" strokeDasharray="3 6" />
      <path d="M50,-10 Q10,200 50,410" fill="none" stroke="hsl(35 55% 50% / 0.05)" strokeWidth="1" strokeDasharray="2 8" />
      <path d="M250,-10 Q290,200 250,410" fill="none" stroke="hsl(35 55% 50% / 0.05)" strokeWidth="1" strokeDasharray="2 8" />
    </svg>
  </div>
);

/* ─── Swag Garland ─── */
export const SwagGarland = () => (
  <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
    <svg width="100%" height="30" viewBox="0 0 300 30" preserveAspectRatio="none">
      <path d="M0,5 Q37.5,25 75,5 Q112.5,25 150,5 Q187.5,25 225,5 Q262.5,25 300,5" fill="none" stroke="hsl(35 55% 50% / 0.15)" strokeWidth="0.8" />
      <path d="M0,8 Q37.5,28 75,8 Q112.5,28 150,8 Q187.5,28 225,8 Q262.5,28 300,8" fill="none" stroke="hsl(35 55% 50% / 0.08)" strokeWidth="0.5" />
      {[37.5, 112.5, 187.5, 262.5].map((x) => (
        <g key={x}>
          <line x1={x} y1="25" x2={x} y2="30" stroke="hsl(35 55% 50% / 0.12)" strokeWidth="0.5" />
          <circle cx={x} cy="30" r="1.5" fill="hsl(35 55% 50% / 0.15)" />
        </g>
      ))}
    </svg>
  </div>
);

/* ─── Premium Card Wrapper ─── */
export const PremiumCardWrapper = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative group ${className}`}>
    {/* Animated gradient border */}
    <div
      className="absolute -inset-[2px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-border-rotate"
      style={{
        background: "conic-gradient(from var(--border-angle, 0deg), hsl(35 55% 50% / 0.1), hsl(35 60% 55% / 0.35), hsl(35 55% 50% / 0.1), hsl(35 60% 55% / 0.35))",
      }}
    />
    <div
      className="rounded-2xl relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, hsl(35 40% 88%), hsl(35 35% 82%))",
        boxShadow: "0 4px 20px hsl(30 20% 30% / 0.15), 0 1px 4px hsl(30 20% 30% / 0.1)",
      }}
    >
      {/* Double border frame */}
      <div className="absolute inset-2 rounded-xl border border-[hsl(35_55%_50%_/_0.15)] pointer-events-none" />
      <div className="absolute inset-4 rounded-lg border border-dashed border-[hsl(35_55%_50%_/_0.08)] pointer-events-none" />

      {/* Dotted arcs background */}
      <DottedArcs />

      {/* Corner ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Floating hearts */}
      <FloatingMiniHearts />

      {/* Swag garland */}
      <SwagGarland />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  </div>
);

/* ─── Premium input styling (use as className) ─── */
export const premiumInputClass =
  "w-full bg-[hsl(35_40%_92%)] border border-[hsl(35_45%_65%_/_0.4)] rounded-lg px-4 py-3 font-serif text-[hsl(30_50%_20%)] placeholder:text-[hsl(30_40%_35%_/_0.5)] focus:outline-none focus:ring-2 focus:ring-[hsl(35_55%_50%_/_0.5)] transition-all";

export const premiumLabelClass =
  "block font-sans-elegant text-xs tracking-widest uppercase text-[hsl(30_40%_35%)] mb-2";

export const premiumSelectClass =
  `${premiumInputClass} appearance-none bg-no-repeat bg-[length:16px_16px] bg-[position:right_12px_center] pr-10` +
  ` bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238B7355' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")]`;
