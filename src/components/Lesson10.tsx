import React, { useState, useEffect } from 'react';
import { Brain, Activity, RefreshCw, Layers, TrendingDown, Info,  } from 'lucide-react';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import DivCarousel from '../assets/DivCarousel';

// --- Tipos e Interfaces ---

interface TabData {
  id: string;
  title: string;
  icon: React.ReactNode;
  descriptionTitle: string;
  description: React.ReactNode;
  details: string[];
}

// --- Componentes UI Base ---

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
    )}
    <div className="p-6 h-full">
      {children}
    </div>
  </div>
);

// --- Componentes de Visualización ---

// 1. Visualización de Red Neuronal (SVG Animado)
const NeuralNetworkViz: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 4);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Coordenadas de nodos
  const layers = [
    [{ x: 50, y: 100 }, { x: 50, y: 300 }], // Input
    [{ x: 200, y: 50 }, { x: 200, y: 200 }, { x: 200, y: 350 }], // Hidden 1
    [{ x: 350, y: 100 }, { x: 350, y: 300 }], // Hidden 2
    [{ x: 500, y: 200 }] // Output
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 rounded-lg p-4">
      <svg viewBox="0 0 550 400" className="w-full h-64 md:h-80">
        {/* Conexiones */}
        {layers.map((layer, i) => {
          if (i === layers.length - 1) return null;
          return layer.map((node, nodeIdx) => (
            layers[i + 1].map((target, targetIdx) => (
              <line
                key={`conn-${i}-${nodeIdx}-${targetIdx}`}
                x1={node.x} y1={node.y}
                x2={target.x} y2={target.y}
                stroke={activeLayer === i || activeLayer === i + 1 ? "#60A5FA" : "#334155"}
                strokeWidth={activeLayer === i ? 3 : 1}
                strokeOpacity={activeLayer === i ? 1 : 0.3}
                className="transition-all duration-500"
              />
            ))
          ));
        })}

        {/* Nodos */}
        {layers.map((layer, i) => (
          <g key={`layer-${i}`}>
            {layer.map((node, j) => (
              <circle
                key={`node-${i}-${j}`}
                cx={node.x} cy={node.y}
                r={15}
                fill={activeLayer === i ? "#3B82F6" : "#1E293B"}
                stroke="#60A5FA"
                strokeWidth={2}
                className="transition-all duration-500"
              />
            ))}
          </g>
        ))}
      </svg>
      <div className="mt-4 text-slate-300 font-mono text-sm">
        Estado: {activeLayer === 0 ? "Entrada de Datos" : activeLayer === 3 ? "Predicción (Salida)" : `Procesamiento Capa Oculta ${activeLayer}`}
      </div>
    </div>
  );
};

// 2. Visualización de Retropropagación (Diagrama Circular)
const BackpropViz: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Forward Pass", desc: "Predicción inicial", color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Cálculo de Error", desc: "Comparar con Realidad", color: "text-red-500", bg: "bg-red-100" },
    { label: "Gradiente", desc: "Calcular Derivadas", color: "text-purple-500", bg: "bg-purple-100" },
    { label: "Ajuste de Pesos", desc: "Actualizar Modelo", color: "text-green-500", bg: "bg-green-100" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-50 p-6 rounded-lg">
      <div className="grid grid-cols-2 gap-8 relative">
        {/* Líneas de conexión central */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <RefreshCw className={`w-12 h-12 text-slate-300 animate-spin`} style={{ animationDuration: '8s' }} />
        </div>

        {steps.map((s, idx) => (
          <div
            key={idx}
            className={`
              flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-500 transform
              ${step === idx ? `${s.bg} border-current ${s.color} scale-110 shadow-lg` : 'bg-white border-slate-200 text-slate-400 scale-100'}
            `}
          >
            <div className="font-bold text-lg mb-1">{s.label}</div>
            <div className="text-xs text-center font-medium opacity-80">{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center max-w-md text-slate-600">
        <p className="font-semibold">Iteración Actual: <span className="text-slate-900">{(step + 1)}/4</span></p>
        <p className="text-sm mt-1">El modelo aprende ajustando sus parámetros internos basándose en el error cometido.</p>
      </div>
    </div>
  );
};

// 3. Visualización de Función de Pérdida (Gráfico)
const LossViz: React.FC = () => {
  // Generar datos de curva de aprendizaje
  const data = Array.from({ length: 20 }, (_, i) => ({
    epoch: i + 1,
    loss: 10 * Math.exp(-0.2 * i) + Math.random() * 0.5,
    accuracy: 95 * (1 - Math.exp(-0.15 * i))
  }));

  return (
    <div className="h-full flex flex-col bg-white rounded-lg">
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="epoch" label={{ value: 'Épocas', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'Error (Loss)', angle: -90, position: 'insideLeft' }} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="loss"
              stroke="#EF4444"
              fillOpacity={1}
              fill="url(#colorLoss)"
              strokeWidth={3}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg text-sm flex items-start gap-3">
        <TrendingDown className="w-5 h-5 flex-shrink-0" />
        <div>
          <p className="font-bold">Descenso del Gradiente</p>
          <p>La curva muestra cómo el error disminuye drásticamente en las primeras iteraciones y se estabiliza a medida que el modelo converge hacia una solución óptima.</p>
        </div>
      </div>
    </div>
  );
};

// --- Datos del Curso ---

const LESSON_DATA: TabData[] = [
  {
    id: 'neural-net',
    title: 'Red Neuronal',
    icon: <Brain className="w-4 h-4" />,
    descriptionTitle: 'Estructura básica de una red neuronal',
    description: (
      <DivCarousel>
        <div>
          <p>
            Las redes neuronales artificiales están inspiradas en la estructura del cerebro humano. Están compuestas por nodos (neuronas artificiales) organizados en capas.
          </p>

          <p><strong>Componentes principales:</strong></p>

          <ul>
            <li><strong>Capa de entrada (Input layer):</strong> recibe los datos.</li>
            <li><strong>Capas ocultas (Hidden layers):</strong> procesan la información.</li>
            <li><strong>Capa de salida (Output layer):</strong> produce el resultado.</li>
            <li><strong>Pesos:</strong> valores que determinan la importancia de cada conexión.</li>
          </ul>

          <p>
            Cada neurona recibe valores, los transforma y transmite el resultado a la siguiente capa.
          </p>

       
        </div>
      </DivCarousel>
    ),
    details: [
      'Input Layer: Recibe los datos crudos (imágenes, texto, números).',
      'Hidden Layers: Extraen características complejas mediante pesos y sesgos.',
      'Output Layer: Entrega la predicción o clasificación final.'
    ]
  },
  {
    id: 'backprop',
    title: 'Retropropagación',
    icon: <RefreshCw className="w-4 h-4" />,
    descriptionTitle: 'Funcionamiento básico',
    description: (
      <DivCarousel>
        <div>
          <p>
            El proceso general de una red neuronal incluye:
          </p>

          <ul>
            <li>Recepción de datos.</li>
            <li>Multiplicación por pesos.</li>
            <li>Suma ponderada.</li>
            <li>Aplicación de función de activación.</li>
            <li>Generación de salida.</li>
            <li>Cálculo del error.</li>
            <li>Ajuste de pesos (retropropagación).</li>
          </ul>

          <p>
            El algoritmo de retropropagación (backpropagation) permite que la red ajuste sus parámetros para reducir el error.
          </p>

        </div>
      </DivCarousel>
    ),
    details: [
      'Comparación: Se mide la distancia entre la predicción y el valor real.',
      'Regla de la Cadena: Se calcula cuánto contribuyó cada neurona al error.',
      'Actualización: Los pesos se ajustan en dirección opuesta al error.'
    ]
  },
  {
    id: 'loss-func',
    title: 'Función de Pérdida',
    icon: <Activity className="w-4 h-4" />,
    descriptionTitle: 'Minimizando el Error',
    description: (
      <DivCarousel>
        <div>
          <p>
            El aprendizaje consiste en minimizar una función de pérdida que mide la diferencia entre la predicción del modelo y el valor real.
          </p>

          <p><strong>Factores que influyen en el aprendizaje:</strong></p>

          <ul>
            <li>Cantidad y calidad de datos.</li>
            <li>Número de capas.</li>
            <li>Tasa de aprendizaje.</li>
            <li>Función de activación.</li>
            <li>Algoritmo de optimización.</li>
          </ul>

          <p>
            El entrenamiento es un proceso iterativo que mejora progresivamente el desempeño del modelo.
          </p>
        </div>
      </DivCarousel>
    ),
    details: [
      'Eje X (Épocas): Cantidad de veces que el modelo ha visto los datos.',
      'Eje Y (Loss): Valor del error. Queremos que sea cercano a 0.',
      'Convergencia: Cuando la curva se aplana, el modelo ha dejado de aprender.'
    ]
  }
];

// --- Componente Layout Principal (LessonLayout) ---

const LessonLayout: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(LESSON_DATA[0].id);

  const activeContent = LESSON_DATA.find(d => d.id === activeTabId) || LESSON_DATA[0];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-8 grid grid-rows-[auto_auto_1fr] gap-6">
      
      {/* 1. Header Area */}
      <header className="grid grid-cols-[auto_1fr] items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-indigo-600">
        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
          <Layers size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Redes Neuronales Artificiales</h1>
        </div>
      </header>

      {/* 2. Navigation Tabs (Grid Layout) */}
      <nav className="bg-white p-2 rounded-xl shadow-sm grid grid-cols-3 gap-2">
        {LESSON_DATA.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`
              flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200
              ${activeTabId === tab.id 
                ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}
            `}
          >
            {tab.icon}
            <span className="hidden md:inline">{tab.title}</span>
          </button>
        ))}
      </nav>

      {/* 3. Main Content Area (Grid Layout: 2 Columns on Desktop) */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        
        {/* Panel Izquierdo: Información Teórica (4 columnas) */}
        <section className="lg:col-span-4 h-full">
          <Card className="h-full border-t-4 border-t-indigo-500 flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-indigo-500" />
                {activeContent.descriptionTitle}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {activeContent.description}
              </p>
            </div>
            
           

          </Card>
        </section>

        {/* Panel Derecho: Renderizado de Diagrama (8 columnas) */}
        <section className="lg:col-span-8 h-full">
          <Card title={`${activeContent.title}`} className="h-full">
            <div className="bg-slate-50 rounded-xl border border-slate-200 h-full min-h-[400px] p-4 flex flex-col">
               {/* Switcher de Diagramas */}
               {activeTabId === 'neural-net' && <NeuralNetworkViz />}
               {activeTabId === 'backprop' && <BackpropViz />}
               {activeTabId === 'loss-func' && <LossViz />}
            </div>
          </Card>
        </section>

      </main>

    </div>
  );
};

export default LessonLayout;