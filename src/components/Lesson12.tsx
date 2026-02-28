import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  
  
} from 'recharts';
import { 
  Brain, 
  Eye, 
  Mic, 
  MessageSquare, 
  Bot, 
  Database, 
  Layers, 
  Zap, 
  ShieldAlert, 
  Cpu, 
  Scale, 
  Search,
  CheckCircle2,
  
  ChevronRight,
  Network
} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- Types & Interfaces ---

type TabId = 'applications' | 'performance' | 'challenges';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

interface ChallengeData {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  solution: string;
  color: string;
}

// --- Data Constants ---

const TABS: Tab[] = [
  { id: 'applications', label: 'Aplicaciones', icon: Network },
  { id: 'performance', label: 'Rendimiento (Causa-Efecto)', icon: Layers },
  { id: 'challenges', label: 'Desafíos y Soluciones', icon: ShieldAlert },
];

const PERFORMANCE_DATA = [
  { dataVolume: 'Bajo', traditional: 40, deepLearning: 20 },
  { dataVolume: 'Medio', traditional: 65, deepLearning: 50 },
  { dataVolume: 'Alto', traditional: 75, deepLearning: 75 },
  { dataVolume: 'Muy Alto', traditional: 78, deepLearning: 88 },
  { dataVolume: 'Masivo', traditional: 79, deepLearning: 96 },
];

const CHALLENGES: ChallengeData[] = [
  {
    id: 'interpretability',
    title: 'Caja Negra (Interpretabilidad)',
    icon: Search,
    description: 'Es difícil explicar por qué el modelo tomó una decisión específica.',
    solution: 'XAI (Explainable AI): Uso de mapas de calor y análisis de importancia de características.',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'data_hunger',
    title: 'Dependencia de Datos',
    icon: Database,
    description: 'Requiere cantidades masivas de datos etiquetados para funcionar bien.',
    solution: 'Transfer Learning, Data Augmentation y generación de datos sintéticos.',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'computation',
    title: 'Costo Computacional',
    icon: Cpu,
    description: 'El entrenamiento requiere hardware costoso (GPUs/TPUs) y mucha energía.',
    solution: 'Model Pruning, Quantization y hardware especializado (Edge AI).',
    color: 'bg-red-50 text-red-700 border-red-200'
  },
  {
    id: 'bias',
    title: 'Sesgo Algorítmico',
    icon: Scale,
    description: 'El modelo replica prejuicios existentes en los datos de entrenamiento.',
    solution: 'Auditoría de datasets, métricas de equidad y re-muestreo balanceado.',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  }
];

// --- Sub-Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const SectionHeader: React.FC<{ title: string; description: React.ReactNode }> = ({ title, description }) => (
  <div className="mb-6 border-b border-slate-100 pb-4">
    <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
   {description}
  </div>
);

// --- Visualization Components ---

const ApplicationsMap: React.FC = () => {
  return (
    <div className="h-full w-full p-4 bg-slate-50 rounded-lg">
      {/* CSS Grid for the Map Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
        
        {/* Central Core */}
        <div className="md:col-span-1 flex justify-center md:justify-end relative">
          <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg w-full max-w-[220px] z-10 relative">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-8 h-8" />
              <h3 className="text-xl font-bold">Deep Learning</h3>
            </div>
            <p className="text-indigo-100 text-sm">Redes Neuronales Profundas</p>
            
            {/* Visual connector lines for desktop */}
            <div className="hidden md:block absolute top-1/2 -right-6 w-6 h-0.5 bg-indigo-300"></div>
            <div className="hidden md:block absolute top-6 -right-6 w-6 h-[calc(50%+24px)] border-r-2 border-t-2 border-indigo-300 rounded-tr-xl"></div>
            <div className="hidden md:block absolute bottom-6 -right-6 w-6 h-[calc(50%+24px)] border-r-2 border-b-2 border-indigo-300 rounded-br-xl"></div>
          </div>
        </div>

        {/* Branches */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Node 1: Vision */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
              <Eye size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Visión por Computadora</h4>
              <ul className="text-sm text-slate-500 mt-1 space-y-1 list-disc list-inside">
                <li>Reconocimiento Facial</li>
                <li>Diagnóstico Médico</li>
                <li>Conducción Autónoma</li>
              </ul>
            </div>
          </div>

          {/* Node 2: NLP */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <MessageSquare size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Procesamiento de Lenguaje</h4>
              <ul className="text-sm text-slate-500 mt-1 space-y-1 list-disc list-inside">
                <li>Traducción Automática</li>
                <li>Análisis de Sentimientos</li>
                <li>Generación de Texto (LLMs)</li>
              </ul>
            </div>
          </div>

          {/* Node 3: Audio */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <Mic size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Procesamiento de Audio</h4>
              <ul className="text-sm text-slate-500 mt-1 space-y-1 list-disc list-inside">
                <li>Asistentes de Voz</li>
                <li>Reconocimiento de voz</li>
                <li>Generación de música</li>
              </ul>
            </div>
          </div>

          {/* Node 4: Robotics */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
              <Bot size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Robótica y Control</h4>
              <ul className="text-sm text-slate-500 mt-1 space-y-1 list-disc list-inside">
                <li>Manipulación de objetos</li>
                <li>Navegación en drones</li>
                <li>Mantenimiento predictivo</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const PerformanceChart: React.FC = () => {
  return (
    <div className="h-[400px] w-full p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="dataVolume" 
            label={{ value: 'Volumen de Datos / Profundidad del Modelo', position: 'insideBottom', offset: -5 }} 
            tick={{fontSize: 12}}
          />
          <YAxis 
            label={{ value: 'Precisión (Accuracy)', angle: -90, position: 'insideLeft' }} 
            domain={[0, 100]}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line 
            type="monotone" 
            dataKey="traditional" 
            name="Machine Learning Tradicional" 
            stroke="#94a3b8" 
            strokeWidth={3} 
            strokeDasharray="5 5"
            dot={{ r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="deepLearning" 
            name="Deep Learning" 
            stroke="#4f46e5" 
            strokeWidth={4} 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const ChallengesMatrix: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CHALLENGES.map((challenge) => {
        const isOpen = activeId === challenge.id;
        
        return (
          <div 
            key={challenge.id}
            onClick={() => setActiveId(isOpen ? null : challenge.id)}
            className={`
              cursor-pointer rounded-xl border p-5 transition-all duration-300
              ${isOpen ? 'ring-2 ring-offset-1 ' + challenge.color : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isOpen ? 'bg-white bg-opacity-50' : 'bg-slate-100 text-slate-600'}`}>
                  <challenge.icon size={24} />
                </div>
                <h3 className="font-bold text-lg">{challenge.title}</h3>
              </div>
              <ChevronRight className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
            </div>

            <div className="mt-4">
              <p className={`text-sm ${isOpen ? 'text-slate-800' : 'text-slate-500'}`}>
                <span className="font-semibold">Desafío:</span> {challenge.description}
              </p>
              
              <div className={`
                grid transition-all duration-300 ease-in-out overflow-hidden
                ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-black/10' : 'grid-rows-[0fr] opacity-0'}
              `}>
                <div className="min-h-0">
                  <div className="flex gap-2 items-start">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold block text-sm uppercase tracking-wide mb-1">Solución Técnica / Regulatoria</span>
                      <p className="text-sm leading-relaxed">{challenge.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- Main Layout Component ---

const LessonLayout: React.FC<{
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  children: React.ReactNode;
}> = ({ activeTab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 grid grid-rows-[auto_1fr] ">
      
      {/* HEADER AREA */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Brain className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Aplicaciones, Ventajas y Desafíos</h1>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex bg-slate-100 p-1 rounded-lg overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap
                    ${activeTab === tab.id 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}
                  `}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="p-4 md:p-8 overflow-y-auto bg-slate-50">
        <div className="max-w-6xl mx-auto h-full">
          <Card className="h-full min-h-[500px] flex flex-col p-6 md:p-8">
            {children}
          </Card>
        </div>
      </main>
    </div>
  );
};

// --- App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('applications');

  const renderContent = () => {
    switch (activeTab) {
      case 'applications':
        return (
          <>
            <SectionHeader 
              title="Aplicaciones principales" 
              description=
      {<DivCarousel>
        <div>
          <p>
            El Deep Learning ha transformado múltiples sectores:
          </p>

          <ul>
            <li>Diagnóstico médico asistido por imágenes.</li>
            <li>Reconocimiento facial.</li>
            <li>Asistentes virtuales.</li>
            <li>Vehículos autónomos.</li>
            <li>Sistemas de recomendación.</li>
          </ul>

          <p>
            Su eficacia es especialmente alta en tareas de percepción artificial.
          </p>

        
        </div>
      </DivCarousel>}
            />
            <div className="flex-1 min-h-[400px]">
              <ApplicationsMap />
            </div>
          </>
        );
      case 'performance':
        return (
          <>
            <SectionHeader 
              title="Escalabilidad y Precisión" 
              description={<DivCarousel>
        <div>
              <p>
            Entre sus principales ventajas destacan:
          </p>

          <ul>
            <li>Alta precisión en tareas complejas.</li>
            <li>Capacidad de aprendizaje automático de características.</li>
            <li>Escalabilidad con grandes datos.</li>
            <li>Mejora progresiva con entrenamiento adicional.</li>
          </ul>

          <p>
            El rendimiento aumenta conforme se dispone de más datos y capacidad computacional.
          </p>
        </div>
      </DivCarousel>}
            />
            <div className="flex-1 flex flex-col justify-center bg-slate-50 rounded-xl border border-slate-100">
               <div className="p-4 flex items-center gap-2 text-sm text-slate-500 mb-2">
                 <Zap size={16} className="text-yellow-500" />
                 <span>Observa la divergencia en el rendimiento con grandes volúmenes de datos.</span>
               </div>
              <PerformanceChart />
            </div>
          </>
        );
      case 'challenges':
        return (
          <>
            <SectionHeader 
              title="Matriz de Desafíos y Soluciones" 
              description={<DivCarousel>
         <div>
          <p>
            El Deep Learning también presenta limitaciones importantes:
          </p>

          <ul>
            <li>Alto consumo energético.</li>
            <li>Necesidad de grandes volúmenes de datos.</li>
            <li>Interpretabilidad limitada (modelos tipo “caja negra”).</li>
            <li>Riesgo de sesgos.</li>
            <li>Costos elevados de infraestructura.</li>
          </ul>

          <p>
            La transparencia y la ética son temas centrales en su desarrollo actual.
          </p>
        </div>
      </DivCarousel>}
            />
            <div className="flex-1">
              <ChallengesMatrix />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <LessonLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="animate-in fade-in duration-500 h-full flex flex-col">
        {renderContent()}
      </div>
    </LessonLayout>
  );
}