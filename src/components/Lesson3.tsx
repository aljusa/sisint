import React, { useState, useEffect } from 'react';
import { Brain, Cpu, RefreshCw, Network, Zap, Activity, Database,  } from 'lucide-react';
import {   XAxis, YAxis, CartesianGrid,  ResponsiveContainer, AreaChart, Area } from 'recharts';
import DivCarousel from '../assets/DivCarousel';

// --- TIPOS E INTERFACES ---

type TabId = 'weak-ai' | 'strong-ai' | 'learning-cycle' | 'neural-network';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

interface DiagramProps {
  isActive: boolean;
}

// --- COMPONENTES DE DIAGRAMAS ---

// 1. Diagrama de IA Débil (Estático) - Hub and Spoke
const WeakAIDiagram: React.FC = () => {
  return (
    <div className="h-full w-full grid place-items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div className="relative w-full max-w-md aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Conexiones */}
          <line x1="200" y1="200" x2="200" y2="60" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="200" y1="200" x2="320" y2="140" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="200" y1="200" x2="320" y2="280" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="200" y1="200" x2="80" y2="280" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="200" y1="200" x2="80" y2="140" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />

          {/* Nódulo Central */}
          <circle cx="200" cy="200" r="45" fill="#3b82f6" className="shadow-lg" />
          <text x="200" y="200" textAnchor="middle" dy=".3em" fill="white" fontSize="12" fontWeight="bold">IA DÉBIL</text>
          <text x="200" y="215" textAnchor="middle" dy=".3em" fill="white" fontSize="10" opacity="0.8">(Núcleo)</text>

          {/* Tareas Satélite */}
          <g>
            <circle cx="200" cy="60" r="35" fill="white" stroke="#64748b" strokeWidth="2" />
            <text x="200" y="60" textAnchor="middle" dy=".3em" fontSize="10" fill="#475569">Ajedrez</text>
          </g>
          <g>
            <circle cx="320" cy="140" r="35" fill="white" stroke="#64748b" strokeWidth="2" />
            <text x="320" y="140" textAnchor="middle" dy=".3em" fontSize="10" fill="#475569">Clima</text>
          </g>
          <g>
            <circle cx="320" cy="280" r="35" fill="white" stroke="#64748b" strokeWidth="2" />
            <text x="320" y="280" textAnchor="middle" dy=".3em" fontSize="10" fill="#475569">Spam</text>
          </g>
          <g>
            <circle cx="80" cy="280" r="35" fill="white" stroke="#64748b" strokeWidth="2" />
            <text x="80" y="280" textAnchor="middle" dy=".3em" fontSize="10" fill="#475569">Recom.</text>
          </g>
          <g>
            <circle cx="80" cy="140" r="35" fill="white" stroke="#64748b" strokeWidth="2" />
            <text x="80" y="140" textAnchor="middle" dy=".3em" fontSize="10" fill="#475569">Chatbot</text>
          </g>
        </svg>
        <div className="absolute bottom-2 right-2 text-xs text-slate-400 italic">
          *Cada tarea es independiente y no transfiere conocimiento
        </div>
      </div>
    </div>
  );
};

// 2. Diagrama de IA Fuerte (Estático/Conceptual) - Red Cognitiva
const StrongAIDiagram: React.FC = () => {
  return (
    <div className="h-full w-full grid place-items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div className="relative w-full max-w-md aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="gradStrong" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Conexiones de malla (Mesh) */}
          <path d="M200 50 L350 160 L300 320 L100 320 L50 160 Z" fill="rgba(139, 92, 246, 0.1)" stroke="none" />
          
          <line x1="200" y1="50" x2="350" y2="160" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="200" y1="50" x2="300" y2="320" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="200" y1="50" x2="100" y2="320" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="200" y1="50" x2="50" y2="160" stroke="#c084fc" strokeWidth="1.5" />

          <line x1="350" y1="160" x2="300" y2="320" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="350" y1="160" x2="100" y2="320" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="350" y1="160" x2="50" y2="160" stroke="#c084fc" strokeWidth="1.5" />

          <line x1="300" y1="320" x2="100" y2="320" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="300" y1="320" x2="50" y2="160" stroke="#c084fc" strokeWidth="1.5" />
          <line x1="100" y1="320" x2="50" y2="160" stroke="#c084fc" strokeWidth="1.5" />

          {/* Nodos Cognitivos */}
          <g transform="translate(200,50)">
            <circle r="30" fill="url(#gradStrong)" />
            <text dy=".3em" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Lógica</text>
          </g>
          <g transform="translate(350,160)">
            <circle r="30" fill="url(#gradStrong)" />
            <text dy=".3em" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Creatividad</text>
          </g>
          <g transform="translate(300,320)">
            <circle r="30" fill="url(#gradStrong)" />
            <text dy=".3em" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Memoria</text>
          </g>
          <g transform="translate(100,320)">
            <circle r="30" fill="url(#gradStrong)" />
            <text dy=".3em" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Emoción</text>
          </g>
          <g transform="translate(50,160)">
            <circle r="30" fill="url(#gradStrong)" />
            <text dy=".3em" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Sentidos</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

// 3. Diagrama de Ciclo de Aprendizaje (Dinámico)
const LearningCycleDiagram: React.FC<DiagramProps> = ({ isActive }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<{ epoch: number; error: number }[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
      
      // Simulación de reducción de error
      setData((prevData) => {
        const newEpoch = prevData.length + 1;
        // Fórmula de decaimiento simulada
        const newError = Math.max(0.1, 10 * Math.exp(-0.1 * newEpoch) + Math.random()); 
        const newData = [...prevData, { epoch: newEpoch, error: newError }];
        if (newData.length > 20) return newData.slice(1);
        return newData;
      });

    }, 1500);

    return () => clearInterval(interval);
  }, [isActive]);

  const steps = [
    { id: 0, label: "Datos", icon: <Database size={20} />, color: "bg-blue-100 border-blue-500 text-blue-700" },
    { id: 1, label: "Modelo", icon: <Cpu size={20} />, color: "bg-purple-100 border-purple-500 text-purple-700" },
    { id: 2, label: "Error", icon: <Activity size={20} />, color: "bg-red-100 border-red-500 text-red-700" },
    { id: 3, label: "Ajuste", icon: <RefreshCw size={20} />, color: "bg-green-100 border-green-500 text-green-700" },
  ];

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
      
      {/* Columna Izquierda: Visualización del Ciclo */}
      <div className="grid place-content-center gap-4 relative">
        {steps.map((s, index) => (
          <div 
            key={s.id}
            className={`
              p-4 rounded-xl border-2 transition-all duration-500 flex items-center gap-3 w-48
              ${step === index ? `${s.color} scale-110 shadow-lg` : 'bg-white border-slate-200 text-slate-400 opacity-60'}
            `}
          >
            {s.icon}
            <span className="font-bold">{s.label}</span>
            {step === index && <span className="ml-auto animate-pulse">●</span>}
          </div>
        ))}
        {/* Flecha indicadora de flujo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-full w-1 bg-slate-200 rounded-full" />
      </div>

      {/* Columna Derecha: Gráfico de Convergencia (Recharts) */}
      <div className="flex flex-col bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h4 className="text-sm font-semibold text-slate-600 mb-4">Convergencia del Error (Pérdida)</h4>
        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="epoch" hide />
              <YAxis domain={[0, 12]} hide />
             
              <Area 
                type="monotone" 
                dataKey="error" 
                stroke="#ef4444" 
                fill="#fee2e2" 
                strokeWidth={2}
                isAnimationActive={false} // Desactivar animación interna para fluidez en updates rápidos
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-center text-slate-500">
          Iteración continua: Ajuste de pesos basado en el error calculado.
        </div>
      </div>
    </div>
  );
};

// 4. Diagrama de Red Neuronal Multicapa (Estático)
const NeuralNetworkDiagram: React.FC = () => {
  // Configuración de capas
  const layers = [3, 4, 2]; // Nodos por capa: Input, Hidden, Output
  const layerSpacing = 120;
  const nodeSpacing = 60;
  const startX = 60;
  const startY = 50;

  // Generar nodos y conexiones
  const renderConnections = () => {
    const lines = [];
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayerNodes = layers[i];
      const nextLayerNodes = layers[i + 1];
      
      for (let j = 0; j < currentLayerNodes; j++) {
        for (let k = 0; k < nextLayerNodes; k++) {
          const x1 = startX + i * layerSpacing;
          const y1 = startY + (300 - (currentLayerNodes - 1) * nodeSpacing) / 2 + j * nodeSpacing;
          const x2 = startX + (i + 1) * layerSpacing;
          const y2 = startY + (300 - (nextLayerNodes - 1) * nodeSpacing) / 2 + k * nodeSpacing;
          
          lines.push(
            <line 
              key={`conn-${i}-${j}-${k}`} 
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke={i === 0 ? "#94a3b8" : "#cbd5e1"} 
              strokeWidth="1" 
              opacity="0.6"
            />
          );
        }
      }
    }
    return lines;
  };

  const renderNodes = () => {
    const nodes = [];
    const labels = ["Entrada", "Oculta", "Salida"];
    const colors = ["#3b82f6", "#eab308", "#10b981"];

    for (let i = 0; i < layers.length; i++) {
      const count = layers[i];
      for (let j = 0; j < count; j++) {
        const cx = startX + i * layerSpacing;
        const cy = startY + (300 - (count - 1) * nodeSpacing) / 2 + j * nodeSpacing;
        
        nodes.push(
          <g key={`node-${i}-${j}`}>
            <circle cx={cx} cy={cy} r="18" fill="white" stroke={colors[i]} strokeWidth="3" />
            <circle cx={cx} cy={cy} r="8" fill={colors[i]} opacity="0.3" />
          </g>
        );
      }
      // Etiquetas de capa
      nodes.push(
        <text 
          key={`label-${i}`} 
          x={startX + i * layerSpacing} 
          y={280} 
          textAnchor="middle" 
          className="text-xs font-bold uppercase fill-slate-500"
          style={{fontSize: '10px'}}
        >
          {labels[i]}
        </text>
      );
    }
    return nodes;
  };

  return (
    <div className="h-full w-full grid place-items-center p-4 bg-slate-900 rounded-lg border border-slate-700">
      <div className="relative w-full max-w-md h-[300px]">
        <svg className="w-full h-full">
          {renderConnections()}
          {renderNodes()}
        </svg>
      </div>
    </div>
  );
};

// --- COMPONENTES DE LAYOUT ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('weak-ai');

  const tabs: TabConfig[] = [
    {
      id: 'weak-ai',
      label: 'IA Débil',
      icon: <Brain className="w-4 h-4" />,
      title: 'Inteligencia Artificial Estrecha (ANI)',
      description: (
      <DivCarousel>
        <div>
          <p>
            Es la forma actual de IA. Está diseñada para realizar tareas específicas con alta precisión, pero no tiene comprensión general.
          </p>

          <p><strong>Ejemplos de funciones:</strong></p>

          <ul>
            <li>Reconocimiento facial.</li>
            <li>Traducción automática.</li>
            <li>Sistemas de recomendación.</li>
            <li>Asistentes virtuales.</li>
          </ul>

          <p>
            Opera dentro de límites definidos y no puede transferir su aprendizaje a cualquier contexto.
          </p>
   </div>
       
     
      </DivCarousel>
    ),
    },
    {
      id: 'strong-ai',
      label: 'IA Fuerte',
      icon: <Zap className="w-4 h-4" />,
      title: 'Inteligencia Artificial General (AGI)',
      description: (
      <DivCarousel>
        <div>
          <p>
            La IA Fuerte es un concepto teórico que implicaría una máquina con capacidades cognitivas comparables a las humanas.
          </p>

          <p><strong>Se caracterizaría por:</strong></p>

          <ul>
            <li>Capacidad de razonamiento general.</li>
            <li>Comprensión contextual amplia.</li>
            <li>Adaptación a múltiples dominios.</li>
            <li>Autonomía cognitiva.</li>
          </ul>

          <p>
            Actualmente no existe en la práctica.
          </p>

        </div>
      </DivCarousel>
    ),
    },
    {
      id: 'learning-cycle',
      label: 'Ciclo Aprendizaje',
      icon: <RefreshCw className="w-4 h-4" />,
      title: 'Ciclo de Aprendizaje Supervisado',
      description: (
      <DivCarousel>
        <div>
          <p>
            Es una subrama de la IA que permite a los sistemas aprender a partir de datos sin programar reglas específicas para cada situación.
          </p>

          <p><strong>Tipos principales:</strong></p>

          <ul>
            <li><strong>Supervisado:</strong> Aprende con datos etiquetados.</li>
            <li><strong>No supervisado:</strong> Encuentra patrones sin etiquetas.</li>
            <li><strong>Por refuerzo:</strong> Aprende mediante recompensas y castigos.</li>
          </ul>

          <p>
            El sistema ajusta parámetros internos para minimizar errores.
          </p>

        
        </div>
      </DivCarousel>
    ),
    },
    {
      id: 'neural-network',
      label: 'Red Neuronal',
      icon: <Network className="w-4 h-4" />,
      title: 'Perceptrón Multicapa (Deep Learning)',
      description: (
      <DivCarousel>
        <div>
          <p>
            Es una técnica dentro del aprendizaje automático que utiliza redes neuronales artificiales con múltiples capas.
          </p>

          <p><strong>Características:</strong></p>

          <ul>
            <li>Procesa grandes volúmenes de datos.</li>
            <li>Es eficaz en imágenes y lenguaje natural.</li>
            <li>Utiliza estructuras llamadas “capas ocultas”.</li>
            <li>Aprende representaciones complejas automáticamente.</li>
          </ul>

          <p>
            Su estructura se inspira en el funcionamiento del cerebro humano, pero funciona mediante cálculos matemáticos.
          </p>
        </div>
      </DivCarousel>
    ),
    },
  ];

  const activeContent = tabs.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800" style={{
      display: 'grid',
      gridTemplateRows: 'auto auto 1fr', // Header, Tabs, Content
      height: '100vh',
      gap: '1rem'
    }}>
      
      {/* 1. Header Area */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm" style={{ gridRow: '1' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Brain className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Tipos de Inteligencia Artificial</h1>
            </div>
          </div>
      
        </div>
      </header>

      {/* 2. Tabs Navigation */}
      <nav className="px-6" style={{ gridRow: '2' }}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-grid w-full md:w-auto" style={{
            gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 outline-none
                  ${activeTab === tab.id 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
                `}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 3. Main Content Grid */}
      <main className="px-6 pb-6 " style={{ gridRow: '3' }}>
        <div className="max-w-6xl mx-auto h-full w-full">
          <Card className="h-full w-full flex flex-col">
            
            {/* Contenido Grid Interno: Info + Diagrama */}
            <div className="flex-1 p-0 md:p-6 overflow-y-auto" style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr',
              gap: '1.5rem'
            }}>
              
              {/* Sección de Texto (Top) */}
              <div className="border-b border-slate-100 pb-4">
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{activeContent.title}</h2>
                <p className="text-slate-600 leading-relaxed max-w-3xl">
                  {activeContent.description}
                </p>
              </div>

              {/* Área de Renderizado (Bottom/Fill) */}
              <div className="w-full h-full min-h-[400px] bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200 p-2 md:p-4 grid place-items-center">
                {activeTab === 'weak-ai' && <WeakAIDiagram />}
                {activeTab === 'strong-ai' && <StrongAIDiagram />}
                {activeTab === 'learning-cycle' && <LearningCycleDiagram isActive={true} />}
                {activeTab === 'neural-network' && <NeuralNetworkDiagram />}
              </div>

            </div>
          </Card>
        </div>
      </main>

    </div>
  );
}