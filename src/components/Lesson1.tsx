import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Brain, 
  Cpu, 
  Database, 
  RefreshCw, 
  Zap, 
  Lightbulb, 
  Activity,
  CheckCircle2,
  
} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- TIPOS Y INTERFACES ---

type TabId = 'linear' | 'comparison' | 'circular';

interface TabConfig {
  id: TabId;
  label: string;
  title: string;
  description: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

interface StepConfig {
  id: number;
  label: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  borderColor: string;
  strokeColor: string;
  positionClass: string;
}

// --- COMPONENTES DE UI GENÉRICOS ---

const Card: React.FC<CardProps> = ({ children, className = "", title }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- COMPONENTES DE DIAGRAMAS ESPECÍFICOS ---

/**
 * DIAGRAMA 1: Flujo Lineal (Datos -> Algoritmo -> Resultado)
 * Categoría: Estático
 * Uso de Grid para alinear los pasos horizontalmente.
 */
const LinearFlowDiagram: React.FC = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center justify-items-center py-10">
      {/* Paso 1: Datos */}
      <div className="grid gap-2 justify-items-center text-center group">
        <div className="w-24 h-24 bg-blue-50 rounded-full grid place-items-center border-2 border-blue-200 group-hover:border-blue-500 transition-colors">
          <Database className="w-10 h-10 text-blue-600" />
        </div>
        <span className="font-bold text-slate-700">Datos (Input)</span>
        <p className="text-xs text-slate-500 max-w-[120px]">Imágenes, texto o números sin procesar.</p>
      </div>

      {/* Flecha 1 */}
      <ArrowRight className="w-8 h-8 text-slate-300 hidden md:block" />
      
      {/* Paso 2: Algoritmo */}
      <div className="grid gap-2 justify-items-center text-center group">
        <div className="w-24 h-24 bg-purple-50 rounded-full grid place-items-center border-2 border-purple-200 group-hover:border-purple-500 transition-colors">
          <Cpu className="w-10 h-10 text-purple-600" />
        </div>
        <span className="font-bold text-slate-700">Algoritmo</span>
        <p className="text-xs text-slate-500 max-w-[120px]">Reglas matemáticas o redes neuronales.</p>
      </div>

      {/* Flecha 2 */}
      <ArrowRight className="w-8 h-8 text-slate-300 hidden md:block" />

      {/* Paso 3: Resultado */}
      <div className="grid gap-2 justify-items-center text-center group">
        <div className="w-24 h-24 bg-green-50 rounded-full grid place-items-center border-2 border-green-200 group-hover:border-green-500 transition-colors">
          <Lightbulb className="w-10 h-10 text-green-600" />
        </div>
        <span className="font-bold text-slate-700">Resultado (Output)</span>
        <p className="text-xs text-slate-500 max-w-[120px]">Predicción, clasificación o decisión.</p>
      </div>
    </div>
  );
};

/**
 * DIAGRAMA 2: Comparativa (Humana vs Artificial)
 * Categoría: Estático
 * Grid de 2 columnas para contraste directo.
 */
const ComparisonDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      {/* Columna Humana */}
      <div className="bg-orange-50/50 border border-orange-100 rounded-lg p-6 grid gap-6 content-start">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center pb-4 border-b border-orange-200">
          <div className="bg-orange-100 p-3 rounded-full">
            <Brain className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-orange-900 text-lg">Inteligencia Humana</h3>
            <p className="text-orange-700 text-sm">Biológica & Evolutiva</p>
          </div>
        </div>
        
        <ul className="grid gap-4">
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Origen</span>
              <span className="text-sm text-slate-600">Biológico, resultado de millones de años de evolución.</span>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Aprendizaje</span>
              <span className="text-sm text-slate-600">Basado en experiencia sensorial, contexto y abstracción.</span>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Alcance</span>
              <span className="text-sm text-slate-600">Generalista, creativa y adaptable a situaciones nuevas.</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Columna Artificial */}
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-6 grid gap-6 content-start">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center pb-4 border-b border-indigo-200">
          <div className="bg-indigo-100 p-3 rounded-full">
            <Cpu className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-lg">Inteligencia Artificial</h3>
            <p className="text-indigo-700 text-sm">Sintética & Programada</p>
          </div>
        </div>

        <ul className="grid gap-4">
           <li className="grid grid-cols-[auto_1fr] gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Origen</span>
              <span className="text-sm text-slate-600">Matemático y computacional, creada por humanos.</span>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Aprendizaje</span>
              <span className="text-sm text-slate-600">Entrenamiento iterativo con grandes volúmenes de datos.</span>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Alcance</span>
              <span className="text-sm text-slate-600">Especializada (Narrow AI), extremadamente eficiente en tareas concretas.</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

/**
 * DIAGRAMA 3: Flujo Circular con Retroalimentación
 * Categoría: Dinámico
 * Uso de Grid y posicionamiento relativo para crear el ciclo.
 * Incluye un estado simple para simular la "actividad" del ciclo.
 */
const CircularFeedbackDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Simulación del ciclo continuo
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const steps: StepConfig[] = [
    { 
      id: 0, 
      label: "Entrada (Input)", 
      icon: <Database/>, 
      color: "text-blue-600", 
      bg: "bg-blue-100", 
      borderColor: "border-blue-500",
      strokeColor: "stroke-blue-400",
      positionClass: "top-0 left-1/2 -translate-x-1/2 -translate-y-4"
    },
    { 
      id: 1, 
      label: "Procesamiento", 
      icon: <Cpu/>, 
      color: "text-purple-600", 
      bg: "bg-purple-100", 
      borderColor: "border-purple-500",
      strokeColor: "stroke-purple-400",
      positionClass: "top-1/2 right-0 translate-x-4 -translate-y-1/2"
    },
    { 
      id: 2, 
      label: "Salida (Output)", 
      icon: <Zap/>, 
      color: "text-yellow-600", 
      bg: "bg-yellow-100", 
      borderColor: "border-yellow-500",
      strokeColor: "stroke-yellow-400",
      positionClass: "bottom-0 left-1/2 -translate-x-1/2 translate-y-4"
    },
    { 
      id: 3, 
      label: "Retroalimentación", 
      icon: <RefreshCw/>, 
      color: "text-green-600", 
      bg: "bg-green-100", 
      borderColor: "border-green-500",
      strokeColor: "stroke-green-400",
      positionClass: "top-1/2 left-0 -translate-x-4 -translate-y-1/2"
    },
  ];

  return (
    <div className="h-full grid place-items-center p-4">
      <div className="relative w-full max-w-md aspect-square">
        {/* Líneas de conexión (SVG absolute background) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="140" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="10 10" />
          {/* Indicador de progreso animado */}
          <circle 
            cx="200" 
            cy="200" 
            r="140" 
            fill="none" 
            stroke={steps[activeStep].strokeColor.replace('stroke-', '#').replace('-400', '')} // Fallback safe logic handled in class below, here just ensuring valid prop
            className={`transition-all duration-700 ease-in-out ${steps[activeStep].strokeColor}`}
            strokeWidth="4" 
            strokeDasharray="220 1000"
            strokeLinecap="round"
            style={{ transform: `rotate(${(activeStep * 90) - 45}deg)`, transformOrigin: 'center' }}
          />
        </svg>

        {/* Iteración de Pasos usando map para evitar errores de sintaxis JSX */}
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          
          return (
            <div 
              key={step.id} 
              className={`absolute ${step.positionClass} w-32 flex flex-col items-center transition-all duration-500 ${isActive ? 'scale-110 opacity-100' : 'opacity-70'}`}
            >
              <span className="mt-2 text-sm font-bold bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                {step.label}
              </span>
            </div>
          );
        })}

        {/* Center: Model/System */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 bg-slate-800 rounded-full flex flex-col items-center justify-center text-white shadow-xl z-0">
            <Activity className="w-8 h-8 mb-1" />
            <span className="text-xs font-semibold">MODELO</span>
          </div>
        </div>

      </div>
      <p className="mt-8 text-slate-400 text-sm italic">
        * Animación activa simulando el flujo de mejora continua
      </p>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL DE LAYOUT Y APP ---

const LessonLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('linear');

  const tabs: TabConfig[] = [
    {
      id: 'linear',
      label: 'Flujo Básico',
      title: 'Definición de Inteligencia Artificial',
      description: (
      <DivCarousel>
        
          <p>
            La Inteligencia Artificial (IA) es una rama de la informática que desarrolla sistemas capaces de ejecutar tareas que tradicionalmente requieren inteligencia humana.
            <br /> Estas tareas incluyen reconocer patrones, tomar decisiones, resolver problemas y comprender lenguaje natural. 
            <br />Desde el punto de vista técnico, la IA se construye mediante algoritmos y modelos matemáticos que procesan datos para generar resultados.
          </p>
<div>
          <p>Un sistema de IA no “piensa” como una persona, sino que:</p>

          <ul>
            <li>Analiza grandes volúmenes de datos.</li>
            <li>Identifica patrones estadísticos.</li>
            <li>Genera predicciones o decisiones basadas en cálculos.</li>
            <li>Mejora su desempeño con experiencia (en algunos enfoques).</li>
          </ul>

          <p>
            La IA se puede entender como la combinación estructurada de datos + algoritmos + capacidad de procesamiento.
          </p>

        </div>
      </DivCarousel>
    ),
    },
    {
      id: 'comparison',
      label: 'Humana vs. IA',
      title: 'Comparativa: Inteligencia Biológica vs. Artificial',
      description:  (
      <DivCarousel>
       
          <p>
            La inteligencia humana es biológica, basada en procesos neuronales complejos, emociones, conciencia y experiencias multisensoriales. 
            <br />La IA, en cambio, es un sistema computacional diseñado para tareas específicas.
          </p>

<div>  <p><strong>Inteligencia Humana</strong></p>
          <ul>
            <li>Posee conciencia.</li>
            <li>Aprende mediante experiencias sensoriales y emocionales.</li>
            <li>Tiene capacidad de generalización amplia.</li>
            <li>Es adaptable a contextos imprevistos.</li>
          </ul></div>
        
 <div>
          <p><strong>Inteligencia Artificial</strong></p>
          <ul>
            <li>No tiene conciencia.</li>
            <li>Aprende a partir de datos.</li>
            <li>Está optimizada para tareas específicas.</li>
            <li>Funciona mediante modelos matemáticos.</li>
          </ul>

          <p>
            La diferencia fundamental es que la IA simula ciertos comportamientos inteligentes, pero no posee comprensión subjetiva.
          </p>

        </div>
      </DivCarousel>
    )
    },
    {
      id: 'circular',
      label: 'Ciclo Dinámico',
      title: 'Características de un Sistema Inteligente',
      description:(
      <DivCarousel>
       <div>   <p>
            Un sistema de IA generalmente integra cuatro componentes esenciales:
          </p>

          <ul>
            <li><strong>Datos:</strong> Información de entrada (texto, imágenes, números).</li>
            <li><strong>Algoritmos:</strong> Reglas matemáticas que procesan datos.</li>
            <li><strong>Modelo:</strong> Representación matemática entrenada.</li>
            <li><strong>Aprendizaje:</strong> Ajuste del modelo según experiencia.</li>
          </ul></div>
       

       <div>    <p>
            Estos componentes interactúan de forma estructurada.
            <br /> El sistema recibe datos, aplica algoritmos, genera un modelo y mejora progresivamente si cuenta con retroalimentación.
          </p>

          <p><strong>Estructura simplificada del sistema:</strong></p>
          <p>
            Entrada → Procesamiento → Modelo → Salida → Retroalimentación
          </p>

        </div>
      </DivCarousel>
    )
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    // ESTRUCTURA GRID PRINCIPAL (No Flexbox)
    // Definición: 3 filas (Header, Nav, Content)
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 grid grid-rows-[auto_auto_1fr] gap-0">
      
      {/* 1. Header Area */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 grid grid-cols-[auto_1fr] items-center gap-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg grid place-items-center text-white shadow-md">
          <Brain size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Conceptos Fundamentales de IA</h1>
         
        </div>
      </header>

      {/* 2. Navigation Area (Tabs) */}
      <nav className="bg-white border-b border-slate-200 px-6 pt-2">
        <div className="grid grid-flow-col justify-start gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                pb-3 text-sm font-medium border-b-2 transition-colors duration-200 ease-in-out px-1
                ${activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. Main Content Area */}
      {/* Grid interno para el contenido: Título/Desc arriba, Diagrama abajo */}
      <main className="p-6 max-w-6xl mx-auto w-full grid grid-rows-[auto_auto_1fr] gap-6">
        
        {/* Section Header */}
        <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-slate-800">{currentTab.title}</h2>
          <p className="text-slate-600 max-w-3xl leading-relaxed">
            {currentTab.description}
          </p>
        </div>

        {/* Diagram Render Wrapper */}
        <Card className="min-h-[400px] h-full bg-white shadow-sm ring-1 ring-slate-900/5">
          {activeTab === 'linear' && <LinearFlowDiagram />}
          {activeTab === 'comparison' && <ComparisonDiagram />}
          {activeTab === 'circular' && <CircularFeedbackDiagram />}
        </Card>

      </main>

    </div>
  );
};

export default LessonLayout;