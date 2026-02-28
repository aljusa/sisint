import React, { useState } from 'react';
import { 
  Network, 
  Brain, 
  Zap, 
  TrendingUp, 
   
  CheckCircle2,
  Activity,
  GitMerge
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';

// --- Types & Interfaces ---

interface TabData {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
}

interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
  description?: string;
}

// --- Data Constants ---

const TABS: TabData[] = [
  {
    id: 'evolution',
    label: 'Evolución Conceptual',
    icon: GitMerge,
    title: 'De la Neurona M-P al Deep Learning',
    description: 'El modelo de McCulloch y Pitts (1943) estableció la base teórica de que el cerebro podía modelarse mediante operaciones lógicas. Este diagrama muestra el linaje directo desde esta idea simple hasta las redes neuronales profundas modernas.',
    details: [
      '1943: Neurona Artificial (Lógica Binaria).',
      '1958: El Perceptrón añade pesos ajustables.',
      '1986: Backpropagation permite redes multicapa.',
      '2010+: Deep Learning y arquitecturas masivas.'
    ]
  },
  {
    id: 'comparison',
    label: 'Capacidades vs. Limitaciones',
    icon: Zap,
    title: 'Análisis Técnico: Fortalezas y Debilidades',
    description: 'Aunque revolucionario, el modelo M-P era una abstracción extrema. Contrastamos aquí su capacidad para resolver lógica booleana frente a su incapacidad para aprender o manejar datos no lineales.',
    details: [
      'Capacidad: Implementación perfecta de AND, OR, NOT.',
      'Limitación: No tiene mecanismo de aprendizaje (pesos fijos).',
      'Limitación: Salida exclusivamente binaria (0 o 1).',
      'Limitación: Falla en problemas XOR (no linealidad).'
    ]
  },
  {
    id: 'timeline',
    label: 'Evolución Tecnológica',
    icon: TrendingUp,
    title: 'Progreso de la Complejidad Computacional',
    description: 'Visualización dinámica del aumento en la complejidad de los modelos y su capacidad de procesamiento a lo largo de las décadas, partiendo del umbral fijo de M-P.',
    details: [
      'El eje Y representa la capacidad de cómputo relativa.',
      'Nótese el estancamiento durante el "Invierno de la IA".',
      'El crecimiento exponencial reciente gracias a GPUs y Big Data.'
    ]
  }
];

const TIMELINE_DATA: ChartDataPoint[] = [
  { name: '1943 (M-P)', value: 10, description: 'Lógica Binaria' },
  { name: '1958 (Perceptrón)', value: 25, description: 'Pesos Ajustables' },
  { name: '1969 (XOR Crisis)', value: 15, description: 'Invierno IA' },
  { name: '1986 (MLP)', value: 45, description: 'Backpropagation' },
  { name: '1998 (CNN)', value: 60, description: 'LeNet' },
  { name: '2012 (AlexNet)', value: 85, description: 'GPU Era' },
  { name: '2023 (Transformers)', value: 100, description: 'LLMs' },
];

const COMPARISON_DATA = [
  { name: 'Lógica Booleana', value: 95, type: 'Capacidad' },
  { name: 'Simplicidad', value: 90, type: 'Capacidad' },
  { name: 'Aprendizaje', value: 5, type: 'Limitación' },
  { name: 'No-Linealidad', value: 10, type: 'Limitación' },
  { name: 'Datos Continuos', value: 0, type: 'Limitación' },
  { name: 'Velocidad', value: 85, type: 'Capacidad' },
];

// --- Sub-Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <header className="py-6 border-b border-slate-100 mb-6">
    <div className="grid grid-cols-1 gap-2">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Brain className="w-8 h-8 text-indigo-600" />
        {title}
      </h1>
      {subtitle && <p className="text-slate-500">{subtitle}</p>}
    </div>
  </header>
);

// --- Visualization Components ---

const EvolutionFlow = () => {
  const steps = [
    { title: 'Neurona M-P', year: '1943', desc: 'Entradas Binarias, Umbral Fijo', icon: Activity },
    { title: 'Perceptrón', year: '1958', desc: 'Pesos Ajustables, Aprendizaje', icon: Zap },
    { title: 'Redes Multicapa', year: '1986', desc: 'Capas Ocultas, Backprop', icon: Network },
    { title: 'Deep Learning', year: 'Actualidad', desc: 'Arquitecturas Profundas, GPUs', icon: Brain },
  ];

  return (
    <div className="w-full h-full p-6 bg-slate-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full items-center relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-0 transform -translate-y-1/2" />
        
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="relative z-10 bg-white p-4 rounded-lg border-2 border-indigo-100 shadow-sm hover:border-indigo-300 transition-colors h-48 grid grid-rows-[auto_1fr_auto] gap-2">
              <div className="flex justify-center">
                <div className="bg-indigo-50 p-3 rounded-full">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="text-center self-center">
                <h3 className="font-bold text-slate-800">{step.title}</h3>
                <span className="text-xs font-mono text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded mt-1 inline-block">
                  {step.year}
                </span>
              </div>
              <p className="text-xs text-center text-slate-500 leading-tight">
                {step.desc}
              </p>
              
              {/* Mobile Connector Arrow */}
              {idx < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-slate-300">
                  ↓
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ComparisonChart = () => {
  return (
    <div className="w-full h-96 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={COMPARISON_DATA}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={100} 
            tick={{ fontSize: 12, fill: '#64748b' }} 
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar dataKey="value" name="Nivel de Efectividad" barSize={20} radius={[0, 4, 4, 0]}>
            {COMPARISON_DATA.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.type === 'Capacidad' ? '#4f46e5' : '#ef4444'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
          <span className="text-slate-600">Alta Capacidad</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span className="text-slate-600">Limitación Crítica</span>
        </div>
      </div>
    </div>
  );
};

const TechnologyTimeline = () => {
  return (
    <div className="w-full h-96 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={TIMELINE_DATA}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={1} angle={-15} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 11 }} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            name="Complejidad del Modelo"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Main Layout Components ---

const DiagramRender: React.FC<{ tabId: string }> = ({ tabId }) => {
  switch (tabId) {
    case 'evolution': return <EvolutionFlow />;
    case 'comparison': return <ComparisonChart />;
    case 'timeline': return <TechnologyTimeline />;
    default: return null;
  }
};

const LessonLayout: React.FC<{
  activeTab: string;
  onTabChange: (id: string) => void;
}> = ({ activeTab, onTabChange }) => {
  
  const currentContent = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        
        {/* Header Section */}
        <Card className="p-6 border-l-4 border-l-indigo-600">
          <SectionHeader 
            title="Modelo Neuronal McCulloch-Pitts" 
            subtitle="Fundamentos de la Computación Neuronal y su Legado"
          />
          
          {/* Navigation Grid (No Flexbox for main layout) */}
          <nav className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-100 p-2 rounded-lg">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    flex items-center justify-center gap-2 p-3 rounded-md transition-all duration-200 font-medium text-sm
                    ${isActive 
                      ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
                  `}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content & Diagram Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: Description */}
          <Card className="lg:col-span-4 p-6 h-full min-h-[400px]">
            <div className="grid grid-cols-1 gap-4">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2 block">
                  Diagram Title
                </span>
                <h2 className="text-xl font-bold text-slate-900">{currentContent.title}</h2>
              </div>
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2 block">
                  Diagram Description
                </span>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {currentContent.description}
                </p>
                
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                  <h4 className="font-semibold text-sm text-slate-700 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    Puntos Clave
                  </h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {currentContent.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Indicator (Purely visual, no functionality) */}
              <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-slate-400">
                <Activity size={14} />
                <span>Visualización interactiva activa</span>
              </div>
            </div>
          </Card>

          {/* Right Panel: Diagram Render */}
          <Card className="lg:col-span-8 p-6 h-full min-h-[500px] flex flex-col">
             <div className="mb-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                  Diagram Render Area
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded border border-slate-200">
                  {activeTab === 'timeline' ? 'Dynamic' : 'Static View'}
                </span>
             </div>
             <div className="flex-grow bg-white rounded border border-slate-100 flex items-center justify-center overflow-hidden relative">
               <DiagramRender tabId={activeTab} />
             </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('evolution');

  return (
    <LessonLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
    />
  );
};

export default App;