import React, { useState } from 'react';
import { 
   
  Brain, 
  Database, 
  Cpu, 
  Network, 
  Zap, 
  ArrowRight, 
  GitGraph, 
  Settings,
  Activity,
  

} from 'lucide-react';
import DivCarousel from '../assets/DivCarousel';

// --- Tipos e Interfaces ---

interface SectionData {
  id: string;
  title: string;
  shortTitle: string;
  description: React.ReactNode;
  diagramType: 'hierarchy' | 'comparative' | 'pillars';
  details: string[];
}

// --- Datos del Contenido ---

const lessonData: SectionData[] = [
  {
    id: 'layer-hierarchy',
    title: '¿Qué es el Deep Learning?',
    shortTitle: 'Jerarquía',
    description: (
      <DivCarousel>
        <div>
          <p>
            El Deep Learning (Aprendizaje Profundo) es una subrama del aprendizaje automático que utiliza redes neuronales artificiales con múltiples capas para modelar patrones complejos en grandes volúmenes de datos. Forma parte de la Inteligencia Artificial y representa una evolución del Machine Learning tradicional.
          </p>

          <p>
            A diferencia de los enfoques clásicos, el Deep Learning:
          </p>

          <ul>
            <li>Aprende representaciones automáticamente.</li>
            <li>Procesa datos no estructurados (imágenes, texto, audio).</li>
            <li>Utiliza arquitecturas profundas (múltiples capas ocultas).</li>
            <li>Escala eficazmente con grandes volúmenes de datos.</li>
          </ul>

          <p>
            Su característica distintiva es la capacidad de extraer características de manera jerárquica, pasando de patrones simples a representaciones abstractas.
          </p>
        </div>
      </DivCarousel>
    ),
    diagramType: 'hierarchy',
    details: [
      'Entrada: Datos sin procesar de alta dimensión.',
      'Capas Ocultas: Detectan patrones locales (bordes, texturas).',
      'Abstracción: Combinan patrones simples en objetos complejos.',
      'Salida: Probabilidad o clasificación final.'
    ]
  },
  {
    id: 'ml-vs-dl',
    title: 'ML Tradicional vs. Deep Learning',
    shortTitle: 'Comparativa',
    description:  (
      <DivCarousel>
        <div>
          <p>
            El Deep Learning surge como respuesta a limitaciones del aprendizaje automático tradicional, especialmente en problemas complejos como visión artificial o procesamiento de lenguaje natural.
          </p>
          <p>
            La diferencia clave radica en que el Deep Learning automatiza la extracción de patrones.
          </p>

        </div>
      </DivCarousel>
    ),
    diagramType: 'comparative',
    details: [
      'ML Tradicional: Requiere ingenieros para definir "features" relevantes.',
      'Deep Learning: Aprende las "features" y la clasificación simultáneamente (End-to-End).',
      'Escalabilidad: DL mejora con más datos; ML tradicional tiende a estancarse.'
    ]
  },
  {
    id: 'four-pillars',
    title: '¿Por qué surge el Deep Learning?',
    shortTitle: 'Pilares',
    description: (
      <DivCarousel>
        <div>
          <p>
            El desarrollo del Deep Learning fue posible gracias a cuatro factores principales:
          </p>

          <ul>
            <li>Disponibilidad masiva de datos (Big Data).</li>
            <li>Mayor capacidad de procesamiento (especialmente GPU).</li>
            
            <li>Mejora en algoritmos de entrenamiento.</li>
            <li>Avances en optimización matemática.</li>
          </ul>

          <p>
            Estos elementos permitieron entrenar redes profundas que anteriormente eran impracticables.
          </p>
        </div>
      </DivCarousel>
    ),
    diagramType: 'pillars',
    details: [
      'Big Data: Combustible para entrenar redes masivas.',
      'GPU/TPU: Capacidad de cálculo paralelo matricial.',
      'Algoritmos: Mejoras como ReLU, Dropout, Transformers.',
      'Optimización: Software robusto (PyTorch, TensorFlow) y mejores optimizadores.'
    ]
  }
];

// --- Componentes UI Base ---

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ children, className = "", title }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {title && (
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100">
        <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">{title}</h3>
      </div>
    )}
    <div className="p-0">
      {children}
    </div>
  </div>
);

// --- Componentes de Diagramas Específicos ---

const HierarchyDiagram: React.FC = () => {
  return (
    <div className="w-full h-full p-6 grid grid-rows-[auto_1fr] gap-4">
      <div className="grid grid-cols-1 gap-4 place-items-center">
        
        {/* Capa de Entrada */}
        <div className="w-full grid grid-cols-[100px_1fr] gap-4 items-center group">
          <div className="bg-slate-100 p-4 rounded-lg border border-slate-300 text-center">
            <Database className="w-8 h-8 mx-auto text-slate-500 mb-2" />
            <span className="text-xs font-bold text-slate-600">Raw Data</span>
          </div>
          <div className="h-full border-l-4 border-slate-200 pl-4 py-2">
            <p className="text-sm text-slate-500">Píxeles, Ondas de Audio, Texto Crudo</p>
          </div>
        </div>

        {/* Flecha */}
        <div className="text-slate-300"><Activity className="w-6 h-6 rotate-90" /></div>

        {/* Capas Ocultas (Representación) */}
        <div className="w-full bg-blue-50/50 rounded-xl p-4 border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-bl-lg font-bold">
            "Caja Negra" / Representaciones
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-white p-3 rounded shadow-sm border border-blue-200">
              <div className="w-full h-2 bg-blue-200 mb-2 rounded"></div>
              <span className="text-xs text-blue-700">Bordes</span>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border border-blue-300">
              <div className="w-full h-2 bg-blue-300 mb-2 rounded"></div>
              <span className="text-xs text-blue-800">Formas</span>
            </div>
            <div className="bg-white p-3 rounded shadow-sm border border-blue-400">
              <div className="w-full h-2 bg-blue-400 mb-2 rounded"></div>
              <span className="text-xs text-blue-900">Objetos</span>
            </div>
          </div>
          <p className="text-center text-xs text-blue-400 mt-3 italic">Abstracción progresiva no lineal</p>
        </div>

        {/* Flecha */}
        <div className="text-slate-300"><Activity className="w-6 h-6 rotate-90" /></div>

        {/* Salida */}
        <div className="w-full grid grid-cols-[100px_1fr] gap-4 items-center">
          <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-300 text-center shadow-sm">
            <Brain className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
            <span className="text-xs font-bold text-emerald-700">Predicción</span>
          </div>
          <div className="h-full border-l-4 border-emerald-200 pl-4 py-2">
            <p className="text-sm text-slate-600">Clasificación final (ej. "Es un Gato": 98%)</p>
          </div>
        </div>

      </div>
    </div>
  );
};

const ComparativeDiagram: React.FC = () => {
  return (
    <div className="w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      
      {/* Columna Tradicional */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-rows-[auto_1fr]">
        <h4 className="text-center font-bold text-slate-600 mb-4 border-b pb-2">Machine Learning Tradicional</h4>
        <div className="grid grid-cols-1 gap-3 content-start">
          <div className="bg-white p-3 rounded border border-slate-300 text-center text-sm shadow-sm">Input</div>
          <div className="mx-auto text-slate-400"><ArrowRight className="w-4 h-4 rotate-90" /></div>
          
          {/* Bloque Manual */}
          <div className="bg-amber-50 p-3 rounded border border-amber-200 text-center relative">
             <div className="absolute -right-2 -top-2 bg-amber-500 text-white rounded-full p-1">
                <Settings className="w-3 h-3" />
             </div>
             <span className="text-sm font-semibold text-amber-800">Extracción de Características</span>
             <p className="text-[10px] text-amber-600 mt-1">(Manual / Humano)</p>
          </div>

          <div className="mx-auto text-slate-400"><ArrowRight className="w-4 h-4 rotate-90" /></div>
          <div className="bg-white p-3 rounded border border-slate-300 text-center text-sm shadow-sm">Clasificación</div>
          <div className="mx-auto text-slate-400"><ArrowRight className="w-4 h-4 rotate-90" /></div>
          <div className="bg-slate-800 text-white p-3 rounded text-center text-sm shadow-sm">Salida</div>
        </div>
      </div>

      {/* Columna Deep Learning */}
      <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 grid grid-rows-[auto_1fr]">
        <h4 className="text-center font-bold text-indigo-700 mb-4 border-b border-indigo-200 pb-2">Deep Learning</h4>
        <div className="grid grid-cols-1 gap-3 h-full grid-rows-[auto_1fr_auto]">
          <div className="bg-white p-3 rounded border border-indigo-200 text-center text-sm shadow-sm">Input</div>
          
          <div className="bg-indigo-600 rounded-lg p-1 text-white grid place-items-center relative shadow-md">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 bg-indigo-200 text-indigo-800 text-[10px] py-1 px-2 rounded rotate-[-90deg] origin-center w-32 text-center font-bold">
               END-TO-END
             </div>
             <div className="text-center p-4">
               <Network className="w-10 h-10 mx-auto opacity-80 mb-2" />
               <span className="block font-bold text-sm">Extracción + Clasificación</span>
               <p className="text-[10px] opacity-70 mt-1">Red Neuronal Profunda</p>
             </div>
          </div>

          <div className="bg-slate-800 text-white p-3 rounded text-center text-sm shadow-sm mt-auto">Salida</div>
        </div>
      </div>

    </div>
  );
};

const PillarsDiagram: React.FC = () => {
  return (
    <div className="w-full h-full p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Pilar 1 */}
      <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow grid grid-rows-[auto_1fr]">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Database className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-700">Datos (Big Data)</h4>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          La disponibilidad masiva de datos etiquetados (ImageNet, Internet) permite entrenar modelos generalizables sin sobreajuste inmediato.
        </p>
      </div>

      {/* Pilar 2 */}
      <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-shadow grid grid-rows-[auto_1fr]">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-700">Hardware (GPU)</h4>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          El procesamiento paralelo masivo de las GPUs permite realizar operaciones matriciales necesarias para las redes neuronales a gran velocidad.
        </p>
      </div>

      {/* Pilar 3 */}
      <div className="bg-gradient-to-br from-pink-50 to-white p-4 rounded-xl border border-pink-100 hover:shadow-md transition-shadow grid grid-rows-[auto_1fr]">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-pink-100 p-2 rounded-lg text-pink-600">
            <GitGraph className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-700">Algoritmos</h4>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Innovaciones críticas: Funciones de activación (ReLU) que evitan el desvanecimiento del gradiente, Transformers y redes residuales (ResNets).
        </p>
      </div>

      {/* Pilar 4 */}
      <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-100 hover:shadow-md transition-shadow grid grid-rows-[auto_1fr]">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-700">Optimización</h4>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Mejores optimizadores (Adam, RMSprop) y frameworks de software maduros (TensorFlow, PyTorch) que democratizan la implementación.
        </p>
      </div>
    </div>
  );
};

// --- Layout Principal y Estructura ---

const LessonLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Grid layout puro: Header arriba, contenido abajo.
  // Sin flexbox para la estructura mayor.
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {children}
      </div>
    </div>
  );
};

const Header: React.FC = () => (
  <header className="grid grid-cols-[auto_1fr] items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
    <div className="bg-indigo-600 text-white p-2 rounded-lg">
      <Brain className="w-6 h-6" />
    </div>
    <div>
      <h1 className="text-xl font-bold text-slate-900">Fundamentos de Deep Learning</h1>
    </div>
  </header>
);

const Tabs: React.FC<{ 
  items: SectionData[]; 
  activeId: string; 
  onChange: (id: string) => void 
}> = ({ items, activeId, onChange }) => {
  return (
    <nav className="grid grid-cols-3 gap-2 bg-slate-200/50 p-1 rounded-xl">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`
              py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200
              ${isActive 
                ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5' 
                : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'}
            `}
          >
            {item.shortTitle}
          </button>
        );
      })}
    </nav>
  );
};

// --- Componente Principal de la App ---

const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);

  const currentData = lessonData.find(d => d.id === activeTabId) || lessonData[0];

  const renderDiagram = () => {
    switch (currentData.diagramType) {
      case 'hierarchy': return <HierarchyDiagram />;
      case 'comparative': return <ComparativeDiagram />;
      case 'pillars': return <PillarsDiagram />;
      default: return null;
    }
  };

  return (
    <LessonLayout>
      <Header />
      
      <Tabs 
        items={lessonData} 
        activeId={activeTabId} 
        onChange={setActiveTabId} 
      />

      {/* Contenido Principal: Grid de 2 columnas en Desktop */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        
        {/* Panel de Texto (Izquierda) */}
        <div className="lg:col-span-4 h-full">
          <Card className="h-full bg-white border-none shadow-md" title="">
            <div className="p-6 grid grid-cols-1 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentData.title}</h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {currentData.description}
                </p>
              </div>
              
            </div>
          </Card>
        </div>

        {/* Panel Visual (Derecha) */}
        <div className="lg:col-span-8 h-full min-h-[400px]">
          <Card className="h-full bg-slate-50/50" title="">
            {renderDiagram()}
          </Card>
        </div>

      </main>
    </LessonLayout>
  );
};

export default App;