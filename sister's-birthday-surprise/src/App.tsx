/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Music, Camera, Sparkles, Star, PartyPopper, Volume2, VolumeX } from 'lucide-react';

// --- Types ---
interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocity: { x: number; y: number };
}

// --- Components ---

const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        const newPiece: ConfettiPiece = {
          id: nextId.current++,
          x: Math.random() * 100,
          y: -10,
          color: ['#FF69B4', '#FFB6C1', '#FFD700', '#87CEEB', '#DDA0DD'][Math.floor(Math.random() * 5)],
          size: Math.random() * 10 + 5,
          rotation: Math.random() * 360,
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: Math.random() * 3 + 2,
          },
        };
        setPieces((prev) => [...prev.slice(-50), newPiece]);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setPieces([]);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: p.rotation }}
          animate={{
            y: '110vh',
            x: `${p.x + p.velocity.x * 10}vw`,
            rotate: p.rotation + 360,
          }}
          transition={{ duration: 3, ease: 'linear' }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
};

const PhotoCard = ({ src, alt, delay }: { src: string; alt: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
    whileInView={{ opacity: 1, scale: 1, rotate: Math.random() * 10 - 5 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
    className="relative group cursor-pointer"
  >
    <div className="bg-white p-3 pb-12 shadow-xl rounded-sm transform transition-transform group-hover:scale-105 group-hover:rotate-0">
      <img
        src={src}
        alt={alt}
        className="w-full h-48 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-500"
        referrerPolicy="no-referrer"
      />
      <div className="absolute bottom-4 left-0 right-0 text-center font-serif italic text-gray-600 text-sm">
        {alt}
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [isSurpriseActive, setIsSurpriseActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleSurprise = () => {
    setIsSurpriseActive(true);
    setShowPopup(true);
    setTimeout(() => {
      setIsSurpriseActive(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] text-[#4A4A4A] font-sans overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      <Confetti active={isSurpriseActive} />

      {/* Floating Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 left-10 text-pink-400"
        >
          <Heart size={48} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-1/4 right-10 text-purple-400"
        >
          <Star size={40} fill="currentColor" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 text-yellow-400"
        >
          <Sparkles size={32} />
        </motion.div>
      </div>

      {/* Header / Hero */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-block mb-6 p-2 px-4 bg-pink-100 text-pink-600 rounded-full text-xs font-bold tracking-widest uppercase">
            Happy Birthday Sister!
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#2D2D2D] mb-4 tracking-tight">
            To My <span className="text-pink-500 italic">Favorite</span> Person
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto leading-relaxed mb-8">
            Wishing you a day filled with love, laughter, and all the things that make you smile. You deserve the world!
          </p>
          
          <div className="flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSurprise}
              className="bg-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-pink-200 flex items-center gap-2 hover:bg-pink-600 transition-colors"
            >
              <PartyPopper size={20} />
              The Surprise!
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white text-gray-700 px-6 py-4 rounded-full font-bold shadow-md flex flex-col items-center border border-gray-100 min-w-[160px]"
            >
              <div className="flex items-center gap-2">
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
                {isPlaying ? 'Music On' : 'Music Off'}
              </div>
              <span className="text-[10px] text-pink-400 mt-1 uppercase tracking-tighter">Where Is the Party 🎵</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-gray-300"
        >
          <div className="w-px h-12 bg-current mx-auto mb-2" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        </motion.div>
      </header>

      {/* Message Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gray-100" />
            <Heart className="text-pink-300" fill="currentColor" size={20} />
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-serif italic text-gray-800">Dear Sister,</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Growing up with you has been the greatest adventure. You're not just my sister, but my best friend, my confidant, and my biggest inspiration. 
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Today, we celebrate YOU. Your kindness, your strength, and that beautiful smile that lights up every room. May this year bring you as much joy as you bring to everyone around you.
            </p>
            <div className="pt-8">
              <p className="font-serif text-2xl text-pink-500">Love always,</p>
              <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">Your Biggest Fan</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 px-4 bg-[#FFF5F7]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <Camera className="text-pink-400 mb-4" size={32} />
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">Captured Moments</h2>
            <p className="text-gray-500">A few of my favorite memories with you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <PhotoCard 
              src="https://picsum.photos/seed/sister1/600/800" 
              alt="That summer trip" 
              delay={0.1} 
            />
            <PhotoCard 
              src="https://picsum.photos/seed/sister2/600/800" 
              alt="Our silly faces" 
              delay={0.2} 
            />
            <PhotoCard 
              src="https://picsum.photos/seed/sister3/600/800" 
              alt="Always together" 
              delay={0.3} 
            />
            <PhotoCard 
              src="https://picsum.photos/seed/sister4/600/800" 
              alt="Best day ever" 
              delay={0.4} 
            />
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-pink-50 rounded-3xl text-center"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Gift className="text-pink-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Infinite Joy</h3>
            <p className="text-gray-600 text-sm">May your heart always be full of happiness and your days be bright.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-purple-50 rounded-3xl text-center"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Star className="text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">Big Dreams</h3>
            <p className="text-gray-600 text-sm">Chase every dream you have. I'll always be here to cheer you on.</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 bg-yellow-50 rounded-3xl text-center"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Music className="text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Sweet Melodies</h3>
            <p className="text-gray-600 text-sm">May your life be a beautiful song that never ends.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">
          Made with Love &bull; 2024
        </p>
      </footer>

      {/* Surprise Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="text-pink-500" size={40} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">Surprise!!!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                You're the best sister anyone could ask for! I hope you have the most magical birthday ever! 🎂✨
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold hover:bg-pink-600 transition-colors"
              >
                Yay!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
