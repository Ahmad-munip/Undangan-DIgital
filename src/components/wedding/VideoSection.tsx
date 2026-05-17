import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import FloralFrame from "./FloralFrame";
import { SectionVine, LocalGoldDust } from "./SectionDecorations";

import VIDEO_PLACEHOLDER from "@/assets/video-placeholder.mp4";

const VideoSection = () => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-[-2]">
        <img src="/bg.jpeg" alt="Background" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-background/60 z-[-1]" />
      <FloralFrame positions={["top-left", "top-right"]} size="sm" />
      <SectionVine side="left" />
      <SectionVine side="right" />
      <LocalGoldDust count={6} />

      <div className="ambient-glow" style={{ width: 300, height: 300, top: "10%", left: "-8%" }} />
      <div className="ambient-glow" style={{ width: 250, height: 250, bottom: "5%", right: "-5%" }} />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Our Video</p>
          <h2 className="font-script text-5xl md:text-6xl gradient-gold-text mb-4">Our Moments</h2>
          <div className="divider-gold w-32 mx-auto" />
        </motion.div>

        {/* Video container with gold frame */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Gold border frame */}
          <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
            style={{
              border: "2px solid hsl(40 72% 52% / 0.3)",
              boxShadow: "inset 0 0 30px hsl(40 72% 52% / 0.1), 0 0 40px hsl(40 72% 52% / 0.15)",
            }}
          />

          {/* Corner gold accents */}
          {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
            <div
              key={pos}
              className={`absolute w-8 h-8 z-20 pointer-events-none ${
                pos === "top-left" ? "top-2 left-2" :
                pos === "top-right" ? "top-2 right-2" :
                pos === "bottom-left" ? "bottom-2 left-2" : "bottom-2 right-2"
              }`}
              style={{
                borderTop: pos.includes("top") ? "2px solid hsl(40 72% 52% / 0.5)" : "none",
                borderBottom: pos.includes("bottom") ? "2px solid hsl(40 72% 52% / 0.5)" : "none",
                borderLeft: pos.includes("left") ? "2px solid hsl(40 72% 52% / 0.5)" : "none",
                borderRight: pos.includes("right") ? "2px solid hsl(40 72% 52% / 0.5)" : "none",
              }}
            />
          ))}

          <div className="aspect-video relative bg-background/50">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              onEnded={() => setPlaying(false)}
            >
              <source src={VIDEO_PLACEHOLDER} type="video/mp4" />
            </video>

            {/* Play/Pause overlay */}
            <motion.button
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center z-10 cursor-pointer transition-opacity duration-300 ${playing ? "opacity-0 hover:opacity-100" : "opacity-100"}`}
              style={{ background: playing ? "transparent" : "hsl(25 20% 10% / 0.4)" }}
            >
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(40 90% 65% / 0.9), hsl(40 72% 52% / 0.9))",
                  boxShadow: "0 0 40px hsl(40 72% 52% / 0.5)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={!playing ? { boxShadow: ["0 0 20px hsl(40 72% 52% / 0.3)", "0 0 50px hsl(40 72% 52% / 0.6)", "0 0 20px hsl(40 72% 52% / 0.3)"] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {playing ? (
                  <Pause className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <Play className="w-8 h-8 text-primary-foreground ml-1" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.div>

        <motion.p
          className="text-center font-serif text-sm text-muted-foreground mt-6 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          "Setiap momen bersamamu adalah hadiah terindah"
        </motion.p>
      </div>
    </section>
  );
};

export default VideoSection;
