import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserStats, Achievement, Mission } from '../types';

interface GamificationContextType {
  stats: UserStats;
  achievements: Achievement[];
  missions: Mission[];
  addXP: (amount: number, source?: string) => void;
  unlockAchievement: (id: string) => void;
  updateMissionProgress: (missionId: string, amount?: number) => void;
  lastEvent: { type: 'XP' | 'LEVEL_UP' | 'ACHIEVEMENT' | null, text: string, amount: number };
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const INITIAL_STATS: UserStats = {
  level: 1,
  currentXP: 0,
  nextLevelXP: 100,
  coins: 0,
  streak: 1,
  totalTimeMinutes: 0,
  completedExercises: 0,
  circuitsBuilt: 0
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'start_electric', title: 'Electric Starter', description: 'قم بتشغيل أول دائرة كهربائية ناجحة', icon: 'Zap', unlocked: false, xpReward: 50 },
  { id: 'logic_master', title: 'Logic Master', description: 'حل 5 مسائل منطقية', icon: 'Cpu', unlocked: false, xpReward: 100 },
  { id: 'sim_hero', title: 'Simulator Hero', description: 'قم ببناء 3 دوائر معقدة', icon: 'Activity', unlocked: false, xpReward: 150 },
  { id: 'quiz_wiz', title: 'Quiz Wizard', description: 'أجب على 10 أسئلة بشكل صحيح', icon: 'BookOpen', unlocked: false, xpReward: 80 },
];

const INITIAL_MISSIONS: Mission[] = [
  { id: 'daily_1', title: 'حل 3 تمارين', target: 3, current: 0, type: 'DAILY', rewardXP: 50, rewardCoins: 10, completed: false },
  { id: 'daily_2', title: 'قم بتشغيل محاكاة', target: 1, current: 0, type: 'DAILY', rewardXP: 30, rewardCoins: 5, completed: false },
  { id: 'weekly_1', title: 'اجمع 500 نقطة خبرة', target: 500, current: 0, type: 'WEEKLY', rewardXP: 200, rewardCoins: 50, completed: false },
];

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [lastEvent, setLastEvent] = useState<{ type: 'XP' | 'LEVEL_UP' | 'ACHIEVEMENT' | null, text: string, amount: number }>({ type: null, text: '', amount: 0 });

  // Load from local storage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem('electro_stats');
    if (savedStats) setStats(JSON.parse(savedStats));
    const savedAch = localStorage.getItem('electro_achievements');
    if (savedAch) setAchievements(JSON.parse(savedAch));
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem('electro_stats', JSON.stringify(stats));
    localStorage.setItem('electro_achievements', JSON.stringify(achievements));
  }, [stats, achievements]);

  const addXP = (amount: number, source: string = 'Activity') => {
    setStats(prev => {
      let newXP = prev.currentXP + amount;
      let newLevel = prev.level;
      let newNextLevelXP = prev.nextLevelXP;
      let leveledUp = false;

      // Level Up Logic: Curve gets steeper
      while (newXP >= newNextLevelXP) {
        newXP -= newNextLevelXP;
        newLevel++;
        newNextLevelXP = Math.floor(newNextLevelXP * 1.2) + 50;
        leveledUp = true;
      }

      if (leveledUp) {
        setLastEvent({ type: 'LEVEL_UP', text: `Level ${newLevel}!`, amount: 0 });
        // Award level up coins
        return { 
          ...prev, 
          level: newLevel, 
          currentXP: newXP, 
          nextLevelXP: newNextLevelXP,
          coins: prev.coins + (newLevel * 10) 
        };
      } else {
        setLastEvent({ type: 'XP', text: source, amount: amount });
        return { ...prev, currentXP: newXP };
      }
    });

    // Check weekly mission (XP collection)
    updateMissionProgress('weekly_1', amount);
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const exists = prev.find(a => a.id === id);
      if (exists && !exists.unlocked) {
        addXP(exists.xpReward, `Achievement: ${exists.title}`);
        setLastEvent({ type: 'ACHIEVEMENT', text: exists.title, amount: exists.xpReward });
        return prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
      }
      return prev;
    });
  };

  const updateMissionProgress = (missionId: string, amount: number = 1) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && !m.completed) {
        const newCurrent = Math.min(m.current + amount, m.target);
        if (newCurrent >= m.target) {
            // Mission Complete
            setTimeout(() => {
                 addXP(m.rewardXP, `Mission: ${m.title}`);
                 setStats(s => ({ ...s, coins: s.coins + m.rewardCoins }));
            }, 500); // Delay slightly so it doesn't conflict with main event
            return { ...m, current: newCurrent, completed: true };
        }
        return { ...m, current: newCurrent };
      }
      return m;
    }));
  };

  return (
    <GamificationContext.Provider value={{ stats, achievements, missions, addXP, unlockAchievement, updateMissionProgress, lastEvent }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error("useGamification must be used within GamificationProvider");
  return context;
};
