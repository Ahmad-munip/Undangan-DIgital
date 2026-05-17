import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import FloralFrame from "./FloralFrame";
import { SectionVine, LocalGoldDust } from "./SectionDecorations";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const Gallery = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <FloralFrame positions={["top-left", "top-right", "bottom-left", "bottom-right"]} size="sm" />
      <SectionVine side="left" />
      <SectionVine side="right" />
      <LocalGoldDust count={8} />

      <div className="ambient-glow" style={{ width: 300, height: 300, top: "5%", left: "-5%" }} />
      <div className="ambient-glow" style={{ width: 250, height: 250, bottom: "10%", right: "-5%" }} />

      {[
        { left: "5%", top: "40%", size: 14 },
        { left: "90%", top: "30%", size: 10 },
        { left: "50%", top: "85%", size: 12 },
      ].map((orb, i) => (
        <motion.div key={`orb-${i}`} className="absolute rounded-full pointer-events-none"
          style={{ left: orb.left, top: orb.top, width: orb.size, height: orb.size, background: "radial-gradient(circle, hsl(40 80% 60% / 0.35), transparent)", boxShadow: "0 0 12px hsl(40 72% 52% / 0.2)" }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      <div className="max-w-5xl mx-auto relative">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Moments</p>
          <h2 className="font-script text-5xl md:text-6xl gradient-gold-text mb-4">Gallery</h2>
          <div className="divider-gold w-32 mx-auto" />
        </motion.div>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="break-inside-avoid cursor-pointer relative group mb-4 reveal-card"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
              onClick={() => setSelected(img)}
            >
              <div className="relative overflow-hidden rounded-2xl border-[6px] border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-hover:shadow-[0_12px_40px_hsl(40_72%_52%_/_0.15)] transition-all duration-500">
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" loading="lazy" />
                
                {/* Elegant gold overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-white/90 shadow-[0_0_20px_hsl(40_72%_52%_/_0.4)] flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 scale-75 group-hover:scale-100">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <button className="absolute top-6 right-6 text-foreground/60 hover:text-foreground transition-colors bg-white/50 hover:bg-white rounded-full p-2 backdrop-blur-md" onClick={() => setSelected(null)}>
              <X className="w-6 h-6" />
            </button>
            <motion.img src={selected} alt="Gallery preview" className="max-w-full max-h-[85vh] rounded-xl object-contain border-[12px] border-white shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
