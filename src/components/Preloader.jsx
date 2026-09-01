import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiChefToque, GiKnifeFork, GiHotMeal, GiSparkles } from 'react-icons/gi';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Igniting kitchen fires...");

  useEffect(() => {
    const textInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(textInterval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        
        const next = prev + 3;
        if (next > 75) setLoadingText("Plating perfection...");
        else if (next > 45) setLoadingText("Garnishing with artisanal herbs...");
        else if (next > 20) setLoadingText("Selecting farm-fresh ingredients...");
        
        return next;
      });
    }, 45);

    return () => clearInterval(textInterval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b] text-white px-6 overflow-hidden"
    >
      {/* Ambient glowing background aura */}
      <div className="absolute w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Center animated culinary icon composite */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Spinning Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-dashed border-brand-500/40"
        />

        {/* Pulsing Cloche / Plate Backdrop */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-brand-600/30 via-zinc-900 to-amber-500/20 border border-brand-500/40 flex items-center justify-center shadow-2xl shadow-brand-500/30"
        >
          {/* Steam animation particles */}
          <div className="absolute -top-6 flex gap-1.5 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  y: [-2, -20, -32],
                  opacity: [0, 0.8, 0],
                  scale: [0.8, 1.2, 1.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: "easeOut",
                }}
                className="w-1.5 h-6 bg-gradient-to-t from-brand-400/80 to-transparent rounded-full blur-[0.5px]"
              />
            ))}
          </div>

          <GiChefToque className="w-14 h-14 sm:w-16 sm:h-16 text-brand-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.8)]" />
        </motion.div>

        {/* Orbiting Cutlery */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute w-44 h-44 pointer-events-none flex items-center justify-between"
        >
          <div className="p-2 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-400 shadow-md">
            <GiKnifeFork className="w-5 h-5" />
          </div>
          <div className="p-2 rounded-full bg-zinc-900 border border-brand-500/40 text-brand-400 shadow-md">
            <GiHotMeal className="w-5 h-5" />
          </div>
        </motion.div>
      </div>

      {/* Brand Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-wider bg-gradient-to-r from-amber-200 via-brand-400 to-amber-500 bg-clip-text text-transparent">
          SAVORIA LUXE
        </h1>
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-zinc-400 mt-1 font-medium">
          Artisanal Dining Experience
        </p>
      </motion.div>

      {/* Progress Bar & Subtext */}
      <div className="w-64 sm:w-80 flex flex-col items-center gap-2">
        <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden p-[1px] border border-zinc-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-500 via-amber-400 to-brand-500 rounded-full shadow-[0_0_12px_rgba(234,88,12,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between w-full text-xs text-zinc-400 font-mono mt-1">
          <span className="text-zinc-300 transition-all duration-300">{loadingText}</span>
          <span className="text-brand-400 font-bold">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
