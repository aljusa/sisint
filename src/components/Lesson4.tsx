import React, { useState } from 'react';
import { 
  Network, 
  ArrowRight, 
  ShieldAlert, 
  Cpu, 
  Briefcase, 
  HeartPulse, 
  GraduationCap, 
  Coins, 
  Megaphone, 
  ChevronDown, 
  ChevronUp,
  BrainCircuit,
  Zap,
  UserCheck,
  Settings
} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- Types & Interfaces ---

type TabId = 'sectores' | 'beneficios' | 'retos';

interface TabData {
  id: TabId;
  label: string;
  icon: React.ElementType;
  title: string;
  description: React.ReactNode;
}

// --- Data Definitions ---

const TABS: TabData[] = [
  {
    id: 'sectores',
    label: 'Mapa de Sectores',
    icon: Network,
    title: 'Principales Áreas de Aplicación',
    description: (
      <DivCarousel>
        <div>
          <p>
            La IA se utiliza en diversos sectores productivos y sociales:
          </p>

          <ul>
            <li><strong>Salud:</strong> Diagnóstico asistido por imagen.</li>
            <li><strong>Finanzas:</strong> Detección de fraude.</li>
            <li><strong>Educación:</strong> Sistemas de aprendizaje adaptativo.</li>
            <li><strong>Transporte:</strong> Vehículos autónomos.</li>
            <li><strong>Comercio electrónico:</strong> Recomendaciones personalizadas.</li>
          </ul>

          <p>
            Cada aplicación combina datos sectoriales con modelos entrenados.
          </p>

        </div>
      </DivCarousel>
    ),
  },
  {
    id: 'beneficios',
    label: 'Causa y Efecto',
    icon: Zap,
    title: 'Beneficios de la IA',
    description: (
      <DivCarousel>
        <div>
          <p>
            La adopción de IA permite:
          </p>

          <ul>
            <li>Automatizar procesos repetitivos.</li>
            <li>Incrementar eficiencia.</li>
            <li>Reducir errores humanos.</li>
            <li>Personalizar servicios.</li>
            <li>Optimizar decisiones mediante análisis de datos.</li>
          </ul>

          <p>
            Su valor radica en la capacidad de procesar información a gran escala.
          </p>

        </div>
      </DivCarousel>
    ),
  },
  {
    id: 'retos',
    label: 'Retos Interactivos',
    icon: ShieldAlert,
    title: 'Desafíos de la Implementación',
    description:(
      <DivCarousel>
        <div>
          <p>
            La expansión de la IA también plantea desafíos relevantes:
          </p>

          <ul>
            <li>Sesgos en los datos.</li>
            <li>Problemas de privacidad.</li>
            <li>Impacto en el empleo.</li>
            <li>Necesidad de regulación.</li>
            <li>Uso ético responsable.</li>
          </ul>

          <p>
            Estos retos requieren análisis técnico y reflexión social.
          </p>

        
        </div>
      </DivCarousel>
    ),
  },
];

// --- Sub-Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const SectionTitle: React.FC<{ title: string; icon: React.ElementType }> = ({ title, icon: Icon }) => (
  <div className="grid grid-flow-col auto-cols-max gap-3 items-center mb-4">
    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
      <Icon size={24} />
    </div>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
  </div>
);

// --- Diagram Components ---

// 1. Sector Map Diagram (Static Grid Layout)
const SectorMapDiagram: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[400px] p-8 bg-slate-50 rounded-lg border border-slate-100 relative grid place-items-center">
      {/* Radial Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative w-full max-w-4xl">
        
        {/* Connecting Lines (Simulated with absolute positioning for visual flair behind grid) */}
        <div className="absolute inset-0 hidden md:block pointer-events-none">
          <svg className="w-full h-full absolute top-0 left-0" style={{ zIndex: 0 }}>
            <line x1="50%" y1="50%" x2="16%" y2="20%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="84%" y2="20%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="16%" y2="80%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="84%" y2="80%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
            <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* Top Node */}
        <div className="col-start-1 md:col-start-2 grid justify-items-center z-10">
          <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-emerald-500 w-40 text-center transform transition-transform hover:-translate-y-1">
            <HeartPulse className="mx-auto text-emerald-500 mb-2" />
            <h4 className="font-bold text-slate-700">Salud</h4>
            <p className="text-xs text-slate-500 mt-1">Diagnóstico & Robótica</p>
          </div>
        </div>

        {/* Left Top Node */}
        <div className="md:justify-self-end grid justify-items-center z-10">
          <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-blue-500 w-40 text-center transform transition-transform hover:-translate-y-1">
            <Coins className="mx-auto text-blue-500 mb-2" />
            <h4 className="font-bold text-slate-700">Finanzas</h4>
            <p className="text-xs text-slate-500 mt-1">Detección de Fraude</p>
          </div>
        </div>

        {/* Center Node (Core) */}
        <div className="grid place-items-center z-20 my-4 md:my-0">
          <div className="bg-indigo-600 text-white p-8 rounded-full shadow-xl shadow-indigo-200 w-40 h-40 grid place-items-center border-4 border-white ring-4 ring-indigo-50">
            <div className="text-center">
              <BrainCircuit size={40} className="mx-auto mb-1" />
              <h3 className="font-bold text-lg leading-tight">Inteligencia<br/>Artificial</h3>
            </div>
          </div>
        </div>

        {/* Right Top Node */}
        <div className="md:justify-self-start grid justify-items-center z-10">
          <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-amber-500 w-40 text-center transform transition-transform hover:-translate-y-1">
            <GraduationCap className="mx-auto text-amber-500 mb-2" />
            <h4 className="font-bold text-slate-700">Educación</h4>
            <p className="text-xs text-slate-500 mt-1">Tutores Virtuales</p>
          </div>
        </div>

        {/* Left Bottom Node */}
        <div className="md:justify-self-end grid justify-items-center z-10">
           <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-purple-500 w-40 text-center transform transition-transform hover:-translate-y-1">
            <Megaphone className="mx-auto text-purple-500 mb-2" />
            <h4 className="font-bold text-slate-700">Marketing</h4>
            <p className="text-xs text-slate-500 mt-1">Segmentación</p>
          </div>
        </div>

        {/* Bottom Node */}
        <div className="col-start-1 md:col-start-2 grid justify-items-center z-10">
           <div className="bg-white p-4 rounded-xl shadow-md border-b-4 border-orange-500 w-40 text-center transform transition-transform hover:-translate-y-1">
            <Briefcase className="mx-auto text-orange-500 mb-2" />
            <h4 className="font-bold text-slate-700">Transporte</h4>
            <p className="text-xs text-slate-500 mt-1">Conducción Autónoma</p>
          </div>
        </div>

      </div>
    </div>
  );
};

// 2. Cause-Effect Diagram (Linear Grid Layout)
const BenefitsDiagram: React.FC = () => {
  return (
    <div className="w-full p-6 md:p-12 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-lg border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-6 items-center">
        
        {/* Cause */}
        <div className="h-full">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-8 border-indigo-600 h-full grid content-center">
            <div className="grid gap-4 justify-items-center text-center">
              <div className="p-4 bg-indigo-50 rounded-full text-indigo-600">
                <Cpu size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Implementación de IA</h3>
                <p className="text-slate-500 text-sm mt-2">Integración de ML, NLP y Visión por Computadora</p>
              </div>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="grid justify-items-center text-slate-300">
           <ArrowRight size={48} className="hidden md:block" />
           <ChevronDown size={48} className="block md:hidden" />
        </div>

        {/* Effects */}
        <div className="grid grid-rows-3 gap-4">
          {/* Effect 1 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 grid grid-cols-[auto_1fr] gap-4 items-center hover:shadow-md transition-shadow">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
              <Settings size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-700">Eficiencia Operativa</h4>
              <p className="text-xs text-slate-500">Reducción de tiempos de proceso y errores humanos.</p>
            </div>
          </div>

          {/* Effect 2 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 grid grid-cols-[auto_1fr] gap-4 items-center hover:shadow-md transition-shadow">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <BrainCircuit size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-700">Automatización Inteligente</h4>
              <p className="text-xs text-slate-500">Ejecución autónoma de tareas repetitivas complejas.</p>
            </div>
          </div>

          {/* Effect 3 */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 grid grid-cols-[auto_1fr] gap-4 items-center hover:shadow-md transition-shadow">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <UserCheck size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-700">Hiper-Personalización</h4>
              <p className="text-xs text-slate-500">Experiencias adaptadas al usuario en tiempo real.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Interactive Challenges Diagram (Accordion Grid)
const ChallengesDiagram: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const challenges = [
    {
      id: 1,
      title: "Ética y Sesgo",
      icon: ShieldAlert,
      color: "text-rose-600 bg-rose-50",
      content: "Los algoritmos pueden perpetuar discriminaciones históricas si se entrenan con datos sesgados. Ejemplo: Sistemas de contratación que favorecen ciertos perfiles demográficos injustamente."
    },
    {
      id: 2,
      title: "Privacidad de Datos",
      icon: Network,
      color: "text-amber-600 bg-amber-50",
      content: "La necesidad de grandes volúmenes de datos para entrenar modelos choca con el derecho a la privacidad. Reto: Anonimizar datos médicos o financieros sin perder utilidad."
    },
    {
      id: 3,
      title: "Desplazamiento Laboral",
      icon: Briefcase,
      color: "text-cyan-600 bg-cyan-50",
      content: "La automatización de tareas cognitivas amenaza ciertos roles administrativos. Reto: Reskilling masivo de la fuerza laboral para trabajar junto a la IA."
    },
    {
      id: 4,
      title: "Caja Negra (Explicabilidad)",
      icon: BrainCircuit,
      color: "text-indigo-600 bg-indigo-50",
      content: "Muchos modelos de Deep Learning son inescrutables. No sabemos 'por qué' toman una decisión, lo cual es crítico en medicina o justicia."
    }
  ];

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {challenges.map((item) => (
        <div 
          key={item.id}
          onClick={() => handleToggle(item.id)}
          className={`
            bg-white rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
            ${expandedId === item.id ? 'border-indigo-500 shadow-md ring-1 ring-indigo-200 col-span-1 sm:col-span-2' : 'border-slate-200 hover:border-indigo-300'}
          `}
        >
          <div className="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
            <div className={`p-3 rounded-lg ${item.color}`}>
              <item.icon size={24} />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">{item.title}</h3>
            <div className="text-slate-400">
              {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          
          <div className={`
            grid transition-all duration-300 ease-in-out bg-slate-50
            ${expandedId === item.id ? 'grid-rows-[1fr] opacity-100 p-4 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'}
          `}>
            <div className="overflow-hidden">
              <p className="text-slate-600 leading-relaxed">
                {item.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main Layout Component ---

const LessonLayout: React.FC<{ 
  activeTab: TabId; 
  onTabChange: (id: TabId) => void;
}> = ({ activeTab, onTabChange }) => {
  
  const currentData = TABS.find(t => t.id === activeTab)!;
  const CurrentIcon = currentData.icon;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 grid grid-rows-[auto_1fr] gap-0">
      
      {/* 1. Header Area */}
      <header className="bg-white border-b border-slate-200 top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BrainCircuit className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">Aplicaciones y Retos de la Inteligencia Artificial</h1>
            
          </div>
        </div>
        
        {/* Navigation Tabs (Grid based) */}
        <nav className="max-w-6xl mx-auto px-4 mt-2">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    py-3 px-2 md:px-4 text-sm font-medium rounded-t-lg transition-all duration-200
                    grid grid-flow-col gap-2 items-center justify-center
                    ${isActive 
                      ? 'bg-slate-100 text-indigo-700 border-b-2 border-indigo-600' 
                      : 'bg-white text-slate-500 hover:text-indigo-600 hover:bg-slate-50 border-b-2 border-transparent'}
                  `}
                >
                  <TabIcon size={18} className={isActive ? "stroke-2" : "stroke-1"} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* 2. Main Content Area */}
      <main className="max-w-5xl mx-auto w-full p-4 md:p-8">
        <Card className="p-6 md:p-8 h-full">
          {/* Internal Grid for Content Structure */}
          <div className="grid grid-rows-[auto_auto_1fr] gap-6">
            
            {/* Diagram Title */}
            <SectionTitle title={currentData.title} icon={CurrentIcon} />

            {/* Diagram Description */}
            <div className="prose prose-slate max-w-none border-l-4 border-indigo-200 pl-4 bg-indigo-50/50 py-3 pr-3 rounded-r-lg">
              <p className="text-slate-700">{currentData.description}</p>
            </div>

            {/* Diagram Render */}
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'sectores' && <SectorMapDiagram />}
              {activeTab === 'beneficios' && <BenefitsDiagram />}
              {activeTab === 'retos' && <ChallengesDiagram />}
            </div>

          </div>
        </Card>
      </main>

    </div>
  );
};

// --- Root App ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('sectores');

  return (
    <LessonLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
    />
  );
};

export default App;