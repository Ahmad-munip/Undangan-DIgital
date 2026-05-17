import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, WifiOff, Database, ExternalLink } from "lucide-react";
import { SectionVine } from "./SectionDecorations";
import { PremiumCardWrapper, FiligreeLine, premiumInputClass, premiumSelectClass, premiumLabelClass } from "./CardDecorations";

const STORAGE_KEY = "wedding-rsvp-queue";
const SENT_KEY = "wedding-rsvp-demo-sent";
const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

interface RSVPData {
  nama: string;
  kehadiran: string;
  jumlah: string;
  ucapan: string;
  guestLink: string;
  userAgent: string;
  timestamp: number;
}

interface RSVPSectionProps {
  guestName?: string;
}

const readList = (key: string): RSVPData[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const writeList = (key: string, data: RSVPData[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const saveToQueue = (data: RSVPData) => {
  const queue = readList(STORAGE_KEY);
  queue.push(data);
  writeList(STORAGE_KEY, queue);
};

const saveToDemoSent = (data: RSVPData) => {
  const sent = readList(SENT_KEY);
  sent.unshift(data);
  writeList(SENT_KEY, sent.slice(0, 10));
};

const getQueueCount = (): number => readList(STORAGE_KEY).length;

const sendToSheet = async (data: RSVPData) => {
  if (!RSVP_ENDPOINT) {
    saveToDemoSent(data);
    return { ok: true, mode: "demo" as const };
  }

  await fetch(RSVP_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
  });

  return { ok: true, mode: "google-sheet" as const };
};

const syncQueue = async () => {
  if (!navigator.onLine) return 0;
  const queue = readList(STORAGE_KEY);
  if (!queue.length) return 0;

  const failed: RSVPData[] = [];
  let synced = 0;

  for (const item of queue) {
    try {
      await sendToSheet(item);
      synced += 1;
    } catch {
      failed.push(item);
    }
  }

  writeList(STORAGE_KEY, failed);
  return synced;
};

const RSVPSection = ({ guestName = "" }: RSVPSectionProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMode, setSubmitMode] = useState<"demo" | "google-sheet" | "queued" | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(getQueueCount);
  const [demoSent, setDemoSent] = useState<RSVPData[]>(() => readList(SENT_KEY));
  const [form, setForm] = useState({ nama: guestName, kehadiran: "hadir", jumlah: "1", ucapan: "" });

  useEffect(() => {
    setForm((current) => ({ ...current, nama: current.nama || guestName }));
  }, [guestName]);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      await syncQueue();
      setPendingCount(getQueueCount());
      setDemoSent(readList(SENT_KEY));
    };
    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", onOffline);
    handleOnline();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data: RSVPData = {
      ...form,
      guestLink: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };

    try {
      if (!navigator.onLine) {
        saveToQueue(data);
        setSubmitMode("queued");
      } else {
        const result = await sendToSheet(data);
        setSubmitMode(result.mode);
      }
      setPendingCount(getQueueCount());
      setDemoSent(readList(SENT_KEY));
      setSubmitted(true);
    } catch {
      saveToQueue(data);
      setSubmitMode("queued");
      setPendingCount(getQueueCount());
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden z-10">
      <div className="ambient-glow" style={{ width: 300, height: 300, top: "5%", right: "-8%" }} />
      <div className="ambient-glow-warm" style={{ width: 250, height: 250, bottom: "10%", left: "-6%" }} />
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
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-primary/70 mb-3">Confirmation</p>
          <h2 className="font-script text-5xl gradient-gold-text mb-4">RSVP</h2>
          <div className="divider-gold w-32 mx-auto" />
        </motion.div>



        {!isOnline && (
          <motion.div className="glass rounded-lg px-4 py-3 mb-6 flex items-center gap-3 text-primary" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <WifiOff className="w-4 h-4 shrink-0" />
            <p className="font-sans-elegant text-xs">Anda sedang offline. RSVP akan tersimpan dan dikirim otomatis saat online kembali.</p>
          </motion.div>
        )}

        {pendingCount > 0 && (
          <motion.div className="glass rounded-lg px-4 py-3 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="font-sans-elegant text-xs text-muted-foreground">{pendingCount} RSVP tersimpan menunggu sinkronisasi.</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} exit={{ opacity: 0, y: -20 }}>
              <PremiumCardWrapper>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  <FiligreeLine />

                  <div>
                    <label className={premiumLabelClass}>Nama</label>
                    <input type="text" required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} className={premiumInputClass} placeholder="Nama lengkap" />
                    <p className="mt-2 font-serif text-xs text-[hsl(30_40%_35%)]">Nama otomatis mengikuti link undangan personal.</p>
                  </div>

                  <div>
                    <label className={premiumLabelClass}>Kehadiran</label>
                    <select value={form.kehadiran} onChange={(e) => setForm({ ...form, kehadiran: e.target.value })} className={premiumSelectClass}>
                      <option value="hadir">Hadir</option>
                      <option value="tidak">Tidak Hadir</option>
                      <option value="ragu">Masih Ragu</option>
                    </select>
                  </div>

                  <div>
                    <label className={premiumLabelClass}>Jumlah Tamu</label>
                    <input type="number" min="1" max="5" value={form.jumlah} onChange={(e) => setForm({ ...form, jumlah: e.target.value })} className={premiumInputClass} />
                  </div>

                  <div>
                    <label className={premiumLabelClass}>Ucapan & Doa</label>
                    <textarea rows={4} value={form.ucapan} onChange={(e) => setForm({ ...form, ucapan: e.target.value })} className={`${premiumInputClass} resize-none`} placeholder="Tulis ucapan dan doa untuk kedua mempelai..." />
                  </div>

                  <FiligreeLine />

                  <button type="submit" disabled={isSubmitting} className="w-full gradient-gold font-sans-elegant text-sm tracking-widest uppercase py-4 rounded-lg text-primary-foreground flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_hsl(35_55%_50%_/_0.3)] disabled:opacity-60 disabled:cursor-wait">
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Mengirim..." : isOnline ? "Kirim RSVP" : "Simpan RSVP (Offline)"}
                  </button>
                </form>
              </PremiumCardWrapper>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <PremiumCardWrapper>
                <div className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-6 shadow-[0_0_25px_hsl(35_55%_50%_/_0.4)]">
                    <Check className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <FiligreeLine />
                  <h3 className="font-script text-3xl text-[hsl(30_50%_20%)] mb-3">Terima Kasih!</h3>
                  <FiligreeLine />
                  <p className="font-serif text-[hsl(30_40%_35%)]">
                    Konfirmasi kehadiran Anda telah berhasil kami terima.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 font-sans-elegant text-xs uppercase tracking-widest text-primary hover:underline cursor-pointer">
                    Kirim RSVP Lainnya
                  </button>
                </div>
              </PremiumCardWrapper>
            </motion.div>
          )}
        </AnimatePresence>


      </div>
    </section>
  );
};

export default RSVPSection;
