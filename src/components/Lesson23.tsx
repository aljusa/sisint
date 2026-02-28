import React, { useState } from 'react';
import { 
  Activity, 
  GitBranch, 
  Info, 
  CheckCircle2, 
  ArrowRight,
  RefreshCcw,
  Maximize2
} from 'lucide-react';

// --- TIPOS Y DEFINICIONES ---

type TabID = 'comparative' | 'decision-tree';

interface ActivationFunction {
  name: string;
  formula: string;
  range: string;
  useCase: string;
  pros: string;
  cons: string;
  color: string;
}

interface TreeStep {
  id: string;
  question: string;
  options: { label: string; nextId: string | null; result?: string }[];
}

// --- DATOS ---

const activationFunctions: ActivationFunction[] = [
  {
    name: "Sigmoid",
    formula: "σ(x) = 1 / (1 + e⁻ˣ)",
    range: "(0, 1)",
    useCase: "Salida (Clasificación Binaria)",
    pros: "Interpretación probabilística clara.",
    cons: "Vanishing gradient, no centrada en cero.",
    color: "#3b82f6" // blue-500
  },
  {
    name: "Tanh",
    formula: "tanh(x)",
    range: "(-1, 1)",
    useCase: "Capas ocultas (RNNs)",
    pros: "Centrada en cero, convergencia más rápida que Sigmoid.",
    cons: "Vanishing gradient en valores extremos.",
    color: "#8b5cf6" // violet-500
  },
  {
    name: "ReLU",
    formula: "max(0, x)",
    range: "[0, ∞)",
    useCase: "Capas ocultas (Estándar en CNN/MLP)",
    pros: "Eficiente computacionalmente, evita vanishing gradient (+).",
    cons: "Dying ReLU (neuronas muertas si x < 0).",
    color: "#10b981" // emerald-500
  },
  {
    name: "Leaky ReLU",
    formula: "max(0.01x, x)",
    range: "(-∞, ∞)",
    useCase: "Capas ocultas (Si ReLU falla)",
    pros: "Soluciona el problema de Dying ReLU.",
    cons: "Hiperparámetro extra (α).",
    color: "#f59e0b" // amber-500
  },
  {
    name: "Softmax",
    formula: "eˣⁱ / Σeˣʲ",
    range: "(0, 1)",
    useCase: "Salida (Clasificación Multiclase)",
    pros: "Normaliza salidas a distribución de probabilidad.",
    cons: "Costosa computacionalmente con muchas clases.",
    color: "#ef4444" // red-500
  }
];

const decisionTreeSteps: Record<string, TreeStep> = {
  start: {
    id: 'start',
    question: "¿En qué tipo de capa estás trabajando?",
    options: [
      { label: "Capa Oculta", nextId: 'hidden' },
      { label: "Capa de Salida", nextId: 'output' }
    ]
  },
  hidden: {
    id: 'hidden',
    question: "¿Cuál es la arquitectura de la red?",
    options: [
      { label: "Red Neuronal Recurrente (RNN)", nextId: null, result: "Tanh" },
      { label: "CNN o MLP (Perceptrón)", nextId: 'mlp_depth' }
    ]
  },
  mlp_depth: {
    id: 'mlp_depth',
    question: "¿Te preocupa el problema de 'Dying ReLU' (gradientes muertos)?",
    options: [
      { label: "No / Quiero empezar simple", nextId: null, result: "ReLU" },
      { label: "Sí / ReLU no converge bien", nextId: null, result: "Leaky ReLU" }
    ]
  },
  output: {
    id: 'output',
    question: "¿Qué tipo de problema estás resolviendo?",
    options: [
      { label: "Regresión (Valores continuos)", nextId: null, result: "Linear (Identity)" },
      { label: "Clasificación", nextId: 'classification' }
    ]
  },
  classification: {
    id: 'classification',
    question: "¿Cuántas clases tiene tu clasificación?",
    options: [
      { label: "Binaria (2 clases)", nextId: null, result: "Sigmoid" },
      { label: "Multiclase (>2 clases)", nextId: null, result: "Softmax" }
    ]
  }
};

// --- COMPONENTES UI ---

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
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

// --- COMPONENTE DE GRÁFICO SVG MINIATURA ---

const MiniPlot: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  // Generar puntos para el path SVG
  const generatePath = (t: string) => {
    let path = "M 0 ";
    const width = 100;
    const height = 60;
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const xNorm = i / steps; // 0 to 1
      const xVal = (xNorm * 10) - 5; // -5 to 5
      let yVal = 0;

      // Normalizar Y para que encaje en height (0 a 60, donde 30 es el centro)
      // SVG coord system: 0 es arriba, height es abajo.
      
      switch (t) {
        case 'Sigmoid':
          yVal = 1 / (1 + Math.exp(-xVal));
          // Map 0..1 to height..0
          yVal = height - (yVal * height); 
          break;
        case 'Tanh':
          yVal = Math.tanh(xVal);
          // Map -1..1 to height..0
          yVal = (height/2) - (yVal * (height/2 - 2)); 
          break;
        case 'ReLU':
          yVal = Math.max(0, xVal);
          // Map 0..5 to height/2..0
          yVal = (height/2) - (yVal * 5); 
          if(yVal < 0) yVal = 0; // Clip top
          if(yVal > height) yVal = height;
          break;
        case 'Leaky ReLU':
          yVal = xVal > 0 ? xVal : 0.1 * xVal;
           // Scale similar to ReLU
          yVal = (height/2) - (yVal * 5);
          break;
        case 'Softmax':
          // Representación simbólica (exponencial suave)
          yVal = Math.exp(xVal/2); 
          yVal = height - (yVal * 2);
          if (yVal < 0) yVal = 0;
          break;
        default:
          yVal = height/2;
      }
      
      path += (i === 0 ? `${height - yVal}` : `L ${i * (width/steps)} ${yVal} `);
    }
    return path;
  };

  return (
    <svg width="100" height="60" viewBox="0 0 100 60" className="bg-slate-50 rounded border border-slate-100">
      {/* Ejes */}
      <line x1="0" y1="30" x2="100" y2="30" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="50" y1="0" x2="50" y2="60" stroke="#cbd5e1" strokeWidth="1" />
      {/* Curva */}
      <path d={generatePath(type)} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// --- VISTAS ---

const ComparativeTable: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-4 font-bold text-slate-500 border-b-2 border-slate-200 pb-2 px-2 text-sm uppercase tracking-wider">
        <div>Función & Visualización</div>
        <div>Rango</div>
        <div>Uso Típico</div>
        <div>Ventaja Principal</div>
      </div>
      
      {activationFunctions.map((fn) => (
        <div key={fn.name} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:border-slate-300 transition-colors">
          <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
            <MiniPlot type={fn.name} color={fn.color} />
            <div>
              <div className="font-bold text-lg text-slate-800">{fn.name}</div>
              <div className="text-xs font-mono text-slate-500 bg-slate-100 inline-block px-1 rounded mt-1">{fn.formula}</div>
            </div>
          </div>
          
          <div className="text-sm font-medium text-slate-600">
            <span className="md:hidden font-bold text-slate-400 mr-2">Rango:</span>
            {fn.range}
          </div>
          
          <div className="text-sm text-slate-600">
            <span className="md:hidden font-bold text-slate-400 mr-2">Uso:</span>
            {fn.useCase}
          </div>
          
          <div className="text-sm text-slate-600 bg-emerald-50 text-emerald-700 p-2 rounded border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 inline-block mr-1 -mt-0.5" />
            {fn.pros}
          </div>
        </div>
      ))}
    </div>
  );
};

const InteractiveDecisionTree: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['start']);
  const [result, setResult] = useState<string | null>(null);

  const currentStepId = history[history.length - 1];
  const currentStep = decisionTreeSteps[currentStepId];

  const handleOptionClick = (nextId: string | null, finalResult?: string) => {
    if (finalResult) {
      setResult(finalResult);
    } else if (nextId) {
      setHistory([...history, nextId]);
    }
  };

  const resetTree = () => {
    setHistory(['start']);
    setResult(null);
  };

  const getBreadcrumbs = () => {
    return history.map((id, idx) => {
      // Find the option label that led here (simplified for demo)
      return <span key={id} className="text-xs text-slate-400">{idx > 0 ? ' > ' : ''}{id.toUpperCase()}</span>
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      {/* Panel Izquierdo: Interacción */}
      <Card title="Selector Interactivo" className="h-full">
        {!result ? (
          <div className="grid grid-rows-[auto_1fr] gap-6 h-full">
            <div className="flex items-center space-x-2 text-indigo-600 bg-indigo-50 p-3 rounded-lg">
              <GitBranch size={24} />
              <h2 className="text-xl font-bold">Paso {history.length}</h2>
            </div>
            
            <div className="self-center">
              <h3 className="text-2xl font-light text-slate-800 mb-8 text-center">
                {currentStep.question}
              </h3>

              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {currentStep.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt.nextId, opt.result)}
                    className="group relative flex items-center justify-between w-full p-4 bg-white border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all shadow-sm hover:shadow-md text-left"
                  >
                    <span className="font-medium text-slate-700 group-hover:text-indigo-700">{opt.label}</span>
                    <ArrowRight className="text-slate-300 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" size={20} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
               <div className="flex space-x-2">{getBreadcrumbs()}</div>
               {history.length > 1 && (
                 <button onClick={resetTree} className="text-sm text-slate-500 hover:text-red-500 flex items-center">
                   <RefreshCcw size={14} className="mr-1"/> Reiniciar
                 </button>
               )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-in fade-in zoom-in duration-300">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h2 className="text-lg text-slate-500 mb-2">La función recomendada es:</h2>
            <h1 className="text-5xl font-extrabold text-slate-800 mb-8 tracking-tight">{result}</h1>
            <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
              <button 
                onClick={resetTree}
                className="flex items-center justify-center w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-lg shadow-indigo-200"
              >
                <RefreshCcw className="mr-2" size={18} />
                Comenzar de nuevo
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Panel Derecho: Visualización Dinámica del estado */}
      <Card title="Diagrama de Flujo Lógico" className="bg-slate-50/50 hidden lg:block">
        <div className="h-full flex flex-col items-center justify-center opacity-80">
          {/* Visualización simple del árbol */}
          <div className="grid gap-4 w-full max-w-sm relative">
             <div className={`border-l-2 border-dashed absolute left-6 top-6 bottom-6 border-slate-300 -z-10 ${history.length > 1 ? 'opacity-100' : 'opacity-0'}`}></div>
             
             {history.map((stepId, idx) => {
               const stepData = decisionTreeSteps[stepId];
               const isLast = idx === history.length - 1;
               const isActive = !result && isLast;
               
               return (
                 <div key={stepId} className={`flex items-start transition-all duration-500 ${isActive ? 'scale-105' : 'opacity-60'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 z-10 ${isActive ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300 text-slate-400'}`}>
                      {idx + 1}
                    </div>
                    <div className="ml-4 pt-2 bg-white p-3 rounded shadow-sm border border-slate-200 w-full">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paso {idx + 1}</div>
                      <div className="text-sm font-medium text-slate-700">{stepData.question}</div>
                    </div>
                 </div>
               )
             })}
             
             {result && (
               <div className="flex items-start animate-in slide-in-from-bottom-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 z-10 bg-green-500 border-green-500 text-white shadow-lg shadow-green-200">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="ml-4 pt-3 bg-green-50 p-4 rounded shadow-sm border border-green-200 w-full">
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wider">Resultado Final</div>
                    <div className="text-xl font-bold text-green-800">{result}</div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- LAYOUT PRINCIPAL ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabID>('comparative');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans grid grid-rows-[auto_1fr]">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-[1fr_auto] items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <Activity size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">DeepLearning<span className="text-indigo-400">Viz</span></h1>
              <p className="text-xs text-slate-400">Guía interactiva de Funciones de Activación</p>
            </div>
          </div>
          <nav className="text-sm font-medium text-slate-400 hidden sm:block">
            Módulo Educativo v1.0
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full grid grid-rows-[auto_1fr] gap-6">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 gap-4 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm max-w-md mx-auto w-full">
          <button
            onClick={() => setActiveTab('comparative')}
            className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'comparative' 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <Maximize2 size={18} />
            <span>Tabla Comparativa</span>
          </button>
          
          <button
            onClick={() => setActiveTab('decision-tree')}
            className={`flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === 'decision-tree' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <GitBranch size={18} />
            <span>Árbol de Decisión</span>
          </button>
        </div>

        {/* Dynamic Content Panel */}
        <div className="w-full">
          <div className="mb-6">
             <h2 className="text-2xl font-bold text-slate-800">
                {activeTab === 'comparative' ? 'Comparativa de Funciones' : 'Selector Inteligente'}
             </h2>
             <p className="text-slate-500 mt-1 max-w-2xl">
               {activeTab === 'comparative' 
                 ? 'Analiza las diferencias clave entre las funciones de activación más utilizadas en redes neuronales modernas.' 
                 : 'Responde una serie de preguntas para determinar la función de activación óptima para tu arquitectura.'}
             </p>
          </div>

          {activeTab === 'comparative' ? <ComparativeTable /> : <InteractiveDecisionTree />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <Info size={16} /> 
            Desarrollado con React + TypeScript + CSS Grid
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;