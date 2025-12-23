// Encabezado con logo SIRO y eslogan
export default function Header() {
  return (
    <header className="m-4 mb-0 p-4 bg-white border-2 border-[#005C35] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl flex justify-between items-center shadow-sm hover:shadow-xl hover:border-[#007843] transition-all duration-300 group">
      <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300">
        <img 
          src="logoSiro.png"
          alt="SIRO Logo" 
          className="h-10 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      </div>
      
      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide group-hover:text-[#005C35] group-hover:tracking-wider transition-all duration-300">
        Constructor de soluciones de pago a medida
      </span>
      
      <div className="w-10"></div>
    </header>
  );
}
