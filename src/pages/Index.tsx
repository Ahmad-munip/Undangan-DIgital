import { useState, useRef, lazy, Suspense } from "react";

import SplashScreen from "@/components/wedding/SplashScreen";
import HeroSection from "@/components/wedding/HeroSection";
import FloatingPetals from "@/components/wedding/FloatingPetals";
import ScrollProgress from "@/components/wedding/ScrollProgress";
import EventDetails from "@/components/wedding/EventDetails";
import CountdownTimer from "@/components/wedding/CountdownTimer";
import LoveStory from "@/components/wedding/LoveStory";
import Gallery from "@/components/wedding/Gallery";
import RSVPSection from "@/components/wedding/RSVPSection";
import DigitalEnvelope from "@/components/wedding/DigitalEnvelope";
import WishesSection from "@/components/wedding/WishesSection";
import MapsSection from "@/components/wedding/MapsSection";
import ClosingSection from "@/components/wedding/ClosingSection";
import VideoSection from "@/components/wedding/VideoSection";
import { FloralDivider, FloatingDiamonds } from "@/components/wedding/FloralFrame";
import TwinklingStars from "@/components/wedding/TwinklingStars";
import BokehCircles from "@/components/wedding/BokehCircles";
import VineRoots from "@/components/wedding/VineRoots";
import FloatingLeaves from "@/components/wedding/FloatingLeaves";
import GoldDust from "@/components/wedding/GoldDust";
import AnimatedBackdrop from "@/components/wedding/AnimatedBackdrop";
import { useIsMobile } from "@/hooks/use-mobile";
import { getGuestNameFromUrl } from "@/lib/guest";

const Particles3D = lazy(() => import("@/components/wedding/Particles3D"));

import MUSIC_URL from "@/assets/wedding-music.mp3";

const Index = () => {
  const [splashOpen, setSplashOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();
  const guestName = getGuestNameFromUrl();

  const handleOpenInvitation = () => {
    setSplashOpen(false);
    if (!audioRef.current) {
      const audio = new Audio(MUSIC_URL);
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});

    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className={`bg-background ${splashOpen ? "h-screen overflow-hidden" : "min-h-screen"} lg:flex lg:items-start`}>
      
      {/* LEFT PANE: Desktop Only Fixed Video Cover */}
      <div className="hidden lg:flex lg:w-[60%] lg:sticky lg:top-0 lg:h-screen lg:flex-col lg:items-center lg:justify-center text-center overflow-hidden">
         <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover">
            <source src="/background.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-black/20" />
         
         <div className="relative z-10 text-white mt-auto pb-32 flex flex-col items-center">
           <p className="font-script text-4xl mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">The Wedding of</p>
           <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-widest mb-4 uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">Risma & Munip</h1>
           <p className="font-sans text-xl tracking-widest font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Sabtu, 20 Juni 2026</p>
         </div>
      </div>

      {/* RIGHT PANE (Desktop) / FULL (Mobile) */}
      <div className="w-full lg:w-[40%] relative bg-background border-l border-primary/20 shadow-2xl">
        {/* Batik pattern background layer */}
        <div className="batik-pattern" />
      
      <SplashScreen isOpen={splashOpen} onOpen={handleOpenInvitation} guestName={guestName} />

      <div className="relative z-[2]">
            <ScrollProgress />
            <AnimatedBackdrop />
            <FloatingPetals />
            <FloatingDiamonds />
            <TwinklingStars />
            <BokehCircles />
            <VineRoots />
            <FloatingLeaves />
            <GoldDust />
            {!isMobile && (
              <Suspense fallback={null}>
                <Particles3D count={160} speed={0.1} size={0.014} />
              </Suspense>
            )}
            <HeroSection guestName={guestName} />
            <FloralDivider />
            <EventDetails />
            <CountdownTimer />
            <FloralDivider />
            <LoveStory />
            <FloralDivider />
            <Gallery />
            <FloralDivider variant="simple" />
            <VideoSection />
            <FloralDivider />
            <RSVPSection guestName={guestName} />
            <DigitalEnvelope />
            <FloralDivider />
            <WishesSection />
            <MapsSection />
            <ClosingSection audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
      </div>
    </div>
  );
};

export default Index;