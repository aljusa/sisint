import React, { useState } from 'react';
import { Brain, Cpu, Sigma, Network, GitCommit, ArrowDown } from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- Tipos e Interfaces ---

type TabId = 'triangle' | 'timeline';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface LessonData {
  title: string;
  description: React.ReactNode;
  render: React.ReactNode;
}

// --- Componentes de UI Base (Layout & Cards) ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <header className="grid gap-2 border-b border-slate-200 pb-6 mb-6">
    <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
    {subtitle && <p className="text-slate-500">{subtitle}</p>}
  </header>
);

// --- Componentes de Visualización (Diagram Renderers) ---

const ConceptTriangle: React.FC = () => {
  return (
    <div className="w-full h-96 relative bg-slate-50 rounded-lg border border-slate-100 p-8 grid place-items-center">
      {/* SVG Container para líneas de conexión */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {/* Líneas conectando al centro */}
        <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="25%" y1="80%" x2="45%" y2="55%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="75%" y1="80%" x2="55%" y2="55%" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
      </svg>

      {/* Grid Layout para posicionamiento absoluto simulado con Grid Areas o porcentajes */}
      <div className="w-full h-full relative grid grid-cols-2 grid-rows-3">
        
        {/* Top: Biología */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0 text-center grid place-items-center gap-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full grid place-items-center shadow-sm border-2 border-emerald-200">
            <Brain size={32} />
          </div>
          <span className="font-semibold text-emerald-800 bg-white px-2 py-1 rounded shadow-sm text-sm">Biología</span>
        </div>

        {/* Bottom Left: Lógica */}
        <div className="absolute bottom-4 left-[10%] lg:left-[20%] text-center grid place-items-center gap-2">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full grid place-items-center shadow-sm border-2 border-blue-200">
            <Sigma size={32} />
          </div>
          <span className="font-semibold text-blue-800 bg-white px-2 py-1 rounded shadow-sm text-sm">Lógica Matemática</span>
        </div>

        {/* Bottom Right: Computación */}
        <div className="absolute bottom-4 right-[10%] lg:right-[20%] text-center grid place-items-center gap-2">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full grid place-items-center shadow-sm border-2 border-indigo-200">
            <Cpu size={32} />
          </div>
          <span className="font-semibold text-indigo-800 bg-white px-2 py-1 rounded shadow-sm text-sm">Computación</span>
        </div>

        {/* Center: Modelo Neuronal */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center grid place-items-center gap-2 z-10">
          <div className="w-24 h-24 bg-slate-800 text-white rounded-full grid place-items-center shadow-xl ring-4 ring-slate-100">
            <Network size={40} />
          </div>
          <div className="bg-slate-800 text-white px-3 py-1 rounded text-sm font-bold mt-2">
            Modelo Neuronal (1943)
          </div>
        </div>

      </div>
    </div>
  );
};

const HistoricalTimeline: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 rounded-lg border border-slate-100 p-8">
      <div className="grid gap-0 relative">
        {/* Línea vertical conectora */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-300"></div>

        {/* Evento 1 */}
        <div className="grid grid-cols-[auto_1fr] gap-6 items-start relative mb-8">
          <div className="w-16 h-16 bg-white border-4 border-slate-600 rounded-full grid place-items-center z-10 shadow-sm">
            <span className="font-bold text-slate-700 text-sm">1943</span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm grid gap-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <Network size={18} className="text-blue-600" />
              <span>McCulloch & Pitts</span>
            </div>
            <p className="text-sm text-slate-600">
              Se establece el primer modelo matemático de una neurona artificial. Es la génesis conceptual que une la biología con la lógica booleana.
            </p>
          </div>
        </div>

        {/* Conector Flecha */}
        <div className="grid place-items-center -ml-[calc(50%-2rem)] mb-2">
           <ArrowDown className="text-slate-400" size={20}/>
        </div>

        {/* Evento 2 */}
        <div className="grid grid-cols-[auto_1fr] gap-6 items-start relative mb-8">
          <div className="w-16 h-16 bg-white border-4 border-blue-500 rounded-full grid place-items-center z-10 shadow-sm">
            <span className="font-bold text-blue-700 text-sm">1958</span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm grid gap-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <GitCommit size={18} className="text-blue-600" />
              <span>El Perceptrón (Rosenblatt)</span>
            </div>
            <p className="text-sm text-slate-600">
              Primera implementación física y algorítmica capaz de aprender. El modelo de 1943 evoluciona de "estático" a "adaptativo" mediante pesos ajustables.
            </p>
          </div>
        </div>

         {/* Conector Flecha */}
         <div className="grid place-items-center -ml-[calc(50%-2rem)] mb-2">
           <ArrowDown className="text-slate-400" size={20}/>
        </div>

        {/* Evento 3 */}
        <div className="grid grid-cols-[auto_1fr] gap-6 items-start relative">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 border-none rounded-full grid place-items-center z-10 shadow-lg text-white">
            <span className="font-bold text-sm">Hoy</span>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100 shadow-sm grid gap-2">
            <div className="flex items-center gap-2 text-indigo-900 font-bold">
              <Brain size={18} className="text-indigo-600" />
              <span>Deep Learning</span>
            </div>
            <p className="text-sm text-indigo-800">
              Redes multicapa profundas (Hinton, LeCun). La base lógica de 1943 sigue vigente, pero ahora operando en escalas masivas y arquitecturas complejas (Transformers, CNNs).
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Componente Principal (LessonLayout) ---

const LessonLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('triangle');

  const tabs: TabConfig[] = [
    { id: 'triangle', label: 'Triángulo Conceptual', icon: <Network size={18} /> },
    { id: 'timeline', label: 'Línea del Tiempo', icon: <GitCommit size={18} /> },
  ];

  const content: Record<TabId, LessonData> = {
    triangle: {
      title: 'La Convergencia Interdisciplinaria',
      description: (
      <DivCarousel>
        <div>
          <p>
            En 1943, Warren McCulloch y Walter Pitts publicaron el artículo “A Logical Calculus of the Ideas Immanent in Nervous Activity”. En este trabajo propusieron el primer modelo matemático formal de una neurona artificial.
          </p>

          <p>
            El contexto científico de la época estaba marcado por:
          </p>

          <ul>
            <li>El auge de la lógica matemática formal.</li>
            <li>Investigaciones sobre el funcionamiento del sistema nervioso.</li>
            <li>Interés por modelar el pensamiento como proceso lógico.</li>
            <li>Desarrollo inicial de la teoría de la computación.</li>
          </ul>

          <p>
            Su propuesta estableció un puente entre biología, lógica y computación.
          </p>

       
        </div>
      </DivCarousel>
    ),
      render: <ConceptTriangle />,
    },
    timeline: {
      title: 'Del Modelo Estático al Aprendizaje Profundo',
      description: (
      <DivCarousel>
        <div>
          <p>
            La neurona de McCulloch y Pitts es considerada un punto de partida formal en la historia de las redes neuronales artificiales.
          </p>

          <p>
            Su relevancia radica en que:
          </p>

          <ul>
            <li>Es el primer modelo matemático de neurona artificial.</li>
            <li>Demuestra que redes neuronales pueden representar funciones lógicas.</li>
            <li>Influye directamente en el desarrollo del perceptrón.</li>
            <li>Sienta bases para el aprendizaje automático moderno.</li>
          </ul>

          <p>
            Este modelo permitió formalizar la idea de que una red de unidades simples podría realizar cómputos complejos.
          </p>
        </div>
      </DivCarousel>
    ),
      render: <HistoricalTimeline />,
    },
  };

  const currentContent = content[activeTab];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans p-4 md:p-8">
      {/* Main Grid Layout Container */}
      <div className="max-w-6xl mx-auto grid gap-6">
        
        {/* Header Section */}
        <Card className="p-6 border-l-4 border-indigo-600">
          <SectionHeader 
            title="Contexto Histórico y Conceptual" 
          />
        </Card>

        {/* Navigation Tabs - CSS Grid Layout */}
        <div className="grid grid-cols-2 gap-2 bg-slate-200 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                grid place-items-center gap-2 py-3 px-4 rounded-md transition-all duration-200
                ${activeTab === tab.id 
                  ? 'bg-white text-indigo-700 shadow-sm font-semibold' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-300/50'}
              `}
            >
              <div className="flex items-center gap-2">
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Content Panel - CSS Grid Layout */}
        <Card className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
                
                {/* Left Column: Text Content */}
                <div className="lg:col-span-4 grid content-start gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                           {currentContent.title}
                        </h2>
                        <div className="h-1 w-20 bg-indigo-500 rounded-full mb-4"></div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                           {currentContent.description}
                        </p>
                    </div>

                  
                </div>

                {/* Right Column: Diagram Render */}
                <div className="lg:col-span-8 bg-slate-50 rounded-xl border border-slate-200 p-1 grid place-items-center min-h-[400px]">
                    <div className="w-full h-full">
                        {currentContent.render}
                    </div>
                </div>

            </div>
        </Card>

      </div>
    </div>
  );
};

export default LessonLayout;