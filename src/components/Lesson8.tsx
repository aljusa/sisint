import React, { useState } from 'react';
import { 
   Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  
} from 'recharts';
import { 
  Cpu, 
  Scale, 
  Users, 
  Info, 
  Zap, 
  ShieldCheck, 
  Activity,
  Layers
} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- Tipos e Interfaces ---

type TabId = 'evolution' | 'regulation' | 'social';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

// --- Datos Simulados (Mock Data) ---

const evolutionData: ChartDataPoint[] = [
  { name: '2020', Especialización: 20, Autonomía: 5, Adaptabilidad: 10 },
  { name: '2022', Especialización: 40, Autonomía: 15, Adaptabilidad: 20 },
  { name: '2025', Especialización: 60, Autonomía: 35, Adaptabilidad: 30 },
  { name: '2028', Especialización: 75, Autonomía: 60, Adaptabilidad: 55 },
  { name: '2030', Especialización: 85, Autonomía: 80, Adaptabilidad: 75 },
  { name: '2035', Especialización: 90, Autonomía: 95, Adaptabilidad: 90 },
];

const impactData: ChartDataPoint[] = [
  { name: 'Productividad', A: 120, fullMark: 150 },
  { name: 'Desplazamiento Laboral', A: 98, fullMark: 150 },
  { name: 'Personalización Edu.', A: 86, fullMark: 150 },
  { name: 'Brecha Digital', A: 99, fullMark: 150 },
  { name: 'Innovación Médica', A: 85, fullMark: 150 },
  { name: 'Eficiencia Energética', A: 65, fullMark: 150 },
];

// --- Componentes UI Base ---

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- Componentes de Visualización Específicos ---

// 1. Diagrama de Evolución Tecnológica (Dinámico)
const TechEvolutionDiagram: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={evolutionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAdapt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <RechartsTooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="Autonomía" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorAuto)" 
            animationDuration={2000}
          />
          <Area 
            type="monotone" 
            dataKey="Adaptabilidad" 
            stroke="#82ca9d" 
            fillOpacity={1} 
            fill="url(#colorAdapt)" 
            animationDuration={2500}
          />
          <Line type="monotone" dataKey="Especialización" stroke="#ff7300" strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. Matriz Interactiva de Regulación
const RegulationMatrix: React.FC = () => {
  const [activeCell, setActiveCell] = useState<{row: string, col: string, content: string} | null>(null);

  const challenges = ["Privacidad", "Sesgo Algorítmico", "Seguridad"];
  const responses = ["Normativa Legal", "Ética del Diseño", "Auditoría Técnica"];

  const contentMap: Record<string, string> = {
    "Privacidad-Normativa Legal": "GDPR y leyes locales que exigen consentimiento explícito y derecho al olvido.",
    "Privacidad-Ética del Diseño": "Privacy by Design: Minimización de datos desde la concepción del sistema.",
    "Privacidad-Auditoría Técnica": "Encriptación homomórfica y pruebas de fuga de datos.",
    "Sesgo Algorítmico-Normativa Legal": "Leyes antidiscriminación aplicadas a decisiones automatizadas (crédito, empleo).",
    "Sesgo Algorítmico-Ética del Diseño": "Equipos diversos y revisión de datasets para representatividad.",
    "Sesgo Algorítmico-Auditoría Técnica": "Tests de paridad estadística y análisis contrafactual.",
    "Seguridad-Normativa Legal": "Estándares de responsabilidad civil por daños causados por IA.",
    "Seguridad-Ética del Diseño": "Evaluación de impacto de doble uso antes del lanzamiento.",
    "Seguridad-Auditoría Técnica": "Red teaming y pruebas de robustez adversarial."
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Matriz Visual - Usando CSS Grid */}
      <div className="lg:col-span-2 grid grid-cols-4 gap-2">
        {/* Header Row */}
        <div className="col-start-2 col-end-5 grid grid-cols-3 gap-2 mb-2">
          {responses.map((r, i) => (
            <div key={i} className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              {r}
            </div>
          ))}
        </div>

        {challenges.map((challenge, rowIndex) => (
          
          <React.Fragment key={challenge}>
            {/* Row Label */}
            
            <div className= {`${rowIndex} flex items-center justify-end pr-4 font-semibold text-slate-700 text-sm`}>
              {challenge}
            </div>
            {/* Cells */}
            {responses.map((response, colIndex) => {
              
              const key = `${challenge}-${response}`;
              const isActive = activeCell?.row === challenge && activeCell?.col === response;
              
              return (
                <button
                  key={key}
                  onClick={() => setActiveCell({ row: challenge, col: response, content: contentMap[key] })}
                  className={` ${colIndex}
                    h-24 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center p-2
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    ${isActive 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                      : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500'}
                  `}
                >
                  <ShieldCheck size={isActive ? 24 : 20} />
                  <span className="text-[10px] mt-2 font-medium">Ver Detalle</span>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Panel de Detalle */}
      <div className="lg:col-span-1">
        <div className={`h-full rounded-xl border p-6 transition-all duration-300 ${activeCell ? 'bg-slate-50 border-indigo-200' : 'bg-slate-50 border-slate-100 border-dashed'}`}>
          {activeCell ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h4 className="text-indigo-600 font-bold text-lg mb-1">{activeCell.row}</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-4">Perspectiva: {activeCell.col}</p>
              <div className="prose prose-sm text-slate-700">
                <p>{activeCell.content}</p>
              </div>
            
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
              <Activity size={48} className="mb-4 opacity-50" />
              <p className="text-sm">Selecciona una intersección en la matriz para ver el marco regulatorio específico.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. Diagrama de Impacto Social (Radar)
const SocialImpactDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <div className="md:col-span-2 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={impactData}>
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
              name="Impacto IA"
              dataKey="A"
              stroke="#0ea5e9"
              strokeWidth={3}
              fill="#0ea5e9"
              fillOpacity={0.4}
            />
            <RechartsTooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="md:col-span-1 space-y-4">
        <div className="p-4 bg-sky-50 rounded-lg border border-sky-100">
          <h4 className="font-bold text-sky-800 mb-2 flex items-center gap-2">
            <Zap size={16} /> Transformación Económica
          </h4>
          <p className="text-sm text-sky-700">
            Aumento drástico en la productividad, pero con riesgo de obsolescencia de habilidades tradicionales.
          </p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <Users size={16} /> Transformación Social
          </h4>
          <p className="text-sm text-emerald-700">
            Cambios en la estructura educativa hacia modelos personalizados y continuos.
          </p>
        </div>
        <div className="p-4 bg-rose-50 rounded-lg border border-rose-100">
          <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2">
            <Scale size={16} /> Riesgos Estructurales
          </h4>
          <p className="text-sm text-rose-700">
            Posible ampliación de la brecha digital entre adoptantes tempranos y tardíos.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Componente Layout Principal (LessonLayout) ---

const LessonLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('evolution');

  const tabs: TabConfig[] = [
    { id: 'evolution', label: 'Evolución Tecnológica', icon: <Cpu size={18} />, color: 'text-violet-600 border-violet-600' },
    { id: 'regulation', label: 'Desafíos y Regulación', icon: <Scale size={18} />, color: 'text-indigo-600 border-indigo-600' },
    { id: 'social', label: 'Impacto Social Causa-Efecto', icon: <Users size={18} />, color: 'text-sky-600 border-sky-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'evolution':
        return (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card title="Escenarios futuros" className="md:col-span-1 h-full">
                  <DivCarousel>
        <div>
          <p>
            Las investigaciones actuales apuntan hacia sistemas:
          </p>

          <ul>
            <li>Más autónomos.</li>
            <li>Capaces de colaboración humano-máquina.</li>
            <li>Con mayor eficiencia energética.</li>
            <li>Con capacidades cognitivas ampliadas.</li>
          </ul>

          <p>
            Se exploran modelos más generales y adaptativos que superen las limitaciones actuales.
          </p>
        </div>
      </DivCarousel>
              </Card>
              <Card title="Visualización: Curva de Progreso" className="md:col-span-2">
                <TechEvolutionDiagram />
              </Card>
            </div>
            <Card className="bg-slate-900 text-white border-slate-800">
              <div className="flex items-start gap-4">
                <Info className="text-violet-400 mt-1 flex-shrink-0" />
                <div>
                  
                  <p className="text-slate-200 text-sm">
                    A medida que la autonomía aumenta (curva violeta), la necesidad de intervención humana directa disminuye, pero la necesidad de supervisión estratégica (alineación) se vuelve crítica.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );
      case 'regulation':
        return (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500">
            <Card title="Matriz de Gobernanza">
               <RegulationMatrix />
            </Card>
          </div>
        );
      case 'social':
        return (
          <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 gap-6">
              <Card title="Radar de Impacto Multidimensional">
                <SocialImpactDiagram />
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card title="Causas (Adopción)" className="border-l-4 border-l-sky-500">
                   <ul className="space-y-3 text-sm text-slate-600">
                     <li className="flex items-center gap-2"><Layers size={16} className="text-sky-500"/> Integración en flujos de trabajo creativos.</li>
                     <li className="flex items-center gap-2"><Layers size={16} className="text-sky-500"/> Automatización de procesos cognitivos rutinarios.</li>
                     <li className="flex items-center gap-2"><Layers size={16} className="text-sky-500"/> Democratización del acceso a herramientas avanzadas.</li>
                   </ul>
                 </Card>
                 <Card title="Efectos (Transformación)" className="border-l-4 border-l-emerald-500">
                   <ul className="space-y-3 text-sm text-slate-600">
                     <li className="flex items-center gap-2"><Activity size={16} className="text-emerald-500"/> Redefinición de roles laborales (Human-in-the-loop).</li>
                     <li className="flex items-center gap-2"><Activity size={16} className="text-emerald-500"/> Necesidad de re-skilling masivo.</li>
                     <li className="flex items-center gap-2"><Activity size={16} className="text-emerald-500"/> Hiper-personalización de servicios.</li>
                   </ul>
                 </Card>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 grid grid-rows-[auto_auto_1fr] gap-0">
      
      {/* 1. Header Global */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Perspectivas Futuras y Desafíos</h1>
          </div>
        </div>
     
      </header>

      {/* 2. Barra de Navegación (Tabs) */}
      <nav className="bg-white border-b border-slate-200 px-6 pt-2">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 pb-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap
                  ${isActive ? tab.color : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. Área de Contenido Principal (Grid Container) */}
      <main className="p-6 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>

    </div>
  );
};

export default LessonLayout;