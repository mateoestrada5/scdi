import { memo, useState } from 'react';
import StatusIcon from './StatusIcon';

const ConceptTree = memo(function ConceptTree({ node, currentNodeId, selections, currentPath, setCurrentPath, isEditMode, updateNode }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(node.title);
  
  const isSelected = !!selections[node.id];
  const isRoot = node.id === 'root';
  
  const visibleChildren = node.children ? node.children.filter(child => {
    return selections[child.id] || 
           selections[node.id] || 
           child.id === currentPath[1] || 
           isRoot;
  }) : [];
  
  const isCurrent = currentNodeId === node.id;
  const hasVisibleChildren = visibleChildren.length > 0;

  // Manejar la edición del título
  const handleTitleDoubleClick = () => {
    if (isEditMode && !isRoot) {
      setIsEditingTitle(true);
    }
  };

  const handleTitleSave = () => {
    if (editedTitle.trim() !== '') {
      updateNode(node.id, { title: editedTitle.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setEditedTitle(node.title);
      setIsEditingTitle(false);
    }
  };



  // Determinar el color de fondo según el estado
  const getBackgroundColor = () => {
    if (!isSelected) return 'bg-white';
    const status = selections[node.id]?.status;
    if (status === 'done') return 'bg-green-100';
    if (status === 'pending') return 'bg-[#FFF8E1]'; // Amarillo más suave y elegante
    return 'bg-white';
  };

  // Determinar el color de borde y sombra según el estado
  const getBorderAndShadow = () => {
    if (isCurrent) {
      if (isSelected) {
        const status = selections[node.id]?.status;
        if (status === 'done') return 'border-[#005C35] ring-2 ring-[#005C35]/20 shadow-lg scale-105';
        if (status === 'pending') return 'border-[#F2A900] ring-2 ring-[#F2A900]/20 shadow-lg scale-105';
      }
      return 'border-[#005C35] ring-2 ring-[#005C35]/20 shadow-lg scale-105';
    }
    return 'border-gray-200 shadow-sm';
  };

  return (
    <li>
      <div 
        onClick={() => {
          if (node.id === 'root') setCurrentPath(['root']);
        }}
        onDoubleClick={handleTitleDoubleClick}
        className={`
          node-card relative inline-flex flex-col items-center p-3 rounded-xl border-2 transition-all z-10
          ${getBorderAndShadow()}
          ${getBackgroundColor()}
          ${isRoot ? 'cursor-pointer hover:border-[#005C35]/50' : isEditMode ? 'cursor-text' : 'cursor-default'}
        `}
        role={isRoot ? "button" : "presentation"}
        tabIndex={isRoot ? 0 : -1}
        aria-label={`Nodo: ${node.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (node.id === 'root') setCurrentPath(['root']);
          }
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          {isSelected ? (
            <StatusIcon status={selections[node.id]?.status} className="w-5 h-5" />
          ) : (
            <div className={`w-4 h-4 rounded-full border-2 ${isRoot ? 'bg-[#005C35] border-[#005C35]' : 'border-gray-300'}`} />
          )}
          {isEditingTitle ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              className="font-bold text-sm text-gray-700 bg-white border border-[#005C35] rounded px-2 py-1 outline-none min-w-[120px]"
            />
          ) : node.imageUrl ? (
            <div className="relative group">
              <img 
                src={node.imageUrl}
                alt={node.title}
                className="h-8 w-auto max-w-[100px] object-contain"
              />
              {/* Tooltip con el título */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {node.title}
              </div>
            </div>
          ) : (
            <span 
              className={`font-bold whitespace-nowrap ${isRoot ? 'text-lg text-[#005C35]' : 'text-sm text-gray-700'}`}
              title={isEditMode && !isRoot ? 'Doble click para editar' : ''}
            >
              {node.title}
            </span>
          )}
        </div>
        {!isRoot && (
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full max-w-[150px] truncate text-center ${isSelected ? (selections[node.id].status === 'done' ? 'text-[#005C35] bg-[#005C35]/10' : 'text-[#b58500] bg-[#F2A900]/20') : 'text-gray-400 bg-gray-100'}`}>
            {isSelected ? (selections[node.id].status === 'done' ? 'Implementado' : 'Pendiente') : 'Disponible'}
          </span>
        )}
      </div>

      {hasVisibleChildren && (
        <ul>
          {visibleChildren.map(child => (
            <ConceptTree 
              key={child.id} 
              node={child}
              currentNodeId={currentNodeId}
              selections={selections}
              currentPath={currentPath}
              setCurrentPath={setCurrentPath}
              isEditMode={isEditMode}
              updateNode={updateNode}
            />
          ))}
        </ul>
      )}
    </li>
  );
});

export default ConceptTree;