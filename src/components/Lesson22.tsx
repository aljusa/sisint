import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceDot, 
  BarChart, 
  Bar, 
  Cell, 
  LabelList 
} from 'recharts';
import { Activity, Zap, BarChart3, Info } from 'lucide-react';

// --- Types & Interfaces ---
interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface DiagramProps {
  isActive: boolean;
}

// --- Componente UI Base: Card ---
const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className = "", 
  title 
}) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          {title}
        </h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- Componente: ReLU Interactivo (Dinámico) ---
const ReluDiagram: React.FC<DiagramProps> = () => {
  const [inputValue, setInputValue] = useState<number>(-5);

  const data = useMemo(() => {
    const points = [];
    for (let x = -10; x <= 10; x += 1) {
      points.push({ x, y: Math.max(0, x) });
    }
    return points;
  }, []);

  const outputValue = Math.max(0, inputValue);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
      {/* Panel de Control y Teoría */}
      <div className="md:col-span-4 grid gap-6 content-start">
        <div className="prose prose-slate prose-sm">
          <h3 className="text-lg font-bold text-slate-900">Comportamiento de ReLU</h3>
          <p className="text-slate-600">
            La Unidad Lineal Rectificada (<strong>ReLU</strong>) es la función de activación más utilizada.
            Su lógica es simple pero poderosa para introducir no linealidad.
          </p>
          <div className="bg-slate-100 p-4 rounded-lg font-mono text-sm text-slate-700 my-4 border-l-4 border-blue-500">
            f(x) = max(0, x)
          </div>
          <ul className="list-disc pl-4 space-y-2 text-slate-600">
            <li>Si <strong>x &lt; 0</strong>: La salida es 0 (Neurona desactivada).</li>
            <li>Si <strong>x ≥ 0</strong>: La salida es x (Linealidad).</li>
          </ul>
        </div>

        <Card title="Simulación">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Valor de Entrada (x): <span className="text-blue-600 font-bold">{inputValue}</span>
          </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.5"
            value={inputValue}
            onChange={(e) => setInputValue(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="mt-4 flex items-center justify-between bg-slate-50 p-3 rounded border border-slate-200">
            <span className="text-xs text-slate-500 uppercase font-semibold">Salida f(x)</span>
            <span className={`text-xl font-bold ${outputValue === 0 ? 'text-red-500' : 'text-green-600'}`}>
              {outputValue}
            </span>
          </div>
        </Card>
      </div>

      {/* Renderizado Visual */}
      <Card className="md:col-span-8">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="x" type="number" domain={[-10, 10]} allowDataOverflow={false} />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={false} 
              isAnimationActive={false}
            />
            {/* Punto interactivo */}
            <ReferenceDot 
              x={inputValue} 
              y={outputValue} 
              r={6} 
              fill={outputValue > 0 ? "#16a34a" : "#dc2626"} 
              stroke="#fff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-center text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
          El punto <strong className="text-red-500">rojo</strong> indica activación nula, el <strong className="text-green-600">verde</strong> indica activación positiva.
        </div>
      </Card>
    </div>
  );
};

// --- Componente: ReLU vs Leaky ReLU (Comparativo Estático) ---
const LeakyReluDiagram: React.FC<DiagramProps> = () => {
  const data = useMemo(() => {
    const points = [];
    for (let x = -10; x <= 5; x += 1) {
      points.push({
        x,
        relu: Math.max(0, x),
        leaky: x < 0 ? 0.1 * x : x
      });
    }
    return points;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
      <div className="md:col-span-4 grid gap-6 content-start">
        <div className="prose prose-slate prose-sm">
          <h3 className="text-lg font-bold text-slate-900">El problema de la "Neurona Muerta"</h3>
          <p className="text-slate-600">
            ReLU estándar elimina completamente la información cuando x es negativo (gradiente cero). 
            Esto puede causar que las neuronas dejen de aprender.
          </p>
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 my-4">
            <h4 className="font-bold text-amber-800 text-xs uppercase mb-1">Leaky ReLU Solución</h4>
            <p className="text-sm text-amber-900 font-mono">f(x) = max(0.01x, x)</p>
          </div>
          <p className="text-slate-600">
            Permite un pequeño gradiente negativo (la "fuga" o <em>leak</em>), manteniendo viva la neurona durante la retropropagación.
          </p>
        </div>
      </div>

      <Card className="md:col-span-8">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="x" type="number" domain={['auto', 'auto']} />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Line 
              name="Standard ReLU"
              type="monotone" 
              dataKey="relu" 
              stroke="#94a3b8" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              dot={false}
            />
            <Line 
              name="Leaky ReLU"
              type="monotone" 
              dataKey="leaky" 
              stroke="#d97706" 
              strokeWidth={3} 
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400"></span>
            <span className="text-xs text-slate-600 font-medium">Standard ReLU (0 slope)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-600"></span>
            <span className="text-xs text-slate-600 font-medium">Leaky ReLU (Small slope)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- Componente: Softmax (Normalización) ---
const SoftmaxDiagram: React.FC<DiagramProps> = () => {
  const [logits, setLogits] = useState<number[]>([2.0, 1.0, 0.1]);

  const handleLogitChange = (index: number, val: number) => {
    const newLogits = [...logits];
    newLogits[index] = val;
    setLogits(newLogits);
  };

  // Cálculo Softmax
  const softmaxData = useMemo(() => {
    const exps = logits.map(l => Math.exp(l));
    const sumExps = exps.reduce((a, b) => a + b, 0);
    const probabilities = exps.map(e => e / sumExps);
    
    return logits.map((val, idx) => ({
      name: `Clase ${String.fromCharCode(65 + idx)}`,
      logit: val,
      probability: probabilities[idx],
      percent: (probabilities[idx] * 100).toFixed(1)
    }));
  }, [logits]);

  const totalProb = softmaxData.reduce((acc, curr) => acc + curr.probability, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
      <div className="md:col-span-4 grid gap-6 content-start">
        <div className="prose prose-slate prose-sm">
          <h3 className="text-lg font-bold text-slate-900">Normalización Softmax</h3>
          <p className="text-slate-600">
            Transforma un vector de números reales (logits) en una distribución de probabilidad.
            Es fundamental en la capa de salida de clasificadores multiclase.
          </p>
          <div className="bg-indigo-50 p-3 rounded text-center my-2">
            <span className="text-indigo-900 font-bold text-lg">Σ P(x) ≈ {Math.round(totalProb)} (100%)</span>
          </div>
        </div>

        <Card title="Entradas (Logits)">
          <div className="space-y-6">
            {logits.map((val, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-500">Clase {String.fromCharCode(65 + idx)} (Raw)</span>
                  <span className="text-xs font-mono text-slate-700">{val.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="5"
                  step="0.1"
                  value={val}
                  onChange={(e) => handleLogitChange(idx, parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="md:col-span-8 min-h-[400px] flex flex-col justify-center">
        <h4 className="text-center text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Distribución de Probabilidad Resultante</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={softmaxData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            <XAxis type="number" domain={[0, 1]} hide />
            <YAxis dataKey="name" type="category" tick={{fontSize: 12, fill: '#64748b'}} width={60} />
          
            <Bar dataKey="probability" radius={[0, 4, 4, 0]} animationDuration={300}>
              {softmaxData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={['#4f46e5', '#8b5cf6', '#ec4899'][index % 3]} />
              ))}
              <LabelList
  dataKey="percent"
  position="right"
formatter={(val) =>
  val != null ? `${val}%` : ''
}  style={{
    fill: '#475569',
    fontSize: '12px',
    fontWeight: 'bold'
  }}
/>
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-xs text-center text-slate-400 bg-slate-50 p-2 rounded">
          Observe cómo al aumentar un Logit, su probabilidad crece "suprimiendo" a las demás para mantener la suma en 1.
        </div>
      </Card>
    </div>
  );
};

// --- Layout Principal y Navegación ---
const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('relu');

  const tabs: TabItem[] = [
    { id: 'relu', label: 'Comportamiento ReLU', icon: Activity },
    { id: 'leaky', label: 'Comparativa vs Leaky', icon: Zap },
    { id: 'softmax', label: 'Normalización Softmax', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 grid grid-rows-[auto_auto_1fr] gap-0">
      
      {/* 1. Header Area */}
      <header className="bg-slate-900 text-white p-6 shadow-md grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <div>
          <div className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-1">Deep Learning Fundamentals</div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Funciones de Activación</h1>
        </div>
        <div className="hidden md:flex justify-end items-center gap-2 text-slate-400 text-sm">
          <Info size={16} />
          <span>Módulo Interactivo v1.0</span>
        </div>
      </header>

      {/* 2. Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-flow-col auto-cols-max gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`
                  group flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors
                  ${isActive 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}
                `}
              >
                <Icon size={18} className={isActive ? 'stroke-2' : 'stroke-1.5'} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Main Content Area */}
      <main className="max-w-7xl mx-auto w-full p-4 md:p-8">
        {activeTabId === 'relu' && <ReluDiagram isActive={true} />}
        {activeTabId === 'leaky' && <LeakyReluDiagram isActive={true} />}
        {activeTabId === 'softmax' && <SoftmaxDiagram isActive={true} />}
      </main>

    </div>
  );
};

export default App;