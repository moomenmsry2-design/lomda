import React from 'react';
import { Trophy, Star, Target, Zap, Clock, Medal, Lock } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';

export const Progress: React.FC = () => {
    const { stats, achievements, missions } = useGamification();

    return (
        <div className="p-8 max-w-6xl mx-auto h-full overflow-y-auto animate-in fade-in">
            <h1 className="text-4xl font-black text-white mb-8">لوحة التقدم (Progress)</h1>

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <StatCard title="المستوى (Level)" value={stats.level.toString()} icon={<Star className="text-yellow-400" />} />
                <StatCard title="إجمالي XP" value={stats.currentXP.toString()} icon={<Zap className="text-blue-400" />} />
                <StatCard title="العملات (Coins)" value={stats.coins.toString()} icon={<div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-yellow-300"></div>} />
                <StatCard title="أيام متتالية" value={`${stats.streak} أيام`} icon={<Zap className="text-orange-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Missions Column */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Target className="text-red-400" /> المهام اليومية
                    </h2>
                    <div className="space-y-4">
                        {missions.map(mission => (
                            <div key={mission.id} className={`p-4 rounded-2xl border ${mission.completed ? 'bg-green-900/20 border-green-500/50' : 'bg-[#151520] border-gray-700'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-bold ${mission.completed ? 'text-green-400 line-through' : 'text-white'}`}>{mission.title}</h3>
                                    <div className="text-xs font-bold px-2 py-1 bg-white/10 rounded text-yellow-400">+{mission.rewardXP} XP</div>
                                </div>
                                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${(mission.current / mission.target) * 100}%` }}></div>
                                </div>
                                <div className="text-xs text-gray-500 text-left" dir="ltr">
                                    {mission.current} / {mission.target}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
                        <Trophy className="text-yellow-400" /> الإنجازات (Achievements)
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {achievements.map(ach => (
                            <div key={ach.id} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${ach.unlocked ? 'bg-gradient-to-br from-[#151520] to-blue-900/20 border-blue-500/50' : 'bg-[#0f0f16] border-gray-800 opacity-60 grayscale'}`}>
                                <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 ${ach.unlocked ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'bg-gray-800'}`}>
                                    {ach.unlocked ? <Medal className="w-8 h-8 text-white" /> : <Lock className="w-8 h-8 text-gray-500" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{ach.title}</h3>
                                    <p className="text-xs text-gray-400">{ach.description}</p>
                                    {ach.unlocked && <span className="text-xs text-blue-300 mt-1 block">مكتملة (+{ach.xpReward} XP)</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

const StatCard: React.FC<{ title: string, value: string, icon: any }> = ({ title, value, icon }) => (
    <div className="bg-[#151520] border border-gray-700 p-4 rounded-2xl flex items-center gap-4">
        <div className="p-3 bg-gray-800 rounded-xl">{icon}</div>
        <div>
            <p className="text-xs text-gray-500 uppercase font-bold">{title}</p>
            <p className="text-2xl font-black text-white">{value}</p>
        </div>
    </div>
);
