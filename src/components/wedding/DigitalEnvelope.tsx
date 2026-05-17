import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Gift } from "lucide-react";
import { SectionVine } from "./SectionDecorations";
import { PremiumCardWrapper, FiligreeLine } from "./CardDecorations";

const accounts = [
  { bank: "BSI", number: "7210408023", name: "NUROHIM" },
  { bank: "SEA BANK", number: "901428633139", name: "AYU ANDIKA VEMIDIAN" },
];

const DigitalEnvelope = () => {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="absolute inset-0 z-[-2]">
        <img src="/bg.jpeg" alt="Background" className="w-full h-full object-cover opacity-80" />
      </div>
      <div className="absolute inset-0 bg-background/60 z-[-1]" />
      <div className="ambient-glow" style={{ width: 260, height: 260, top: "15%", right: "-6%" }} />
      <div className="ambient-glow-warm" style={{ width: 200, height: 200, bottom: "5%", left: "-5%" }} />
      <SectionVine side="left" />
      <SectionVine side="right" />
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Wedding Gift</p>
          <h2 className="font-script text-5xl gradient-gold-text mb-4">Amplop Digital</h2>
          <div className="divider-gold w-32 mx-auto mb-6" />
          <p className="font-serif text-muted-foreground mb-8">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan amplop digital.
          </p>

          <motion.button
            onClick={() => setShow(!show)}
            className="gradient-gold font-sans-elegant text-sm tracking-widest uppercase px-8 py-3 rounded-full text-primary-foreground inline-flex items-center gap-2 shadow-[0_0_20px_hsl(35_55%_50%_/_0.3)] cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift className="w-4 h-4" />
            {show ? "Sembunyikan" : "Kirim Hadiah"}
          </motion.button>
        </motion.div>

        {show && (
          <motion.div
            className="mt-8 space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {accounts.map((acc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <PremiumCardWrapper>
                  <div className="p-6">
                    <FiligreeLine />
                    <p className="font-sans-elegant text-xs tracking-widest text-[hsl(30_40%_35%)] mb-1">{acc.bank}</p>
                    <p className="font-serif text-2xl font-semibold text-[hsl(30_50%_20%)] mb-1">{acc.number}</p>
                    <p className="font-serif text-sm text-[hsl(30_40%_35%_/_0.7)] mb-3">a.n. {acc.name}</p>
                    <FiligreeLine />
                    <button
                      onClick={() => copyToClipboard(acc.number, i)}
                      className="inline-flex items-center gap-2 gradient-gold px-4 py-2 rounded-lg text-primary-foreground font-sans-elegant text-xs tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_hsl(35_55%_50%_/_0.25)]"
                    >
                      {copied === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied === i ? "Tersalin!" : "Salin Nomor"}
                    </button>
                  </div>
                </PremiumCardWrapper>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DigitalEnvelope;
