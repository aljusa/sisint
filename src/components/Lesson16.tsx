import React, { useState } from 'react';
import { Network, ArrowRight, Lock, Unlock, RefreshCw, BookOpen, Activity, AlertCircle } from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- DEFINICIÓN DE TIPOS ---
interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  renderComponent: React.FC;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  children: React.ReactNode;
  tabs: TabConfig[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, children, tabs, activeTabId, onTabChange }) => {
  return (
    // Layout principal usando Grid
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Header: Title & Nav */}
      <header className="grid grid-cols-[auto_1fr] items-center gap-3 p-4 bg-white shadow-sm z-10 border-b border-slate-200">
        <div className="grid p-2 bg-blue-100 text-blue-700 rounded-lg">
          <BookOpen size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
      </header>

      {/* Contenedor Principal */}
      <main className="grid grid-rows-[auto_1fr] gap-6 p-6 max-w-6xl mx-auto w-full">
        
        {/* Sistema de Pestañas (Navegación Exclusiva) usando Grid */}
        <nav className="grid grid-flow-col auto-cols-fr gap-2 bg-slate-200/50 p-1.5 rounded-xl border border-slate-200">
          {tabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`grid grid-flow-col items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Panel de Contenido */}
        <div className="grid grid-cols-1 gap-6 items-start content-start">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- COMPONENTES DE DIAGRAMA ---

const TimelineRender: React.FC = () => {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center p-8 bg-slate-50/50 rounded-b-xl">
      
      {/* 1943 */}
      <Card className="grid grid-rows-[auto_1fr] gap-2 p-5 text-center border-l-4 border-l-slate-400">
        <div className="grid justify-items-center gap-2">
          <span className="grid place-content-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 font-bold text-lg border-2 border-slate-300">
            '43
          </span>
          <h3 className="font-bold text-slate-800">McCulloch-Pitts</h3>
        </div>
        <p className="text-sm text-slate-600">Neurona binaria. Umbrales lógicos fijos (AND, OR, NOT). Sin capacidad de aprendizaje.</p>
      </Card>

      <div className="grid place-content-center text-slate-300">
        <ArrowRight size={32} />
      </div>

      {/* 1957 */}
      <Card className="grid grid-rows-[auto_1fr] gap-2 p-5 text-center border-l-4 border-l-blue-500 shadow-md transform transition-transform hover:-translate-y-1">
        <div className="grid justify-items-center gap-2">
          <span className="grid place-content-center w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-lg border-2 border-blue-300">
            '57
          </span>
          <h3 className="font-bold text-slate-800">Perceptrón de Rosenblatt</h3>
        </div>
        <p className="text-sm text-slate-600">Pesos continuos. Regla de aprendizaje simple. Solo resuelve problemas linealmente separables.</p>
      </Card>

      <div className="grid place-content-center text-slate-300">
        <ArrowRight size={32} />
      </div>

      {/* Multilayer */}
      <Card className="grid grid-rows-[auto_1fr] gap-2 p-5 text-center border-l-4 border-l-emerald-500 shadow-md transform transition-transform hover:-translate-y-1">
        <div className="grid justify-items-center gap-2">
          <span className="grid place-content-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold text-lg border-2 border-emerald-300">
            '80+
          </span>
          <h3 className="font-bold text-slate-800">Redes Multicapa</h3>
        </div>
        <p className="text-sm text-slate-600">Capas ocultas. Algoritmo de Retropropagación (Backpropagation). Resuelve problemas complejos y no lineales.</p>
      </Card>

    </div>
  );
};

const ComparisonRender: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-8 p-8 bg-slate-50/50 rounded-b-xl">
      
      {/* Modelo de Pesos Fijos */}
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2 pb-2 border-b border-slate-200 text-slate-700 font-semibold">
          <Lock size={18} className="text-slate-500" />
          Modelo Clásico (Pesos Fijos)
        </div>
        
        <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-3 bg-white p-6 rounded-lg border border-slate-200 relative">
          {/* Inputs */}
          <div className="grid gap-2">
            <span className="grid place-content-center w-8 h-8 rounded-full bg-slate-100 text-xs font-bold border border-slate-300">x₁</span>
            <span className="grid place-content-center w-8 h-8 rounded-full bg-slate-100 text-xs font-bold border border-slate-300">x₂</span>
          </div>
          
          <ArrowRight size={20} className="text-slate-300" />
          
          {/* Weights */}
          <div className="grid gap-2 text-center text-xs text-slate-500 font-mono">
            <div className="grid grid-flow-col gap-1 items-center bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <Lock size={10} /> w₁ (fijo)
            </div>
            <div className="grid grid-flow-col gap-1 items-center bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <Lock size={10} /> w₂ (fijo)
            </div>
          </div>

          <ArrowRight size={20} className="text-slate-300" />

          {/* Sum & Activation */}
          <div className="grid place-content-center w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-200 text-indigo-700 font-bold">
            Σ / f(x)
          </div>

          {/* Output Arrow (Absolute for precise layout in this segment) */}
          <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 text-slate-800 text-xs font-bold grid grid-cols-[auto_auto] items-center gap-1">
             <ArrowRight size={20} className="text-slate-400" /> y
          </div>
        </div>
      </div>

      {/* Modelo de Pesos Ajustables */}
      <div className="grid grid-rows-[auto_1fr] gap-4">
        <div className="grid grid-cols-[auto_1fr] items-center gap-2 pb-2 border-b border-blue-200 text-blue-700 font-semibold">
          <Activity size={18} />
          Modelo de Aprendizaje (Pesos Ajustables)
        </div>
        
        <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-3 bg-white p-6 rounded-lg border border-blue-200 relative shadow-sm">
          {/* Inputs */}
          <div className="grid gap-2">
            <span className="grid place-content-center w-8 h-8 rounded-full bg-slate-100 text-xs font-bold border border-slate-300">x₁</span>
            <span className="grid place-content-center w-8 h-8 rounded-full bg-slate-100 text-xs font-bold border border-slate-300">x₂</span>
          </div>
          
          <ArrowRight size={20} className="text-slate-300" />
          
          {/* Weights */}
          <div className="grid gap-2 text-center text-xs text-blue-600 font-mono">
            <div className="grid grid-flow-col gap-1 items-center bg-blue-50 px-2 py-1 rounded border border-blue-200">
              <Unlock size={10} /> w₁ (var)
            </div>
            <div className="grid grid-flow-col gap-1 items-center bg-blue-50 px-2 py-1 rounded border border-blue-200">
              <Unlock size={10} /> w₂ (var)
            </div>
          </div>

          <ArrowRight size={20} className="text-slate-300" />

          {/* Sum & Activation */}
          <div className="grid place-content-center w-16 h-16 rounded-full bg-blue-100 border-2 border-blue-400 text-blue-800 font-bold z-10">
            Σ / f(x)
          </div>

          {/* Output Arrow */}
          <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 text-slate-800 text-xs font-bold grid grid-cols-[auto_auto] items-center gap-1">
             <ArrowRight size={20} className="text-blue-500" /> ŷ
          </div>

          {/* Feedback Loop (SVG Overlay) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Camino de retroalimentación desde la salida hacia los pesos */}
            <path 
              d="M 280, 85 L 280, 110 L 115, 110 L 115, 85" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />
            <polygon points="115,80 110,88 120,88" fill="#ef4444" />
          </svg>
          
          {/* Etiqueta de Error */}
          <div className="absolute bottom-1 right-1/4 text-[10px] text-red-500 font-bold grid grid-flow-col items-center gap-1 bg-white px-1 rounded">
            <RefreshCw size={10} />
            Ajuste por Error (Retropropagación)
          </div>
        </div>
      </div>

    </div>
  );
};

// --- DATA CONFIGURATION ---

const tabsConfig: TabConfig[] = [
  {
    id: 'timeline',
    label: 'Evolución Histórica',
    icon: <Network size={18} />,
    title: 'Línea del tiempo evolutiva (1943 → 1957 → Redes multicapa)',
    description: (
      <DivCarousel>
        <div>
          <p>
            El Perceptrón fue propuesto en 1957 por Frank Rosenblatt como un modelo inspirado en el funcionamiento del cerebro humano. Su objetivo era diseñar un sistema capaz de aprender a clasificar patrones a partir de ejemplos, introduciendo por primera vez un mecanismo formal de aprendizaje en una neurona artificial.
          </p>

          <p>
            A diferencia de modelos previos, el perceptrón:
          </p>

          <ul>
            <li>Ajusta sus pesos automáticamente.</li>
            <li>Aprende a partir de datos etiquetados.</li>
            <li>Mejora su desempeño mediante iteraciones.</li>
            <li>Funciona como clasificador supervisado.</li>
          </ul>

          <p>
            Este avance marcó el inicio práctico del aprendizaje automático.
          </p>
        </div>
      </DivCarousel>
    ),
    renderComponent: TimelineRender,
  },
  {
    id: 'comparison',
    label: 'Comparativa Estructural',
    icon: <AlertCircle size={18} />,
    title: 'Diagrama comparativo de neuronas ',
    description: (
      <DivCarousel>
        <div>
          <p>
            El perceptrón puede entenderse como una evolución directa del modelo binario anterior.
          </p>

          <p>
            La diferencia fundamental es la incorporación de un algoritmo de aprendizaje.
          </p>
        </div>
      </DivCarousel>
    ),
    renderComponent: ComparisonRender,
  }
];

// --- COMPONENTE PRINCIPAL (ENTRY POINT) ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(tabsConfig[0].id);

  const currentTabData = tabsConfig.find(t => t.id === activeTab) || tabsConfig[0];
  const DiagramRender = currentTabData.renderComponent;

  return (
    <LessonLayout
      title="Fundamentos de Arquitectura Neuronal"
      tabs={tabsConfig}
      activeTabId={activeTab}
      onTabChange={setActiveTab}
    >
      <Card>
        {/* Diagram Title & Description (Sección Encabezado del Panel) */}
        <div className="grid gap-3 p-6 border-b border-slate-100 bg-white rounded-t-xl">
          <h2 className="text-2xl font-bold text-slate-800">
            {currentTabData.title}
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-4xl">
            {currentTabData.description}
          </p>
        </div>

        {/* Diagram Render */}
        <DiagramRender />
      </Card>
    </LessonLayout>
  );
}