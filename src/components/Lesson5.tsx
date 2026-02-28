import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Cpu, 
  Lightbulb, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Pause,
  Binary,
  BookOpen,
  Activity
} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// ----------------------------------------------------------------------
// TYPES & INTERFACES
// ----------------------------------------------------------------------

type TabId = 'evolution' | 'turing' | 'comparison';

interface TabData {
  id: TabId;
  label: string;
  icon: React.ElementType;
  diagramTitle: string;
  diagramDescription: React.ReactNode;
  component: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// ----------------------------------------------------------------------
// UI COMPONENTS
// ----------------------------------------------------------------------

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// ----------------------------------------------------------------------
// DIAGRAM 1: EVOLUCIÓN (ESTÁTICO)
// ----------------------------------------------------------------------

const EvolutionDiagram: React.FC = () => {
  const steps = [
    {
      title: "Filosofía",
      subtitle: "El ¿Por qué?",
      icon: Lightbulb,
      desc: "Aristóteles, Leibniz. La búsqueda de la verdad a través de la razón pura y el silogismo.",
      color: "bg-amber-100 text-amber-700 border-amber-200"
    },
    {
      title: "Lógica Formal",
      subtitle: "El ¿Cómo?",
      icon: BookOpen,
      desc: "Boole, Frege, Russell. Formalización del pensamiento en símbolos y reglas matemáticas.",
      color: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      title: "Computación",
      subtitle: "La Ejecución",
      icon: Binary,
      desc: "Turing, Von Neumann. Mecanización de la lógica para el procesamiento automático.",
      color: "bg-indigo-100 text-indigo-700 border-indigo-200"
    }
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center justify-center p-6">
      {steps.map((step, index) => (
        <React.Fragment key={step.title}>
          {/* Node */}
          <div className={`flex flex-col h-full p-6 rounded-lg border-2 ${step.color} transition-all hover:scale-105 duration-300`}>
            <div className="grid place-items-center mb-4">
              <step.icon size={40} className="opacity-80" />
            </div>
            <h3 className="text-xl font-bold text-center mb-1">{step.title}</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-center opacity-70 mb-3">{step.subtitle}</p>
            <p className="text-sm text-center leading-relaxed opacity-90">{step.desc}</p>
          </div>

          {/* Arrow (Visible on desktop only) */}
          {index < steps.length - 1 && (
            <div className="hidden md:grid place-items-center">
              <ArrowRight size={32} className="text-slate-400 animate-pulse" />
            </div>
          )}
          
          {/* Arrow (Visible on mobile only) */}
          {index < steps.length - 1 && (
            <div className="grid md:hidden place-items-center py-2">
              <ArrowRight size={24} className="text-slate-400 rotate-90" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ----------------------------------------------------------------------
// DIAGRAM 2: MÁQUINA DE TURING (DINÁMICO)
// ----------------------------------------------------------------------

const TuringDiagram: React.FC = () => {
  const INITIAL_TAPE = [0, 1, 1, 0, 1, 0, 0, 1, 1, 0];
  const [tape, setTape] = useState<number[]>(INITIAL_TAPE);
  const [headPos, setHeadPos] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [state, setInternalState] = useState<string>("LEER");

  // Simulación simple: Invertir bits y mover a la derecha
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isPlaying) {
      interval = setInterval(() => {
        setTape(prevTape => {
          const newTape = [...prevTape];
          // Regla simple: Si es 0 se vuelve 1, si es 1 se vuelve 0
          newTape[headPos] = newTape[headPos] === 0 ? 1 : 0;
          return newTape;
        });

        setInternalState("ESCRIBIR");

        setTimeout(() => {
          setHeadPos(prev => (prev + 1) % INITIAL_TAPE.length);
          setInternalState("MOVER");
        }, 500);

        setTimeout(() => {
            setInternalState("LEER");
        }, 800);

      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, headPos]);

  const reset = () => {
    setIsPlaying(false);
    setTape(INITIAL_TAPE);
    setHeadPos(2);
    setInternalState("LEER");
  };

  return (
    <div className="w-full grid gap-8 p-6">
      {/* Visualización de la Cinta */}
      <div className="relative overflow-hidden bg-slate-100 p-8 rounded-lg border border-slate-300 shadow-inner">
        
        {/* Cabezal */}
        <div 
            className="absolute top-0 w-12 h-full border-x-2 border-red-500 bg-red-500/10 transition-all duration-500 ease-in-out z-10 grid place-items-end pb-2 justify-center"
            style={{ left: `calc(${headPos * 3}rem + 2rem + ${headPos * 0.5}rem)` }} // Ajuste manual para el grid gap
        >
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-white px-1 rounded shadow-sm mb-16">Cabezal</span>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-red-500 mb-2"></div>
        </div>

        {/* Celdas de la Cinta */}
        <div className="flex gap-2 justify-start">
            {tape.map((bit, idx) => (
            <div 
                key={idx} 
                className={`w-12 h-16 grid place-items-center text-2xl font-mono font-bold rounded bg-white shadow-sm border border-slate-200 transition-colors duration-300 ${idx === headPos ? 'text-red-600 border-red-200' : 'text-slate-700'}`}
            >
                {bit}
            </div>
            ))}
        </div>
      </div>

      {/* Controles y Estado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="text-sm font-semibold text-slate-500 uppercase mb-3">Panel de Control</h4>
            <div className="flex gap-3">
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-white transition-colors ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                >
                    {isPlaying ? <><Pause size={18} /> Pausar</> : <><Play size={18} /> Ejecutar</>}
                </button>
                <button 
                    onClick={reset}
                    className="flex items-center gap-2 px-4 py-2 rounded-md font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                    <RotateCcw size={18} /> Reiniciar
                </button>
            </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg text-green-400 font-mono text-sm border border-slate-700 shadow-md">
            <h4 className="text-slate-400 uppercase text-xs mb-2">Registro del Sistema</h4>
            <div className="grid gap-1">
                <p><span className="text-slate-500">{'>'}</span> Estado Actual: <span className="text-white font-bold">{state}</span></p>
                <p><span className="text-slate-500">{'>'}</span> Posición Cabezal: {headPos}</p>
                <p><span className="text-slate-500">{'>'}</span> Valor Leído: {tape[headPos]}</p>
                <p><span className="text-slate-500">{'>'}</span> Regla: <span className="text-yellow-400">f(x) = !x, move(R)</span></p>
            </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// DIAGRAM 3: MENTE VS COMPUTADORA (COMPARATIVO)
// ----------------------------------------------------------------------

const ComparisonDiagram: React.FC = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
            
            {/* Columna Mente */}
            <div className="bg-gradient-to-br from-rose-50 to-white p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-rose-100 pb-4">
                    <div className="p-3 bg-rose-100 rounded-full text-rose-600">
                        <Brain size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Mente Humana</h3>
                </div>

                <div className="grid gap-4">
                    <div className="bg-white/60 p-4 rounded border border-rose-100">
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">Entrada</span>
                        <p className="text-slate-700 font-medium">Sentidos Biológicos</p>
                        <p className="text-sm text-slate-500">Analógico, continuo, ruidoso.</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded border border-rose-100">
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">Procesamiento</span>
                        <p className="text-slate-700 font-medium">Redes Neuronales</p>
                        <p className="text-sm text-slate-500">Paralelo, plástico, heurístico.</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded border border-rose-100">
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">Almacenamiento</span>
                        <p className="text-slate-700 font-medium">Sinapsis Distribuidas</p>
                        <p className="text-sm text-slate-500">Contenido direccionable, asociativo.</p>
                    </div>
                </div>
            </div>

            {/* Columna Computadora */}
            <div className="bg-gradient-to-br from-sky-50 to-white p-6 md:p-8">
                 <div className="flex items-center gap-3 mb-6 border-b border-sky-100 pb-4">
                    <div className="p-3 bg-sky-100 rounded-full text-sky-600">
                        <Cpu size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Sistema Computacional</h3>
                </div>

                <div className="grid gap-4">
                    <div className="bg-white/60 p-4 rounded border border-sky-100">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">Entrada</span>
                        <p className="text-slate-700 font-medium">Periféricos de I/O</p>
                        <p className="text-sm text-slate-500">Digital, discreto, preciso.</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded border border-sky-100">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">Procesamiento</span>
                        <p className="text-slate-700 font-medium">CPU / ALU</p>
                        <p className="text-sm text-slate-500">Serial (principalmente), rígido, algorítmico.</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded border border-sky-100">
                        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">Almacenamiento</span>
                        <p className="text-slate-700 font-medium">RAM / Disco (Direcciones)</p>
                        <p className="text-sm text-slate-500">Direccionable por ubicación, exacto.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

// ----------------------------------------------------------------------
// MAIN LAYOUT & APP
// ----------------------------------------------------------------------

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('evolution');

  const tabs: TabData[] = [
    {
      id: 'evolution',
      label: 'Evolución Histórica',
      icon: Activity,
      diagramTitle: 'De la Filosofía a la Computación',
      diagramDescription: (
      <DivCarousel>
        <div>
          <p>
            Antes de convertirse en una disciplina científica, la Inteligencia Artificial fue una cuestión filosófica vinculada a la naturaleza del pensamiento. 
            <br />Desde la antigüedad se imaginaron artefactos capaces de imitar al ser humano, pero fue con el desarrollo de la lógica moderna cuando surgió la posibilidad de formalizar el razonamiento.
          </p>

          <p>
            La idea central fue que el pensamiento podría expresarse mediante reglas claras y estructuradas.
          </p>

        </div>
        <div>   <p><strong>Elementos clave:</strong></p>

          <ul>
            <li>El razonamiento entendido como proceso lógico.</li>
            <li>La posibilidad de representar conocimiento con símbolos.</li>
            <li>La formalización matemática del pensamiento.</li>
            <li>La noción de que una máquina podría ejecutar reglas lógicas.</li>
          </ul>

          <p>
            Este cambio conceptual permitió pasar de la especulación filosófica a la modelación matemática del razonamiento.
          </p>
</div>
       
    
      </DivCarousel>
    ),
      component: <EvolutionDiagram />
    },
    {
      id: 'turing',
      label: 'Máquina de Turing',
      icon: Binary,
      diagramTitle: 'Modelo de Cálculo Universal',
      diagramDescription:  (
      <DivCarousel>
        <div>
          <p>
            El trabajo de Alan Turing fue determinante para la base teórica de la computación moderna. Su concepto de la Máquina de Turing demostró que cualquier proceso matemático podía representarse mediante un sistema formal de instrucciones.
          </p>

          <p><strong>Aportes fundamentales:</strong></p>

          <ul>
            <li>Formalización del concepto de algoritmo.</li>
            <li>Definición de computabilidad.</li>
            <li>Propuesta del Test de Turing como criterio conductual de inteligencia.</li>
            <li>Relación entre cálculo matemático y automatización.</li>
          </ul>

          <p>
            El Test de Turing planteó una pregunta crucial: si una máquina puede comportarse como un humano en una conversación, ¿podría considerarse inteligente?
          </p>

        </div>
      </DivCarousel>
    ),
      component: <TuringDiagram />
    },
    {
      id: 'comparison',
      label: 'Mente vs. Máquina',
      icon: Brain,
      diagramTitle: 'Paralelismo Estructural',
      diagramDescription: (
      <DivCarousel>
        <div>
          <p>
            El surgimiento de la IA estuvo profundamente influido por el debate filosófico sobre si la mente humana funciona como un sistema computacional.
          </p>

          <p>Esta perspectiva sostiene que:</p>

          <ul>
            <li>Los procesos mentales pueden describirse como procesamiento de información.</li>
            <li>El conocimiento puede representarse simbólicamente.</li>
            <li>El razonamiento puede modelarse mediante algoritmos.</li>
            <li>La cognición puede simularse en sistemas artificiales.</li>
          </ul>

          <p>
            La analogía mente–computadora permitió consolidar la idea de que la inteligencia no depende necesariamente de un soporte biológico.
          </p>
        </div>
      </DivCarousel>
    ),
      component: <ComparisonDiagram />
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    // GRID LAYOUT MAIN CONTAINER (No Flexbox here)
    <div className="min-h-screen bg-slate-50 text-slate-800 grid grid-rows-[auto_1fr] font-sans">
      
      {/* HEADER AREA */}
      <header className="bg-white border-b border-slate-200 shadow-sm  top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg grid place-items-center text-white">
                  <Binary size={24} />
                </div>
                Fundamentos de Computación
              </h1>
          
            </div>
          </div>

          {/* TAB NAVIGATION */}
          <nav className="flex gap-1 overflow-x-auto pb-0 hide-scrollbar" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-medium transition-all duration-200 whitespace-nowrap
                    ${isActive 
                      ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 rounded-t-md' 
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-t-md'
                    }
                  `}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA (Grid) */}
      <main className="grid place-items-start justify-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl grid gap-6 animate-fadeIn">
          
          {/* CONTENT CARD */}
          <Card className="grid grid-cols-1 p-1">
             <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            {currentTab.diagramTitle}
                        </h2>
                        <p className="text-slate-600 leading-relaxed max-w-3xl">
                            {currentTab.diagramDescription}
                        </p>
                    </div>
                </div>
             </div>

             {/* DIAGRAM RENDER AREA */}
             <div className="p-6 md:p-8 bg-white min-h-[400px] grid place-items-center">
                {currentTab.component}
             </div>
          </Card>

          {/* FOOTER NOTE */}
          <div className="text-center py-4 text-slate-400 text-sm">
            DiagramtoReact Engine v1.0 • TypeScript • Tailwind CSS
          </div>

        </div>
      </main>

    </div>
  );
};

export default App;