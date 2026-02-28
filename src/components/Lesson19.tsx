import React, { useState, useEffect } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Cell 
} from 'recharts';
import { 
  Brain, 
  Network, 
  History, 
  GitGraph, 
  Activity, 
  Layers,
  Info
} from 'lucide-react';

// --- Tipos e Interfaces ---

interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  component: React.ReactNode;
}

// --- Componentes de UI Base ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-blue-100 text-blue-800' }) => (
  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
    {children}
  </span>
);

// --- Visualización 1: Problema XOR (Estático) ---

const XORChart = () => {
  const data = [
    { x: 0, y: 0, class: 0, label: '(0,0) -> 0' }, // Clase 0
    { x: 1, y: 1, class: 0, label: '(1,1) -> 0' }, // Clase 0
    { x: 0, y: 1, class: 1, label: '(0,1) -> 1' }, // Clase 1
    { x: 1, y: 0, class: 1, label: '(1,0) -> 1' }, // Clase 1
  ];

  return (
    <div className="h-full w-full p-4 grid grid-rows-[auto_1fr] gap-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Output 0 (Falso)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Output 1 (Verdadero)</span>
        </div>
      </div>
      <div className="h-64 md:h-full min-h-[300px] border rounded-lg bg-slate-50">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="Input 1" unit="" domain={[-0.5, 1.5]} ticks={[0, 1]} />
            <YAxis type="number" dataKey="y" name="Input 2" unit="" domain={[-0.5, 1.5]} ticks={[0, 1]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            {/* Línea de intento de separación (fallida) */}
            <ReferenceLine segment={[{ x: -0.5, y: 0.8 }, { x: 1.5, y: 0.2 }]} stroke="red" strokeDasharray="5 5" label="Separador Lineal (Falla)" />
            <Scatter name="XOR Data" data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.class === 0 ? '#3b82f6' : '#ef4444'} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-500 text-center italic mt-2">
        Nota visual: Es imposible dibujar una sola línea recta que separe los puntos rojos de los azules.
      </p>
    </div>
  );
};

// --- Visualización 2: Impacto Histórico (Estático / Diagrama de Flujo) ---

const HistoryFlow = () => {
  return (
    <div className="h-full w-full p-6 grid place-items-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
      <div className="w-full max-w-lg grid gap-6 relative">
        {/* Línea conectora vertical */}
        <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-300 -z-10 hidden md:block"></div>

        {/* Paso 1 */}
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 border-4 border-white shadow-md grid place-items-center text-indigo-600 z-10">
            <Brain size={24} />
          </div>
          <Card className="p-4 border-l-4 border-l-indigo-500">
            <h4 className="font-bold text-slate-800">Limitaciones Teóricas (1969)</h4>
            <p className="text-sm text-slate-600">Minsky y Papert publican "Perceptrons", demostrando la incapacidad de resolver problemas no lineales (XOR).</p>
          </Card>
        </div>

        {/* Flecha Abajo (Mobile) */}
        <div className="grid place-items-center md:hidden text-slate-400">↓</div>

        {/* Paso 2 */}
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-white shadow-md grid place-items-center text-amber-600 z-10">
            <Activity size={24} />
          </div>
          <Card className="p-4 border-l-4 border-l-amber-500">
            <h4 className="font-bold text-slate-800">Cambio de Enfoque</h4>
            <p className="text-sm text-slate-600">La comunidad científica abandona el conexionismo a favor de la IA simbólica y sistemas expertos.</p>
          </Card>
        </div>

        {/* Flecha Abajo (Mobile) */}
        <div className="grid place-items-center md:hidden text-slate-400">↓</div>

        {/* Paso 3 */}
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="w-16 h-16 rounded-full bg-slate-200 border-4 border-white shadow-md grid place-items-center text-slate-600 z-10">
            <History size={24} />
          </div>
          <Card className="p-4 border-l-4 border-l-slate-500 bg-slate-50">
            <h4 className="font-bold text-slate-800">El Primer Invierno de la IA</h4>
            <p className="text-sm text-slate-600">Reducción drástica de financiación (DARPA/NRC) durante la década de los 70s.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Visualización 3: Evolución (Dinámico) ---

const EvolutionAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { title: "1. Perceptrón Simple", desc: "Una sola capa. Solo lineal.", layers: [2, 1] },
    { title: "2. Perceptrón Multicapa (MLP)", desc: "Capa oculta. Resuelve XOR.", layers: [2, 3, 1] },
    { title: "3. Deep Learning", desc: "Múltiples capas ocultas. Abstracción compleja.", layers: [2, 4, 4, 2, 1] }
  ];

  const currentStage = stages[step];

  return (
    <div className="h-full w-full p-6 grid grid-rows-[auto_1fr_auto] gap-6 bg-slate-900 rounded-lg text-white">
      <div className="text-center">
        <h3 className="text-xl font-bold text-cyan-400 transition-all duration-500">{currentStage.title}</h3>
        <p className="text-slate-400 text-sm transition-all duration-500">{currentStage.desc}</p>
      </div>

      <div className="relative grid place-items-center">
        {/* Renderizado SVG de la red */}
        <svg viewBox="0 0 400 200" className="w-full h-full max-h-[300px]">
          <g>
            {/* Conexiones */}
            {currentStage.layers.map((nodeCount, layerIndex) => {
              if (layerIndex === currentStage.layers.length - 1) return null;
              const nextLayerCount = currentStage.layers[layerIndex + 1];
              const layerX = (400 / (currentStage.layers.length + 1)) * (layerIndex + 1);
              const nextLayerX = (400 / (currentStage.layers.length + 1)) * (layerIndex + 2);

              return Array.from({ length: nodeCount }).map((_, i) => (
                Array.from({ length: nextLayerCount }).map((__, j) => {
                  const y1 = (200 / (nodeCount + 1)) * (i + 1);
                  const y2 = (200 / (nextLayerCount + 1)) * (j + 1);
                  return (
                    <line 
                      key={`line-${layerIndex}-${i}-${j}`}
                      x1={layerX} y1={y1} 
                      x2={nextLayerX} y2={y2} 
                      stroke="#475569" 
                      strokeWidth="1"
                      className="opacity-50"
                    />
                  );
                })
              ));
            })}

            {/* Nodos */}
            {currentStage.layers.map((nodeCount, layerIndex) => {
              const x = (400 / (currentStage.layers.length + 1)) * (layerIndex + 1);
              return Array.from({ length: nodeCount }).map((_, i) => {
                const y = (200 / (nodeCount + 1)) * (i + 1);
                return (
                  <circle 
                    key={`node-${layerIndex}-${i}`}
                    cx={x} cy={y} r="8" 
                    fill={layerIndex === 0 ? '#60a5fa' : layerIndex === currentStage.layers.length -1 ? '#34d399' : '#f472b6'}
                    className="transition-all duration-500 ease-in-out"
                  />
                );
              });
            })}
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`h-1 rounded-full transition-colors duration-300 ${step === i ? 'bg-cyan-500' : 'bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Layout Principal y Navegación ---

const LessonLayout: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('xor');

  const tabs: TabData[] = [
    {
      id: 'xor',
      label: 'Problema XOR',
      icon: <GitGraph size={18} />,
      title: 'El Problema de la Separabilidad Lineal',
      description: (
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            El operador <strong>XOR (O exclusivo)</strong> representa un desafío fundamental en la historia de las redes neuronales. 
            A diferencia de las compuertas AND u OR, la función XOR devuelve verdadero solo si las entradas son diferentes.
          </p>
          <ul className="list-disc pl-5 space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <li><strong>Clase A (Azul):</strong> (0,0) y (1,1) → Salida 0</li>
            <li><strong>Clase B (Rojo):</strong> (0,1) y (1,0) → Salida 1</li>
          </ul>
          <p>
            En un plano cartesiano, es geométricamente imposible separar estos dos conjuntos de puntos con una sola línea recta. 
            Esto demostró las limitaciones de los perceptrones de una sola capa, que solo pueden resolver problemas <strong>linealmente separables</strong>.
          </p>
        </div>
      ),
      component: <XORChart />
    },
    {
      id: 'history',
      label: 'Impacto Histórico',
      icon: <History size={18} />,
      title: 'Consecuencias en la Investigación',
      description: (
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            La incapacidad del Perceptrón simple para resolver funciones como XOR no fue solo una curiosidad matemática; tuvo profundas implicaciones económicas y académicas.
          </p>
          <div className="grid gap-3">
            <div className="p-3 bg-red-50 text-red-800 rounded border border-red-100 text-sm">
              <strong>El libro "Perceptrons" (1969):</strong> Marvin Minsky y Seymour Papert probaron matemáticamente estas limitaciones.
            </div>
            <div className="p-3 bg-orange-50 text-orange-800 rounded border border-orange-100 text-sm">
              <strong>Consecuencia:</strong> Se asumió erróneamente que agregar más capas no resolvería el problema de manera eficiente, cortando la financiación por una década.
            </div>
          </div>
        </div>
      ),
      component: <HistoryFlow />
    },
    {
      id: 'evolution',
      label: 'Evolución Deep',
      icon: <Layers size={18} />,
      title: 'Hacia las Redes Profundas',
      description: (
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            La solución al problema XOR y a tareas mucho más complejas llegó con la adición de <strong>capas ocultas</strong> y algoritmos de entrenamiento como Backpropagation (1986).
          </p>
          <div className="space-y-3">
             <div className="flex items-start gap-3">
                <div className="mt-1 bg-blue-100 p-1 rounded text-blue-600"><Network size={16}/></div>
                <div>
                  <h5 className="font-semibold text-slate-800">No linealidad</h5>
                  <p className="text-sm">Las capas ocultas transforman el espacio de entrada, permitiendo fronteras de decisión curvas o complejas.</p>
                </div>
             </div>
             <div className="flex items-start gap-3">
                <div className="mt-1 bg-cyan-100 p-1 rounded text-cyan-600"><Layers size={16}/></div>
                <div>
                  <h5 className="font-semibold text-slate-800">Profundidad</h5>
                  <p className="text-sm">Las arquitecturas modernas (Deep Learning) apilan muchas capas para aprender jerarquías de características.</p>
                </div>
             </div>
          </div>
        </div>
      ),
      component: <EvolutionAnimation />
    }
  ];

  const activeContent = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-8 grid grid-rows-[auto_auto_1fr] gap-6 max-w-7xl mx-auto">
      
      {/* 1. Header Area */}
      <header className="grid grid-cols-[1fr_auto] items-center border-b border-slate-300 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge color="bg-indigo-600 text-white">Módulo 101</Badge>
            <span className="text-slate-500 text-sm uppercase tracking-wider font-semibold">Fundamentos de IA</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Limitaciones del Perceptrón y Evolución</h1>
        </div>
        <div className="hidden md:flex items-center gap-2 text-slate-400">
          <Info size={20} />
          <span className="text-sm">DiagramtoReact Engine v1.0</span>
        </div>
      </header>

      {/* 2. Navigation Tabs */}
      <nav className="grid grid-cols-3 gap-2 md:gap-4 p-1 bg-white rounded-lg border border-slate-200 shadow-sm sticky top-2 z-20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`
              flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm md:text-base font-medium transition-all duration-200
              ${activeTabId === tab.id 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            {tab.icon}
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 3. Main Content Area (CSS Grid Layout) */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 items-start">
        
        {/* Panel Izquierdo: Texto y Contexto */}
        <Card className="h-full">
          <div className="p-6 h-full flex flex-col gap-4">
            <header className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                {activeContent.title}
              </h2>
            </header>
            <div className="text-base leading-relaxed flex-grow">
              {activeContent.description}
            </div>
          </div>
        </Card>

        {/* Panel Derecho: Diagrama Render */}
        <Card className="h-full min-h-[400px] bg-slate-50 flex flex-col">
          <div className="px-4 py-2 border-b border-slate-200 bg-white flex justify-between items-center">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visualización</span>
             <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-red-400"></div>
               <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
               <div className="w-2 h-2 rounded-full bg-green-400"></div>
             </div>
          </div>
          <div className="flex-grow relative p-2 md:p-4">
            {activeContent.component}
          </div>
        </Card>

      </main>
    </div>
  );
};

export default LessonLayout;