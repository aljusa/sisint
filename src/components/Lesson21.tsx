import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  ReferenceDot
} from 'recharts';
import { Activity, Zap, Scale, Layout, ArrowRightLeft, Info } from 'lucide-react';

/**
 * UTILIDADES MATEMÁTICAS
 * Funciones puras para generar los datos de los gráficos.
 */
const generateRange = (start: number, end: number, step: number) => {
  const data = [];
  for (let x = start; x <= end; x += step) {
    data.push(Number(x.toFixed(2)));
  }
  return data;
};

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
const sigmoidDerivative = (x: number) => {
  const s = sigmoid(x);
  return s * (1 - s);
};
const tanh = (x: number) => Math.tanh(x);

// --- TIPOS E INTERFACES ---

interface TabData {
  id: string;
  label: string;
  icon: React.ElementType;
  title: string;
  description: string;
  component: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

// --- COMPONENTES DE UI ---

const Card: React.FC<CardProps> = ({ children, className = '', title }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
        <h3 className="text-slate-700 font-semibold flex items-center gap-2">
          <Info size={18} className="text-blue-500" />
          {title}
        </h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

// --- COMPONENTES DE DIAGRAMAS ---

/**
 * 1. DIAGRAMA DE LA FUNCIÓN ESCALÓN (STEP FUNCTION)
 * Muestra el cambio abrupto binario.
 */
const StepFunctionDiagram: React.FC = () => {
  const data = useMemo(() => {
    // Generamos puntos densos alrededor del 0 para simular el salto vertical
    const points = [];
    for (let x = -4; x <= 4; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        y: x >= 0 ? 1 : 0
      });
    }
    // Asegurar el salto vertical estricto
    points.push({ x: -0.001, y: 0 });
    points.push({ x: 0, y: 1 });
    return points.sort((a, b) => a.x - b.x);
  }, []);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="x" 
            label={{ value: 'Entrada (z)', position: 'bottom', offset: 0 }} 
            type="number"
            domain={[-4, 4]}
          />
          <YAxis 
            label={{ value: 'Salida (a)', angle: -90, position: 'insideLeft' }} 
            domain={[-0.2, 1.2]}
            ticks={[0, 1]}
          />
        
          <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="3 3" label="Umbral" />
          <Line 
            type="stepAfter" 
            dataKey="y" 
            stroke="#ef4444" 
            strokeWidth={3} 
            dot={false} 
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-slate-500 text-center">
        Nota: La función produce una salida rígida de 0 o 1. No hay "grises" intermedios.
      </div>
    </div>
  );
};

/**
 * 2. DIAGRAMA DE GRADIENTE EN SIGMOIDE (DINÁMICO)
 * Permite explorar el desvanecimiento del gradiente.
 */
const SigmoidGradientDiagram: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(0);

  const data = useMemo(() => {
    return generateRange(-6, 6, 0.2).map(x => ({
      x,
      sigmoid: sigmoid(x),
      derivative: sigmoidDerivative(x)
    }));
  }, []);

  const currentPoint = {
    x: inputValue,
    sigmoid: sigmoid(inputValue),
    derivative: sigmoidDerivative(inputValue)
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="h-[350px] w-full bg-slate-50 rounded-lg p-2 border border-slate-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDeriv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="x" type="number" domain={[-6, 6]} hide />
            <YAxis domain={[0, 1]} orientation="left" width={40} />
            <Tooltip />
            
            {/* Función Sigmoide */}
            <Area 
              type="monotone" 
              dataKey="sigmoid" 
              stroke="#2563eb" 
              fill="none" 
              strokeWidth={3} 
              name="Sigmoide σ(x)"
            />
            
            {/* Derivada (Gradiente) */}
            <Area 
              type="monotone" 
              dataKey="derivative" 
              stroke="#8884d8" 
              fillOpacity={1} 
              fill="url(#colorDeriv)" 
              name="Derivada σ'(x)"
            />

            {/* Punto interactivo */}
            <ReferenceDot x={currentPoint.x} y={currentPoint.sigmoid} r={6} fill="#2563eb" stroke="white" />
            <ReferenceLine x={currentPoint.x} stroke="#64748b" strokeDasharray="3 3" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Posición en el eje X (Entrada): {inputValue}
          </label>
          <input
            type="range"
            min="-6"
            max="6"
            step="0.1"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Saturación (-6)</span>
            <span>Zona lineal (0)</span>
            <span>Saturación (6)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded shadow-sm border border-slate-200">
            <div className="text-xs text-slate-500 uppercase font-bold">Valor Sigmoide</div>
            <div className="text-2xl font-mono text-blue-600">{currentPoint.sigmoid.toFixed(4)}</div>
          </div>
          <div className={`p-3 rounded shadow-sm border transition-colors duration-300 ${currentPoint.derivative < 0.05 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
            <div className="text-xs text-slate-500 uppercase font-bold">Gradiente (Pendiente)</div>
            <div className={`text-2xl font-mono ${currentPoint.derivative < 0.05 ? 'text-red-600' : 'text-purple-600'}`}>
              {currentPoint.derivative.toFixed(4)}
            </div>
            {currentPoint.derivative < 0.05 && (
              <div className="text-[10px] text-red-500 font-bold mt-1">⚠️ DESVANECIMIENTO</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. DIAGRAMA COMPARATIVO SIGMOIDE VS TANH
 * Resalta diferencias de rango y centrado.
 */
const ComparisonDiagram: React.FC = () => {
  const data = useMemo(() => {
    return generateRange(-5, 5, 0.2).map(x => ({
      x,
      sigmoid: sigmoid(x),
      tanh: tanh(x)
    }));
  }, []);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[-5, 5]}
            stroke="#64748b"
          />
          <YAxis 
            domain={[-1.2, 1.2]} 
            ticks={[-1, -0.5, 0, 0.5, 1]}
            stroke="#64748b"
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <ReferenceLine y={0} stroke="#0f172a" strokeWidth={1} />
          
          <Line 
            type="monotone" 
            dataKey="sigmoid" 
            stroke="#2563eb" 
            strokeWidth={3} 
            dot={false}
            name="Sigmoide (0 a 1)" 
          />
          <Line 
            type="monotone" 
            dataKey="tanh" 
            stroke="#10b981" 
            strokeWidth={3} 
            dot={false} 
            name="Tanh (-1 a 1)"
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="flex justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-600 rounded"></div>
          <span className="text-sm text-slate-600 font-medium">Sigmoide: No centrada en cero</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-emerald-500 rounded"></div>
          <span className="text-sm text-slate-600 font-medium">Tanh: Centrada en cero</span>
        </div>
      </div>
    </div>
  );
};

// --- ESTRUCTURA PRINCIPAL (LAYOUT & LOGIC) ---

const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>('step');

  const tabs: TabData[] = [
    {
      id: 'step',
      label: 'Función Escalón',
      icon: Activity,
      title: 'El Salto Binario',
      description: 'La función escalón es la forma más simple de activación. Actúa como un interruptor: si la entrada supera un umbral (generalmente 0), la neurona se dispara (1); de lo contrario, permanece inactiva (0). Es útil para clasificaciones binarias simples pero carece de matices para el aprendizaje profundo.',
      component: <StepFunctionDiagram />
    },
    {
      id: 'sigmoid',
      label: 'Gradiente Sigmoide',
      icon: Zap,
      title: 'Problema del Desvanecimiento del Gradiente',
      description: 'La función Sigmoide suaviza la salida entre 0 y 1. Sin embargo, observa la curva de "Derivada" (púrpura). En los extremos (valores muy altos o bajos de entrada), la pendiente es casi cero. Esto causa que el gradiente desaparezca durante el entrenamiento (Backpropagation), impidiendo que la red aprenda.',
      component: <SigmoidGradientDiagram />
    },
    {
      id: 'tanh',
      label: 'Sigmoide vs Tanh',
      icon: ArrowRightLeft,
      title: 'Comparativa de Rango y Centrado',
      description: 'La Tangente Hiperbólica (Tanh) resuelve el problema del centrado. Mientras la Sigmoide (azul) siempre es positiva (0 a 1), Tanh (verde) va de -1 a 1. Esto permite que la media de las activaciones sea cercana a cero, lo que facilita y acelera la convergencia del entrenamiento en capas ocultas.',
      component: <ComparisonDiagram />
    }
  ];

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 md:p-8">
      {/* LAYOUT GRID PRINCIPAL
         Regla 1a: Uso estricto de CSS Grid para el layout principal.
         No usamos Flexbox para la estructura macro.
      */}
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        
        {/* HEADER AREA */}
        <header className="col-span-12 bg-indigo-700 rounded-2xl p-6 text-white shadow-lg grid grid-cols-12 items-center">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3 mb-2">
              <Layout className="text-indigo-200" />
              <h1 className="text-2xl font-bold tracking-tight">Visualizador de Funciones de Activación</h1>
            </div>
            <p className="text-indigo-100 text-sm md:text-base">
              Exploración interactiva del comportamiento matemático en neuronas artificiales.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex justify-start md:justify-end mt-4 md:mt-0">
            <span className="px-3 py-1 bg-indigo-600 rounded-full text-xs font-mono text-indigo-200 border border-indigo-500">
              v1.0.0 | DiagramtoReact
            </span>
          </div>
        </header>

        {/* TAB NAVIGATION AREA */}
        <nav className="col-span-12 bg-white rounded-xl shadow-sm border border-slate-200 p-2">
          <ul className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTabId === tab.id;
              return (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTabId(tab.id)}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200 shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* MAIN CONTENT AREA */}
        <main className="col-span-12 grid grid-cols-12 gap-6 animate-in fade-in duration-500">
          
          {/* Panel Izquierdo: Contexto Teórico */}
          <section className="col-span-12 md:col-span-4 h-full">
            <Card className="h-full border-l-4 border-l-indigo-500" title="Concepto Clave">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-slate-800">
                  {activeTab.title}
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded-full"></div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {activeTab.description}
                </p>
                <div className="mt-auto pt-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="text-xs font-bold text-blue-700 uppercase mb-2 flex items-center gap-2">
                      <Scale size={14} />
                      Objetivo Visual
                    </h4>
                    <p className="text-xs text-blue-800">
                      {activeTabId === 'step' && 'Observar la discontinuidad en x=0 y la naturaleza binaria.'}
                      {activeTabId === 'sigmoid' && 'Manipular el slider para ver cómo la derivada (área violeta) tiende a cero en los extremos.'}
                      {activeTabId === 'tanh' && 'Comparar cómo Tanh cubre valores negativos mientras Sigmoide se queda en positivos.'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Panel Derecho: Renderizado del Diagrama */}
          <section className="col-span-12 md:col-span-8 h-full">
            <Card className="h-full bg-white relative">
              <div className="absolute top-4 right-4 z-10">
                 <span className="bg-slate-100 text-slate-500 px-2 py-1 rounded text-xs font-mono border border-slate-200">
                   Render: {activeTabId === 'sigmoid' ? 'Dinámico' : 'Estático'}
                 </span>
              </div>
              <div className="pt-4">
                {activeTab.component}
              </div>
            </Card>
          </section>

        </main>

      </div>
    </div>
  );
};

export default App;