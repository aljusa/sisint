import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ArrowRight, 
  Cpu, 
  Zap, 
  Settings, 
  Layers, 
  Binary, 
  CheckCircle, 
  
  PlayCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import DivCarousel from '../assets/DivCarousel';

// --- Tipos e Interfaces ---

interface TabConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
}

interface LogicGateConfig {
  name: string;
  w1: number;
  w2: number;
  bias: number;
  threshold: number;
}

// --- Componentes de UI Base ---

const Card: React.FC<{ children: React.ReactNode; title?: string; className?: string }> = ({ 
  children, 
  title, 
  className = "" 
}) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 border-b border-slate-200 p-4">
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

// --- Componentes de Visualización Específicos ---

// 1. Diagrama de Activación por Umbral
const ThresholdDiagram: React.FC = () => {
  const [inputs, setInputs] = useState([
    { id: 1, value: 0.3, active: true, weight: 2.0 },
    { id: 2, value: 0.8, active: false, weight: 1.5 },
    { id: 3, value: 0.5, active: true, weight: 3.0 },
  ]);
  const THRESHOLD = 3.0;

  const toggleInput = (index: number) => {
    const newInputs = [...inputs];
    newInputs[index].active = !newInputs[index].active;
    setInputs(newInputs);
  };

  const currentSum = inputs.reduce((acc, curr) => acc + (curr.active ? curr.value * curr.weight : 0), 0);
  const isActivated = currentSum >= THRESHOLD;

  const chartData = [
    { name: 'Suma Actual', value: currentSum },
    { name: 'Umbral', value: THRESHOLD },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <Card title="Configuración de Entradas" className="h-full">
        <div className="grid gap-4">
          <p className="text-slate-600 mb-4">
            Activa las señales de entrada para ver si la suma ponderada supera el umbral de activación.
          </p>
          <div className="grid gap-3">
            {inputs.map((input, idx) => (
              <div 
                key={input.id} 
                onClick={() => toggleInput(idx)}
                className={`
                  cursor-pointer p-4 rounded-lg border-2 transition-all grid grid-cols-[auto_1fr_auto] gap-4 items-center
                  ${input.active ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-slate-50 hover:border-indigo-200'}
                `}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${input.active ? 'bg-indigo-500 text-white' : 'bg-slate-300'}`}>
                  {input.active && <CheckCircle size={16} />}
                </div>
                <div className="grid">
                  <span className="font-medium text-slate-700">Entrada {input.id}</span>
                  <span className="text-xs text-slate-500">Valor: {input.value} × Peso: {input.weight}</span>
                </div>
                <span className="font-mono font-bold text-slate-700">
                  {input.active ? (input.value * input.weight).toFixed(2) : '0.00'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-[1fr_auto] items-center">
            <span className="font-semibold text-slate-700">Suma Total:</span>
            <span className={`text-xl font-bold font-mono ${isActivated ? 'text-green-600' : 'text-slate-500'}`}>
              {currentSum.toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Visualización de Activación" className="h-full">
        <div className="grid grid-rows-[1fr_auto] gap-6 h-full">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 6]} />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? (isActivated ? '#10b981' : '#6366f1') : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className={`p-6 rounded-xl border-2 grid place-items-center transition-all duration-500 ${isActivated ? 'bg-green-50 border-green-500' : 'bg-slate-50 border-slate-200'}`}>
            <div className="grid place-items-center gap-2 text-center">
              {isActivated ? <Zap size={48} className="text-green-500" /> : <Activity size={48} className="text-slate-300" />}
              <h4 className={`text-lg font-bold ${isActivated ? 'text-green-700' : 'text-slate-400'}`}>
                {isActivated ? 'NEURONA ACTIVADA' : 'UMBRAL NO ALCANZADO'}
              </h4>
              <p className="text-sm text-slate-500">
                {isActivated 
                  ? `La suma (${currentSum.toFixed(2)}) supera el umbral (${THRESHOLD})` 
                  : `Se requieren ${(THRESHOLD - currentSum).toFixed(2)} unidades más`}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 2. Diagrama de Flujo Lógico Secuencial
const SequentialDiagram: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { id: 0, label: "Recepción de Estímulo", desc: "La señal entra al sistema", icon: <Binary /> },
    { id: 1, label: "Ponderación", desc: "Se aplican pesos sinápticos", icon: <Settings /> },
    { id: 2, label: "Sumatoria", desc: "Agregación de señales ponderadas", icon: <Layers /> },
    { id: 3, label: "Función de Activación", desc: "Evaluación contra umbral", icon: <Activity /> },
    { id: 4, label: "Salida", desc: "Generación de respuesta binaria", icon: <Zap /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="h-full grid grid-rows-[auto_1fr] gap-6">
       <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none">
         <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
           <PlayCircle className="text-indigo-400 animate-pulse" size={32} />
           <div>
             <h3 className="font-bold text-lg">Simulación en Tiempo Real</h3>
             <p className="text-slate-400 text-sm">El sistema procesa la información secuencialmente cada 2 segundos.</p>
           </div>
         </div>
       </Card>

       <Card title="Pipeline de Procesamiento" className="h-full">
         <div className="h-full grid grid-cols-1 md:grid-cols-5 gap-4 items-center relative">
            {/* Línea conectora de fondo */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 hidden md:block transform -translate-y-1/2"></div>
            
            {steps.map((s, idx) => {
              const isActive = idx === step;
              const isPast = idx < step;
              
              return (
                <div key={s.id} className="relative h-full grid grid-rows-[1fr_auto_1fr] justify-items-center group">
                  {/* Icono y Estado */}
                  <div className={`
                    w-16 h-16 rounded-2xl grid place-items-center shadow-lg transition-all duration-500 z-10 row-start-2
                    ${isActive ? 'bg-indigo-600 text-white scale-110 ring-4 ring-indigo-100' : 
                      isPast ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-300 border border-slate-200'}
                  `}>
                    {s.icon}
                  </div>

                  {/* Etiqueta Superior */}
                  <div className={`
                    row-start-1 self-end mb-4 text-center transition-opacity duration-300
                    ${isActive ? 'opacity-100' : 'opacity-50'}
                  `}>
                    <span className="text-sm font-bold text-slate-700 block">{s.label}</span>
                  </div>

                  {/* Descripción Inferior */}
                   <div className={`
                    row-start-3 self-start mt-4 text-center max-w-[120px] transition-all duration-300 p-2 rounded bg-slate-50
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                  `}>
                    <p className="text-xs text-slate-500 leading-tight">{s.desc}</p>
                  </div>

                  {/* Flecha conectora (Visual only) */}
                  {idx < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-1/2 w-full grid place-items-center md:hidden">
                       <ArrowRight className="text-slate-300" />
                    </div>
                  )}
                </div>
              );
            })}
         </div>
       </Card>
    </div>
  );
};

// 3. Diagrama de Equivalencia Neurona-Compuerta
const LogicGateDiagram: React.FC = () => {
  const [gateType, setGateType] = useState<'AND' | 'OR'>('AND');
  const [inputA, setInputA] = useState<0 | 1>(0);
  const [inputB, setInputB] = useState<0 | 1>(0);

  const gates: Record<string, LogicGateConfig> = {
    AND: { name: 'AND', w1: 1, w2: 1, bias: -1.5, threshold: 0 },
    OR:  { name: 'OR',  w1: 1, w2: 1, bias: -0.5, threshold: 0 }
  };

  const config = gates[gateType];
  
  // Cálculo de neurona: (x1*w1 + x2*w2) + bias >= threshold
  const weightedSum = (inputA * config.w1) + (inputB * config.w2);
  const totalActivation = weightedSum + config.bias;
  const output = totalActivation >= config.threshold ? 1 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 h-full">
      <div className="grid gap-6 content-start">
        <Card title="Configuración de Compuerta">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
              {(['AND', 'OR'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setGateType(type)}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    gateType === type ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Compuerta {type}
                </button>
              ))}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">Entradas Binarias</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setInputA(inputA === 0 ? 1 : 0)}
                  className={`p-3 rounded border text-center transition-colors ${inputA ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300'}`}
                >
                  A = {inputA}
                </button>
                <button 
                  onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                  className={`p-3 rounded border text-center transition-colors ${inputB ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300'}`}
                >
                  B = {inputB}
                </button>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Tabla de Verdad">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-2">A</th>
                <th className="p-2">B</th>
                <th className="p-2">Salida</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {a:0, b:0}, {a:0, b:1}, {a:1, b:0}, {a:1, b:1}
              ].map((row, idx) => {
                // Calcular salida esperada para la fila
                const rowRes = gateType === 'AND' ? (row.a && row.b) : (row.a || row.b);
                const isActive = row.a === inputA && row.b === inputB;
                return (
                  <tr key={idx} className={isActive ? 'bg-indigo-50 font-bold' : ''}>
                    <td className="p-2">{row.a}</td>
                    <td className="p-2">{row.b}</td>
                    <td className="p-2">{rowRes ? 1 : 0}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      </div>

      <Card title="Modelo Matemático de la Neurona" className="h-full">
        <div className="h-full grid grid-rows-[auto_1fr] gap-6">
            <div className="p-4 bg-slate-900 rounded-lg text-slate-200 font-mono text-sm leading-relaxed">
              <p>// Función de decisión</p>
              <p>f(x) = (A·w1 + B·w2) + Bias &ge; 0 ? 1 : 0</p>
              <p className="mt-2 text-indigo-400">
                ({inputA} · {config.w1}) + ({inputB} · {config.w2}) + ({config.bias}) = {totalActivation.toFixed(1)}
              </p>
            </div>

            <div className="relative border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 grid place-items-center overflow-hidden">
               {/* Representación Visual Neurona */}
               <svg viewBox="0 0 400 200" className="w-full h-full max-w-lg">
                  {/* Conexiones */}
                  <line x1="50" y1="50" x2="200" y2="100" stroke={inputA ? "#4f46e5" : "#cbd5e1"} strokeWidth="4" />
                  <line x1="50" y1="150" x2="200" y2="100" stroke={inputB ? "#4f46e5" : "#cbd5e1"} strokeWidth="4" />
                  <line x1="200" y1="100" x2="350" y2="100" stroke={output ? "#10b981" : "#cbd5e1"} strokeWidth="4" />

                  {/* Nodos de Entrada */}
                  <circle cx="50" cy="50" r="20" fill={inputA ? "#4f46e5" : "#e2e8f0"} />
                  <text x="50" y="55" textAnchor="middle" fill={inputA ? "white" : "#64748b"} fontSize="14" fontWeight="bold">A</text>

                  <circle cx="50" cy="150" r="20" fill={inputB ? "#4f46e5" : "#e2e8f0"} />
                  <text x="50" y="155" textAnchor="middle" fill={inputB ? "white" : "#64748b"} fontSize="14" fontWeight="bold">B</text>

                  {/* Núcleo Neurona */}
                  <circle cx="200" cy="100" r="40" fill="white" stroke="#334155" strokeWidth="3" />
                  <text x="200" y="95" textAnchor="middle" fontSize="12" fill="#64748b">Σ + Bias</text>
                  <text x="200" y="115" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">{totalActivation.toFixed(1)}</text>

                  {/* Salida */}
                  <circle cx="350" cy="100" r="25" fill={output ? "#10b981" : "#e2e8f0"} />
                  <text x="350" y="105" textAnchor="middle" fill={output ? "white" : "#64748b"} fontSize="16" fontWeight="bold">{output}</text>
               </svg>
            </div>
        </div>
      </Card>
    </div>
  );
};

// --- Estructura Principal de la App (Layout) ---

const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('threshold');

  const tabs: TabConfig[] = [
    {
      id: 'threshold',
      title: 'Activación por Umbral',
      icon: <Activity size={18} />,
      description: (
      <DivCarousel>
        <div>
          <p>
            La neurona de McCulloch y Pitts es un modelo binario que opera bajo un mecanismo de activación por umbral.
          </p>
          <p><strong>Componentes principales:</strong></p>

          <ul>
            <li><strong>Entradas (x₁, x₂, …, xₙ):</strong> valores binarios (0 o 1).</li>
            <li><strong>Pesos (w₁, w₂, …, wₙ):</strong> importancia asignada a cada entrada.</li>
            <li><strong>Sumador:</strong> calcula la suma ponderada.</li>
            <li><strong>Umbral (θ):</strong> valor límite de activación.</li>
            <li><strong>Salida binaria:</strong> 0 o 1.</li>
          </ul>

          <p>
            Es un modelo determinista: produce siempre el mismo resultado ante las mismas entradas.
          </p>
        </div>
      </DivCarousel>
    )
    },
    {
      id: 'sequential',
      title: 'Flujo Secuencial',
      icon: <ArrowRight size={18} />,
      description:  (
      <DivCarousel>
        <div>
          <p>
            El funcionamiento se basa en una regla de decisión simple:
          </p>

          <ul>
            <li>Multiplicar cada entrada por su peso.</li>
            <li>Sumar los resultados.</li>
            <li>Comparar la suma con el umbral.</li>
          </ul>

          <p><strong>Regla matemática:</strong></p>

          <p>
            Salida = 1 si ∑(xᵢ · wᵢ) ≥ θ<br />
            Salida = 0 si ∑(xᵢ · wᵢ) &lt; θ
          </p>

          <p>
            Este mecanismo convierte la neurona en una unidad de decisión lógica.
          </p>

          <p><strong>Características del modelo:</strong></p>

          <ul>
            <li>Opera con valores binarios.</li>
            <li>No posee aprendizaje automático.</li>
            <li>Su activación es discreta (todo o nada).</li>
          </ul>
        </div>
      </DivCarousel>
    )
    },
    {
      id: 'logic',
      title: 'Equivalencia Lógica',
      icon: <Cpu size={18} />,
      description: (
      <DivCarousel>
        <div>
          <p>
            Una de las contribuciones más importantes del modelo es que puede implementar funciones booleanas básicas:
          </p>

          <ul>
            <li>AND</li>
            <li>OR</li>
            <li>NOT</li>
          </ul>

          <p>
            Al configurar adecuadamente los pesos y el umbral, la neurona puede reproducir el comportamiento de estas compuertas lógicas.
          </p>

          <p>
            Esto implica que una red de estas neuronas puede representar cualquier función lógica computable.
          </p>
        </div>
      </DivCarousel>
    )
    }
  ];

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 grid grid-rows-[auto_auto_1fr]">
      {/* Header */}
      <header className="bg-slate-900 text-white p-4 shadow-md z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Layers size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Estructura y Funcionamiento del Modelo</h1>
          
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`
                  flex items-center justify-center gap-2 py-4 text-sm font-medium border-b-2 transition-all duration-200
                  ${activeTabId === tab.id 
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
                `}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-rows-[auto_1fr] gap-6">
        
        {/* Dynamic Header Section */}
        <div className="grid gap-2">
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             {activeTab.title}
           
           </h2>
           <p className="text-slate-600 max-w-3xl leading-relaxed">
             {activeTab.description}
           </p>
        </div>

        {/* Dynamic Diagram Render */}
        <div className="h-full min-h-[500px]">
          {activeTabId === 'threshold' && <ThresholdDiagram />}
          {activeTabId === 'sequential' && <SequentialDiagram />}
          {activeTabId === 'logic' && <LogicGateDiagram />}
        </div>

      </main>
    </div>
  );
};

export default App;