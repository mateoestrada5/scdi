import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Edit2, FileText, Share2, MessageCircle } from 'lucide-react';
import useIntegrationBuilder from './hooks/useIntegrationBuilder';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import NodeActions from './components/NodeActions';
import TechnicalDetails from './components/TechnicalDetails';
import ChildrenList from './components/ChildrenList';
import ConceptTree from './components/ConceptTree';
import ReportModal from './components/ReportModal';
import EditNodePanel from './components/EditNodePanel';

export default function SiroIntegrationBuilder() {
  const {
    currentPath,
    setCurrentPath,
    selections,
    toggleSelection,
    updateStatus,
    roadmapName,
    setRoadmapName,
    showReport,
    setShowReport,
    isEditingTitle,
    setIsEditingTitle,
    hasEditedTitle,
    setHasEditedTitle,
    currentNode,
    currentNodeId,
    findNode,
    selectedNodes,
    isEditMode,
    setIsEditMode,
    treeData,
    updateNode,
    addChildNode,
    deleteNode,
    resetTreeData,
  } = useIntegrationBuilder();

  // Estado para pan y zoom
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Centrar el contenido al inicio
  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current;
      const content = contentRef.current;
      const containerWidth = container.offsetWidth;
      const contentWidth = content.offsetWidth;
      
      // Centrar horizontalmente y posicionar arriba
      const centerX = (containerWidth - contentWidth) / 2;
      setPosition({ x: centerX, y: 80 });
    }
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] overflow-hidden font-sans text-gray-800 p-4 gap-4">
      
      {/* --- PANEL IZQUIERDO (CONTROLES) --- */}
      <aside className="ml-10 w-5/10 flex flex-col bg-white shadow-xl z-20 rounded-xl overflow-hidden p-4">
        
        <Header isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
        
        {isEditMode && (
          <div className="mx-6 mt-4 p-3 bg-[#F2A900]/10 border-l-4 border-[#F2A900] rounded-lg">
            <p className="text-sm font-semibold text-gray-800">
              🎨 Modo Edición Activo
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Doble click en nodos del árbol para editar. Los cambios se perderán al recargar la página.
            </p>
          </div>
        )}
        
        <Breadcrumbs 
          currentPath={currentPath} 
          findNode={findNode} 
          setCurrentPath={setCurrentPath} 
        />

        {/* Contenido Principal (Scrollable) */}
        <main className="flex-1 overflow-y-auto px-6 pb-6">
          {currentNode ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {isEditMode ? (
                // --- MODO EDICIÓN ---
                <EditNodePanel 
                  currentNode={currentNode}
                  updateNode={updateNode}
                  addChildNode={addChildNode}
                  deleteNode={deleteNode}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                />
              ) : (
                // --- MODO NORMAL ---
                <>
                  <section className="mb-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-black text-[#005C35] mt-2 mb-2 leading-tight tracking-tight">
                      {currentNode.title}
                    </h1>
                    <div className="h-1 w-20 bg-[#F2A900] rounded-full mb-4" aria-hidden="true"></div>
                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                      {currentNode.description}
                    </p>
                  </div>
                  {currentPath.length > 1 && (
                    <button
                      onClick={() => setCurrentPath(currentPath.slice(0, -1))}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors mt-2 flex-shrink-0"
                      aria-label="Volver al nodo padre"
                    >
                      <ArrowLeft size={18} /> Volver
                    </button>
                  )}
                </div>
              </section>

              <NodeActions 
                currentNode={currentNode}
                selections={selections}
                toggleSelection={toggleSelection}
                updateStatus={updateStatus}
              />

              <TechnicalDetails currentNode={currentNode} />

              <ChildrenList 
                children={currentNode.children}
                selections={selections}
                setCurrentPath={setCurrentPath}
                currentPath={currentPath}
              />
              </>
            )}

            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">Nodo no encontrado</div>
          )}
        </main>
        
      </aside>

      {/* --- PANEL DERECHO (VISUALIZACIÓN MAPA CONCEPTUAL) --- */}
      <section className="w-7/12 flex flex-col relative">
        
        {/* Banner de modo edición en el árbol */}
        {isEditMode && (
          <div className="absolute top-16 left-4 z-30 bg-[#F2A900] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            Modo Edición: Doble click para editar
          </div>
        )}
        
        {/* Botón flotante de reporte */}
        <button 
          onClick={() => setShowReport(true)}
          className="absolute top-4 right-4 z-30 bg-[#005C35] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#004d2c] flex items-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-95"
          aria-label="Generar reporte de integración"
        >
          <FileText size={16} /> Generar Reporte
        </button>
        
        {/* Contenedor del Árbol con Pan y Zoom */}
        <div 
          ref={containerRef}
          className="flex-1 overflow-hidden relative cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => {
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
              });
            }
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onWheel={(e) => {
            e.preventDefault();
            const delta = e.deltaY * -0.001;
            const newScale = Math.min(Math.max(0.5, scale + delta), 3);
            setScale(newScale);
          }}
        >
          <div 
            ref={contentRef}
            className="absolute"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'top left',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
            }}
          >
            
            {/* Título Editable de la Integración */}
            <div className="text-center mb-12 group">
              {isEditingTitle ? (
                <input 
                  type="text" 
                  autoFocus
                  className="text-2xl font-black text-center text-gray-800 tracking-tight bg-white border border-[#005C35] rounded-lg px-4 py-2 outline-none shadow-lg w-full max-w-lg"
                  value={roadmapName}
                  onChange={(e) => setRoadmapName(e.target.value)}
                  onBlur={() => {
                    setIsEditingTitle(false);
                    setHasEditedTitle(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsEditingTitle(false);
                      setHasEditedTitle(true);
                    }
                  }}
                  aria-label="Nombre del proyecto"
                />
              ) : (
                <>
                  <div 
                    className="flex items-center justify-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-white/50 transition-colors"
                    onClick={() => setIsEditingTitle(true)}
                    role="button"
                    tabIndex={0}
                    aria-label="Editar nombre del proyecto"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsEditingTitle(true);
                      }
                    }}
                  >
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                      {roadmapName}
                    </h2>
                    <Edit2 size={18} className="text-gray-400 group-hover:text-[#005C35]" />
                  </div>
                  {!hasEditedTitle && (
                    <p className="text-xs text-gray-400 font-medium mt-1">
                      Haz clic para editar el nombre del proyecto
                    </p>
                  )}
                </>
              )}
            </div>
            
            <nav className="tree" aria-label="Árbol de soluciones SIRO">
              <ul>
                <ConceptTree 
                  node={treeData}
                  currentNodeId={currentNodeId}
                  selections={selections}
                  currentPath={currentPath}
                  setCurrentPath={setCurrentPath}
                  isEditMode={isEditMode}
                  updateNode={updateNode}
                />
              </ul>
            </nav>

            {Object.keys(selections).length === 0 && (
              <div className="text-center mt-20 p-3 max-w-sm mx-auto border-2 border-dashed border-gray-300 rounded-2xl bg-white/50">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <ArrowLeft size={24} />
                </div>
                <p className="text-gray-500 font-medium">
                  Comienza seleccionando servicios en el panel izquierdo.
                </p>
              </div>
            )}
          </div>
          
          {/* Indicador de zoom */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md text-xs font-semibold text-gray-600 pointer-events-none">
            Zoom: {Math.round(scale * 100)}%
          </div>
        </div>
      </section>

      {/* --- MODAL REPORTE --- */}
      <ReportModal 
        showReport={showReport}
        setShowReport={setShowReport}
        roadmapName={roadmapName}
        selectedNodes={selectedNodes}
      />

    </div>
  );
}