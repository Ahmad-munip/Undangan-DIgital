import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { MandalaRing } from "./FloralFrame";
import { SectionVine, LocalGoldDust } from "./SectionDecorations";

const stories = [
  { year: "2020", title: "Pertama Bertemu", desc: "Kami pertama kali bertemu di sebuah acara komunitas. Senyuman pertamamu yang membuatku jatuh hati." },
  { year: "2021", title: "Mulai Dekat", desc: "Dari teman menjadi sahabat, dari sahabat menjadi lebih. Setiap hari terasa istimewa bersamamu." },
  { year: "2023", title: "Lamaran", desc: "Dengan penuh keyakinan dan doa, aku memutuskan untuk melamarmu di bawah langit senja." },
  { year: "2026", title: "Pernikahan", desc: "Hari yang kita nantikan. Bersatu dalam ikatan suci, memulai perjalanan baru bersama." },
];

const storyVariants = {
  hidden: (isEven: boolean) => ({
    opacity: 0,
    x: isEven ? -60 : 60,
    scale: 0.9,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const LoveStory = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-[-2]">
        <img src="/bg.jpeg" alt="Background" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-background/60 z-[-1]" />
      <div className="ambient-glow" style={{ width: 350, height: 350, top: "10%", right: "-10%" }} />
      <div className="ambient-glow" style={{ width: 250, height: 250, bottom: "15%", left: "-8%" }} />
      <SectionVine side="left" />
      <SectionVine side="right" />
      <LocalGoldDust count={8} />

      {[
        { left: "5%", top: "20%", size: 90, opacity: 0.04 },
        { left: "80%", top: "50%", size: 120, opacity: 0.03 },
        { left: "40%", top: "80%", size: 80, opacity: 0.05 },
      ].map((b, i) => (
        <div key={`bokeh-${i}`} className="absolute rounded-full animate-bokeh pointer-events-none"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size, background: `radial-gradient(circle, hsl(40 60% 55% / ${b.opacity}), transparent 70%)`, filter: "blur(18px)", animationDuration: `${12 + i * 3}s` }} />
      ))}

      <div className="max-w-3xl mx-auto relative">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Our Journey</p>
          <h2 className="font-script text-5xl md:text-6xl gradient-gold-text mb-4">Love Story</h2>
          <div className="divider-gold w-32 mx-auto" />
        </motion.div>

        <MandalaRing size={180} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

        {/* Timeline with self-drawing line */}
        <div className="relative" ref={timelineRef}>
          {/* Static background line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent -translate-x-1/2" />
          {/* Animated drawing line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 origin-top"
            style={{
              height: lineHeight,
              background: "linear-gradient(to bottom, hsl(40 72% 52% / 0.5), hsl(40 90% 65% / 0.3))",
              boxShadow: "0 0 8px hsl(40 72% 52% / 0.3)",
            }}
          />

          {stories.map((story, i) => (
            <motion.div
              key={story.year}
              className={`relative flex items-center mb-16 last:mb-0 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              custom={i % 2 === 0}
              variants={storyVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={`w-5/12 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                <motion.span
                  className="font-sans-elegant text-xs tracking-widest text-primary inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {story.year}
                </motion.span>
                <motion.h3
                  className="font-serif text-xl font-semibold text-foreground mt-1 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {story.title}
                </motion.h3>
                <motion.p
                  className="font-serif text-sm text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {story.desc}
                </motion.p>
              </div>

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full glass-strong flex items-center justify-center glow-gold"
                whileInView={{ scale: [0, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              </motion.div>

              <div className="w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
