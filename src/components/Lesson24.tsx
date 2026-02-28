import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  ReferenceLine,
  ComposedChart,
  Legend
} from 'recharts';
import { Activity, Brain, Divide, GitCommit } from 'lucide-react';

/**
 * -----------------------------------------------------------------------------
 * TYPES & INTERFACES
 * -----------------------------------------------------------------------------
 */

type TabId = 'weighted-sum' | 'threshold-jump' | 'decision-boundary' | 'sigmoid-comparison';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  component: React.FC;
}

/**
 * -----------------------------------------------------------------------------
 * MATH HELPERS & DATA GENERATION
 * -----------------------------------------------------------------------------
 */

const generateStepData = () => {
  const data = [];
  for (let x = -5; x <= 5; x += 0.5) {
    data.push({ x, y: x >= 0 ? 1 : 0 });
  }
  return data;
};

const generateSigmoidData = () => {
  const data = [];
  for (let x = -5; x <= 5; x += 0.2) {
    const sigmoid = 1 / (1 + Math.exp(-x));
    const step = x >= 0 ? 1 : 0;
    data.push({ x, sigmoid, step });
  }
  return data;
};

const generateClassificationData = () => {
  // Generar dos grupos de datos separables linealmente
  const groupA = Array.from({ length: 10 }, () => ({
    x: Math.random() * 4 + 1, // x entre 1 y 5
    y: Math.random() * 4 + 6, // y entre 6 y 10 (Arriba)
    type: 'Clase 1 (1)'
  }));

  const groupB = Array.from({ length: 10 }, () => ({
    x: Math.random() * 4 + 5, // x entre 5 y 9
    y: Math.random() * 4 + 1, // y entre 1 y 5 (Abajo)
    type: 'Clase 0 (0)'
  }));

  return { groupA, groupB };
};

/**
 * -----------------------------------------------------------------------------
 * VISUALIZATION COMPONENTS (PANELS)
 * -----------------------------------------------------------------------------
 */

// 1. Diagrama Estático: Suma Ponderada vs Umbral
const WeightedSumVisual: React.FC = () => {
  return (
    <div className="h-full w-full grid place-items-center p-4">
      <svg viewBox="0 0 600 300" className="w-full h-auto max-w-2xl bg-white rounded-lg shadow-sm border border-slate-200">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Inputs */}
        <g transform="translate(50, 50)">
          <circle cx="0" cy="0" r="20" fill="#e2e8f0" stroke="#64748b" />
          <text x="0" y="5" textAnchor="middle" className="text-xs font-bold font-mono">x1</text>
          <text x="0" y="35" textAnchor="middle" className="text-xs fill-slate-500">w1</text>
        </g>
        <g transform="translate(50, 150)">
          <circle cx="0" cy="0" r="20" fill="#e2e8f0" stroke="#64748b" />
          <text x="0" y="5" textAnchor="middle" className="text-xs font-bold font-mono">x2</text>
          <text x="0" y="35" textAnchor="middle" className="text-xs fill-slate-500">w2</text>
        </g>
        <g transform="translate(50, 250)">
          <circle cx="0" cy="0" r="20" fill="#e2e8f0" stroke="#64748b" />
          <text x="0" y="5" textAnchor="middle" className="text-xs font-bold font-mono">x3</text>
          <text x="0" y="35" textAnchor="middle" className="text-xs fill-slate-500">w3</text>
        </g>

        {/* Summation Node */}
        <g transform="translate(250, 150)">
          <circle cx="0" cy="0" r="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="0" y="-10" textAnchor="middle" className="text-sm font-bold">Σ (x·w)</text>
          <text x="0" y="10" textAnchor="middle" className="text-xs fill-slate-600">Suma</text>
          <text x="0" y="25" textAnchor="middle" className="text-xs fill-slate-600">Ponderada</text>
        </g>

        {/* Threshold Block */}
        <g transform="translate(450, 150)">
          <rect x="-40" y="-30" width="80" height="60" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="0" y="-5" textAnchor="middle" className="text-xs font-bold fill-amber-800">Si Σ {'>'} T</text>
          <text x="0" y="15" textAnchor="middle" className="text-xs font-bold fill-amber-800">Salida = 1</text>
          <path d="M-20,25 L-5,25 L-5,5 L20,5" fill="none" stroke="#d97706" strokeWidth="2" opacity="0.5" />
        </g>

        {/* Connections */}
        <line x1="70" y1="50" x2="210" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="70" y1="150" x2="205" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="70" y1="250" x2="210" y2="170" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="290" y1="150" x2="405" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        
        {/* Output */}
        <line x1="490" y1="150" x2="550" y2="150" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="555" y="155" className="text-sm font-bold font-mono fill-slate-700">y</text>
      </svg>
    </div>
  );
};

// 2. Diagrama Dinámico: El Salto en el Umbral
const ThresholdJumpChart: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const data = useMemo(() => generateStepData(), []);

  return (
    <div className="h-full w-full grid grid-rows-[1fr_auto] gap-4">
      <div className="w-full h-64 md:h-80 bg-white p-4 rounded-lg shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="x" type="number" domain={[-5, 5]} label={{ value: 'Entrada Neta (z)', position: 'bottom', offset: 0 }} />
            <YAxis domain={[-0.2, 1.2]} tickCount={4} label={{ value: 'Salida (y)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <ReferenceLine x={0} stroke="#94a3b8" label="Umbral (0)" strokeDasharray="3 3" />
            <Line type="step" dataKey="y" stroke="#2563eb" strokeWidth={3} dot={false} animationDuration={300} />
            
            {/* Punto interactivo que muestra el valor actual */}
            <ReferenceLine x={inputValue} stroke="#ef4444" strokeDasharray="3 3" />
            <Scatter 
                data={[{ x: inputValue, y: inputValue >= 0 ? 1 : 0 }]} 
                fill="#ef4444" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Controla la Entrada Neta (z): <span className="font-mono text-blue-600">{inputValue.toFixed(1)}</span>
        </label>
        <input
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={inputValue}
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="mt-2 text-center font-bold">
            Salida: <span className={inputValue >= 0 ? "text-green-600" : "text-red-600"}>
                {inputValue >= 0 ? "1 (Activada)" : "0 (Desactivada)"}
            </span>
        </div>
      </div>
    </div>
  );
};

// 3. Diagrama Estático: Frontera de Decisión Lineal
const DecisionBoundaryChart: React.FC = () => {
  const { groupA, groupB } = useMemo(() => generateClassificationData(), []);

  // Línea de frontera imaginaria y = -x + 10 (simplificada para visualización)
  const boundaryLine = [
    { x: 0, y: 10 },
    { x: 10, y: 0 }
  ];

  return (
    <div className="h-full w-full bg-white p-4 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis type="number" dataKey="x" name="Característica 1" domain={[0, 10]} />
          <YAxis type="number" dataKey="y" name="Característica 2" domain={[0, 10]} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          
          {/* Datos Clase 1 */}
          <Scatter name="Clase 1 (Salida 1)" data={groupA} fill="#ef4444" shape="circle" />
          
          {/* Datos Clase 0 */}
          <Scatter name="Clase 0 (Salida 0)" data={groupB} fill="#3b82f6" shape="triangle" />
          
          {/* Frontera de decisión */}
          <Line 
            data={boundaryLine} 
            dataKey="y" 
            stroke="#10b981" 
            strokeWidth={2} 
            dot={false} 
            name="Frontera de Decisión" 
            strokeDasharray="5 5"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

// 4. Diagrama Estático: Threshold vs Sigmoide
const ComparisonChart: React.FC = () => {
  const data = useMemo(() => generateSigmoidData(), []);

  return (
    <div className="h-full w-full bg-white p-4 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: 'Entrada (z)', position: 'bottom' }} />
          <YAxis domain={[-0.1, 1.1]} />
          <Tooltip />
          <Legend />
          <ReferenceLine x={0} stroke="#cbd5e1" />
          
          <Line 
            type="step" 
            dataKey="step" 
            stroke="#94a3b8" 
            strokeWidth={2} 
            name="Función Umbral (Hard Step)" 
            dot={false} 
            strokeDasharray="5 5"
          />
          <Line 
            type="monotone" 
            dataKey="sigmoid" 
            stroke="#8b5cf6" 
            strokeWidth={3} 
            name="Función Sigmoide (Soft)" 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * -----------------------------------------------------------------------------
 * LAYOUT COMPONENTS
 * -----------------------------------------------------------------------------
 */

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

/**
 * -----------------------------------------------------------------------------
 * MAIN APPLICATION COMPONENT
 * -----------------------------------------------------------------------------
 */

const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<TabId>('weighted-sum');

  const tabs: TabConfig[] = [
    {
      id: 'weighted-sum',
      label: 'Suma Ponderada',
      icon: <GitCommit className="w-4 h-4" />,
      title: 'El Mecanismo de Entrada',
      description: 'Antes de aplicar cualquier umbral, la neurona realiza una suma ponderada de todas sus entradas. Cada entrada (x) se multiplica por un peso (w) que determina su importancia. Si la suma total supera un valor crítico, la neurona "dispara".',
      component: WeightedSumVisual
    },
    {
      id: 'threshold-jump',
      label: 'El Salto (Step)',
      icon: <Activity className="w-4 h-4" />,
      title: 'Disparo Binario: Todo o Nada',
      description: 'La función escalón es la forma más simple de activación. Observa cómo la salida cambia abruptamente de 0 a 1 en el momento exacto en que la entrada cruza el umbral (0). No hay términos medios: la neurona está encendida o apagada.',
      component: ThresholdJumpChart
    },
    {
      id: 'decision-boundary',
      label: 'Frontera Lineal',
      icon: <Divide className="w-4 h-4" />,
      title: 'Separación del Espacio',
      description: 'Visualmente, la función umbral crea una línea recta (o un plano en dimensiones superiores) que divide los datos en dos clases. Los puntos por encima de la línea pertenecen a una clase (Triángulos azules) y los de abajo a otra (Círculos rojos).',
      component: DecisionBoundaryChart
    },
    {
      id: 'sigmoid-comparison',
      label: 'vs. Sigmoide',
      icon: <Brain className="w-4 h-4" />,
      title: 'Evolución: De Rígido a Suave',
      description: 'El problema de la función umbral es que su derivada es 0 en casi todas partes, lo que impide el aprendizaje por retropropagación. La función Sigmoide suaviza este salto, permitiendo gradientes útiles para el entrenamiento de redes profundas.',
      component: ComparisonChart
    }
  ];

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const ActiveComponent = activeTab.component;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* GRID LAYOUT DEFINITION
        Rows: Header (auto) -> Tabs (auto) -> Content (1fr)
      */}
      <div className="max-w-6xl mx-auto h-screen p-4 grid grid-rows-[auto_auto_1fr] gap-6">
        
        {/* HEADER SECTION */}
        <header className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-slate-200 pb-4">
          <div className="p-3 bg-blue-600 rounded-lg shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Perceptrón y Funciones de Activación</h1>
            <p className="text-slate-500 text-sm">Visualización interactiva de la lógica de decisión en neuronas artificiales</p>
          </div>
        </header>

        {/* TABS NAVIGATION */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-200 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTabId === tab.id 
                  ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-600 hover:bg-slate-300/50 hover:text-slate-900'}
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* MAIN CONTENT AREA */}
        <main className="grid md:grid-cols-12 gap-6 min-h-0">
          
          {/* LEFT PANEL: Context & Theory */}
          <section className="md:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2">
            <Card className="p-6 border-l-4 border-l-blue-500">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                Concepto Actual
              </h2>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                {activeTab.title}
              </h3>
              <div className="prose prose-slate prose-sm">
                <p className="text-slate-600 leading-relaxed">
                  {activeTab.description}
                </p>
              </div>
            </Card>

            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Nota Técnica
              </h4>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                {activeTabId === 'weighted-sum' && 'La suma ponderada se representa matemáticamente como z = Σ(xi · wi) + b.'}
                {activeTabId === 'threshold-jump' && 'Matemáticamente: f(z) = 1 si z ≥ 0, de lo contrario 0. Esta discontinuidad dificulta el cálculo de gradientes.'}
                {activeTabId === 'decision-boundary' && 'Un solo perceptrón solo puede resolver problemas linealmente separables (como AND/OR, pero no XOR).'}
                {activeTabId === 'sigmoid-comparison' && 'La sigmoide comprime la salida entre 0 y 1, lo que puede interpretarse como una probabilidad.'}
              </p>
            </div>
          </section>

          {/* RIGHT PANEL: Visualization Render */}
          <section className="md:col-span-8 h-full min-h-[400px]">
            <Card className="h-full w-full relative bg-slate-50/50">
              <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-slate-200 text-xs font-mono text-slate-500">
                Renderizado: {activeTab.label}
              </div>
              <div className="h-full w-full p-2">
                <ActiveComponent />
              </div>
            </Card>
          </section>

        </main>
      </div>
    </div>
  );
};

export default App;