import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import FloralFrame from "./FloralFrame";
import { MandalaRing } from "./FloralFrame";
import { SectionVine, LocalGoldDust } from "./SectionDecorations";
import { useIsMobile } from "@/hooks/use-mobile";

const HERO_VIDEO_URL = "/background.mp4";

const WordReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split("");
  return (
    <span className={className}>
      {words.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: "easeOut" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

interface HeroSectionProps {
  guestName?: string;
}

const HeroSection = ({ guestName }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
      <FloralFrame positions={["top-left", "top-right", "bottom-left", "bottom-right"]} size="lg" />
      <MandalaRing size={350} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
      
      <div className="ambient-glow" style={{ width: 400, height: 400, top: "20%", left: "-10%" }} />
      <div className="ambient-glow" style={{ width: 300, height: 300, bottom: "10%", right: "-5%" }} />
      
      <SectionVine side="left" />
      <SectionVine side="right" />
      <LocalGoldDust count={10} />

      {/* Floating orbs */}
      {[
        { left: "10%", top: "30%", size: 18, delay: 0 },
        { left: "85%", top: "25%", size: 12, delay: 1.5 },
        { left: "70%", top: "65%", size: 15, delay: 3 },
        { left: "20%", top: "70%", size: 10, delay: 2 },
        { left: "50%", top: "15%", size: 14, delay: 4 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: orb.left, top: orb.top, width: orb.size, height: orb.size,
            background: "radial-gradient(circle, hsl(40 80% 60% / 0.7), transparent)",
            boxShadow: "0 0 15px hsl(40 72% 52% / 0.6)",
          }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5 + i, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Parallax Video/Image Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          <video
            autoPlay muted loop playsInline preload="metadata"
            poster={heroBg}
            className="absolute inset-0 h-full w-full object-cover lg:hidden"
            onError={(e) => { (e.target as HTMLVideoElement).style.display = "none"; }}
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        <img src={heroBg} alt="Hero background" className="absolute inset-0 h-full w-full object-cover -z-10" />
        <div className="absolute inset-0 bg-background/20" />
      </motion.div>

      {/* Content with parallax and animated frame */}
      <motion.div className="relative z-10 w-full max-w-[400px] h-[85vh] max-h-[750px] mx-auto text-center px-4 flex flex-col items-center justify-center" style={{ y: contentY }}>
        
        {/* Animated Ornate Frame */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <svg viewBox="0 0 400 700" preserveAspectRatio="xMidYMid meet" className="w-full h-full drop-shadow-xl">
            {/* Outer Frame */}
            <motion.path
               d="M 20 120 L 20 100 L 60 100 L 60 60 Q 200 -20, 340 60 L 340 100 L 380 100 L 380 120 L 380 580 L 380 600 L 340 600 L 340 640 Q 200 720, 60 640 L 60 600 L 20 600 Z"
               stroke="hsl(40 72% 52%)" strokeWidth="2"
               initial={{ pathLength: 0, opacity: 0, fill: "rgba(255, 255, 255, 0)" }}
               whileInView={{ pathLength: 1, opacity: 1, fill: "rgba(255, 255, 255, 0.85)" }}
               viewport={{ once: true }}
               transition={{ duration: 3, delay: 3.5, ease: "easeInOut" }}
            />
            {/* Inner Frame */}
            <motion.path
               d="M 30 125 L 30 110 L 70 110 L 70 70 Q 200 0, 330 70 L 330 110 L 370 110 L 370 125 L 370 575 L 370 590 L 330 590 L 330 630 Q 200 700, 70 630 L 70 590 L 30 590 Z"
               stroke="hsl(40 72% 52% / 0.6)" strokeWidth="1" fill="none"
               initial={{ pathLength: 0, opacity: 0 }}
               whileInView={{ pathLength: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 3, delay: 3.8, ease: "easeInOut" }}
            />
            {/* Top Crown Ornament */}
            <motion.path
               d="M 180 50 Q 200 20 220 50 Q 210 60 200 55 Q 190 60 180 50 Z"
               stroke="hsl(40 72% 52%)" strokeWidth="1.5" fill="none"
               initial={{ scale: 0, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 5.5, ease: "easeOut" }}
               style={{ transformOrigin: "200px 40px" }}
            />
            {/* Bottom Crown Ornament */}
            <motion.path
               d="M 180 650 Q 200 680 220 650 Q 210 640 200 645 Q 190 640 180 650 Z"
               stroke="hsl(40 72% 52%)" strokeWidth="1.5" fill="none"
               initial={{ scale: 0, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, delay: 5.5, ease: "easeOut" }}
               style={{ transformOrigin: "200px 660px" }}
            />
          </svg>
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full mt-4">
        <motion.p
          className="font-sans-elegant text-xs tracking-[0.4em] uppercase text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          We Are Getting Married
        </motion.p>

        <h1 className="font-script text-4xl sm:text-5xl md:text-7xl lg:text-8xl gradient-gold-text text-glow-gold mb-2 whitespace-nowrap">
          <WordReveal text="Risma Mawlina" delay={3.8} />
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 4.3 }}
          className="mb-8"
        >
          <p className="font-serif text-lg text-foreground font-semibold mt-2">Risma Mawlina</p>
          <p className="font-sans-elegant text-xs text-foreground/70 mt-1">Lahir: 20 Juni 2005</p>
          <p className="font-sans-elegant text-xs text-foreground/70 mt-1">Dk Kertosari RT01/06 Kelurahan Kasepuhan<br/>Kecamatan Batang</p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6 mb-4"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4.3, duration: 0.6 }}
        >
          <div className="divider-gold w-20" />
          <motion.span
            className="font-script text-3xl text-primary"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            &
          </motion.span>
          <div className="divider-gold w-20" />
        </motion.div>

        <h1 className="font-script text-4xl sm:text-5xl md:text-7xl lg:text-8xl gradient-gold-text text-glow-gold mb-2 whitespace-nowrap">
          <WordReveal text="Ahmad Munip" delay={4.1} />
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 4.6 }}
          className="mb-8"
        >
          <p className="font-serif text-lg text-foreground font-semibold mt-2">Ahmad Munip</p>
          <p className="font-sans-elegant text-xs text-foreground/70 mt-1">Lahir: 17 Agustus 2004</p>
          <p className="font-sans-elegant text-xs text-foreground/70 mt-1">Tanggungharjo<br/>Grobogan, Jawa Tengah</p>
        </motion.div>

        <motion.p
          className="font-serif text-lg md:text-xl text-foreground/80 tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 4.7 }}
        >
          10 . 06 . 2026
        </motion.p>

        {guestName && (
          <motion.div
            className="mt-8 inline-flex flex-col items-center rounded-full border border-primary/40 bg-background/80 px-6 py-3 backdrop-blur-md"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 4.85 }}
          >
            <span className="font-sans-elegant text-[10px] uppercase tracking-[0.28em] text-primary/70">Kepada Yth.</span>
            <span className="font-serif text-lg text-foreground/90">{guestName}</span>
          </motion.div>
        )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ y: [0, 10, 0], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, delay: 5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 rounded-full bg-primary/60"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
