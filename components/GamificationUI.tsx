import React, { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Target, TrendingUp, Coins, X } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

// --- HUD Component ---
export const GamificationHUD: React.FC = () => {
  const { stats } = useGamification();
  const progressPercent = (stats.currentXP / stats.nextLevelXP) * 100;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#0f0f16]/90 backdrop-blur-md border border-gray-700 rounded-full p-2 px-6 flex items-center gap-6 shadow-2xl z-[60] text-sm font-bold animate-in fade-in slide-in-from-top-4">
      {/* Level */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-electro-primary to-electro-secondary flex items-center justify-center text-white border-2 border-white/20">
          {stats.level}
        </div>
        <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase">Level</span>
            <span className="text-white leading-none">Scientist</span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="w-32 hidden md:block">
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>XP</span>
            <span>{stats.currentXP} / {stats.nextLevelXP}</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
            ></div>
        </div>
      </div>

      {/* Coins */}
      <div className="flex items-center gap-2 text-yellow-400">
          <Coins className="w-4 h-4 fill-current" />
          <span>{stats.coins}</span>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1 text-orange-400">
          <Zap className="w-4 h-4 fill-current" />
          <span>{stats.streak}</span>
      </div>
    </div>
  );
};

// --- XP Notification Toast ---
export const XPToast: React.FC = () => {
    const { lastEvent } = useGamification();
    const [visible, setVisible] = useState(false);
    const [event, setEvent] = useState(lastEvent);

    useEffect(() => {
        if (lastEvent.type && lastEvent.text) {
            setEvent(lastEvent);
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [lastEvent]);

    if (!visible || !event.type) return null;

    if (event.type === 'LEVEL_UP') return <LevelUpModal level={parseInt(event.text.split(' ')[1])} onClose={() => setVisible(false)} />;

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] animate-in slide-in-from-bottom-5 fade-in zoom-in duration-300">
            <div className={`
                px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border
                ${event.type === 'ACHIEVEMENT' ? 'bg-yellow-900/80 border-yellow-500 text-yellow-200' : 'bg-electro-primary/80 border-electro-glow text-white'}
            `}>
                {event.type === 'ACHIEVEMENT' ? <Trophy className="w-6 h-6 animate-bounce" /> : <Star className="w-6 h-6 text-yellow-300 animate-spin-slow" />}
                <div className="flex flex-col">
                    <span className="font-bold text-lg leading-none">+{event.amount} XP</span>
                    <span className="text-xs opacity-80">{event.text}</span>
                </div>
            </div>
        </div>
    );
};

// --- Level Up Modal ---
const LevelUpModal: React.FC<{ level: number, onClose: () => void }> = ({ level, onClose }) => (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-500">
        <div className="bg-[#151520] p-8 rounded-3xl border-2 border-electro-primary shadow-[0_0_50px_rgba(76,29,149,0.5)] text-center max-w-sm relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-electro-primary/20 to-transparent"></div>
            
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X /></button>
            
            <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl font-black text-white shadow-xl animate-bounce">
                    {level}
                </div>
                
                <div>
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">LEVEL UP!</h2>
                    <p className="text-gray-300 mt-2">أحسنت! لقد ارتقيت إلى مستوى جديد. 🔥</p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl w-full border border-white/10 mt-2">
                    <p className="text-sm text-gray-400">مكافأة المستوى</p>
                    <div className="flex justify-center items-center gap-2 text-yellow-400 font-bold text-xl">
                        <Coins className="w-6 h-6 fill-current" />
                        <span>+{level * 10} Coins</span>
                    </div>
                </div>

                <button onClick={onClose} className="bg-electro-primary hover:bg-electro-secondary text-white font-bold py-3 px-8 rounded-xl w-full transition-transform hover:scale-105">
                    متابعة التعلم
                </button>
            </div>
        </div>
    </div>
);
