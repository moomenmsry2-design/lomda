import React, { useState, useMemo } from 'react';
import { Cpu, Hash, ArrowRightLeft, Lightbulb, ToggleLeft, ToggleRight, Table, FunctionSquare, Network, Sigma, ChevronRight, Bot, Binary, Calculator } from 'lucide-react';

// --- Types ---
type ViewState = 'MENU' | 'GATES' | 'NUMBERS' | 'FUNCTIONS';

export const Mitoog: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('MENU');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto text-right font-sans min-h-full" dir="rtl">
      
      {/* Header - Always Visible */}
      <div className="mb-8 text-center animate-in fade-in slide-in-from-top-5 duration-500">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 drop-shadow-lg mb-2">
          المنطق الرقمي
        </h1>
        <p className="text-gray-400">Digital Logic Design & Analysis</p>
      </div>

      {/* Main Content Router */}
      <div className="relative">
        {currentView === 'MENU' && <DigitalMenu onSelect={setCurrentView} />}
        {currentView === 'GATES' && <LogicGatesView onBack={() => setCurrentView('MENU')} />}
        {currentView === 'NUMBERS' && <NumberSystemsView onBack={() => setCurrentView('MENU')} />}
        {currentView === 'FUNCTIONS' && <BinaryFunctionsView onBack={() => setCurrentView('MENU')} />}
      </div>

    </div>
  );
};

// ============================================================================
// 0. MENU VIEW
// ============================================================================
const DigitalMenu: React.FC<{ onSelect: (view: ViewState) => void }> = ({ onSelect }) => {
  const cards = [
    {
      id: 'GATES',
      title: 'بوابات منطقية',
      subtitle: 'Logic Gates Simulation',
      icon: <Cpu className="w-12 h-12" />,
      color: 'from-blue-600 to-indigo-600',
      desc: 'محاكاة تفاعلية لبوابات AND, OR, XOR, NOT وجداول الحقيقة.'
    },
    {
      id: 'NUMBERS',
      title: 'نظام العد',
      subtitle: 'Number Systems',
      icon: <Hash className="w-12 h-12" />,
      color: 'from-emerald-600 to-teal-600',
      desc: 'المحول الذكي بين الأنظمة (العشري، الثنائي، السداسي عشر...).'
    },
    {
      id: 'FUNCTIONS',
      title: 'الدوال الثنائية',
      subtitle: 'Binary Functions',
      icon: <FunctionSquare className="w-12 h-12" />,
      color: 'from-purple-600 to-pink-600',
      desc: 'تحليل الدوال، إنشاء جداول الصدق، ورسم المخططات البيانية (K-Map).'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in zoom-in-95 duration-300">
      {cards.map((card, idx) => (
        <button
          key={card.id}
          onClick={() => onSelect(card.id as ViewState)}
          className="group relative overflow-hidden rounded-3xl border border-gray-700 bg-[#0f0f16] hover:bg-[#151520] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-right p-8 flex flex-col gap-6"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {card.icon}
          </div>

          <div>
            <h2 className="text-2xl font-black text-white mb-1">{card.title}</h2>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{card.subtitle}</p>
            <p className="text-gray-400 leading-relaxed">{card.desc}</p>
          </div>

          <div className="mt-auto flex justify-end">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
               <ChevronRight className="w-6 h-6 text-white rotate-180" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

// ============================================================================
// 1. LOGIC GATES VIEW (Existing Content)
// ============================================================================
const LogicGatesView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
      <BackButton onClick={onBack} label="قائمة البوابات" />
      
      <div className="flex items-center gap-3 text-white mb-6">
          <div className="p-3 rounded-xl bg-blue-600/20">
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">البوابات المنطقية (Logic Gates)</h2>
            <p className="text-gray-400 text-sm">محاكاة سلوك الدوائر الرقمية الأساسية</p>
          </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AND Gate */}
          <GateSimulator 
              name="بوابة و (AND)" 
              symbol="&" 
              color="border-blue-500"
              logic={(a, b) => a && b}
              desc="المصباح يضيء فقط إذا كان المفتاحين (1)."
          />
          {/* OR Gate */}
          <GateSimulator 
              name="بوابة أو (OR)" 
              symbol="≥1" 
              color="border-green-500"
              logic={(a, b) => a || b}
              desc="المصباح يضيء إذا كان أحد المفاتيح على الأقل (1)."
          />
          {/* XOR Gate */}
          <GateSimulator 
              name="بوابة الحصري (XOR)" 
              symbol="=1" 
              color="border-purple-500"
              logic={(a, b) => (a || b) && !(a && b)}
              desc="المصباح يضيء إذا كانت المفاتيح مختلفة فقط."
          />
           {/* NOT Gate */}
           <NotGateSimulator />
      </div>

      <LogicBot name="GateGuru" tip="هل تعلم؟ بوابات NAND و NOR تسمى 'بوابات عالمية' (Universal Gates) لأنه يمكن بناء أي دائرة منطقية باستخدامها فقط!" />
    </div>
  );
};

// ============================================================================
// 2. NUMBER SYSTEMS VIEW (Existing Content)
// ============================================================================
const NumberSystemsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [inputValue, setInputValue] = useState('10');
  const [inputBase, setInputBase] = useState(10);

  const parseInput = (val: string, base: number) => {
    try {
      const parsed = parseInt(val, base);
      return isNaN(parsed) ? null : parsed;
    } catch {
      return null;
    }
  };

  const decimalValue = parseInput(inputValue, inputBase);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
      <BackButton onClick={onBack} label="قائمة التحويل" />

      <div className="flex items-center gap-3 text-white mb-6">
          <div className="p-3 rounded-xl bg-emerald-600/20">
            <Hash className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">أنظمة العد (Number Systems)</h2>
            <p className="text-gray-400 text-sm">تحويل القيم بين القواعد المختلفة</p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0f0f16] p-8 rounded-3xl border border-gray-700 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
             
             <div className="flex items-center gap-3 mb-6 text-emerald-400">
                <ArrowRightLeft className="w-6 h-6" />
                <h2 className="text-2xl font-bold">المحول الذكي</h2>
             </div>
            
            <div className="space-y-6 relative z-10">
                <div>
                <label className="block text-sm text-gray-400 mb-2">القيمة المدخلة</label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-black/40 border border-gray-600 rounded-xl px-4 py-3 text-2xl font-mono text-emerald-400 focus:outline-none focus:border-emerald-500 transition-all text-left"
                    dir="ltr"
                />
                </div>
                
                <div>
                <label className="block text-sm text-gray-400 mb-2">نظام العد الأساسي</label>
                <div className="grid grid-cols-4 gap-2">
                    {[2, 8, 10, 16].map((base) => (
                    <button
                        key={base}
                        onClick={() => setInputBase(base)}
                        className={`py-2 rounded-lg font-bold transition-all ${
                        inputBase === base
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        Base {base}
                    </button>
                    ))}
                </div>
                </div>
            </div>
          </div>

          <div className="space-y-4">
              <ConversionCard 
                  label="النظام العشري (Decimal)" 
                  value={decimalValue !== null ? decimalValue.toString(10) : '---'} 
                  base={10}
                  active={inputBase === 10}
              />
              <ConversionCard 
                  label="النظام الثنائي (Binary)" 
                  value={decimalValue !== null ? decimalValue.toString(2) : '---'} 
                  base={2}
                  active={inputBase === 2}
              />
              <ConversionCard 
                  label="النظام الثماني (Octal)" 
                  value={decimalValue !== null ? decimalValue.toString(8) : '---'} 
                  base={8}
                  active={inputBase === 8}
              />
              <ConversionCard 
                  label="النظام السداسي عشر (Hex)" 
                  value={decimalValue !== null ? decimalValue.toString(16).toUpperCase() : '---'} 
                  base={16}
                  active={inputBase === 16}
              />
          </div>
      </div>
      
      <LogicBot name="DigitBot" tip="الحواسيب تفهم فقط 0 و 1 (النظام الثنائي) لأنها تعمل بالكهرباء: إما يوجد تيار (1) أو لا يوجد (0)." />
    </div>
  );
};

// ============================================================================
// 3. BINARY FUNCTIONS VIEW (New Content)
// ============================================================================
const BinaryFunctionsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [vars, setVars] = useState('A,B,C');
  const [mintermsStr, setMintermsStr] = useState('0,2,3,4,6'); // Default Example
  const [result, setResult] = useState<{
      table: { inputs: number[], output: number }[],
      variableNames: string[],
      sop: string
  } | null>(null);

  const generate = () => {
      const variableNames = vars.split(',').map(s => s.trim()).filter(s => s !== '');
      const numVars = variableNames.length;
      
      if (numVars === 0 || numVars > 4) {
          alert('يرجى إدخال 1 إلى 4 متغيرات فقط.');
          return;
      }

      const minterms = mintermsStr.split(',')
          .map(s => parseInt(s.trim()))
          .filter(n => !isNaN(n));

      const table = [];
      const numRows = Math.pow(2, numVars);

      for(let i=0; i<numRows; i++) {
          const isHigh = minterms.includes(i);
          // Convert i to binary array
          const inputs = [];
          for(let bit=numVars-1; bit>=0; bit--) {
              inputs.push((i >> bit) & 1);
          }
          table.push({ inputs, output: isHigh ? 1 : 0 });
      }

      // Generate SOP (Canonical)
      const sopParts = table.filter(r => r.output === 1).map(row => {
          return row.inputs.map((val, idx) => {
              return val === 1 ? variableNames[idx] : `${variableNames[idx]}'`;
          }).join('');
      });

      const sop = sopParts.length > 0 ? `F = ${sopParts.join(' + ')}` : 'F = 0';

      setResult({ table, variableNames, sop });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
      <BackButton onClick={onBack} label="قائمة الدوال" />

      <div className="flex items-center gap-3 text-white mb-6">
          <div className="p-3 rounded-xl bg-purple-600/20">
            <FunctionSquare className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">الدوال الثنائية (Binary Functions)</h2>
            <p className="text-gray-400 text-sm">تحليل دالة منطقية ورسم مخطط كارنوف (K-Map)</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
              <div className="bg-[#151520] p-6 rounded-3xl border border-gray-700 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Network className="w-5 h-5 text-purple-400" /> مدخلات الدالة
                  </h3>
                  
                  <div className="space-y-4">
                      <div>
                          <label className="block text-sm text-gray-400 mb-1">المتغيرات (Variables)</label>
                          <input 
                              type="text" 
                              value={vars}
                              onChange={(e) => setVars(e.target.value)}
                              className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white font-mono"
                              placeholder="e.g. A,B,C"
                              dir="ltr"
                          />
                          <p className="text-xs text-gray-500 mt-1">افصل بينهم بفاصلة. بحد أقصى 4.</p>
                      </div>

                      <div>
                          <label className="block text-sm text-gray-400 mb-1">حدود الدالة (Minterms) Σ</label>
                          <input 
                              type="text" 
                              value={mintermsStr}
                              onChange={(e) => setMintermsStr(e.target.value)}
                              className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white font-mono"
                              placeholder="e.g. 0,2,5,7"
                              dir="ltr"
                          />
                          <p className="text-xs text-gray-500 mt-1">الأرقام التي تكون فيها الدالة تساوي 1.</p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button 
                            onClick={generate}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Table className="w-4 h-4" /> تحليل الدالة
                        </button>
                      </div>
                  </div>
              </div>

              {result && (
                  <div className="bg-[#151520] p-6 rounded-3xl border border-gray-700 shadow-xl animate-in zoom-in-95">
                       <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                           <Sigma className="w-5 h-5 text-pink-400" /> المعادلة (SOP)
                       </h3>
                       <div className="bg-black/40 p-3 rounded-lg border border-pink-500/30">
                           <code className="text-pink-300 font-mono text-sm break-all leading-relaxed" dir="ltr">
                               {result.sop}
                           </code>
                       </div>
                  </div>
              )}
          </div>

          {/* Visualization Panel */}
          <div className="lg:col-span-2 space-y-6">
              {result ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Truth Table */}
                        <div className="bg-[#151520] rounded-3xl border border-gray-700 overflow-hidden">
                            <div className="bg-gray-800/50 p-3 border-b border-gray-700">
                                <h4 className="font-bold text-gray-300 text-sm text-center">جدول الصدق (Truth Table)</h4>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                <table className="w-full text-center text-sm font-mono">
                                    <thead className="bg-black/40 text-gray-400 sticky top-0">
                                        <tr>
                                            <th className="py-2">#</th>
                                            {result.variableNames.map(v => <th key={v} className="py-2">{v}</th>)}
                                            <th className="py-2 text-purple-400 font-black">F</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800 text-gray-300">
                                        {result.table.map((row, idx) => (
                                            <tr key={idx} className={row.output ? 'bg-purple-900/20' : ''}>
                                                <td className="py-2 text-gray-600">{idx}</td>
                                                {row.inputs.map((val, i) => (
                                                    <td key={i} className="py-2">{val}</td>
                                                ))}
                                                <td className={`py-2 font-bold ${row.output ? 'text-purple-400' : 'text-gray-500'}`}>
                                                    {row.output}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Visual Graph (K-Map) */}
                        <div className="bg-[#151520] rounded-3xl border border-gray-700 overflow-hidden flex flex-col">
                            <div className="bg-gray-800/50 p-3 border-b border-gray-700">
                                <h4 className="font-bold text-gray-300 text-sm text-center">المخطط البياني (Karnaugh Map)</h4>
                            </div>
                            <div className="flex-1 p-6 flex items-center justify-center bg-black/20">
                                <KMapVisualizer 
                                    numVars={result.variableNames.length} 
                                    table={result.table} 
                                    vars={result.variableNames}
                                />
                            </div>
                        </div>
                    </div>
                  </>
              ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-700 rounded-3xl min-h-[300px]">
                      <Binary className="w-16 h-16 mb-4 opacity-20" />
                      <p>أدخل المتغيرات والحدود ثم اضغط على تحليل</p>
                  </div>
              )}
          </div>
      </div>

      <LogicBot name="BooleanBuddy" tip="مخطط كارنوف (K-Map) يساعدنا في تبسيط المعادلات المنطقية بصرياً بدلاً من استخدام الجبر البولياني المعقد!" />
    </div>
  );
};

// --- K-Map Visualizer Component ---
const KMapVisualizer: React.FC<{ numVars: number, table: {output: number}[], vars: string[] }> = ({ numVars, table, vars }) => {
    // Basic K-Map Rendering for 2, 3, 4 variables
    if (numVars < 2 || numVars > 4) return <div className="text-gray-500 text-xs">يدعم 2, 3, أو 4 متغيرات فقط للعرض البياني</div>;

    // Gray Codes
    const gray2 = [0, 1];
    const gray4 = [0, 1, 3, 2]; // 00, 01, 11, 10

    let rows: number[] = [];
    let cols: number[] = [];
    let rowLabel = '';
    let colLabel = '';

    if (numVars === 2) { // A, B
        rows = gray2; // A (0, 1)
        cols = gray2; // B (0, 1)
        rowLabel = vars[0];
        colLabel = vars[1];
    } else if (numVars === 3) { // A, B, C
        rows = gray2; // A (0, 1)
        cols = gray4; // BC (00, 01, 11, 10)
        rowLabel = vars[0];
        colLabel = vars[1] + vars[2];
    } else if (numVars === 4) { // A, B, C, D
        rows = gray4; // AB
        cols = gray4; // CD
        rowLabel = vars[0] + vars[1];
        colLabel = vars[2] + vars[3];
    }

    const getIndex = (rVal: number, cVal: number) => {
        // Construct standard binary index from Gray code row/col
        if (numVars === 2) {
             // r=A, c=B. index = A*2 + B
             return (rVal << 1) | cVal;
        } else if (numVars === 3) {
             // r=A, c=BC. index = A*4 + BC
             return (rVal << 2) | cVal;
        } else { // 4
             // r=AB, c=CD. index = AB*4 + CD
             return (rVal << 2) | cVal;
        }
    };

    return (
        <div className="relative">
            {/* Corner Labels */}
            <div className="absolute -top-6 -left-6 text-xs font-mono text-purple-400 font-bold">{rowLabel}\{colLabel}</div>
            
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(40px, 1fr))` }}>
                {/* Column Headers */}
                {cols.map((c, i) => (
                    <div key={`col-${i}`} className="text-center text-xs font-mono text-gray-500 mb-1">
                        {c.toString(2).padStart(cols.length > 2 ? 2 : 1, '0')}
                    </div>
                ))}

                {rows.map((r, ri) => (
                   <React.Fragment key={`row-${ri}`}>
                       {/* Row Header (Absolute positioned usually, but grid hack here) */}
                       {/* We just render cells, user infers row from context or we add complex grid */}
                       {cols.map((c, ci) => {
                           const idx = getIndex(r, c);
                           const val = table[idx]?.output;
                           return (
                               <div 
                                    key={`${ri}-${ci}`} 
                                    className={`
                                        w-12 h-12 flex items-center justify-center rounded border text-lg font-bold font-mono transition-all hover:scale-105 relative group
                                        ${val ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'bg-gray-800 border-gray-700 text-gray-600'}
                                    `}
                                >
                                    {val}
                                    <span className="absolute top-0.5 right-0.5 text-[8px] text-gray-500 opacity-0 group-hover:opacity-100">{idx}</span>
                                    
                                    {/* Row Label Hack on first col */}
                                    {ci === 0 && (
                                        <div className="absolute -left-8 text-xs text-gray-500 w-6 text-right">
                                            {r.toString(2).padStart(rows.length > 2 ? 2 : 1, '0')}
                                        </div>
                                    )}
                               </div>
                           );
                       })}
                   </React.Fragment> 
                ))}
            </div>
        </div>
    );
};

// ============================================================================
// SHARED & SUB COMPONENTS
// ============================================================================

const BackButton: React.FC<{ onClick: () => void, label: string }> = ({ onClick, label }) => (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 w-fit"
    >
      <ChevronRight className="w-5 h-5 rotate-180" />
      <span>العودة ل{label}</span>
    </button>
);

const LogicBot: React.FC<{ name: string, tip: string }> = ({ name, tip }) => {
    return (
        <div className="mt-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 p-4 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 animate-bounce">
                <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
                <h4 className="font-bold text-blue-300 mb-1">{name} يقول:</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{tip}</p>
            </div>
        </div>
    );
};

// --- GATES LOGIC (Copied from original) ---

const GateSimulator: React.FC<{ 
    name: string; 
    symbol: string; 
    color: string;
    logic: (a: boolean, b: boolean) => boolean;
    desc: string;
}> = ({ name, symbol, color, logic, desc }) => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const output = logic(a, b);

    return (
        <div className={`bg-[#0f0f16] rounded-2xl p-6 border-r-4 ${color} shadow-lg relative overflow-hidden group hover:bg-[#1a1a24] transition-colors`}>
            <div className="absolute top-0 left-0 p-4 opacity-10 font-black text-9xl font-mono select-none pointer-events-none">
                {symbol}
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                        <p className="text-gray-400 text-xs">{desc}</p>
                    </div>
                    <button 
                        onClick={() => setShowTable(!showTable)}
                        className={`p-2 rounded-lg transition-colors ${showTable ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
                        title="جدول الحقيقة"
                    >
                        <Table className="w-5 h-5" />
                    </button>
                </div>

                {showTable ? (
                    <div className="bg-black/40 rounded-lg p-3 text-xs font-mono animate-in fade-in slide-in-from-top-2">
                        <table className="w-full text-center">
                            <thead>
                                <tr className="text-gray-400 border-b border-gray-700">
                                    <th className="pb-1">A</th>
                                    <th className="pb-1">B</th>
                                    <th className="pb-1 text-yellow-400">Out</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                {[
                                    [false, false],
                                    [false, true],
                                    [true, false],
                                    [true, true]
                                ].map(([valA, valB], idx) => {
                                    const res = logic(valA, valB);
                                    const isActiveRow = a === valA && b === valB;
                                    return (
                                        <tr key={idx} className={isActiveRow ? 'bg-white/10 text-white font-bold' : ''}>
                                            <td className="py-1">{valA ? 1 : 0}</td>
                                            <td className="py-1">{valB ? 1 : 0}</td>
                                            <td className={`py-1 ${res ? 'text-yellow-400' : 'text-gray-500'}`}>{res ? 1 : 0}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex items-center justify-between mt-auto pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setA(!a)} className="text-gray-300 hover:text-white transition-colors">
                                    {a ? <ToggleRight className="w-10 h-10 text-green-400" /> : <ToggleLeft className="w-10 h-10 text-gray-600" />}
                                </button>
                                <span className="font-mono text-sm">Input A ({a ? 1 : 0})</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setB(!b)} className="text-gray-300 hover:text-white transition-colors">
                                    {b ? <ToggleRight className="w-10 h-10 text-green-400" /> : <ToggleLeft className="w-10 h-10 text-gray-600" />}
                                </button>
                                <span className="font-mono text-sm">Input B ({b ? 1 : 0})</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="h-0.5 w-12 bg-gray-600"></div>
                            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-300 ${
                                output 
                                ? 'bg-yellow-400 border-yellow-200 shadow-yellow-500/50 scale-110' 
                                : 'bg-gray-800 border-gray-700 opacity-50'
                            }`}>
                                <Lightbulb className={`w-8 h-8 ${output ? 'text-white fill-white' : 'text-gray-500'}`} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const NotGateSimulator: React.FC = () => {
    const [a, setA] = useState(false);
    const output = !a;

    return (
        <div className="bg-[#0f0f16] rounded-2xl p-6 border-r-4 border-red-500 shadow-lg relative overflow-hidden group hover:bg-[#1a1a24] transition-colors">
            <div className="absolute top-0 left-0 p-4 opacity-10 font-black text-9xl font-mono select-none pointer-events-none">!</div>
            
            <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-2">بوابة النفي (NOT)</h3>
                <p className="text-gray-400 text-xs mb-6">المصباح يعكس حالة المفتاح.</p>
                
                <div className="flex items-center justify-between mt-auto">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setA(!a)} className="text-gray-300 hover:text-white transition-colors">
                                {a ? <ToggleRight className="w-10 h-10 text-green-400" /> : <ToggleLeft className="w-10 h-10 text-gray-600" />}
                            </button>
                            <span className="font-mono text-sm">Input ({a ? 1 : 0})</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-0.5 w-12 bg-gray-600"></div>
                        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-300 ${
                            output 
                            ? 'bg-yellow-400 border-yellow-200 shadow-yellow-500/50 scale-110' 
                            : 'bg-gray-800 border-gray-700 opacity-50'
                        }`}>
                            <Lightbulb className={`w-8 h-8 ${output ? 'text-white fill-white' : 'text-gray-500'}`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ConversionCard: React.FC<{ label: string; value: string; base: number; active: boolean }> = ({ label, value, base, active }) => (
  <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
    active 
    ? 'bg-emerald-600/20 border-emerald-500 shadow-inner' 
    : 'bg-[#0f0f16] border-gray-800'
  }`}>
    <div className="flex flex-col">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className="text-xs text-gray-600 font-mono">Base {base}</span>
    </div>
    <div className="text-2xl font-mono text-white tracking-wider">
        {value}
    </div>
  </div>
);
