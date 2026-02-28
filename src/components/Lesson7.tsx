import React, { useState } from 'react';
import { Network, Cpu, Activity, ShoppingCart, Truck, Stethoscope, Smartphone, Shield, Globe, Database, Cloud, Lock } from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- Types & Interfaces ---

type TabId = 'static' | 'interactive' | 'dynamic';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface SectorNode {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: React.ReactNode;
}

interface AppItem {
  id: string;
  name: string;
  model: string;
  description: string;
  icon: React.ReactNode;
}

interface TechNode {
  id: string;
  label: string;
  angle: number; // Para posicionamiento polar
  color: string;
}

// --- Data Constants ---

const SECTORS: SectorNode[] = [
  { id: 'finance', label: 'Finanzas', x: 50, y: 10, icon: <Activity className="w-5 h-5 text-blue-600" /> },
  { id: 'health', label: 'Salud', x: 90, y: 40, icon: <Stethoscope className="w-5 h-5 text-red-600" /> },
  { id: 'retail', label: 'Retail', x: 80, y: 90, icon: <ShoppingCart className="w-5 h-5 text-orange-600" /> },
  { id: 'industry', label: 'Manufactura', x: 20, y: 90, icon: <Cpu className="w-5 h-5 text-slate-600" /> },
  { id: 'logistics', label: 'Logística', x: 10, y: 40, icon: <Truck className="w-5 h-5 text-green-600" /> },
];

const DAILY_APPS: AppItem[] = [
  { id: 'streaming', name: 'Netflix/Spotify', model: 'Sistemas de Recomendación', description: 'Filtrado colaborativo basado en historial de usuario.', icon: <Activity /> },
  { id: 'voice', name: 'Siri/Alexa', model: 'Procesamiento de Lenguaje Natural (NLP)', description: 'Reconocimiento de voz y conversión texto-a-habla.', icon: <Smartphone /> },
  { id: 'spam', name: 'Filtro de Correo', model: 'Clasificación Bayesiana / Redes Neuronales', description: 'Detección de patrones en texto para separar spam.', icon: <Shield /> },
  { id: 'maps', name: 'Google Maps', model: 'Teoría de Grafos & ML', description: 'Optimización de rutas en tiempo real basada en tráfico.', icon: <Globe /> },
];

const ECOSYSTEM: TechNode[] = [
  { id: 'iot', label: 'IoT', angle: 0, color: '#3b82f6' },
  { id: 'blockchain', label: 'Blockchain', angle: 72, color: '#8b5cf6' },
  { id: 'bigdata', label: 'Big Data', angle: 144, color: '#10b981' },
  { id: 'cloud', label: 'Cloud Computing', angle: 216, color: '#f59e0b' },
  { id: 'robotics', label: 'Robótica', angle: 288, color: '#ef4444' },
];

// --- Components ---

/**
 * Componente Card: Envoltorio genérico para secciones de contenido.
 */
const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col ${className}`}>
    {title && <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 font-semibold text-slate-700">{title}</div>}
    <div className="p-6">
      {children}
    </div>
  </div>
);

/**
 * Componente Diagram 1: Red Estática (IA y Sectores)
 */
const StaticNetworkDiagram: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="relative w-full max-w-md aspect-square">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Conexiones */}
          {SECTORS.map((sector) => (
            <line
              key={`line-${sector.id}`}
              x1="50"
              y1="50"
              x2={sector.x}
              y2={sector.y}
              stroke="#94a3b8"
              strokeWidth="0.5"
              strokeDasharray="2 1"
            />
          ))}
          
          {/* Nodo Central */}
          <circle cx="50" cy="50" r="12" fill="#3b82f6" fillOpacity="0.1" />
          <circle cx="50" cy="50" r="8" fill="#3b82f6" />
          <text x="50" y="52" textAnchor="middle" fontSize="4" fill="white" fontWeight="bold">IA</text>

          {/* Nodos Sectores */}
          {SECTORS.map((sector) => (
            <g key={sector.id} className="cursor-default hover:opacity-80 transition-opacity">
              <circle cx={sector.x} cy={sector.y} r="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
              <foreignObject x={sector.x - 3} y={sector.y - 3} width="6" height="6">
                <div className="flex items-center justify-center w-full h-full">
                  {React.cloneElement(sector.icon as React.ReactElement)}
                </div>
              </foreignObject>
              <text x={sector.x} y={sector.y + 10} textAnchor="middle" fontSize="3" className="fill-slate-600 font-medium">
                {sector.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 text-center max-w-lg">
        <p className="text-sm text-slate-500">
          La Inteligencia Artificial actúa como un eje transversal, inyectando eficiencia y capacidad predictiva en sectores tradicionalmente dispares.
        </p>
      </div>
    </div>
  );
};

/**
 * Componente Diagram 2: Aplicaciones Interactivas
 */
const InteractiveApplicationsDiagram: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 h-full items-center">
      {/* Grid de Botones */}
      <div className="grid grid-cols-2 gap-4">
        {DAILY_APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => setActiveApp(app)}
            className={`p-4 rounded-lg border text-left transition-all duration-200 flex flex-col gap-2
              ${activeApp?.id === app.id 
                ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-md' 
                : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}
          >
            <div className={`p-2 rounded-full w-fit ${activeApp?.id === app.id ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
              {app.icon}
            </div>
            <span className="font-semibold text-slate-800 text-sm">{app.name}</span>
          </button>
        ))}
      </div>

      {/* Panel de Detalles */}
      <div className="h-full min-h-[200px]">
        <Card className="h-full bg-slate-50 border-dashed border-2 border-slate-300 flex items-center justify-center text-center">
          {activeApp ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{activeApp.model}</h3>
              <div className="w-16 h-1 bg-blue-500 mx-auto mb-4 rounded-full"></div>
              <p className="text-slate-600">{activeApp.description}</p>
            </div>
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <Network className="w-12 h-12 mb-2 opacity-20" />
              <p>Selecciona una aplicación para ver su motor de IA</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

/**
 * Componente Diagram 3: Ecosistema Tecnológico (Dinámico)
 */
const DynamicEcosystemDiagram: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center py-8">
      <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
        {/* Anillos orbitales animados (CSS puro simulado con clases Tailwind) */}
        <div className="absolute inset-0 border border-slate-100 rounded-full scale-75"></div>
        <div className="absolute inset-0 border border-slate-100 rounded-full scale-100"></div>
        
        {/* Centro del Ecosistema */}
        <div className="z-10 bg-gradient-to-br from-indigo-600 to-purple-700 w-24 h-24 rounded-full flex items-center justify-center text-white font-bold shadow-xl border-4 border-white">
          IA CORE
        </div>

        {/* Satélites */}
        {ECOSYSTEM.map((tech) => {
          // Conversión polar a cartesiana simple para posicionamiento absoluto relativo al centro
          // Nota: En producción usaría funciones trigonométricas en estilo inline, aquí simplificado con clases de rotación o hardcoded positions.
          // Para este ejemplo, usaremos transformaciones CSS en línea para precisión.
          const radius = 140; // px
          const x = Math.cos((tech.angle * Math.PI) / 180) * radius;
          const y = Math.sin((tech.angle * Math.PI) / 180) * radius;

          return (
            <div
              key={tech.id}
              className="absolute flex flex-col items-center justify-center transition-all duration-500 hover:scale-110"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg mb-2"
                style={{ backgroundColor: tech.color }}
              >
                {tech.id === 'iot' && <Globe size={20} />}
                {tech.id === 'blockchain' && <Lock size={20} />}
                {tech.id === 'bigdata' && <Database size={20} />}
                {tech.id === 'cloud' && <Cloud size={20} />}
                {tech.id === 'robotics' && <Cpu size={20} />}
              </div>
              <span className="text-xs font-bold text-slate-600 bg-white px-2 py-1 rounded-full shadow-sm border border-slate-100">
                {tech.label}
              </span>
              
              {/* Línea de conexión al centro (Visualmente simulada) */}
              <div 
                className="absolute -z-10 h-0.5 bg-slate-200 origin-right"
                style={{ 
                  width: `${radius - 50}px`, 
                  transform: `rotate(${tech.angle + 180}deg) translate(50%, 0)`,
                  top: '24px', // Mitad del icono
                  left: '50%',
                  opacity: 0.5
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-8 bg-indigo-50 text-indigo-800 px-4 py-2 rounded-md text-sm font-medium border border-indigo-100">
        La IA actúa como el núcleo orquestador de la 4ª Revolución Industrial
      </div>
    </div>
  );
};

/**
 * Layout Principal: LessonLayout
 * Implementa CSS Grid puro para la estructura.
 */
interface LessonLayoutProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ activeTab, onTabChange, children, title, subtitle }) => {
  const tabs: Tab[] = [
    { id: 'static', label: '1. Red Industrial', icon: <Network size={16} /> },
    { id: 'interactive', label: '2. Apps Cotidianas', icon: <Smartphone size={16} /> },
    { id: 'dynamic', label: '3. Ecosistema Tech', icon: <Cpu size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans grid grid-rows-[auto_auto_1fr] h-screen ">
      {/* Area 1: Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="text-blue-600" />
            {title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>
      </header>

      {/* Area 2: Navigation Tabs */}
      <nav className="bg-white px-6 pt-4 border-b border-slate-200">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors border-t border-x border-b-0
                ${activeTab === tab.id 
                  ? 'bg-slate-50 text-blue-600 border-slate-200 border-b-transparent relative top-[1px]' 
                  : 'bg-transparent text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Area 3: Content Canvas (Scrollable if needed, but strict grid otherwise) */}
      <main className="p-6 bg-slate-50 ">
        <div className="max-w-6xl mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('static');

  // Helper para renderizar contenido basado en el tab activo
  const renderContent = () => {
    switch (activeTab) {
      case 'static':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 h-full">
            <div className="space-y-4">
              <Card title="" className="bg-blue-50/50 border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Impacto Transversal</h3>
               
      <DivCarousel>
        <div>
          <p>
            La IA se ha convertido en un motor estratégico de competitividad empresarial.
          </p>

          <p><strong>Aplicaciones actuales:</strong></p>

          <ul>
            <li>Optimización logística.</li>
            <li>Mantenimiento predictivo.</li>
            <li>Automatización industrial.</li>
            <li>Análisis financiero avanzado.</li>
            <li>Personalización de servicios digitales.</li>
          </ul>

          <p>
            Los modelos predictivos permiten anticipar comportamientos y mejorar la toma de decisiones en tiempo real.
          </p>

        </div>
      </DivCarousel>
    ,
              </Card>
              <Card title="Datos Clave">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span><strong>Salud:</strong> Diagnósticos 30% más rápidos mediante visión por computadora.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span><strong>Finanzas:</strong> Detección de fraude en milisegundos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span><strong>Logística:</strong> Optimización de rutas reduciendo huella de carbono.</span>
                  </li>
                </ul>
              </Card>
            </div>
            <Card title="Visualización de Red" className="h-full min-h-[400px]">
              <StaticNetworkDiagram />
            </Card>
          </div>
        );
      
      case 'interactive':
        return (
          <div className="grid grid-cols-1 gap-6 h-full">
            <Card title="IA Invisible: Aplicaciones Diarias" className="min-h-[500px]">
              <div className="mb-6 border-b border-slate-100 pb-4">
               
      <DivCarousel>
        <div>
          <p>
            La IA forma parte de actividades diarias, muchas veces de manera invisible.
          </p>

          <p><strong>Ejemplos:</strong></p>

          <ul>
            <li>Asistentes virtuales.</li>
            <li>Recomendaciones en plataformas digitales.</li>
            <li>Reconocimiento facial.</li>
            <li>Traducción automática.</li>
            <li>Sistemas de navegación inteligente.</li>
          </ul>

          <p>
            Estos sistemas funcionan gracias a modelos entrenados con grandes volúmenes de datos.
          </p>

        </div>
      </DivCarousel>
    
              </div>
              <InteractiveApplicationsDiagram />
            </Card>
          </div>
        );

      case 'dynamic':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 h-full">
            <Card title="El Ecosistema Conectado" className="h-full min-h-[400px]">
               <DivCarousel>
        <div>
          <p>
            La IA se integra con otras tecnologías emergentes:
          </p>

          <ul>
            <li>Big Data.</li>
            <li>Internet de las Cosas (IoT).</li>
            <li>Computación en la nube.</li>
            <li>Automatización robótica de procesos.</li>
          </ul>

          <p>
            Esta integración está redefiniendo modelos de negocio y estructuras organizacionales.
          </p>
        </div>
      </DivCarousel>
              <DynamicEcosystemDiagram />
            </Card>
            <div className="space-y-4">
               <Card title="Sinergias Tecnológicas" className="h-full">
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-bold text-slate-800">IA + IoT</h4>
                    <p className="text-slate-600">Transforma datos de sensores en decisiones en el borde (Edge AI).</p>
                  </div>
                  <div className="w-full h-px bg-slate-100" />
                  <div>
                    <h4 className="font-bold text-slate-800">IA + Blockchain</h4>
                    <p className="text-slate-600">Garantiza la trazabilidad y seguridad de los modelos de datos compartidos.</p>
                  </div>
                  <div className="w-full h-px bg-slate-100" />
                  <div>
                    <h4 className="font-bold text-slate-800">IA + Big Data</h4>
                    <p className="text-slate-600">La IA necesita el volumen del Big Data para entrenarse; el Big Data necesita IA para ser útil.</p>
                  </div>
                </div>
               </Card>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <LessonLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      title="Perspectivas Actuales de la Inteligencia Artificial"
      subtitle=""
    >
      {renderContent()}
    </LessonLayout>
  );
};

export default App;