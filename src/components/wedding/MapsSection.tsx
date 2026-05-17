import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { SectionVine } from "./SectionDecorations";

const MapsSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-[-2]">
        <img src="/bg.jpeg" alt="Background" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-background/60 z-[-1]" />
      <div className="ambient-glow-warm" style={{ width: 300, height: 300, top: "0%", left: "-8%" }} />
      <div className="ambient-glow" style={{ width: 250, height: 250, bottom: "5%", right: "-6%" }} />
      <SectionVine side="left" />
      <SectionVine side="right" />
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Location</p>
          <h2 className="font-script text-5xl gradient-gold-text mb-4">Lokasi Acara</h2>
          <div className="divider-gold w-32 mx-auto" />
        </motion.div>

        <motion.div
          className="glass-strong rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://maps.google.com/maps?q=Jl.+Gajah+Raya,+Sambirejo,+Kec.+Gayamsari,+Kota+Semarang,+Jawa+Tengah+50166&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding venue location"
          />
            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="font-serif font-semibold text-foreground">Masjid Agung</p>
                <p className="font-sans-elegant text-xs text-muted-foreground mt-1 max-w-[250px]">Jl. Gajah Raya, Sambirejo, Kec. Gayamsari, Kota Semarang, Jawa Tengah 50166</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Jl.+Gajah+Raya,+Sambirejo,+Kec.+Gayamsari,+Kota+Semarang,+Jawa+Tengah+50166"
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-gold font-sans-elegant text-xs tracking-widest uppercase px-6 py-3 rounded-full text-primary-foreground inline-flex items-center gap-2"
            >
              <Navigation className="w-3 h-3" />
              Buka Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapsSection;
