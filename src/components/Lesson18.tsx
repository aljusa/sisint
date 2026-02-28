import React, { useState, useEffect } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  
  Legend
} from 'recharts';
import { 
  Brain, 
  RefreshCw, 
  Activity, 
  GitBranch, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Calculator
} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- TIPOS E INTERFACES ---

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface ScatterDataPoint {
  x: number;
  y: number;
  class: number; // 0 o 1
}

// --- COMPONENTES UI GENÉRICOS ---

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className = "", 
  title 
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden ${className}`}>
      {title && (
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 shrink-0">
          <h3 className="font-semibold text-slate-700">{title}</h3>
        </div>
      )}
      <div className="p-6 flex-1 w-full relative">
        {children}
      </div>
    </div>
  );
};

// --- COMPONENTES DE DIAGRAMAS ESPECÍFICOS ---

// 1. Diagrama Circular del Proceso de Entrenamiento
const TrainingCycleDiagram: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % 4);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const steps = [
    { id: 0, label: "Predicción", desc: "La red calcula una salida basada en las entradas actuales.", color: "bg-blue-500" },
    { id: 1, label: "Comparación", desc: "Se compara la salida predicha con el valor real (Target).", color: "bg-purple-500" },
    { id: 2, label: "Cálculo de Error", desc: "Se determina la magnitud y el signo del error.", color: "bg-orange-500" },
    { id: 3, label: "Ajuste de Pesos", desc: "Se actualizan los pesos sinápticos para reducir el error futuro.", color: "bg-green-500" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-start">
      {/* Columna de Texto */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Ciclo de Entrenamiento</h2>
                <DivCarousel>
        <div>
          <p>
            El aprendizaje del perceptrón es supervisado, lo que significa que necesita ejemplos con etiqueta conocida.
          </p>

          <p><strong>Pasos del entrenamiento:</strong></p>

          <ul>
            <li>Inicializar pesos aleatoriamente.</li>
            <li>Presentar un ejemplo.</li>
            <li>Calcular la salida.</li>
            <li>Comparar con la etiqueta real.</li>
            <li>Ajustar pesos si existe error.</li>
            <li>Repetir el proceso.</li>
          </ul>

          <p>
            Este procedimiento se ejecuta de forma iterativa.
          </p>

       </div>
      </DivCarousel>

        </div>

        <div className="grid gap-4">
          {steps.map((s, idx) => (
            <div 
              key={s.id} 
              className={`p-4 rounded-lg border transition-all duration-300 ${
                step === idx 
                  ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105' 
                  : 'border-slate-200 bg-white opacity-70'
              }`}
            >
              <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                <div className={`w-8 h-8 rounded-full ${s.color} text-white grid place-items-center font-bold`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{s.label}</h4>
                  <p className="text-sm text-slate-500">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${
            isPlaying 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isPlaying ? 'Pausar Simulación' : 'Iniciar Ciclo'}
        </button>
      </div>

      {/* Columna Visual - Diagrama Circular SVG */}
      <Card className="h-full bg-slate-50 min-h-[400px]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Líneas conectoras */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]">
              <circle cx="50%" cy="50%" r="120" stroke="#e2e8f0" strokeWidth="2" fill="none" strokeDasharray="10 5" />
            </svg>

            {/* Nodos del ciclo */}
            {/* Top (Predicción) */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center bg-white z-10 transition-all duration-500 ${step === 0 ? 'border-blue-500 scale-110 shadow-lg' : 'border-slate-300'}`}>
              <Brain size={24} className={step === 0 ? 'text-blue-500' : 'text-slate-400'} />
              <span className="text-xs font-bold mt-1 text-slate-700">Predicción</span>
            </div>

            {/* Right (Comparación) */}
            <div className={`absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center bg-white z-10 transition-all duration-500 ${step === 1 ? 'border-purple-500 scale-110 shadow-lg' : 'border-slate-300'}`}>
              <Activity size={24} className={step === 1 ? 'text-purple-500' : 'text-slate-400'} />
              <span className="text-xs font-bold mt-1 text-slate-700">Comparar</span>
            </div>

            {/* Bottom (Ajuste) */}
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center bg-white z-10 transition-all duration-500 ${step === 3 ? 'border-green-500 scale-110 shadow-lg' : 'border-slate-300'}`}>
              <RefreshCw size={24} className={step === 3 ? 'text-green-500' : 'text-slate-400'} />
              <span className="text-xs font-bold mt-1 text-slate-700">Ajustar W</span>
            </div>

            {/* Left (Error) */}
            <div className={`absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center bg-white z-10 transition-all duration-500 ${step === 2 ? 'border-orange-500 scale-110 shadow-lg' : 'border-slate-300'}`}>
              <Calculator size={24} className={step === 2 ? 'text-orange-500' : 'text-slate-400'} />
              <span className="text-xs font-bold mt-1 text-slate-700">Error</span>
            </div>
            
            {/* Centro */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Iteración</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 2. Diagrama Secuencial de Actualización de Pesos
const WeightUpdateDiagram: React.FC = () => {
  const [weight, setWeight] = useState(0.5);
  const [inputVal] = useState(1.0); // Simplificación: Entrada fija
  const [target, setTarget] = useState(1);
  const [learningRate] = useState(0.1);
  
  // Perceptron simple output: step function at 0.5 for demo
  const output = weight * inputVal > 0.5 ? 1 : 0;
  const error = target - output;
  const delta = learningRate * error * inputVal;

  const handleUpdate = () => {
    setWeight(prev => Number((prev + delta).toFixed(2)));
  };

  const handleReset = () => {
    setWeight(0.5);
    setTarget(1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
       <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Dinámica de Actualización</h2>
          <DivCarousel>
        <div>
          <p>
            Si existe error, los pesos se actualizan según:
          </p>

          <p>
            wᵢ = wᵢ + η (y_real − y_predicho) xᵢ
          </p>

          <p><strong>Donde:</strong></p>

          <ul>
            <li>η = tasa de aprendizaje.</li>
            <li>y_real = etiqueta verdadera.</li>
            <li>y_predicho = salida del modelo.</li>
            <li>xᵢ = valor de entrada.</li>
          </ul>

          <p>
            Esta regla permite que el modelo reduzca progresivamente el error.
          </p>

        </div>
      </DivCarousel>
          <div className="bg-slate-100 p-4 rounded-md font-mono text-sm text-slate-700 border border-slate-200">
            W(nuevo) = W(actual) + (tasa × error × entrada)
          </div>
        </div>

        <Card title="Panel de Control">
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Objetivo Deseado (Target)</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setTarget(0)}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${target === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  0 (Inactivo)
                </button>
                <button 
                  onClick={() => setTarget(1)}
                  className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${target === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  1 (Activo)
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>Salida Actual: <span className="font-bold text-slate-800">{output}</span></div>
                <div>Error (Target - Salida): <span className={`font-bold ${error !== 0 ? 'text-red-500' : 'text-green-500'}`}>{error}</span></div>
                <div>Corrección (Delta): <span className="font-bold text-slate-800">{delta.toFixed(2)}</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleUpdate}
                  disabled={error === 0}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw size={16} /> Aplicar Corrección
                </button>
                <button 
                  onClick={handleReset}
                  className="border border-slate-300 text-slate-600 py-2 px-4 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Resetear
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Visualización del Peso Sináptico" className="bg-slate-50 min-h-[400px]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-xs space-y-2">
            {/* Visual representation of the weight as a bar */}
            <div className="flex justify-between text-sm font-semibold text-slate-500 mb-1">
              <span>0.0</span>
              <span>Valor del Peso (W)</span>
              <span>1.0+</span>
            </div>
            
            <div className="relative h-12 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              {/* Umbral visual */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-red-400 z-10 opacity-70" title="Umbral de activación aproximado"></div>
              
              {/* Barra de peso */}
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500 ease-out flex items-center justify-end pr-3 text-white font-bold shadow-lg"
                style={{ width: `${Math.min(Math.max(weight * 100, 0), 100)}%` }}
              >
                {weight.toFixed(2)}
              </div>
            </div>

            {/* Flecha indicadora de dirección */}
            <div className="h-8 flex justify-center mt-4">
              {error !== 0 && (
                <div className={`flex items-center gap-2 text-sm font-medium animate-pulse ${error > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {error > 0 ? (
                    <>Aumentando Peso <ArrowRight size={16} className="rotate-0" /></>
                  ) : (
                    <><ArrowRight size={16} className="rotate-180" /> Disminuyendo Peso</>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 text-center text-xs text-slate-500 leading-relaxed">
              El peso determina la importancia de la entrada. <br/>A mayor peso, más influencia en la activación.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// 3. Diagrama Comparativo de Separabilidad Lineal
const LinearSeparabilityDiagram: React.FC = () => {
  const [dataset, setDataset] = useState<'AND' | 'XOR'>('AND');

  // Datos para compuerta AND (Separable)
  const dataAND: ScatterDataPoint[] = [
    { x: 0, y: 0, class: 0 },
    { x: 0, y: 1, class: 0 },
    { x: 1, y: 0, class: 0 },
    { x: 1, y: 1, class: 1 },
  ];

  // Datos para compuerta XOR (No Separable)
  const dataXOR: ScatterDataPoint[] = [
    { x: 0, y: 0, class: 0 },
    { x: 0, y: 1, class: 1 },
    { x: 1, y: 0, class: 1 },
    { x: 1, y: 1, class: 0 },
  ];

  const currentData = dataset === 'AND' ? dataAND : dataXOR;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Separabilidad Lineal</h2>
         <DivCarousel>
        <div>
          <p>
            El algoritmo del perceptrón converge si los datos son linealmente separables.
          </p>

          <p>Si no lo son:</p>

          <ul>
            <li>El modelo no encuentra solución estable.</li>
            <li>Los pesos pueden oscilar indefinidamente.</li>
            <li>El error no desaparece completamente.</li>
          </ul>

          <p>
            Esta propiedad define el límite estructural del modelo.
          </p>

        </div>
      </DivCarousel>
        </div>

        <Card title="Selector de Datos">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setDataset('AND')}
              className={`p-4 rounded-lg border text-left transition-all ${
                dataset === 'AND' 
                  ? 'border-green-500 bg-green-50 ring-1 ring-green-500' 
                  : 'border-slate-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={20} className="text-green-600" />
                <span className="font-bold text-slate-800">Conjunto AND</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Separable linealmente. El perceptrón converge.</p>
            </button>

            <button
              onClick={() => setDataset('XOR')}
              className={`p-4 rounded-lg border text-left transition-all ${
                dataset === 'XOR' 
                  ? 'border-red-500 bg-red-50 ring-1 ring-red-500' 
                  : 'border-slate-200 hover:border-red-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <XCircle size={20} className="text-red-600" />
                <span className="font-bold text-slate-800">Conjunto XOR</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">No separable linealmente. Requiere capas ocultas.</p>
            </button>
          </div>
        </Card>

        <div className={`p-4 rounded-lg border-l-4 transition-colors ${dataset === 'AND' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'}`}>
          <h4 className="font-bold mb-1">Análisis:</h4>
          <p className="text-sm leading-relaxed">
            {dataset === 'AND' 
              ? "Observa cómo podemos trazar una línea diagonal que separe perfectamente los puntos rojos (0) del punto azul (1)."
              : "Es imposible trazar una sola línea recta que separe los puntos azules de los rojos sin cometer errores."}
          </p>
        </div>
      </div>

      <Card className="w-full">
        {/* Usamos una altura explícita para que ResponsiveContainer no colapse */}
        <div className="w-full h-[350px] sm:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="Entrada 1" domain={[-0.5, 1.5]} ticks={[-0.5, 0, 0.5, 1, 1.5]} />
              <YAxis type="number" dataKey="y" name="Entrada 2" domain={[-0.5, 1.5]} ticks={[-0.5, 0, 0.5, 1, 1.5]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              
              {/* Visualización de la Línea de Separación (Aproximada para AND) */}
              {dataset === 'AND' && (
                <Scatter 
                  name="Frontera de Decisión" 
                  data={[{x: -0.2, y: 1.2}, {x: 1.2, y: -0.2}]} 
                  line={{ stroke: '#64748b', strokeWidth: 2, strokeDasharray: '5 5' }} 
                  fill="transparent"
                  legendType="none"
                  isAnimationActive={false}
                />
              )}

              {/* Data points limpios sin mapeo interno problemático */}
              <Scatter name="Clase 0 (Inactivo)" data={currentData.filter(d => d.class === 0)} fill="#ef4444" shape="circle" />
              <Scatter name="Clase 1 (Activo)" data={currentData.filter(d => d.class === 1)} fill="#3b82f6" shape="square" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

// --- ESTRUCTURA PRINCIPAL (LAYOUT) ---

const LessonLayout: React.FC<{ children: React.ReactNode; activeTabId: string; onTabChange: (id: string) => void; tabs: TabConfig[] }> = ({
  children,
  activeTabId,
  onTabChange,
  tabs
}) => {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      {/* Header Area */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-lg text-white shadow-sm">
            <GitBranch size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Fundamentos de Redes Neuronales</h1>
            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mt-0.5">Módulo 1: El Perceptrón</p>
          </div>
        </div>
        
        {/* Navegación por Pestañas Superior */}
        <nav className="flex gap-1 overflow-x-auto pb-1 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTabId === tab.id
                  ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-600/20'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 flex justify-center overflow-y-auto">
        <div className="w-full max-w-6xl">
           {children}
        </div>
      </main>
      
      {/* Keyframes customizados inyectados de forma segura */}
      <style>{`
        @keyframes fadeInTab {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-tab {
          animation: fadeInTab 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

// --- COMPONENTE APP PRINCIPAL ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('cycle');

  const tabs: TabConfig[] = [
    { 
      id: 'cycle', 
      label: 'Entrenamiento', 
      icon: <RefreshCw size={18} />, 
      component: <TrainingCycleDiagram /> 
    },
    { 
      id: 'weights', 
      label: 'Pesos y Error', 
      icon: <Activity size={18} />, 
      component: <WeightUpdateDiagram /> 
    },
    { 
      id: 'separability', 
      label: 'Separabilidad', 
      icon: <GitBranch size={18} />, 
      component: <LinearSeparabilityDiagram /> 
    }
  ];

  const activeContent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <LessonLayout 
      activeTabId={activeTab} 
      onTabChange={setActiveTab} 
      tabs={tabs}
    >
      {/* Usamos el key en el contenedor para forzar la re-animación al cambiar de pestaña */}
      <div key={activeTab} className="animate-fade-in-tab h-full">
        {activeContent}
      </div>
    </LessonLayout>
  );
};

export default App;