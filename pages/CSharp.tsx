import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Play, ChevronRight, Hash, Keyboard, Monitor, Calculator, Bot, Check, XCircle, RotateCcw } from 'lucide-react';

// --- Types ---
type TopicId = 'VAR' | 'IN' | 'OUT' | 'OP' | null;

interface TopicData {
  id: TopicId;
  title: string;
  icon: React.ReactNode;
  color: string; // Tailwind gradient classes
  description: string;
}

// --- Main Component ---
export const CSharp: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<TopicId>(null);

  return (
    <div className="min-h-full p-4 md:p-8 font-sans text-right relative" dir="rtl">
      
      {/* Header - Always Visible */}
      <header className="mb-10 text-center space-y-4 animate-in fade-in slide-in-from-top-5 duration-700">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 drop-shadow-lg">
          أساسيات البرمجة بلغة C#
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          رحلتك لتصبح مبرمجاً محترفاً تبدأ من هنا! 🚀
        </p>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        {activeTopic === null ? (
          <TopicMenu onSelect={setActiveTopic} />
        ) : (
          <TopicLesson id={activeTopic} onBack={() => setActiveTopic(null)} />
        )}
      </div>
    </div>
  );
};

// --- Menu Component ---
const TopicMenu: React.FC<{ onSelect: (id: TopicId) => void }> = ({ onSelect }) => {
  const topics: TopicData[] = [
    { 
      id: 'VAR', 
      title: 'المتغيرات (Variables)', 
      icon: <Hash className="w-10 h-10" />, 
      color: 'from-blue-500 to-indigo-600',
      description: 'الصناديق التي نحفظ فيها البيانات (أرقام، نصوص...)'
    },
    { 
      id: 'IN', 
      title: 'أوامر الإدخال (Input)', 
      icon: <Keyboard className="w-10 h-10" />, 
      color: 'from-purple-500 to-pink-600',
      description: 'كيف نجعل البرنامج يستمع لما يكتبه المستخدم.'
    },
    { 
      id: 'OUT', 
      title: 'أوامر الطباعة (Output)', 
      icon: <Monitor className="w-10 h-10" />, 
      color: 'from-orange-500 to-red-600',
      description: 'كيف يتحدث البرنامج ويطبع النتائج على الشاشة.'
    },
    { 
      id: 'OP', 
      title: 'العمليات الخاصة (Operators)', 
      icon: <Calculator className="w-10 h-10" />, 
      color: 'from-emerald-500 to-green-600',
      description: 'الجمع، الطرح، والمقارنة المنطقية بين القيم.'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
      {topics.map((topic, idx) => (
        <button
          key={topic.id}
          onClick={() => onSelect(topic.id)}
          className="group relative overflow-hidden rounded-3xl border border-gray-700 bg-gray-900/40 hover:bg-gray-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 text-right p-8 flex flex-col gap-4"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Gradient Background on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          <div className="flex items-start justify-between w-full">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${topic.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {topic.icon}
            </div>
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors rotate-180" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">{topic.title}</h2>
            <p className="text-gray-400 leading-relaxed">{topic.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

// --- Lesson Content & Logic ---
const TopicLesson: React.FC<{ id: TopicId; onBack: () => void }> = ({ id, onBack }) => {
  // Content Data
  const getContent = () => {
    switch(id) {
      case 'VAR':
        return {
          title: "المتغيرات (Variables)",
          theory: (
            <div className="space-y-4 text-lg">
              <p>تخيل المتغير كأنه <span className="text-yellow-400 font-bold">صندوق</span> له اسم ونوع محدد.</p>
              <ul className="list-disc list-inside space-y-2 bg-black/20 p-4 rounded-xl border border-gray-700">
                <li><code className="text-blue-400 font-mono font-bold">int</code> : للأرقام الصحيحة (مثل: 5, 100, -20)</li>
                <li><code className="text-orange-400 font-mono font-bold">string</code> : للنصوص والكلمات (مثل: "Ahmad")</li>
                <li><code className="text-green-400 font-mono font-bold">bool</code> : صح أو خطأ (true/false)</li>
                <li><code className="text-purple-400 font-mono font-bold">double</code> : للأرقام العشرية (مثل: 95.5)</li>
              </ul>
              <p>طريقة الكتابة: <code className="bg-gray-800 px-2 py-1 rounded font-mono text-emerald-400">النوع الاسم = القيمة;</code></p>
            </div>
          ),
          task: {
            instruction: "قم بتعريف متغير من نوع int اسمه age واجعل قيمته 16.",
            initialCode: "// اكتب الكود هنا\n",
            expectedPart: "int age = 16;",
            successMsg: "أحسنت! لقد قمت بإنشاء أول صندوق بيانات لك."
          },
          robotTip: "تذكر دائماً! لغة C# حساسة للأحرف (Case Sensitive)، ولا تنس الفاصلة المنقوطة (;) في النهاية!"
        };
      case 'IN':
        return {
          title: "أوامر الإدخال (Input)",
          theory: (
            <div className="space-y-4 text-lg">
              <p>لجعل البرنامج "يسمع" ما يكتبه المستخدم، نستخدم الأمر <code className="text-yellow-400 font-mono font-bold">Console.ReadLine()</code>.</p>
              <p>هذا الأمر دائماً يقرأ البيانات كـ <span className="text-orange-400 font-bold">نص (string)</span>.</p>
              <div className="bg-black/20 p-4 rounded-xl border border-gray-700 font-mono text-left dir-ltr">
                <span className="text-blue-400">string</span> myName = <span className="text-yellow-400">Console</span>.ReadLine();
              </div>
            </div>
          ),
          task: {
            instruction: "اطلب من المستخدم إدخال لونه المفضل واحفظه في متغير اسمه color.",
            initialCode: 'Console.WriteLine("What is your favorite color?");\n// أكمل الكود هنا\n',
            expectedPart: "string color = Console.ReadLine();",
            successMsg: "ممتاز! الآن برنامجك يستطيع التفاعل مع البشر."
          },
          robotTip: "عندما تستخدم ReadLine، البرنامج سيتوقف وينتظر المستخدم حتى يضغط Enter."
        };
      case 'OUT':
        return {
          title: "أوامر الطباعة (Output)",
          theory: (
            <div className="space-y-4 text-lg">
              <p>لكي "يتحدث" البرنامج ويظهر النتائج على الشاشة السوداء، نستخدم:</p>
              <ul className="list-disc list-inside space-y-2 bg-black/20 p-4 rounded-xl border border-gray-700">
                <li><code className="text-yellow-400 font-mono font-bold">Console.WriteLine(...)</code> : يطبع وينزل سطراً جديداً.</li>
                <li><code className="text-yellow-400 font-mono font-bold">Console.Write(...)</code> : يطبع ويبقى على نفس السطر.</li>
              </ul>
            </div>
          ),
          task: {
            instruction: "استخدم Console.WriteLine لطباعة جملة: Hello C# World",
            initialCode: "// اطبع الجملة أدناه\n",
            expectedPart: 'Console.WriteLine("Hello C# World");',
            successMsg: "رائع! صوتك وصل للعالم الرقمي."
          },
          robotTip: "النصوص دائماً توضع بين علامتي تنصيص \" \"، أما الأرقام والمتغيرات فلا تحتاج إليها."
        };
      case 'OP':
        return {
          title: "العمليات الخاصة (Operators)",
          theory: (
            <div className="space-y-4 text-lg">
              <p>الحاسوب عبارة عن آلة حاسبة عملاقة! يمكننا إجراء عمليات:</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/30">
                  <h4 className="font-bold text-emerald-400 mb-2">حسابية (Math)</h4>
                  <ul className="font-mono text-sm space-y-1">
                    <li>+ (جمع)</li>
                    <li>- (طرح)</li>
                    <li>* (ضرب)</li>
                    <li>/ (قسمة)</li>
                    <li>% (باقي القسمة)</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-400 mb-2">منطقية (Logic)</h4>
                  <ul className="font-mono text-sm space-y-1">
                    <li>{`>`} (أكبر)</li>
                    <li>{`<`} (أصغر)</li>
                    <li>== (يساوي)</li>
                    <li>!= (لا يساوي)</li>
                  </ul>
                </div>
              </div>
            </div>
          ),
          task: {
            instruction: "عرف متغيرين x و y (قيمتهم 10 و 5) ثم اطبع مجموعهم.",
            initialCode: "int x = 10;\nint y = 5;\n// اطبع المجموع هنا (x + y)\n",
            expectedPart: "Console.WriteLine(x + y);",
            successMsg: "حساب دقيق! أنت مهندس برمجيات واعد."
          },
          robotTip: "علامة = الواحدة تعني 'ضع قيمة'، أما == الاثنتين تعني 'هل يساوي؟' (سؤال)."
        };
      default: return { title: '', theory: null, task: null, robotTip: '' };
    }
  };

  const content = getContent();

  return (
    <div className="animate-in slide-in-from-bottom-10 fade-in duration-500">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full hover:bg-white/10"
      >
        <ChevronRight className="w-5 h-5" />
        <span>العودة للقائمة</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Theory & Robot */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#1e1e24] p-6 rounded-3xl border border-gray-700 shadow-xl">
            <h2 className="text-2xl font-black text-white mb-4 border-b border-gray-700 pb-2">{content.title}</h2>
            <div className="text-gray-300 leading-relaxed">
              {content.theory}
            </div>
          </div>

          <RoboCHelper tip={content.robotTip} />
        </div>

        {/* Right Column: Interactive Editor */}
        <div className="lg:col-span-2">
            <CodeSimulator 
                initialCode={content.task?.initialCode || ''} 
                instruction={content.task?.instruction || ''}
                expectedPart={content.task?.expectedPart || ''}
                successMsg={content.task?.successMsg || ''}
            />
        </div>
      </div>
    </div>
  );
};

// --- Interactive Code Simulator ---
const CodeSimulator: React.FC<{ 
    initialCode: string; 
    instruction: string;
    expectedPart: string;
    successMsg: string;
}> = ({ initialCode, instruction, expectedPart, successMsg }) => {
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState<string[]>([]);
    const [status, setStatus] = useState<'IDLE' | 'RUNNING' | 'SUCCESS' | 'ERROR'>('IDLE');
    const [feedback, setFeedback] = useState('');

    const handleRun = () => {
        setStatus('RUNNING');
        setFeedback('');
        setOutput(['Compiling...', 'Running...']);

        setTimeout(() => {
            // Very Basic Validation Logic (Simulation)
            // Normalize spaces/quotes for checking
            const normalizedCode = code.replace(/\s+/g, '').replace(/'/g, '"').toLowerCase();
            const normalizedExpected = expectedPart.replace(/\s+/g, '').replace(/'/g, '"').toLowerCase();

            if (normalizedCode.includes(normalizedExpected)) {
                setStatus('SUCCESS');
                setOutput(['Compiling...', 'Running...', '>> Program Executed Successfully.']);
                setFeedback(successMsg);
            } else {
                setStatus('ERROR');
                setOutput(['Compiling...', 'Running...', '>> Error: Logic seems incorrect.']);
                setFeedback('حاول مرة أخرى! تأكد من كتابة الكود كما هو مطلوب وتذكر الـ ;');
            }
        }, 1500);
    };

    const handleReset = () => {
        setCode(initialCode);
        setStatus('IDLE');
        setOutput([]);
        setFeedback('');
    };

    return (
        <div className="bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-700 shadow-2xl flex flex-col h-[600px]">
            {/* Toolbar */}
            <div className="bg-[#252526] px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300 font-bold">Exercise.cs</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleReset} className="p-2 hover:bg-white/10 rounded-lg text-gray-400" title="Reset Code">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={handleRun}
                        disabled={status === 'RUNNING'}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Play className="w-4 h-4 fill-current" />
                        <span>تشغيل (Run)</span>
                    </button>
                </div>
            </div>

            {/* Instruction Bar */}
            <div className="bg-[#2d2d30] px-4 py-3 border-b border-gray-700">
                <p className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-0.5 rounded uppercase font-bold tracking-wider mt-0.5">مهمة</span>
                    {instruction}
                </p>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col">
                <textarea 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 w-full bg-[#1e1e1e] text-gray-100 font-mono text-base p-4 resize-none focus:outline-none leading-relaxed"
                    spellCheck={false}
                    dir="ltr"
                />
                
                {/* Terminal Output */}
                <div className="h-48 bg-black border-t border-gray-700 p-4 font-mono text-sm overflow-y-auto" dir="ltr">
                    <div className="flex items-center gap-2 text-gray-500 mb-2 select-none">
                        <Terminal className="w-4 h-4" />
                        <span>Terminal Output</span>
                    </div>
                    {output.map((line, i) => (
                        <div key={i} className={`${line.startsWith('>> Error') ? 'text-red-400' : 'text-green-400'} mb-1`}>
                            {line}
                        </div>
                    ))}
                    {status === 'RUNNING' && <div className="animate-pulse text-gray-500">_</div>}
                </div>
            </div>

            {/* Feedback Footer */}
            {status !== 'IDLE' && status !== 'RUNNING' && (
                <div className={`p-4 border-t ${status === 'SUCCESS' ? 'bg-green-900/20 border-green-900/50' : 'bg-red-900/20 border-red-900/50'} animate-in slide-in-from-bottom-2`}>
                    <div className="flex items-center gap-3">
                        {status === 'SUCCESS' ? <Check className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                        <p className={`text-sm font-bold ${status === 'SUCCESS' ? 'text-green-200' : 'text-red-200'}`}>
                            {feedback}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Robo-C Character ---
const RoboCHelper: React.FC<{ tip: string }> = ({ tip }) => {
    return (
        <div className="relative group mt-8">
            {/* Speech Bubble */}
            <div className="absolute -top-4 right-20 left-0 bg-white text-gray-900 p-4 rounded-2xl rounded-tr-none shadow-xl transform transition-transform group-hover:-translate-y-1">
                <p className="text-sm font-medium leading-relaxed">
                    💡 <span className="font-bold text-emerald-600">نصيحة Robo-C:</span> <br/>
                    {tip}
                </p>
                {/* Triangle tail */}
                <div className="absolute top-0 -right-2 w-4 h-4 bg-white transform skew-x-12"></div>
            </div>

            {/* Robot Icon */}
            <div className="w-16 h-16 mr-auto ml-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white/20 animate-bounce relative z-10">
                <Bot className="w-10 h-10 text-white" />
                {/* Eyes blinking effect (simple div overlay) */}
                <div className="absolute inset-0 bg-black/10 rounded-2xl animate-pulse"></div>
            </div>
        </div>
    );
};
