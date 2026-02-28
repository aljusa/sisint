import { useState } from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine, 
  Cell 
} from 'recharts';
import { Activity, Brain, Calculator, Settings, Info } from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- Components ---

/**
 * Card Component
 * Envoltorio estético para secciones de contenido.
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}
const Card = ({ children, className = "", title }:CardProps) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col ${className}`}>
    {title && (
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <h3 className="text-slate-700 font-semibold text-lg">{title}</h3>
      </div>
    )}
    <div className="p-6 flex-grow flex flex-col">
      {children}
    </div>
  </div>
);

/**
 * WeightedFlowDiagram (Dynamic)
 * Visualización interactiva del proceso matemático de un perceptrón simple.
 */
const WeightedFlowDiagram = () => {
  // State for inputs and weights
  const [x1, setX1] = useState(1);
  const [x2, setX2] = useState(0);
  const [w1, setW1] = useState(0.5);
  const [w2, setW2] = useState(0.5);
  const [bias, setBias] = useState(-0.4);

  // Calculations
  const sum = (x1 * w1) + (x2 * w2) + bias;
  const output = sum >= 0 ? 1 : 0; // Step function

  // Helper for stroke width based on weight magnitude
  const getStrokeWidth = (w:number) => Math.max(1, Math.min(8, Math.abs(w) * 5));
  const getStrokeColor = (w:number) => w > 0 ? '#10b981' : '#ef4444'; // Green positive, Red negative

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
      {/* Visual Render Area */}
      <Card title="Visualización de Flujo Ponderado" className="min-h-[450px]">
        <div className="w-full h-full min-h-[350px] flex-grow grid place-items-center bg-slate-50 rounded-lg border border-slate-100 relative overflow-hidden">
          <svg viewBox="0 0 800 400" className="w-full h-full max-w-[800px]">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
            </defs>

            {/* Inputs Layer */}
            <g transform="translate(100, 100)">
              <circle cx="0" cy="0" r="30" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-slate-700">x₁</text>
              <text x="-50" y="5" textAnchor="end" className="text-xs fill-slate-500 font-mono">{x1.toFixed(1)}</text>
            </g>
            <g transform="translate(100, 300)">
              <circle cx="0" cy="0" r="30" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
              <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-slate-700">x₂</text>
              <text x="-50" y="5" textAnchor="end" className="text-xs fill-slate-500 font-mono">{x2.toFixed(1)}</text>
            </g>

            {/* Bias Input */}
            <g transform="translate(400, 50)">
               <text x="0" y="-15" textAnchor="middle" className="text-xs fill-slate-500 font-mono">Bias: {bias.toFixed(1)}</text>
               <line x1="0" y1="0" x2="0" y2="40" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" />
            </g>

            {/* Weights Connections */}
            <line 
              x1="130" y1="100" 
              x2="370" y2="180" 
              stroke={getStrokeColor(w1)} 
              strokeWidth={getStrokeWidth(w1)}
              opacity={0.8}
            />
            <text x="250" y="130" fill={getStrokeColor(w1)} className="font-mono text-xs font-bold bg-white">w₁: {w1}</text>

            <line 
              x1="130" y1="300" 
              x2="370" y2="220" 
              stroke={getStrokeColor(w2)} 
              strokeWidth={getStrokeWidth(w2)}
              opacity={0.8}
            />
            <text x="250" y="280" fill={getStrokeColor(w2)} className="font-mono text-xs font-bold">w₂: {w2}</text>

            {/* Summation Node */}
            <g transform="translate(400, 200)">
              <circle cx="0" cy="0" r="45" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
              <text x="0" y="-10" textAnchor="middle" className="text-xs font-bold fill-slate-400">∑</text>
              <text x="0" y="15" textAnchor="middle" className="text-sm font-mono font-bold fill-slate-800">{sum.toFixed(2)}</text>
            </g>

            {/* Activation Function Arrow */}
            <line x1="445" y1="200" x2="550" y2="200" stroke="#334155" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <rect x="470" y="160" width="60" height="20" rx="4" fill="#f1f5f9" />
            <text x="500" y="175" textAnchor="middle" className="text-[10px] fill-slate-500">Activación</text>

            {/* Output Node */}
            <g transform="translate(600, 200)">
              <circle cx="0" cy="0" r="40" fill={output === 1 ? '#d1fae5' : '#fee2e2'} stroke={output === 1 ? '#059669' : '#dc2626'} strokeWidth="3" />
              <text x="0" y="5" textAnchor="middle" className="text-xl font-bold fill-slate-800">{output}</text>
              <text x="0" y="60" textAnchor="middle" className="text-sm font-bold fill-slate-600">Salida (y)</text>
            </g>
          </svg>
        </div>
      </Card>

      {/* Controls Panel */}
      <Card title="Controles de Parámetros">
        <div className="grid gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Activity size={16} /> Entradas (Inputs)
            </h4>
            <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center">
              <label className="text-sm font-mono text-slate-600">x₁</label>
              <input type="range" min="0" max="1" step="1" value={x1} onChange={(e) => setX1(Number(e.target.value))} className="w-full accent-blue-600" />
              <span className="text-sm font-mono w-8 text-right">{x1}</span>
              
              <label className="text-sm font-mono text-slate-600">x₂</label>
              <input type="range" min="0" max="1" step="1" value={x2} onChange={(e) => setX2(Number(e.target.value))} className="w-full accent-blue-600" />
              <span className="text-sm font-mono w-8 text-right">{x2}</span>
            </div>
          </div>

          <div className="w-full h-px bg-slate-200"></div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Settings size={16} /> Pesos (Weights)
            </h4>
            <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center">
              <label className="text-sm font-mono text-slate-600">w₁</label>
              <input type="range" min="-1" max="1" step="0.1" value={w1} onChange={(e) => setW1(Number(e.target.value))} className="w-full accent-indigo-600" />
              <span className="text-sm font-mono w-8 text-right">{w1}</span>

              <label className="text-sm font-mono text-slate-600">w₂</label>
              <input type="range" min="-1" max="1" step="0.1" value={w2} onChange={(e) => setW2(Number(e.target.value))} className="w-full accent-indigo-600" />
              <span className="text-sm font-mono w-8 text-right">{w2}</span>

              <label className="text-sm font-mono text-slate-600">b</label>
              <input type="range" min="-2" max="2" step="0.1" value={bias} onChange={(e) => setBias(Number(e.target.value))} className="w-full accent-indigo-600" />
              <span className="text-sm font-mono w-8 text-right">{bias}</span>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg mt-2">
            <h5 className="text-xs font-bold text-slate-500 mb-2">Cálculo Matemático</h5>
            <div className="font-mono text-xs text-slate-700 space-y-1">
              <p>∑ = ({x1} · {w1}) + ({x2} · {w2}) + ({bias})</p>
              <p>∑ = {(x1 * w1).toFixed(2)} + {(x2 * w2).toFixed(2)} + {bias}</p>
              <p className="font-bold border-t border-slate-300 pt-1 mt-1">∑ = {sum.toFixed(2)}</p>
              <p className={`font-bold ${sum >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Salida = {sum} ≥ 0 ? 1 : 0 → {output}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

/**
 * DecisionBoundaryDiagram (Static)
 * Muestra geométricamente cómo un perceptrón separa datos.
 * Simula una puerta lógica OR.
 */
const DecisionBoundaryDiagram = () => {
  const data = [
    { x: 0, y: 0, class: 0 }, // 0 OR 0 = 0
    { x: 0, y: 1, class: 1 }, // 0 OR 1 = 1
    { x: 1, y: 0, class: 1 }, // 1 OR 0 = 1
    { x: 1, y: 1, class: 1 }, // 1 OR 1 = 1
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
      <Card title="Frontera de Decisión Geométrica (Puerta OR)">
        {/* LA SOLUCIÓN: Usar un div con altura fija (h-[400px]) garantiza que ResponsiveContainer funcione */}
        <div className="w-full h-[400px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="Entrada 1" domain={[-0.5, 1.5]} ticks={[0, 1]} />
              <YAxis type="number" dataKey="y" name="Entrada 2" domain={[-0.5, 1.5]} ticks={[0, 1]} />
              <ZAxis type="number" range={[150, 150]} /> {/* Incrementado a 150 para que los puntos se vean mejor */}
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-sm">
                        <p className="font-bold text-slate-800">Punto ({data.x}, {data.y})</p>
                        <p className="text-slate-600">Clase esperada: <span className="font-bold">{data.class}</span></p>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
              
              <ReferenceLine 
                segment={[{ x: -0.5, y: 1 }, { x: 1.5, y: -1 }]} 
                stroke="#6366f1" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                label={{ position: 'top', value: 'Frontera (Límite)', fill: '#6366f1', fontSize: 12, fontWeight: 'bold' }} 
              />

              <Scatter name="Datos" data={data}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.class === 1 ? '#10b981' : '#ef4444'} stroke="#fff" strokeWidth={2} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        {/* Leyenda */}
        <div className="mt-auto flex flex-wrap justify-center gap-6 text-sm bg-slate-50 py-3 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"></div>
                <span className="font-medium text-slate-700">Clase 1 (Salida = 1)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></div>
                <span className="font-medium text-slate-700">Clase 0 (Salida = 0)</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-indigo-500"></div>
                <span className="font-medium text-slate-700">Separador Lineal</span>
            </div>
        </div>
      </Card>

      <Card title="Análisis Geométrico">
        <div className="space-y-6 text-slate-700">
          <div>
            <h4 className="font-bold flex items-center gap-2 mb-2 text-indigo-700">
              <Info size={18} />
              Concepto Estático
            </h4>
            <p className="text-sm leading-relaxed">
              En este gráfico 2D, cada eje representa una entrada (x₁ y x₂). Los puntos representan los datos de entrenamiento (la tabla de verdad de la puerta OR).
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 shadow-inner">
            <h5 className="font-bold text-sm text-indigo-800 mb-1">La Línea Divisoria</h5>
            <p className="text-sm font-mono text-indigo-900 mb-2 font-bold text-center py-2 bg-white rounded border border-indigo-100">
              w₁x₁ + w₂x₂ + b = 0
            </p>
            <p className="text-xs text-indigo-800 leading-relaxed">
              El perceptrón aprende a posicionar esta línea azul discontinua. Todo lo que cae a la derecha/arriba se clasifica como 1 (verde), y a la izquierda/abajo como 0 (rojo).
            </p>
          </div>

          <div>
             <h5 className="font-bold text-sm mb-2 text-slate-800">Limitación Principal</h5>
             <p className="text-sm leading-relaxed text-slate-600">
               Si los puntos verdes y rojos estuvieran mezclados de forma que ninguna línea recta pudiera separarlos (como en una función XOR), un solo perceptrón fallaría. Esto se conoce como <strong>no linealmente separable</strong>.
             </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

/**
 * LessonLayout Component
 * Layout principal basado en CSS Grid.
 */
const App = () => {
  const [activeTab, setActiveTab] = useState('flow');

  const tabs = [
    { id: 'flow', label: 'Diagrama de Flujo', icon: <Activity size={18} /> },
    { id: 'boundary', label: 'Frontera de Decisión', icon: <Brain size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col h-screen overflow-hidden">
      
      {/* Header Area */}
      <header className="bg-slate-900 text-white shadow-md z-10 flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg shadow-sm">
            <Calculator className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Estructura y Funcionamiento</h1>
            
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="bg-slate-800 p-1 rounded-lg inline-flex w-full sm:w-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${activeTab === tab.id 
                    ? 'bg-indigo-500 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
          
          {/* Section Header */}
          <div className="flex-shrink-0">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {activeTab === 'flow' ? 'Proceso de Activación' : 'Geometría de Clasificación'}
            </h2>
            
              {activeTab === 'flow' 
                ?  <DivCarousel>
        <div>
          <p>
            El perceptrón es un modelo matemático que combina entradas ponderadas y genera una salida binaria.
          </p>

          <p>
            4
          </p>

          <p><strong>Componentes principales:</strong></p>

          <ul>
            <li>Entradas (x₁, x₂, …, xₙ)</li>
            <li>Pesos (w₁, w₂, …, wₙ)</li>
            <li>Sesgo (bias, b)</li>
            <li>Sumador lineal</li>
            <li>Función de activación (escalón)</li>
          </ul>

          <p>
            El sesgo permite desplazar la frontera de decisión.
          </p>

       
        </div>
      </DivCarousel>
                : <DivCarousel>
        <div>
          <p>
            El perceptrón calcula primero una combinación lineal:
          </p>

          <p>
            z = ∑(xᵢ · wᵢ) + b
          </p>

          <p>
            Luego aplica una función escalón:
          </p>

          <ul>
            <li>Salida = 1 si z ≥ 0</li>
            <li>Salida = 0 si z &lt; 0</li>
          </ul>

          <p>
            Geométricamente, el modelo divide el espacio de datos mediante:
          </p>

          <ul>
            <li>Una línea en 2 dimensiones.</li>
            <li>Un plano en 3 dimensiones.</li>
            <li>Un hiperplano en dimensiones superiores.</li>
          </ul>

          <p>
            Esto lo convierte en un clasificador lineal.
          </p>

       
        </div>
      </DivCarousel>}
            
          </div>

          {/* Diagram Render Area */}
          <div className="flex-grow">
            {activeTab === 'flow' ? <WeightedFlowDiagram /> : <DecisionBoundaryDiagram />}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;