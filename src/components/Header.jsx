import { CheckCircle, Edit3, Save } from 'lucide-react';

// Encabezado con logo SIRO y eslogan
export default function Header({ isEditMode, setIsEditMode }) {
  // Construir la ruta correcta usando la base URL de Vite
  const logoPath = `${import.meta.env.BASE_URL}logoSiro.png`;
  
  return (
    <header className="m-4 mb-0 p-4 bg-white border-2 border-[#005C35] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <img 
          src={logoPath}
          alt="SIRO Logo" 
          className="h-10 object-contain"
          onError={(e) => {
            console.error('Error loading logo from:', logoPath);
            // Si falla, mostrar texto como fallback
            e.target.style.display = 'none';
          }}
        />
      </div>
      
      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">
        Constructor de soluciones de pago a medida
      </span>
      
      <button
        onClick={() => setIsEditMode(!isEditMode)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95
          ${isEditMode 
            ? 'bg-[#005C35] text-white hover:bg-[#004d2c]' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
        `}
        aria-label={isEditMode ? 'Guardar cambios' : 'Modo edición'}
      >
        {isEditMode ? (
          <>
            <Save size={16} />
            Guardar
          </>
        ) : (
          <>
            <Edit3 size={16} />
          </>
        )}
      </button>
    </header>
  );
}