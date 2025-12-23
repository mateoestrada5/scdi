import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function EditNodePanel({ currentNode, updateNode, addChildNode, deleteNode, currentPath, setCurrentPath }) {
  const [editedData, setEditedData] = useState({
    title: currentNode.title,
    imageUrl: currentNode.imageUrl || '',
    description: currentNode.description,
    techDetails: currentNode.techDetails || '',
    snippet: currentNode.snippet || ''
  });

  const handleSave = () => {
    updateNode(currentNode.id, editedData);
  };

  const handleAddChild = () => {
    const newNodeId = addChildNode(currentNode.id);
    setCurrentPath([...currentPath, newNodeId]);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de eliminar "${currentNode.title}"?`)) {
      deleteNode(currentNode.id);
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const isRoot = currentNode.id === 'root';

  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#005C35]">Editar Nodo</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-2 bg-[#005C35] text-white rounded-lg hover:bg-[#004d2c] font-medium text-sm transition-all"
          >
            <Save size={16} /> Guardar
          </button>
          {!isRoot && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium text-sm transition-all"
            >
              <Trash2 size={16} /> Eliminar
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={editedData.title}
            onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#005C35] focus:ring-1 focus:ring-[#005C35]"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            URL de Imagen (opcional)
          </label>
          <input
            type="text"
            value={editedData.imageUrl}
            onChange={(e) => setEditedData({ ...editedData, imageUrl: e.target.value })}
            placeholder="https://ejemplo.com/imagen.png"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#005C35] focus:ring-1 focus:ring-[#005C35]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Si agregas una imagen, reemplazará al título en el árbol (el título se verá al pasar el mouse)
          </p>
          {editedData.imageUrl && (
            <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">Vista previa:</p>
              <img 
                src={editedData.imageUrl} 
                alt="Preview" 
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <p className="hidden text-xs text-red-500">Error al cargar la imagen</p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={editedData.description}
            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#005C35] focus:ring-1 focus:ring-[#005C35] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Documentación Técnica
          </label>
          <textarea
            value={editedData.techDetails}
            onChange={(e) => setEditedData({ ...editedData, techDetails: e.target.value })}
            rows={3}
            placeholder="Detalles técnicos opcionales..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#005C35] focus:ring-1 focus:ring-[#005C35] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Snippet de Código (opcional)
          </label>
          <textarea
            value={editedData.snippet}
            onChange={(e) => setEditedData({ ...editedData, snippet: e.target.value })}
            rows={4}
            placeholder="// Ejemplo de código..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#005C35] focus:ring-1 focus:ring-[#005C35] resize-none font-mono text-sm"
          />
        </div>

        <button
          onClick={handleAddChild}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F2A900] text-white rounded-lg hover:bg-[#d99700] font-bold transition-all"
        >
          <Plus size={18} /> Agregar Nodo Hijo
        </button>
      </div>
    </div>
  );
}
