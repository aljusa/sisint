import React, { useState,  } from 'react';
import { Play, RotateCcw, Activity, ArrowRight, Brain, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- Types & Interfaces ---

type TabId = 'flow' | 'comparison' | 'theory';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface DataPoint {
  x: number;
  linear: number;
  nonlinear: number;
}

// --- Data Generation ---

const generateChartData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let x = -10; x <= 10; x += 1) {
    // Modelo Lineal: y = mx + b (simulado)
    const linear = 0.5 * x + 5; 
    
    // Modelo No Lineal (Sigmoide): 1 / (1 + e^-x) escalado para visualización
    const sigmoid = 1 / (1 + Math.exp(-x));
    const nonlinear = sigmoid * 10; // Escalado a rango 0-10 para comparar visualmente

    data.push({ x, linear, nonlinear });
  }
  return data;
};

const chartData = generateChartData();

// --- Components ---

/**
 * Card: Contenedor genérico para secciones de contenido.
 */
const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className = "", 
  title 
}) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

/**
 * FlowDiagram: Visualización dinámica SVG del proceso de activación.
 */
const FlowDiagram: React.FC = () => {
  const [activeState, setActiveState] = useState<'idle' | 'input' | 'sum' | 'activation' | 'output'>('idle');

  const runAnimation = () => {
    if (activeState !== 'idle') return;
    setActiveState('input');
    setTimeout(() => setActiveState('sum'), 1000);
    setTimeout(() => setActiveState('activation'), 2000);
    setTimeout(() => setActiveState('output'), 3000);
    setTimeout(() => setActiveState('idle'), 4500);
  };

  const getNodeColor = (target: string) => {
    const states = ['input', 'sum', 'activation', 'output'];
    const currentIndex = states.indexOf(activeState);
    const targetIndex = states.indexOf(target);
    return currentIndex >= targetIndex && activeState !== 'idle' ? '#10b981' : '#e2e8f0'; // Emerald-500 vs Slate-200
  };

  const getTextColor = (target: string) => {
    const states = ['input', 'sum', 'activation', 'output'];
    const currentIndex = states.indexOf(activeState);
    const targetIndex = states.indexOf(target);
    return currentIndex >= targetIndex && activeState !== 'idle' ? 'text-emerald-700 font-bold' : 'text-slate-400';
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid justify-items-center">
        {/* SVG Diagram Render */}
        <svg viewBox="0 0 800 300" className="w-full max-w-4xl h-auto drop-shadow-sm">
          {/* Connections */}
          <path d="M 100 80 L 300 150" stroke={getNodeColor('sum')} strokeWidth="4" className="transition-colors duration-500" />
          <path d="M 100 150 L 300 150" stroke={getNodeColor('sum')} strokeWidth="4" className="transition-colors duration-500" />
          <path d="M 100 220 L 300 150" stroke={getNodeColor('sum')} strokeWidth="4" className="transition-colors duration-500" />
          <path d="M 360 150 L 500 150" stroke={getNodeColor('activation')} strokeWidth="4" className="transition-colors duration-500" />
          <path d="M 600 150 L 750 150" stroke={getNodeColor('output')} strokeWidth="4" className="transition-colors duration-500" />

          {/* Input Nodes */}
          <circle cx="100" cy="80" r="30" fill="white" stroke={getNodeColor('input')} strokeWidth="4" />
          <text x="100" y="85" textAnchor="middle" className="text-sm fill-slate-500">x₁</text>
          
          <circle cx="100" cy="150" r="30" fill="white" stroke={getNodeColor('input')} strokeWidth="4" />
          <text x="100" y="155" textAnchor="middle" className="text-sm fill-slate-500">x₂</text>

          <circle cx="100" cy="220" r="30" fill="white" stroke={getNodeColor('input')} strokeWidth="4" />
          <text x="100" y="225" textAnchor="middle" className="text-sm fill-slate-500">x₃</text>

          {/* Sum Node */}
          <circle cx="330" cy="150" r="40" fill="white" stroke={getNodeColor('sum')} strokeWidth="4" />
          <text x="330" y="155" textAnchor="middle" className="text-lg font-bold fill-slate-600">Σ</text>
          <text x="330" y="210" textAnchor="middle" className="text-xs fill-slate-400">Suma Ponderada</text>

          {/* Activation Function Node */}
          <rect x="500" y="110" width="100" height="80" rx="10" fill="white" stroke={getNodeColor('activation')} strokeWidth="4" />
          <path d="M 520 160 Q 550 160 550 130" fill="none" stroke="#64748b" strokeWidth="3" />
          <text x="550" y="210" textAnchor="middle" className="text-xs fill-slate-400">Función No Lineal</text>
          <text x="550" y="155" textAnchor="middle" className="text-sm font-bold fill-slate-600">f(x)</text>

          {/* Output Node */}
          <circle cx="750" cy="150" r="30" fill="white" stroke={getNodeColor('output')} strokeWidth="4" />
          <text x="750" y="155" textAnchor="middle" className="text-sm font-bold fill-slate-600">y</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center bg-slate-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 gap-2">
           <div className={`transition-all duration-500 ${getTextColor('input')}`}>1. Entradas (Inputs): Los datos crudos entran a la red.</div>
           <div className={`transition-all duration-500 ${getTextColor('sum')}`}>2. Suma (Σ): Se multiplican por pesos y se suman (Lineal).</div>
           <div className={`transition-all duration-500 ${getTextColor('activation')}`}>3. Activación (f(x)): ¡Aquí ocurre la magia! Se rompe la linealidad.</div>
           <div className={`transition-all duration-500 ${getTextColor('output')}`}>4. Salida (Output): El resultado final procesado.</div>
        </div>
        <button 
          onClick={runAnimation} 
          disabled={activeState !== 'idle'}
          className={`
            grid grid-flow-col gap-2 items-center px-6 py-3 rounded-lg font-bold transition-all
            ${activeState === 'idle' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          {activeState === 'idle' ? <><Play size={18} /> Simular Activación</> : <><RotateCcw size={18} /> Procesando...</>}
        </button>
      </div>
    </div>
  );
};

/**
 * ComparisonChart: Gráfico estático comparativo usando Recharts.
 */
const ComparisonChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Gráfico 1: Sin Activación */}
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <h4 className="font-bold text-red-800 flex items-center gap-2">
            <TrendingUp size={18} />
            Sin Activación (Lineal)
          </h4>
          <p className="text-sm text-red-600 mt-1">
            La red es solo una regresión lineal glorificada. No puede aprender patrones complejos.
            El resultado es siempre una línea recta.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="linear" 
                stroke="#ef4444" 
                strokeWidth={3} 
                name="Modelo Lineal"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Con Activación */}
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
          <h4 className="font-bold text-emerald-800 flex items-center gap-2">
            <Activity size={18} />
            Con Activación (No Lineal)
          </h4>
          <p className="text-sm text-emerald-600 mt-1">
            La función de activación (ej. Sigmoide) introduce curvas. Esto permite
            clasificar datos complejos y "aprender" fronteras difusas.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="nonlinear" 
                stroke="#10b981" 
                strokeWidth={3} 
                name="Activación (Sigmoide)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

/**
 * TheorySection: Contenido textual explicativo.
 */
const TheorySection: React.FC = () => (
  <div className="grid gap-6 text-slate-700 leading-relaxed">
    <p>
      En las redes neuronales artificiales, la <strong>función de activación</strong> es un componente matemático
      que determina si una neurona debe "dispararse" o no. Es el componente crucial que transforma
      la señal de entrada sumada en la señal de salida.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-50 p-4 rounded border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-2">¿Por qué es vital?</h4>
        <p className="text-sm">
          Sin funciones de activación, una red neuronal, sin importar cuántas capas tenga,
          se comportaría igual que un perceptrón de una sola capa. Sería capaz de resolver
          únicamente problemas separables linealmente.
        </p>
      </div>
      <div className="bg-slate-50 p-4 rounded border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-2">Tipos Comunes</h4>
        <ul className="text-sm list-disc list-inside space-y-1">
          <li><strong>Sigmoide:</strong> Curva en forma de S (0 a 1).</li>
          <li><strong>ReLU:</strong> Retificador lineal unitario (muy popular).</li>
          <li><strong>Tanh:</strong> Tangente hiperbólica (-1 a 1).</li>
        </ul>
      </div>
    </div>
  </div>
);

/**
 * LessonLayout: Estructura principal basada en Grid.
 */
const LessonLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('flow');

  const tabs: Tab[] = [
    { id: 'flow', label: 'Flujo de Activación', icon: <ArrowRight size={16} /> },
    { id: 'comparison', label: 'Lineal vs No Lineal', icon: <Activity size={16} /> },
    { id: 'theory', label: 'Teoría Fundamental', icon: <Brain size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans grid grid-rows-[auto_auto_1fr]">
      
      {/* 1. Header Area */}
      <header className="bg-slate-900 text-white p-6 shadow-md grid grid-cols-[auto_1fr] items-center gap-4">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Brain size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide">Funciones de Activación</h1>
          <p className="text-slate-400 text-sm">Arquitectura de Redes Neuronales</p>
        </div>
      </header>

      {/* 2. Navigation Area (Tabs) - Usando Grid para la estructura */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-flow-col justify-start gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                grid grid-flow-col gap-2 items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors
                ${activeTab === tab.id 
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 3. Main Content Area - Grid Layout */}
      <main className="p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto grid gap-6">
          
          {/* Header dinámico de la sección */}
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold text-slate-800">
              {activeTab === 'flow' && 'Visualización del Proceso'}
              {activeTab === 'comparison' && 'Impacto Matemático'}
              {activeTab === 'theory' && 'Conceptos Clave'}
            </h2>
            <p className="text-slate-600">
              {activeTab === 'flow' && 'Diagrama dinámico que ilustra cómo la información fluye y se transforma a través de una neurona.'}
              {activeTab === 'comparison' && 'Comparativa visual entre un modelo incapaz de aprender curvas complejas y uno con activación no lineal.'}
              {activeTab === 'theory' && 'Fundamentos teóricos sobre por qué necesitamos romper la linealidad en Deep Learning.'}
            </p>
          </div>

          {/* Renderizado Condicional del Diagrama/Contenido */}
          <Card className="min-h-[400px]">
            {activeTab === 'flow' && <FlowDiagram />}
            {activeTab === 'comparison' && <ComparisonChart />}
            {activeTab === 'theory' && <TheorySection />}
          </Card>

        </div>
      </main>

    </div>
  );
};

export default function App() {
  return <LessonLayout />;
}