import React, { useState, useEffect } from 'react';
import { Layers, Activity, Network, Brain, Play, Pause, RefreshCw, Info } from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- TIPOS E INTERFACES ---

interface Tab {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
  component: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  subtitle: string;
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

// --- COMPONENTES UI BASE ---

const Card: React.FC<CardProps> = ({ children, title, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          {title}
        </h3>
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);

// --- VISUALIZACIONES (DIAGRAMAS) ---

// 1. Diagrama de Convolución (CNN)
const ConvolutionDiagram = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Grid de entrada (5x5)
  const inputGrid = [
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1]
  ];
  
  // Kernel (3x3) - Filtro de detección de bordes simple
  const kernel = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 0, 1]
  ];

  // Tamaño del input y kernel
  const inputSize = 5;
  const kernelSize = 3;
  const outputSize = inputSize - kernelSize + 1; // 3x3

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % (outputSize * outputSize));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, outputSize]);

  // Calcular posición actual del kernel (fila, columna)
  const currentRow = Math.floor(step / outputSize);
  const currentCol = step % outputSize;

  // Calcular valor de salida
  let sum = 0;
  for (let i = 0; i < kernelSize; i++) {
    for (let j = 0; j < kernelSize; j++) {
      sum += inputGrid[currentRow + i][currentCol + j] * kernel[i][j];
    }
  }

  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 h-full items-start">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-slate-600">Imagen de Entrada (Input)</h4>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button 
              onClick={() => { setStep(0); setIsPlaying(false); }}
              className="p-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        
        {/* Input Grid Visualization */}
        <div 
            className="grid gap-1 p-2 bg-slate-100 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${inputSize}, minmax(0, 1fr))` }}
        >
          {inputGrid.map((row, rIdx) => (
            row.map((val, cIdx) => {
              // Determinar si la celda está bajo el kernel
              const isActive = rIdx >= currentRow && rIdx < currentRow + kernelSize &&
                             cIdx >= currentCol && cIdx < currentCol + kernelSize;
              
              // Determinar posición relativa dentro del kernel para mostrar multiplicador
              let kernelVal = null;
              if (isActive) {
                kernelVal = kernel[rIdx - currentRow][cIdx - currentCol];
              }

              return (
                <div 
                  key={`${rIdx}-${cIdx}`}
                  className={`aspect-square flex items-center justify-center rounded transition-all duration-300 relative
                    ${isActive ? 'bg-indigo-100 border-2 border-indigo-500 scale-105 z-10' : 'bg-white border border-slate-200 text-slate-400'}
                  `}
                >
                  <span className="text-lg font-bold">{val}</span>
                  {isActive && (
                    <span className="absolute text-[10px] bottom-0 right-1 text-indigo-600 font-mono">x{kernelVal}</span>
                  )}
                </div>
              );
            })
          ))}
        </div>
        <p className="text-sm text-slate-500 mt-2 bg-yellow-50 p-2 rounded border border-yellow-100">
          <Info size={14} className="inline mr-1"/> El filtro deslizante (azul) multiplica sus valores por los píxeles de la imagen.
        </p>
      </div>

      <div className="space-y-4">
         <h4 className="font-medium text-slate-600">Mapa de Características (Output)</h4>
         {/* Output Grid Visualization */}
         <div 
            className="grid gap-1 p-2 bg-slate-100 rounded-lg"
            style={{ gridTemplateColumns: `repeat(${outputSize}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: outputSize * outputSize }).map((_, idx) => {
            const r = Math.floor(idx / outputSize);
            const c = idx % outputSize;
            const isCalculated = idx <= step;
            const isCurrent = idx === step;

            // Pre-cálculo para visualización estática de valores pasados
            let val = 0;
            if (isCalculated) {
                for (let i = 0; i < kernelSize; i++) {
                    for (let j = 0; j < kernelSize; j++) {
                    val += inputGrid[r + i][c + j] * kernel[i][j];
                    }
                }
            }

            return (
              <div 
                key={idx}
                className={`aspect-square flex items-center justify-center rounded transition-all duration-500
                  ${isCurrent ? 'bg-emerald-500 text-white scale-110 shadow-lg' : 
                    isCalculated ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-transparent'}
                `}
              >
                <span className="font-bold">{isCalculated ? val : '?'}</span>
              </div>
            );
          })}
         </div>
         <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
           <h5 className="text-xs font-semibold uppercase text-slate-500 mb-2">Operación Actual</h5>
           <div className="font-mono text-sm text-slate-700">
             Cálculo: Suma de productos <br/>
             <span className="text-indigo-600 font-bold text-lg">= {sum}</span>
           </div>
         </div>
      </div>
    </div>
  );
};

// 2. Diagrama RNN (Recurrent Neural Network)
const RNNDiagram = () => {
  const [timeStep, setTimeStep] = useState(0);
  const sequence = ["El", "gato", "está", "dormido"];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStep(prev => (prev + 1) % (sequence.length + 1));
    }, 1500);
    return () => clearInterval(timer);
  }, [sequence.length]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-4 justify-center min-w-[600px]">
          {sequence.map((word, index) => {
            const isActive = index === timeStep;
            const isPast = index < timeStep;
            
            return (
              <div key={index} className="flex items-center">
                {/* Node Group */}
                <div className={`flex flex-col gap-2 items-center transition-opacity duration-500 ${index > timeStep ? 'opacity-30' : 'opacity-100'}`}>
                  
                  {/* Output y_t */}
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold bg-white mb-2
                    ${isActive ? 'border-purple-500 text-purple-700 shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'border-slate-300 text-slate-400'}`}>
                    y<sub>{index}</sub>
                  </div>

                  {/* Arrow Up */}
                  <div className="h-6 w-0.5 bg-slate-300"></div>

                  {/* Hidden State h_t */}
                  <div className={`w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center relative z-10 transition-colors duration-300
                    ${isActive ? 'bg-purple-600 border-purple-600 text-white scale-110' : 
                      isPast ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-slate-50 border-slate-300 text-slate-400'}`}>
                    <span className="font-bold">h<sub>{index}</sub></span>
                    <span className="text-[10px] mt-1">Memoria</span>
                  </div>

                  {/* Arrow Up */}
                  <div className="h-6 w-0.5 bg-slate-300"></div>

                  {/* Input x_t */}
                  <div className={`px-3 py-2 rounded-lg border text-sm font-medium min-w-[80px] text-center transition-colors
                     ${isActive ? 'bg-amber-100 border-amber-400 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    "{word}"
                  </div>
                </div>

                {/* Connection to next hidden state */}
                {index < sequence.length - 1 && (
                  <div className="w-16 h-0.5 bg-slate-300 mx-2 relative top-[-20px]">
                    <div className={`absolute inset-0 bg-purple-400 transition-transform origin-left duration-1000 
                      ${isPast ? 'scale-x-100' : 'scale-x-0'}`}></div>
                    <div className="absolute -right-1 -top-1 w-2 h-2 border-r-2 border-b-2 border-slate-300 -rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-2xl text-center">
        <div className="p-3 bg-amber-50 rounded border border-amber-100">
            <span className="block text-xs uppercase text-amber-600 font-bold mb-1">Entrada (x)</span>
            Palabra actual procesada
        </div>
        <div className="p-3 bg-purple-50 rounded border border-purple-100">
            <span className="block text-xs uppercase text-purple-600 font-bold mb-1">Estado Oculto (h)</span>
            Combina entrada actual + memoria previa
        </div>
        <div className="p-3 bg-slate-50 rounded border border-slate-100">
            <span className="block text-xs uppercase text-slate-600 font-bold mb-1">Salida (y)</span>
            Predicción o clasificación
        </div>
      </div>
    </div>
  );
};

// 3. Diagrama de Atención (Transformers)
const AttentionDiagram = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sentence = ["El", "animal", "no", "cruzó", "la", "calle", "porque", "estaba", "cansado"];
  
  // Matriz de atención simulada (simplificada para "animal" -> "cansado")
  // Valores altos representan mayor conexión
  const getOpacity = (source: number, target: number) => {
    if (source === target) return 0.1; 
    
    // Relaciones fuertes simuladas
    // "animal" (1) <-> "cansado" (8)
    if ((source === 1 && target === 8) || (source === 8 && target === 1)) return 1;
    // "animal" (1) <-> "cruzó" (3)
    if ((source === 1 && target === 3) || (source === 3 && target === 1)) return 0.6;
    // "calle" (5) <-> "cruzó" (3)
    if ((source === 5 && target === 3) || (source === 3 && target === 5)) return 0.5;

    return 0.1; // Ruido de fondo
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
        <p className="text-center text-slate-600 max-w-lg">
            Pasa el mouse sobre una palabra para ver a qué otras palabras está "prestando atención".
            <br/><span className="text-xs text-slate-400">(Observa la conexión fuerte entre 'animal' y 'cansado')</span>
        </p>

        <div className="relative w-full max-w-3xl flex justify-between px-8">
            {/* Columna Izquierda (Source) */}
            <div className="flex flex-col gap-2 z-10">
                {sentence.map((word, idx) => (
                    <div 
                        key={`src-${idx}`}
                        className={`px-4 py-2 rounded border cursor-pointer transition-colors w-24 text-center
                            ${hoveredIdx === idx ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                    >
                        {word}
                    </div>
                ))}
            </div>

            {/* Líneas de conexión (SVG Overlay) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {hoveredIdx !== null && sentence.map((_, targetIdx) => {
                    const opacity = getOpacity(hoveredIdx, targetIdx);
                    // Coordenadas aproximadas basadas en el layout
                    // Nota: En una app real usaríamos refs para coordenadas exactas
                    const y1 = 20 + (hoveredIdx * 42); 
                    const y2 = 20 + (targetIdx * 42);
                    
                    return (
                        <line 
                            key={targetIdx}
                            x1="100" 
                            y1={y1} 
                            x2="calc(100% - 100px)" 
                            y2={y2} 
                            stroke="rgb(37, 99, 235)" 
                            strokeWidth={opacity * 4}
                            strokeOpacity={opacity}
                            strokeLinecap="round"
                        />
                    );
                })}
            </svg>

            {/* Columna Derecha (Target) */}
            <div className="flex flex-col gap-2 z-10">
                {sentence.map((word, idx) => {
                     const opacity = hoveredIdx !== null ? getOpacity(hoveredIdx, idx) : 0;
                     const isHighAttention = opacity > 0.5;

                    return (
                        <div 
                            key={`tgt-${idx}`}
                            className={`px-4 py-2 rounded border transition-all duration-200 w-24 text-center
                                ${isHighAttention ? 'bg-blue-100 border-blue-300 font-bold text-blue-900 scale-105' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
                        >
                            {word}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

// --- COMPONENTE DE LAYOUT PRINCIPAL ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, subtitle, tabs, activeTabId, onTabChange }) => {
  return (
    <div className="w-full bg-slate-100 font-sans text-slate-800 grid grid-rows-[auto_auto_1fr] overflow-hidden">
      
      {/* 1. Header Area */}
      <header className="bg-slate-900 text-white p-6 grid items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="text-indigo-400" />
            {title}
          </h1>
          <p className="text-slate-400 text-sm mt-1">{subtitle}</p>
        </div>
      </header>

      {/* 2. Navigation Tabs */}
      <nav className="grid grid-cols-3 bg-white border-b border-slate-200 px-6">
       
          {tabs.map((tab) => (
          
              <button
                onClick={() => onTabChange(tab.id)}
                className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2
                  ${activeTabId === tab.id 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
              >
                {tab.icon}
                {tab.title}
              </button>
           
          ))}
      </nav>

      {/* 3. Main Content Area */}
      <main className="p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-6">
          {tabs.map((tab) => {
            if (tab.id !== activeTabId) return null;
            
            return (
              <React.Fragment key={tab.id}>
                {/* Panel de Texto */}
                <div className="lg:col-span-4 h-full">
                  <Card title={tab.title} className="h-full">
                    <div className="prose prose-slate">
                      <p className="text-slate-600 leading-relaxed text-lg mb-6">
                        {tab.description}
                      </p>
                      
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <h4 className="text-indigo-900 font-semibold mb-2 text-sm uppercase tracking-wide">
                            Concepto Clave
                        </h4>
                        <p className="text-indigo-800 text-sm">
                            {tab.id === 'cnn' && "La invarianza a la traducción permite detectar objetos sin importar dónde estén en la imagen."}
                            {tab.id === 'rnn' && "El estado oculto actúa como la 'memoria a corto plazo' de la red."}
                            {tab.id === 'transformer' && "Self-Attention permite modelar dependencias sin importar la distancia entre palabras."}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Panel Visual Interactivo */}
                <div className="lg:col-span-8 h-full min-h-[500px]">
                  <Card className="h-full flex flex-col">
                    <div className="flex-1">
                      {tab.component}
                    </div>
                  </Card>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </main>
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

const App = () => {
  const [activeTab, setActiveTab] = useState('cnn');

  const tabs: Tab[] = [
    {
      id: 'cnn',
      title: 'Convolución (CNN)',
      icon: <Layers size={18} />,
      description: (
      <DivCarousel>
        <div>
        
          <p>
            Las Redes Neuronales Convolucionales (CNN) están diseñadas para procesar datos visuales.
          </p>

          <p><strong>Aplicaciones principales:</strong></p>

          <ul>
            <li>Reconocimiento de imágenes.</li>
            <li>Detección de objetos.</li>
            <li>Visión por computadora.</li>
            <li>Análisis de video.</li>
          </ul>

          <p>
            Utilizan filtros (kernels) que detectan patrones locales como bordes y texturas.
          </p>
        </div>
      </DivCarousel>
    ),
      component: <ConvolutionDiagram />
    },
    {
      id: 'rnn',
      title: 'Red Recurrente (RNN)',
      icon: <Activity size={18} />,
      description: (
      <DivCarousel>
        <div>
          <p>
            Las Redes Neuronales Recurrentes (RNN) están diseñadas para datos secuenciales.
          </p>

          <p><strong>Se utilizan en:</strong></p>

          <ul>
            <li>Procesamiento de texto.</li>
            <li>Reconocimiento de voz.</li>
            <li>Series temporales.</li>
            <li>Traducción automática.</li>
          </ul>

          <p>
            Incorporan memoria interna que permite considerar información previa en la secuencia.
          </p>
        </div>
      </DivCarousel>
    ),
      component: <RNNDiagram />
    },
    {
      id: 'transformer',
      title: 'Atención (Transformer)',
      icon: <Network size={18} />,
      description:   <DivCarousel>
        <div>
      

          <p>
            Los Transformers se basan en mecanismos de atención (self-attention), permitiendo procesar secuencias completas en paralelo.
          </p>

          <p><strong>Aplicaciones principales:</strong></p>

          <ul>
            <li>Procesamiento del lenguaje natural.</li>
            <li>Modelos de lenguaje.</li>
            <li>Traducción automática.</li>
            <li>Generación de texto.</li>
          </ul>

          <p>
            Su ventaja principal es capturar relaciones a larga distancia en los datos.
          </p>

        
        </div>
      </DivCarousel>,
      component: <AttentionDiagram />
    }
  ];

  return (
    <LessonLayout 
      title="Tipos de Redes Neuronales Profundas"
      subtitle=""
      tabs={tabs}
      activeTabId={activeTab}
      onTabChange={setActiveTab}
    />
  );
};

export default App;