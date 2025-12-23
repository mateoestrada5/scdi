import { useState, useCallback, useMemo } from 'react';
import { SIRO_DATA } from '../data/siroData';


// Lógica de negocio centralizada
export default function useIntegrationBuilder() {
  const [currentPath, setCurrentPath] = useState(['root']);
  const [selections, setSelections] = useState({});
  const [roadmapName, setRoadmapName] = useState('Nueva Integración SIRO');
  const [showReport, setShowReport] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [hasEditedTitle, setHasEditedTitle] = useState(false);
  
  // --- NUEVO: Modo de Edición ---
  const [isEditMode, setIsEditMode] = useState(false);
  const [treeData, setTreeData] = useState(SIRO_DATA);


  // Buscar nodo por ID (recursivo) - memoizado - ahora usa treeData editable
  const findNode = useCallback((id, nodes = [treeData]) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(id, node.children);
        if (found) return found;
      }
    }
    return null;
  }, [treeData]);

  const currentNodeId = currentPath[currentPath.length - 1];
  const currentNode = useMemo(() => findNode(currentNodeId), [currentNodeId, findNode]);

  // Toggle selección
  const toggleSelection = useCallback((nodeId) => {
    setSelections(prev => {
      const next = { ...prev };
      if (next[nodeId]) {
        delete next[nodeId];
      } else {
        next[nodeId] = { status: 'pending', notes: '' };
      }
      return next;
    });
  }, []);

  // Cambiar estado (Pending -> Done)
  const updateStatus = useCallback((nodeId, newStatus) => {
    setSelections(prev => ({
      ...prev,
      [nodeId]: { ...prev[nodeId], status: newStatus }
    }));
  }, []);

  // Generar nodos seleccionados para el reporte
  const selectedNodes = useMemo(() => {
    const nodes = [];
    
    const traverse = (nodeList, depth = 0) => {
      nodeList.forEach(node => {
        if (selections[node.id]) {
          nodes.push({ ...node, ...selections[node.id], depth });
        }
        if (node.children) traverse(node.children, depth + 1);
      });
    };
    traverse([treeData]);

    return nodes;
  }, [selections, treeData]);

  // --- FUNCIONES DE EDICIÓN ---
  
  // Actualizar un nodo en el árbol
  const updateNode = useCallback((nodeId, updates) => {
    const updateRecursive = (node) => {
      if (node.id === nodeId) {
        return { ...node, ...updates };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateRecursive)
        };
      }
      return node;
    };
    
    setTreeData(prev => updateRecursive(prev));
  }, []);

  // Agregar un nuevo nodo hijo
  const addChildNode = useCallback((parentId) => {
    const newNodeId = `node_${Date.now()}`;
    const newNode = {
      id: newNodeId,
      title: 'Nuevo Nodo',
      imageUrl: '', // Nueva propiedad para imagen opcional
      type: 'feature',
      description: 'Descripción del nuevo nodo',
      techDetails: '',
      snippet: '',
      children: []
    };

    const addRecursive = (node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode]
        };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(addRecursive)
        };
      }
      return node;
    };

    setTreeData(prev => addRecursive(prev));
    return newNodeId;
  }, []);

  // Eliminar un nodo
  const deleteNode = useCallback((nodeId) => {
    const deleteRecursive = (node) => {
      if (node.children) {
        return {
          ...node,
          children: node.children
            .filter(child => child.id !== nodeId)
            .map(deleteRecursive)
        };
      }
      return node;
    };

    setTreeData(prev => deleteRecursive(prev));
    
    // Eliminar de selecciones también
    setSelections(prev => {
      const next = { ...prev };
      delete next[nodeId];
      return next;
    });
  }, []);

  // Resetear datos al original
  const resetTreeData = useCallback(() => {
    setTreeData(SIRO_DATA);
    setSelections({});
  }, []);

  return {
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
    // --- Modo de Edición ---
    isEditMode,
    setIsEditMode,
    treeData,
    updateNode,
    addChildNode,
    deleteNode,
    resetTreeData,
  };
}
