import React, { useState } from 'react';
import { 
  GitBranch, 
  BrainCircuit, 
  History, 
  Database, 
   
} from 'lucide-react';
import { 
  
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import DivCarousel from '../assets/DivCarousel';

// --- Tipos e Interfaces ---

interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  content: React.ReactNode;
}

// --- Componentes de UI Base ---

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className = "",
  title 
}) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 p-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700">{title}</h3>
      </div>
    )}
    <div className="p-6 h-full">
      {children}
    </div>
  </div>
);

// --- Diagramas Específicos ---

// 1. Línea del tiempo (1956) - Estático
const TimelineDiagram: React.FC = () => {
  return (
    <div className="h-full w-full grid grid-cols-[auto_1fr] gap-4">
      {/* Columna Izquierda: Años */}
      <div className="grid grid-rows-3 gap-8 justify-items-end text-slate-400 font-mono text-sm pt-2">
        <div>1950</div>
        <div className="text-blue-600 font-bold text-lg">1956</div>
        <div>1960s</div>
      </div>

      {/* Columna Derecha: Eventos con línea conectora */}
      <div className="relative border-l-2 border-slate-200 pl-8 grid grid-rows-3 gap-8">
        {/* Evento Previo */}
        <div className="opacity-50">
          <h4 className="font-bold text-slate-600">Test de Turing</h4>
          <p className="text-xs text-slate-500">Alan Turing propone "¿Pueden pensar las máquinas?"</p>
        </div>

        {/* Evento Principal */}
        <div className="relative">
          <div className="absolute -left-[39px] top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-sm"></div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 text-lg mb-1">Conferencia de Dartmouth</h4>
            <p className="text-sm text-blue-800">
              Nacimiento formal del término <strong>"Inteligencia Artificial"</strong>.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2 rounded shadow-sm text-slate-600">
                <span className="font-semibold block text-slate-900">McCarthy & Minsky</span>
                Organizadores
              </div>
              <div className="bg-white p-2 rounded shadow-sm text-slate-600">
                <span className="font-semibold block text-slate-900">Objetivo</span>
                Simular aprendizaje
              </div>
            </div>
          </div>
        </div>

        {/* Evento Posterior */}
        <div className="opacity-50">
          <h4 className="font-bold text-slate-600">La Era Dorada</h4>
          <p className="text-xs text-slate-500">Desarrollo de los primeros solucionadores de problemas generales.</p>
        </div>
      </div>
    </div>
  );
};

// 2. Árbol de Decisión (Simbólico) - Estático
const DecisionTreeDiagram: React.FC = () => {
  return (
    <div className="h-full w-full grid content-center justify-center">
      {/* Contenedor Grid del Árbol */}
      <div className="grid grid-cols-4 gap-4 text-sm text-center max-w-lg mx-auto">
        
        {/* Nivel 1: Raíz */}
        <div className="col-span-4 justify-self-center z-10">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-md border border-slate-700">
            <div className="font-mono text-xs text-slate-400 mb-1">INPUT: DATOS</div>
            ¿Tiene motor?
          </div>
          {/* Línea conectora vertical */}
          <div className="h-8 w-0.5 bg-slate-300 mx-auto"></div>
        </div>

        {/* Línea horizontal conectora de ramas */}
        <div className="col-span-4 h-0.5 bg-slate-300 relative top-[-1px] w-1/2 mx-auto mb-4"></div>

        {/* Nivel 2: Ramas */}
        <div className="col-span-2 justify-self-center relative">
            {/* Conector vertical pequeño arriba */}
           <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-slate-300"></div>
           <div className="bg-white border-2 border-amber-200 px-4 py-2 rounded-lg shadow-sm mb-4">
             <span className="text-amber-600 font-bold text-xs block">NO</span>
             ¿Tiene pedales?
           </div>
           
           {/* Sub-rama izquierda */}
           <div className="grid grid-cols-2 gap-2">
              <div className="text-center">
                 <div className="h-4 w-0.5 bg-slate-300 mx-auto"></div>
                 <div className="bg-slate-100 p-2 rounded text-xs">Bicicleta</div>
              </div>
              <div className="text-center">
                 <div className="h-4 w-0.5 bg-slate-300 mx-auto"></div>
                 <div className="bg-slate-100 p-2 rounded text-xs">Patineta</div>
              </div>
           </div>
        </div>

        <div className="col-span-2 justify-self-center relative">
           <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-slate-300"></div>
           <div className="bg-white border-2 border-emerald-200 px-4 py-2 rounded-lg shadow-sm mb-4">
             <span className="text-emerald-600 font-bold text-xs block">SÍ</span>
             ¿Tiene 4 ruedas?
           </div>

            {/* Sub-rama derecha */}
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center">
                 <div className="h-4 w-0.5 bg-slate-300 mx-auto"></div>
                 <div className="bg-slate-100 p-2 rounded text-xs">Moto</div>
              </div>
              <div className="text-center">
                 <div className="h-4 w-0.5 bg-slate-300 mx-auto"></div>
                 <div className="bg-emerald-100 border border-emerald-200 p-2 rounded text-xs font-bold text-emerald-800">Coche</div>
              </div>
           </div>
        </div>

      </div>
      <div className="mt-8 text-center text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
        <span className="font-bold">Lógica Simbólica:</span> El conocimiento se codifica explícitamente en reglas (IF-THEN).
      </div>
    </div>
  );
};

// 3. Transición a ML - Dinámico
const MLTransitionDiagram: React.FC = () => {
  const data = [
    { year: '1980', reglas: 80, datos: 10, eficacia: 20 },
    { year: '1990', reglas: 85, datos: 30, eficacia: 35 },
    { year: '2000', reglas: 90, datos: 55, eficacia: 50 },
    { year: '2010', reglas: 60, datos: 120, eficacia: 85 },
    { year: '2020', reglas: 40, datos: 180, eficacia: 98 },
  ];

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] gap-4">
      <div className="text-xs text-slate-500 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-slate-400 rounded-sm"></div>
          <span>Enfoque Basado en Reglas (Manual)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div>
          <span>Volumen de Datos / ML</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDatos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="datos" 
              stroke="#6366f1" 
              fillOpacity={1} 
              fill="url(#colorDatos)" 
              name="Datos & Cómputo"
            />
            <Line 
              type="stepAfter" 
              dataKey="reglas" 
              stroke="#94a3b8" 
              strokeWidth={2} 
              strokeDasharray="5 5" 
              name="Reglas Manuales"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-indigo-50 p-3 rounded-md text-xs text-indigo-900 border border-indigo-100">
        <strong>Cambio de Paradigma:</strong> A medida que aumenta el volumen de datos y la capacidad de cómputo (2000-2020), los sistemas manuales pierden relevancia frente a los modelos que aprenden patrones automáticamente.
      </div>
    </div>
  );
};

// --- Componente Principal de Layout (LessonLayout) ---

const LessonLayout: React.FC<{
  activeTab: string;
  tabs: TabData[];
  onTabChange: (id: string) => void;
}> = ({ activeTab, tabs, onTabChange }) => {
  const currentData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8 grid grid-rows-[auto_auto_1fr] gap-6 max-w-7xl mx-auto">
      
      {/* 1. Header Global */}
      <header className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-slate-200 pb-6">
        <div className="bg-blue-600 p-3 rounded-lg text-white">
          <BrainCircuit size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Desarrollo Histórico de la Inteligencia Artificial</h1>
          
        </div>
      </header>

      {/* 2. Navegación (Tabs) */}
      <nav className="grid grid-cols-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all
              ${activeTab === tab.id 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
            `}
          >
            {tab.icon}
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* 3. Panel de Contenido Principal (Grid System) */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Columna Izquierda: Teoría y Contexto */}
        <section className="lg:col-span-5 h-full">
            <Card title="" className="h-full border-t-4 border-t-blue-500">
                <div className="grid gap-4">
                    <header>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentData.title}</h2>
                        <div className="h-1 w-20 bg-blue-500 rounded"></div>
                    </header>
                    
                    <div className="prose prose-slate text-sm leading-relaxed text-slate-600">
                        {currentData.description}
                    </div>

                 
                </div>
            </Card>
        </section>

        {/* Columna Derecha: Visualización (Diagram Render) */}
        <section className="lg:col-span-7 h-full min-h-[400px]">
            <Card title="" className="h-full bg-slate-50/50">
                <div className="h-full flex flex-col">
                   <div className="flex-1 rounded-lg bg-white border border-slate-200 p-6 shadow-inner flex items-center justify-center">
                        {currentData.content}
                   </div>
                 
                </div>
            </Card>
        </section>

      </main>

    </div>
  );
};

// --- App Principal ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('timeline');

  const tabsData: TabData[] = [
    {
      id: 'timeline',
      label: '1956: El Origen',
      icon: <History size={18} />,
      title: 'El Nacimiento Formal',
      description: (
      <DivCarousel>
        <div>
          <p>
            En 1956, durante la Conferencia de Dartmouth, se estableció oficialmente el campo de la Inteligencia Artificial. Investigadores como John McCarthy propusieron que las máquinas podrían simular aspectos de la inteligencia humana.
          </p>

          <p><strong>Características del periodo inicial:</strong></p>

          <ul>
            <li>Enfoque optimista sobre el progreso tecnológico.</li>
            <li>Desarrollo de programas capaces de resolver problemas matemáticos.</li>
            <li>Creación del término “Inteligencia Artificial”.</li>
            <li>Investigación en razonamiento simbólico.</li>
          </ul>

          <p>
            Este evento marcó el inicio formal de la IA como disciplina científica.
          </p>
        </div>
      </DivCarousel>
    ),
      content: <TimelineDiagram />
    },
    {
      id: 'symbolic',
      label: 'Sistemas Simbólicos',
      icon: <GitBranch size={18} />,
      title: 'La Era Simbólica (GOFAI)',
      description: (
      <DivCarousel>
        <div>
          <p>
            Durante las décadas posteriores, la IA se desarrolló principalmente bajo el paradigma simbólico. Los sistemas se basaban en reglas lógicas explícitas.
          </p>

          <p><strong>Características principales:</strong></p>

          <ul>
            <li>Representación del conocimiento mediante símbolos.</li>
            <li>Sistemas expertos en medicina, ingeniería y finanzas.</li>
            <li>Dependencia de reglas programadas manualmente.</li>
            <li>Limitada capacidad de adaptación.</li>
          </ul>

          <p>
            Aunque estos sistemas lograron avances importantes, su rigidez dificultó su escalabilidad.
          </p>

        </div>
      </DivCarousel>
    ),
      content: <DecisionTreeDiagram />
    },
    {
      id: 'ml',
      label: 'Transición a ML',
      icon: <Database size={18} />,
      title: 'Aprendizaje Automático',
      description: (
      <DivCarousel>
        <div>
          <p>
            El incremento de la potencia computacional y la disponibilidad de grandes volúmenes de datos impulsaron un cambio de paradigma hacia el aprendizaje automático.
          </p>

          <p><strong>Factores determinantes:</strong></p>

          <ul>
            <li>Big Data.</li>
            <li>Mayor capacidad de procesamiento.</li>
            <li>Nuevos algoritmos estadísticos.</li>
            <li>Redes neuronales profundas.</li>
          </ul>

          <p>
            Este enfoque permitió que los sistemas aprendieran patrones directamente a partir de datos, reduciendo la dependencia de reglas explícitas.
          </p>
        </div>
      </DivCarousel>
    ),
      content: <MLTransitionDiagram />
    }
  ];

  return (
    <LessonLayout 
      activeTab={activeTab} 
      tabs={tabsData} 
      onTabChange={setActiveTab} 
    />
  );
};

export default App;