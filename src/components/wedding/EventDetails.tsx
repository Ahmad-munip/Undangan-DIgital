import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Heart, Star, Sparkles } from "lucide-react";
import FloralFrame from "./FloralFrame";
import { SectionVine, LocalGoldDust } from "./SectionDecorations";
import { CornerOrnament, FloatingMiniHearts, FiligreeLine, DottedArcs, SwagGarland } from "./CardDecorations";

const events = [
  {
    title: "Akad Nikah",
    date: "Sabtu, 20 Juni 2026",
    time: "07:00 WIB",
    venue: "Masjid Agung",
    address: "Jl. Gajah Raya, Sambirejo, Kec. Gayamsari, Kota Semarang, Jawa Tengah 50166",
    icon: Star,
    patternType: "geometric" as const,
  },
  {
    title: "Resepsi",
    date: "Sabtu, 20 Juni 2026",
    time: "10:00 WIB",
    venue: "Masjid Agung",
    address: "Jl. Gajah Raya, Sambirejo, Kec. Gayamsari, Kota Semarang, Jawa Tengah 50166",
    icon: Heart,
    patternType: "floral" as const,
  },
];

const geometricPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a07830' stroke-width='0.5' opacity='0.15'%3E%3Cpolygon points='30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5'/%3E%3Cpolygon points='30,15 45,22.5 45,37.5 30,45 15,37.5 15,22.5'/%3E%3Cline x1='30' y1='5' x2='30' y2='15'/%3E%3Cline x1='55' y1='17.5' x2='45' y2='22.5'/%3E%3Cline x1='55' y1='42.5' x2='45' y2='37.5'/%3E%3Cline x1='30' y1='55' x2='30' y2='45'/%3E%3Cline x1='5' y1='42.5' x2='15' y2='37.5'/%3E%3Cline x1='5' y1='17.5' x2='15' y2='22.5'/%3E%3C/g%3E%3C/svg%3E")`;

const floralPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a07830' stroke-width='0.5' opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='8'/%3E%3Cellipse cx='30' cy='18' rx='4' ry='7'/%3E%3Cellipse cx='30' cy='42' rx='4' ry='7'/%3E%3Cellipse cx='18' cy='30' rx='7' ry='4'/%3E%3Cellipse cx='42' cy='30' rx='7' ry='4'/%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/svg%3E")`;

/* ─── Rosette / Medallion ─── */
const Rosette = () => (
  <div className="flex justify-center mb-2 pointer-events-none">
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="none" stroke="hsl(35 55% 50% / 0.2)" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="hsl(35 55% 50% / 0.15)" strokeWidth="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="20" y1="20"
          x2={20 + 12 * Math.cos((angle * Math.PI) / 180)}
          y2={20 + 12 * Math.sin((angle * Math.PI) / 180)}
          stroke="hsl(35 55% 50% / 0.12)"
          strokeWidth="0.4"
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="hsl(35 55% 50% / 0.1)" stroke="hsl(35 55% 50% / 0.2)" strokeWidth="0.5" />
      <circle cx="20" cy="20" r="1.5" fill="hsl(35 55% 50% / 0.25)" />
    </svg>
  </div>
);

/* ─── Icon with solid gold circle + sparkle ─── */
const IconWithRing = ({ icon: Icon }: { icon: typeof Calendar }) => (
  <div className="relative inline-flex items-center justify-center">
    <div className="w-9 h-9 rounded-full bg-[hsl(35_50%_48%_/_0.2)] flex items-center justify-center border border-[hsl(35_55%_50%_/_0.3)]">
      <Icon className="w-4 h-4 text-[hsl(30_50%_20%)] relative z-10" />
    </div>
    {/* Sparkle dots */}
    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-[hsl(35_55%_50%_/_0.4)] animate-sparkle-pop" />
    <div className="absolute -bottom-0.5 -left-1 w-1 h-1 rounded-full bg-[hsl(35_55%_50%_/_0.3)] animate-sparkle-pop" style={{ animationDelay: "0.6s" }} />
  </div>
);

/* ─── Floral Divider ─── */
const FloralDividerSmall = () => (
  <div className="flex items-center justify-center gap-2 my-4 pointer-events-none">
    <div className="h-px w-8 bg-gradient-to-r from-transparent to-[hsl(35_55%_45%_/_0.3)]" />
    <svg width="20" height="12" viewBox="0 0 20 12">
      <path d="M10,1 Q7,6 2,6 Q7,6 10,11 Q13,6 18,6 Q13,6 10,1Z" fill="hsl(35 55% 50% / 0.3)" />
      <circle cx="10" cy="6" r="1.5" fill="hsl(35 55% 50% / 0.4)" />
    </svg>
    <div className="h-px w-8 bg-gradient-to-l from-transparent to-[hsl(35_55%_45%_/_0.3)]" />
  </div>
);

/* ─── Event Card ─── */
const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12, shineX: x * 100, shineY: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0, shineX: 50, shineY: 50 });
    setIsHovered(false);
  }, []);

  const RibbonIcon = event.icon;
  const pattern = event.patternType === "geometric" ? geometricPattern : floralPattern;
  const parallaxOffset = { x: tilt.y * 0.3, y: tilt.x * 0.3 };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-default"
      custom={index}
      initial={{ opacity: 0, scale: 0.85, rotateY: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.25, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[2px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-border-rotate"
        style={{
          background: "conic-gradient(from var(--border-angle, 0deg), hsl(35 55% 50% / 0.1), hsl(35 60% 55% / 0.35), hsl(35 55% 50% / 0.1), hsl(35 60% 55% / 0.35))",
        }}
      />

      <div
        className="rounded-2xl p-8 text-center relative overflow-hidden transition-shadow duration-300"
        style={{
          background: "linear-gradient(145deg, hsl(35 40% 88%), hsl(35 35% 82%))",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
          boxShadow: isHovered
            ? `${-tilt.y * 1.5}px ${tilt.x * 1.5}px 40px hsl(35 50% 40% / 0.2), 0 0 30px hsl(35 55% 50% / 0.1)`
            : "0 4px 20px hsl(30 20% 30% / 0.15), 0 1px 4px hsl(30 20% 30% / 0.1)",
        }}
      >
        {/* Double border frame */}
        <div className="absolute inset-2 rounded-xl border border-[hsl(35_55%_50%_/_0.15)] pointer-events-none" />
        <div className="absolute inset-4 rounded-lg border border-dashed border-[hsl(35_55%_50%_/_0.08)] pointer-events-none" />

        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: pattern, backgroundSize: "60px 60px" }} />

        {/* Dotted arcs */}
        <DottedArcs />

        {/* Floating mini hearts */}
        <FloatingMiniHearts />

        {/* Shine sweep */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${tilt.shineX}% ${tilt.shineY}%, hsl(40 90% 80% / 0.2), transparent 60%)` }}
        />

        {/* Corner ornaments */}
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        {/* Rosette medallion */}
        <div style={{ transform: `translate(${-parallaxOffset.x}px, ${-parallaxOffset.y}px)` }}>
          <Rosette />
        </div>

        {/* Ribbon icon */}
        <div
          className="flex justify-center mb-2 pointer-events-none"
          style={{ transform: `translate(${-parallaxOffset.x}px, ${-parallaxOffset.y}px)` }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[hsl(35_55%_50%_/_0.25)] bg-[hsl(35_55%_50%_/_0.08)]">
            <RibbonIcon className="w-3 h-3 text-[hsl(30_50%_20%_/_0.6)]" />
            <span className="font-sans-elegant text-[10px] tracking-[0.2em] uppercase text-[hsl(30_50%_20%_/_0.6)]">
              {event.patternType === "geometric" ? "Holy Ceremony" : "Celebration"}
            </span>
            <RibbonIcon className="w-3 h-3 text-[hsl(30_50%_20%_/_0.6)]" />
          </div>
        </div>

        {/* Filigree line above title */}
        <FiligreeLine />

        {/* Title */}
        <h3
          className="font-script text-3xl text-[hsl(30_50%_20%)] mb-1"
          style={{ transform: `translate(${-parallaxOffset.x * 1.5}px, ${-parallaxOffset.y * 1.5}px)` }}
        >
          {event.title}
        </h3>

        {/* Filigree line below title */}
        <FiligreeLine />

        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: index * 0.25 + 0.3 } } }}
        >
          <motion.div
            className="flex items-center justify-center gap-3"
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            style={{ transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)` }}
          >
            <IconWithRing icon={Calendar} />
            <span className="font-serif text-lg text-[hsl(30_50%_20%)]">{event.date}</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-3"
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            style={{ transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)` }}
          >
            <IconWithRing icon={Clock} />
            <span className="font-serif text-lg text-[hsl(30_50%_20%)]">{event.time}</span>
          </motion.div>

          <FloralDividerSmall />

          <motion.div
            className="flex items-center justify-center gap-3"
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            style={{ transform: `translate(${parallaxOffset.x * 0.5}px, ${parallaxOffset.y * 0.5}px)` }}
          >
            <IconWithRing icon={MapPin} />
            <span className="font-serif text-lg font-semibold text-[hsl(30_50%_20%)]">{event.venue}</span>
          </motion.div>

          <motion.p
            className="font-sans-elegant text-sm text-[hsl(30_40%_35%)]"
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
          >
            {event.address}
          </motion.p>
        </motion.div>

        {/* Swag garland at bottom */}
        <SwagGarland />
      </div>
    </motion.div>
  );
};

const EventDetails = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-[-2]">
        <img src="/bg.jpeg" alt="Background" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-background/60 z-[-1]" />
      <FloralFrame positions={["top-left", "top-right"]} size="sm" />
      <FloralFrame positions={["bottom-left", "bottom-right"]} size="sm" />
      <SectionVine side="left" />
      <SectionVine side="right" />
      <LocalGoldDust count={8} />

      {Array.from({ length: 12 }).map((_, i) => (
        <div key={`star-${i}`} className="absolute rounded-full pointer-events-none"
          style={{ left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`, width: 2, height: 2, background: "hsl(40 80% 70%)", animation: `twinkle ${2 + Math.random() * 3}s ${Math.random() * 4}s ease-in-out infinite` }} />
      ))}

      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Save The Date</p>
          <h2 className="font-script text-5xl md:text-6xl gradient-gold-text mb-4">Waktu & Tempat</h2>
          <div className="divider-gold w-32 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, i) => (
            <EventCard key={event.title} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
