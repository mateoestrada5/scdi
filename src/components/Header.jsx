import { CheckCircle, Edit3, Save } from 'lucide-react';

// Encabezado con logo SIRO y eslogan
export default function Header({ isEditMode, setIsEditMode }) {
  return (
    <header className="m-4 mb-0 p-4 bg-white border-2 border-[#005C35] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <img 
          src="https://mateoestrada5.github.io/integration-builder-v1/logoSiro.png"
          alt="SIRO Logo" 
          className="h-10 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden items-center" aria-label="SIRO">
          <span className="text-2xl font-black text-[#005C35] tracking-tighter">SIRO</span>
          <div className="w-4 h-4 rounded-full bg-[#F2A900] ml-1 flex items-center justify-center">
            <CheckCircle size={10} className="text-white" />
          </div>
        </div>
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
