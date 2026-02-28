import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceArea,
  Label
} from 'recharts';
import { 
  History, 
  TrendingDown, 
  Database, 
  Cpu, 
  Code, 
  BrainCircuit,
  Lightbulb,
} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- TIPOS Y DEFINICIONES ---

type TabId = 'timeline' | 'winters' | 'pillars';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface ContentSection {
  title: string;
  description: React.ReactNode;
  render: React.ReactNode;
}

// --- DATOS PARA GRÁFICOS ---

const aiWintersData = [
  { year: 1950, hype: 20, label: 'Turing Test' },
  { year: 1956, hype: 60, label: 'Dartmouth (Nacimiento)' },
  { year: 1965, hype: 90, label: 'Edad de Oro' },
  { year: 1974, hype: 30, label: '1er Invierno' },
  { year: 1980, hype: 75, label: 'Sistemas Expertos' },
  { year: 1987, hype: 25, label: '2do Invierno' },
  { year: 1997, hype: 50, label: 'Deep Blue' },
  { year: 2012, hype: 85, label: 'Deep Learning (AlexNet)' },
  { year: 2023, hype: 100, label: 'IA Generativa' },
];

// --- COMPONENTES DE UI GENÉRICOS ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- COMPONENTES DE VISUALIZACIÓN ESPECÍFICOS ---

// 1. Visualización de Línea de Tiempo (1956)
const TimelineDiagram: React.FC = () => {
  return (
    <div className="w-full h-full p-8 bg-slate-50 grid items-center justify-center">
      <div className="relative w-full max-w-4xl">
        {/* Línea Base */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-300 -translate-y-1/2 rounded-full" />
        
        {/* Grid para los eventos */}
        <div className="grid grid-cols-3 gap-4 relative z-10">
          
          {/* Pre-1956 */}
          <div className="text-center opacity-50 grid gap-2 justify-items-center">
            <span className="text-sm font-semibold text-slate-500">Antes de 1956</span>
            <div className="w-4 h-4 bg-slate-300 rounded-full border-4 border-slate-50" />
            <p className="text-xs text-slate-400">Autómatas y Lógica Simbólica</p>
          </div>

          {/* EL HITO: 1956 */}
          <div className="grid gap-4 justify-items-center transform -translate-y-4">
            <div className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce">
              1956
            </div>
            <div className="w-8 h-8 bg-indigo-600 rounded-full border-4 border-slate-50 shadow-md flex items-center justify-center">
              <Lightbulb size={16} className="text-white" />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-600 max-w-xs text-center">
              <h4 className="font-bold text-indigo-900 mb-1">Conferencia de Dartmouth</h4>
              <p className="text-sm text-slate-600">
                Nacimiento oficial del término "Inteligencia Artificial". Enfoque basado en reglas lógicas y manipulación de símbolos.
              </p>
            </div>
          </div>

          {/* Post-1956 */}
          <div className="text-center opacity-50 grid gap-2 justify-items-center">
            <span className="text-sm font-semibold text-slate-500">1960s - 1970s</span>
            <div className="w-4 h-4 bg-slate-300 rounded-full border-4 border-slate-50" />
            <p className="text-xs text-slate-400">Razonamiento y Búsqueda</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// 2. Gráfico de Inviernos de la IA
const AIWintersChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={aiWintersData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis 
            dataKey="year" 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            tickLine={false}
            axisLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis 
            label={{ value: 'Interés / Inversión', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} 
            tick={false} 
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none' }}
            itemStyle={{ color: '#fff' }}
          />
          
          {/* Zonas de Invierno */}
          <ReferenceArea x1={1973} x2={1979} strokeOpacity={0.3} fill="#bfdbfe" fillOpacity={0.3}>
            <Label value="1er Invierno" position="insideTop" fill="#3b82f6" fontSize={12} />
          </ReferenceArea>
          <ReferenceArea x1={1987} x2={1993} strokeOpacity={0.3} fill="#bfdbfe" fillOpacity={0.3}>
            <Label value="2do Invierno" position="insideTop" fill="#3b82f6" fontSize={12} />
          </ReferenceArea>

          <Line 
            type="monotone" 
            dataKey="hype" 
            stroke="#4f46e5" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-2 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-indigo-600 rounded-full"></span> Entusiasmo
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></span> Periodos de "Invierno" (Cortes de fondos)
        </div>
      </div>
    </div>
  );
};

// 3. Diagrama de los Tres Pilares
const PillarsDiagram: React.FC = () => {
  return (
    <div className="w-full h-full p-6 bg-slate-50 grid items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        
        {/* Pilar 1: Datos */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-emerald-500 grid gap-4 justify-items-center text-center transition-transform hover:-translate-y-1">
          <div className="p-4 bg-emerald-100 rounded-full text-emerald-600">
            <Database size={32} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">Big Data</h3>
          <p className="text-sm text-slate-600">
            La disponibilidad masiva de datos estructurados y no estructurados necesarios para entrenar modelos complejos.
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 w-3/4"></div>
          </div>
        </div>

        {/* Pilar 2: Procesamiento */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 grid gap-4 justify-items-center text-center transition-transform hover:-translate-y-1">
          <div className="p-4 bg-blue-100 rounded-full text-blue-600">
            <Cpu size={32} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">Cómputo (GPU)</h3>
          <p className="text-sm text-slate-600">
            Hardware especializado (GPUs, TPUs) capaz de realizar cálculos matriciales paralelos a velocidades sin precedentes.
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500 w-full animate-pulse"></div>
          </div>
        </div>

        {/* Pilar 3: Algoritmos */}
        <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-violet-500 grid gap-4 justify-items-center text-center transition-transform hover:-translate-y-1">
          <div className="p-4 bg-violet-100 rounded-full text-violet-600">
            <Code size={32} />
          </div>
          <h3 className="font-bold text-lg text-slate-800">Algoritmos</h3>
          <p className="text-sm text-slate-600">
            Innovaciones en arquitecturas (Transformers, Backpropagation) que permiten un aprendizaje más profundo y eficiente.
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-violet-500 w-4/5"></div>
          </div>
        </div>

      </div>
      
      {/* Base Conectora */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-full text-sm font-medium">
          <BrainCircuit size={16} />
          Estos 3 pilares convergen en la IA Moderna
        </div>
      </div>
    </div>
  );
};

// --- ESTRUCTURA PRINCIPAL (LAYOUT) ---

const LessonLayout: React.FC<{
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  content: ContentSection;
}> = ({ activeTab, onTabChange, content }) => {
  
  const tabs: TabConfig[] = [
    { id: 'timeline', label: '1956: El Origen', icon: <History size={18} /> },
    { id: 'winters', label: 'Ciclos e Inviernos', icon: <TrendingDown size={18} /> },
    { id: 'pillars', label: 'Los 3 Pilares', icon: <Database size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans text-slate-900 grid grid-rows-[auto_auto_1fr] gap-6 max-w-7xl mx-auto">
      
      {/* Header General */}
      <header className="grid gap-2 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3 text-indigo-700">
          <BrainCircuit size={32} />
          <h1 className="text-2xl font-bold tracking-tight">Historia y Evolución de la Inteligencia Artificial</h1>
        </div>
      </header>

      {/* Navegación por Pestañas (Grid Layout) */}
      <nav className="grid grid-cols-3 gap-2 bg-slate-200 p-1 rounded-lg" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-all
              ${activeTab === tab.id 
                ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'}
            `}
          >
            {tab.icon}
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Panel de Contenido Principal (Grid Layout) */}
      <main className="grid grid-rows-[auto_1fr] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Sección de Texto */}
        <section className="grid gap-2">
          <div className="flex items-center gap-2">
         
          </div>
          <h2 className="text-3xl font-bold text-slate-800">{content.title}</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {content.description}
          </p>
        </section>

        {/* Área de Renderizado (Diagrama) */}
        <Card className="h-full min-h-[400px] border-t-4 border-indigo-500 grid">
          {content.render}
        </Card>

      </main>

    </div>
  );
};

// --- COMPONENTE RAÍZ ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('timeline');

  // Mapeo de contenido basado en la pestaña activa
  const getContent = (tab: TabId): ContentSection => {
    switch (tab) {
      case 'timeline':
        return {
          title: "El Nacimiento de la IA (1956)",
          description: (
      <DivCarousel>
        
          <p>
            El concepto formal de Inteligencia Artificial surge en 1956 durante la Conferencia de Dartmouth. En sus inicios, la IA se centró en sistemas basados en reglas lógicas programadas manualmente.
          </p>
<div>
          <p><strong>Características de esta etapa:</strong></p>

          <ul>
            <li>Uso de lógica simbólica.</li>
            <li>Sistemas expertos.</li>
            <li>Enfoque en razonamiento formal.</li>
            <li>Limitada capacidad de adaptación.</li>
          </ul>

          <p>
            Estos sistemas eran rígidos y dependían completamente del conocimiento previamente programado.
          </p>

        
        </div>
      </DivCarousel>
    ),
          render: <TimelineDiagram />
        };
      case 'winters':
        return {
          title: "Los Inviernos de la IA",
          description: (
      <DivCarousel>
        <div>
          <p>
            Durante las décadas de 1970 y 1980, el entusiasmo inicial disminuyó debido a:
          </p>

          <ul>
            <li>Limitaciones tecnológicas.</li>
            <li>Escasa capacidad computacional.</li>
            <li>Resultados poco escalables.</li>
            <li>Reducción de inversión.</li>
          </ul>
 </div>
          <p>
            Estos períodos se conocen como “inviernos de la IA”, momentos en que el avance tecnológico se ralentizó considerablemente.
          </p>

   
      </DivCarousel>
    ),
          render: <AIWintersChart />
        };
      case 'pillars':
        return {
          title: "Renacimiento y Auge Actual",
          description: (
      <DivCarousel>
        <div>
          <p>
            El resurgimiento de la IA se debe principalmente a tres factores:
          </p>

          <ul>
            <li>Mayor poder de cómputo.</li>
            <li>Disponibilidad masiva de datos (Big Data).</li>
            <li>Nuevos algoritmos de aprendizaje automático.</li>
          </ul>

          <p>
            Hoy la IA se integra en múltiples sistemas digitales cotidianos.
          </p>
  </div>
      
      </DivCarousel>
    ),
          render: <PillarsDiagram />
        };
    }
  };

  return (
    <LessonLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
      content={getContent(activeTab)} 
    />
  );
};

export default App;