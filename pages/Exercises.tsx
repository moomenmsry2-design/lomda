import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Brain, Zap, Code2, AlertCircle } from 'lucide-react';
import { ExerciseQuestion } from '../types';
import { useGamification } from '../context/GamificationContext';

// --- MOCK DATA ---
const QUESTIONS: ExerciseQuestion[] = [
    {
        id: 'q1', topic: 'ELECTRICITY', difficulty: 'EASY',
        question: 'ما هي وحدة قياس المقاومة الكهربائية؟',
        options: ['الفولت (Volt)', 'الأمبير (Ampere)', 'الأوم (Ohm)', 'الواط (Watt)'],
        correctIndex: 2,
        explanation: 'الأوم هو وحدة قياس المقاومة.'
    },
    {
        id: 'q2', topic: 'ELECTRICITY', difficulty: 'MEDIUM',
        question: 'في دائرة التوالي، ماذا يحدث للتيار؟',
        options: ['يتغير حسب المقاومة', 'يبقى ثابتاً في جميع الأجزاء', 'يصبح صفراً', 'ينقسم بين التفرعات'],
        correctIndex: 1,
        explanation: 'في دوائر التوالي، التيار المار هو نفسه في كل جزء من الدائرة.'
    },
    {
        id: 'q3', topic: 'CSHARP', difficulty: 'EASY',
        question: 'كيف نقوم بتعريف متغير رقمي صحيح في C#؟',
        options: ['string x = 10;', 'int x = 10;', 'bool x = 10;', 'float x = 10;'],
        correctIndex: 1,
        explanation: 'int هو اختصار لـ Integer ويستخدم للأعداد الصحيحة.'
    },
    {
        id: 'q4', topic: 'ELECTRICITY', difficulty: 'HARD',
        question: 'إذا كان الجهد 10V والتيار 2A، كم تكون القدرة؟',
        options: ['5 Watt', '12 Watt', '20 Watt', '8 Watt'],
        correctIndex: 2,
        explanation: 'قانون القدرة P = V × I، إذن 10 × 2 = 20 واط.'
    }
];

export const Exercises: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<'ALL' | 'ELECTRICITY' | 'LOGIC' | 'CSHARP'>('ALL');
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const { addXP, updateMissionProgress } = useGamification();

    const filteredQuestions = QUESTIONS.filter(q => selectedTopic === 'ALL' || q.topic === selectedTopic);
    const currentQuestion = filteredQuestions[currentQuestionIdx];

    const handleAnswer = (idx: number) => {
        if (isAnswered) return;
        setSelectedOption(idx);
        setIsAnswered(true);

        if (idx === currentQuestion.correctIndex) {
            setFeedbackMsg('إجابة صحيحة! أحسنت.');
            const xp = currentQuestion.difficulty === 'EASY' ? 5 : (currentQuestion.difficulty === 'MEDIUM' ? 10 : 20);
            addXP(xp, `Exercise: ${currentQuestion.difficulty}`);
            updateMissionProgress('daily_1', 1);
        } else {
            setFeedbackMsg('إجابة خاطئة. حاول مرة أخرى.');
        }
    };

    const nextQuestion = () => {
        setIsAnswered(false);
        setSelectedOption(null);
        setFeedbackMsg('');
        setCurrentQuestionIdx((prev) => (prev + 1) % filteredQuestions.length);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto h-full overflow-y-auto animate-in fade-in">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-white mb-2">تمارين وتحديات</h1>
                <p className="text-gray-400">اختبر معلوماتك بدقة وسرعة</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-2">
                <FilterButton active={selectedTopic === 'ALL'} onClick={() => {setSelectedTopic('ALL'); setCurrentQuestionIdx(0);}} icon={<Brain />} label="الكل" />
                <FilterButton active={selectedTopic === 'ELECTRICITY'} onClick={() => {setSelectedTopic('ELECTRICITY'); setCurrentQuestionIdx(0);}} icon={<Zap />} label="كهرباء" />
                <FilterButton active={selectedTopic === 'LOGIC'} onClick={() => {setSelectedTopic('LOGIC'); setCurrentQuestionIdx(0);}} icon={<Brain />} label="منطق" />
                <FilterButton active={selectedTopic === 'CSHARP'} onClick={() => {setSelectedTopic('CSHARP'); setCurrentQuestionIdx(0);}} icon={<Code2 />} label="C#" />
            </div>

            {/* Question Card */}
            {currentQuestion ? (
                <div className="bg-[#151520] border border-gray-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Difficulty Badge */}
                    <div className={`absolute top-0 right-0 px-4 py-2 rounded-bl-2xl font-bold text-xs text-white
                        ${currentQuestion.difficulty === 'EASY' ? 'bg-green-600' : (currentQuestion.difficulty === 'MEDIUM' ? 'bg-yellow-600' : 'bg-red-600')}
                    `}>
                        {currentQuestion.difficulty}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-8 mt-4 leading-relaxed">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => {
                            let stateClass = 'bg-gray-800 border-gray-700 hover:bg-gray-700';
                            if (isAnswered) {
                                if (idx === currentQuestion.correctIndex) stateClass = 'bg-green-900/40 border-green-500 text-green-200';
                                else if (idx === selectedOption) stateClass = 'bg-red-900/40 border-red-500 text-red-200';
                                else stateClass = 'bg-gray-800 border-gray-700 opacity-50';
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    disabled={isAnswered}
                                    className={`w-full p-4 rounded-xl border-2 text-right transition-all font-medium flex justify-between items-center ${stateClass}`}
                                >
                                    <span>{option}</span>
                                    {isAnswered && idx === currentQuestion.correctIndex && <CheckCircle2 className="text-green-500" />}
                                    {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <XCircle className="text-red-500" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback & Next */}
                    {isAnswered && (
                        <div className="mt-8 pt-6 border-t border-gray-700 animate-in slide-in-from-bottom-2">
                            <div className={`flex items-center gap-3 mb-4 p-3 rounded-xl ${selectedOption === currentQuestion.correctIndex ? 'bg-green-900/20 text-green-300' : 'bg-red-900/20 text-red-300'}`}>
                                {selectedOption === currentQuestion.correctIndex ? <CheckCircle2 /> : <XCircle />}
                                <span className="font-bold">{feedbackMsg}</span>
                            </div>
                            
                            <div className="flex gap-3 mb-4">
                                <AlertCircle className="text-blue-400 shrink-0" />
                                <p className="text-gray-300 text-sm leading-relaxed">{currentQuestion.explanation}</p>
                            </div>

                            <button 
                                onClick={nextQuestion}
                                className="w-full bg-electro-primary hover:bg-electro-secondary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
                            >
                                التالي <ArrowRight className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-20">لا يوجد أسئلة في هذا القسم حالياً.</div>
            )}
        </div>
    );
};

const FilterButton: React.FC<{ active: boolean, onClick: () => void, icon: any, label: string }> = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
            active ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
    >
        {React.cloneElement(icon, { className: "w-4 h-4" })}
        {label}
    </button>
);
