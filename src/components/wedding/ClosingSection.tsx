import { RefObject, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import FloralFrame from "./FloralFrame";
import { Slider } from "@/components/ui/slider";
import { SectionVine, LocalGoldDust } from "./SectionDecorations";

interface ClosingSectionProps {
  audioRef: RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
}

const ClosingSection = ({ audioRef, isPlaying, setIsPlaying }: ClosingSectionProps) => {
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(50);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (val: number[]) => {
    const v = val[0];
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v / 100;
    }
  };

  return (
    <>
      <section className="py-32 px-6 relative overflow-hidden z-10">
        <FloralFrame positions={["top-left", "top-right", "bottom-left", "bottom-right"]} size="md" />
        <SectionVine side="left" />
        <SectionVine side="right" />
        <LocalGoldDust count={10} />
        
        <div className="absolute inset-0 z-[-2]">
          <img src="/bg.jpeg" alt="Background" className="w-full h-full object-cover opacity-80" />
        </div>
        <div className="absolute inset-0 bg-background/60 z-[-1]" />
        
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-6">Thank You</p>

            <h2 className="font-script text-4xl md:text-5xl gradient-gold-text mb-8 leading-relaxed">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya."
            </h2>

            <p className="font-serif text-sm text-muted-foreground mb-2">— QS. Ar-Rum: 21</p>

            <div className="divider-gold w-20 mx-auto my-10" />

            <motion.p
              className="font-serif text-lg text-foreground/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <p className="font-serif text-muted-foreground mb-2">Mohon do'a restu dari kami yang berbahagia,</p>
              <p className="font-serif text-muted-foreground mt-4 mb-1">Hormat Kami</p>
              <p className="font-script text-3xl gradient-gold-text">Jamin (Alm) - Parni</p>
              
              <div className="mt-10 pt-6 border-t border-primary/20 inline-block px-8">
                <p className="font-sans-elegant text-[10px] uppercase tracking-[0.2em] text-primary/80 mb-2">Informasi Lebih Lanjut</p>
                <p className="font-serif text-sm text-foreground/80 flex items-center justify-center gap-2">
                  <span>Contact Person:</span>
                  <a href="https://wa.me/6285850704044" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors font-semibold">
                    085850704044
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-border/30">
        <p className="font-sans-elegant text-[10px] tracking-widest uppercase text-muted-foreground">
          Made with love • Ayu & Nurohim Wedding 2026
        </p>
      </footer>

      {/* Music Control with equalizer and volume */}
      <div
        className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Volume slider */}
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass-strong rounded-full px-2 py-3 h-28 flex items-center"
          >
            <Slider
              orientation="vertical"
              value={[volume]}
              onValueChange={handleVolume}
              max={100}
              step={1}
              className="h-20"
            />
          </motion.div>
        )}

        <button
          onClick={toggleMusic}
          className="relative w-12 h-12 rounded-full glass-strong flex items-center justify-center glow-gold cursor-pointer transition-transform hover:scale-110"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Equalizer bars */}
          {isPlaying && (
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-[2px]">
              <div className="eq-bar" style={{ animationDuration: "0.4s" }} />
              <div className="eq-bar" style={{ animationDuration: "0.6s", animationDelay: "0.1s" }} />
              <div className="eq-bar" style={{ animationDuration: "0.5s", animationDelay: "0.2s" }} />
            </div>
          )}
          {isPlaying ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-primary/60" />}
        </button>
      </div>
    </>
  );
};

export default ClosingSection;
