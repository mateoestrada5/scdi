import { ChevronRight } from 'lucide-react';
import StatusIcon from './StatusIcon';

export default function ChildrenList({ children, selections, setCurrentPath, currentPath }) {
  if (!children || children.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">
        Siguientes Pasos
      </h3>
      <div className="grid gap-3">
        {children.map(child => (
          <button
            key={child.id}
            onClick={() => setCurrentPath([...currentPath, child.id])}
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-[#005C35] hover:shadow-md transition-all text-left group"
            aria-label={`Ver detalles de ${child.title}`}
          >
            <div className="flex items-center gap-4">
              {selections[child.id] ? (
                <StatusIcon status={selections[child.id].status} className="w-6 h-6" />
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-[#F2A900] bg-gray-50" />
              )}
              <div className="flex-1">
                {child.imageUrl ? (
                  <div className="flex items-center gap-3">
                    <img 
                      src={child.imageUrl} 
                      alt={child.title}
                      className="h-6 w-auto max-w-[80px] object-contain"
                    />
                    <span className="font-bold text-gray-800 block group-hover:text-[#005C35] transition-colors">
                      {child.title}
                    </span>
                  </div>
                ) : (
                  <span className="font-bold text-gray-800 block group-hover:text-[#005C35] transition-colors">
                    {child.title}
                  </span>
                )}
                <span className="text-sm text-gray-500 line-clamp-1 font-medium">
                  {child.description}
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#005C35] group-hover:text-white transition-colors">
              <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
