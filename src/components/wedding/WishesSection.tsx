import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SectionVine } from "./SectionDecorations";
import { PremiumCardWrapper, FiligreeLine, CornerOrnament, premiumInputClass } from "./CardDecorations";

interface Wish {
  name: string;
  message: string;
  time: string;
}

const initialWishes: Wish[] = [
  { name: "Budi Santoso", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin 🤍", time: "2 jam lalu" },
  { name: "Rina Wati", message: "Bahagia selalu ya untuk kalian berdua! Semoga cinta kalian abadi selamanya 💛", time: "5 jam lalu" },
  { name: "Dani Pratama", message: "Happy wedding! Semoga dilancarkan acaranya dan diberkahi pernikahannya!", time: "1 hari lalu" },
];

const WishesSection = () => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [newWish, setNewWish] = useState({ name: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name || !newWish.message) return;
    setWishes([{ ...newWish, time: "Baru saja" }, ...wishes]);
    setNewWish({ name: "", message: "" });
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-[-2]">
        <img src="/bg.jpeg" alt="Background" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-background/60 z-[-1]" />
      <div className="ambient-glow" style={{ width: 280, height: 280, top: "10%", left: "-7%" }} />
      <div className="ambient-glow-warm" style={{ width: 220, height: 220, bottom: "15%", right: "-5%" }} />
      <SectionVine side="left" />
      <SectionVine side="right" />
      <div className="batik-pattern-local" />
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Wishes</p>
          <h2 className="font-script text-5xl gradient-gold-text mb-4">Ucapan & Doa</h2>
          <div className="divider-gold w-32 mx-auto" />
        </motion.div>

        {/* Submit form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <PremiumCardWrapper>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <FiligreeLine />
              <input
                type="text"
                placeholder="Nama Anda"
                value={newWish.name}
                onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                className={premiumInputClass}
              />
              <textarea
                placeholder="Tulis ucapan..."
                rows={3}
                value={newWish.message}
                onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
                className={`${premiumInputClass} resize-none`}
              />
              <FiligreeLine />
              <button
                type="submit"
                className="gradient-gold font-sans-elegant text-xs tracking-widest uppercase px-6 py-3 rounded-lg text-primary-foreground flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity shadow-[0_0_20px_hsl(35_55%_50%_/_0.3)]"
              >
                <MessageCircle className="w-3 h-3" />
                Kirim Ucapan
              </button>
            </form>
          </PremiumCardWrapper>
        </motion.div>

        <FiligreeLine />

        {/* Wishes list */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {wishes.map((wish, i) => (
            <motion.div
              key={`${wish.name}-${i}`}
              className="relative rounded-xl p-5 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, hsl(35 40% 90%), hsl(35 35% 85%))",
                boxShadow: "0 2px 10px hsl(30 20% 30% / 0.08)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <CornerOrnament position="top-right" />
              <CornerOrnament position="bottom-left" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-semibold text-[hsl(30_50%_20%)]">{wish.name}</span>
                  <span className="font-sans-elegant text-[10px] text-[hsl(30_40%_35%_/_0.6)]">{wish.time}</span>
                </div>
                <p className="font-serif text-sm text-[hsl(30_40%_35%)] leading-relaxed">{wish.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
