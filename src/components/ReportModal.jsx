import { Download } from 'lucide-react';
import StatusIcon from './StatusIcon';
import jsPDF from 'jspdf';


// Modal de reporte detallado
export default function ReportModal({ showReport, setShowReport, roadmapName, selectedNodes }) {
  if (!showReport) return null;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    // Configurar fuente para el título
    doc.setFontSize(18);
    doc.setTextColor(0, 92, 53); // #005C35
    doc.text(roadmapName, margin, yPosition);
    yPosition += 7;

    // Subtítulo
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Reporte de Integración Técnica', margin, yPosition);
    yPosition += 15;

    // Línea separadora
    doc.setDrawColor(0, 92, 53);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    if (selectedNodes.length === 0) {
      doc.setFontSize(10);
      doc.setTextColor(128, 128, 128);
      doc.text('No hay servicios seleccionados.', margin, yPosition);
    } else {
      selectedNodes.forEach((item, index) => {
        // Verificar si necesitamos una nueva página
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }

        // Título del servicio
        doc.setFontSize(12);
        doc.setTextColor(0, 92, 53);
        const statusText = item.status === 'done' ? 'IMPLEMENTADO' : 'PENDIENTE';
        doc.text(`${item.title} [${statusText}]`, margin, yPosition);
        yPosition += 7;

        // Descripción
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        const descLines = doc.splitTextToSize(item.description, maxWidth);
        doc.text(descLines, margin + 5, yPosition);
        yPosition += descLines.length * 5 + 3;

        // Nota técnica si existe
        if (item.techDetails) {
          if (yPosition > 260) {
            doc.addPage();
            yPosition = 20;
          }
          doc.setFontSize(8);
          doc.setTextColor(0, 92, 53);
          doc.text('Nota Técnica:', margin + 5, yPosition);
          yPosition += 5;
          doc.setTextColor(80, 80, 80);
          const techLines = doc.splitTextToSize(item.techDetails, maxWidth - 10);
          doc.text(techLines, margin + 5, yPosition);
          yPosition += techLines.length * 4 + 3;
        }

        // Snippet de código si existe
        if (item.snippet) {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          doc.setFontSize(7);
          doc.setTextColor(100, 100, 100);
          doc.text('Código:', margin + 5, yPosition);
          yPosition += 4;
          doc.setFont('courier');
          const codeLines = doc.splitTextToSize(item.snippet, maxWidth - 10);
          doc.text(codeLines, margin + 5, yPosition);
          doc.setFont('helvetica');
          yPosition += codeLines.length * 3 + 3;
        }

        // Espacio entre servicios
        yPosition += 8;
      });
    }

    // Agregar pie de página con información de contacto en todas las páginas
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const pageHeight = doc.internal.pageSize.getHeight();
      
      // Línea separadora
      doc.setDrawColor(0, 92, 53);
      doc.setLineWidth(0.5);
      doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
      
      // Información de contacto
      doc.setFontSize(10);
      doc.setTextColor(0, 92, 53);
      doc.setFont('helvetica', 'bold');
      doc.text('No dudes en consultar cualquier duda a nuestros Desarrolladores:', margin, pageHeight - 18);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text('Tel: +54 11 1234-5678', margin, pageHeight - 13);
      doc.text('Email: soporte@siro.com.ar', margin, pageHeight - 8);
    }

    // Guardar el PDF
    doc.save(`${roadmapName.replace(/\s+/g, '_')}_Reporte.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-[#005C35]/20 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-[#005C35]/20"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-title"
      >
        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-[#005C35]/20 pb-4">
              <div>
                <h2 id="report-title" className="text-2xl font-bold text-[#005C35]">{roadmapName}</h2>
                <p className="text-sm text-gray-500">Reporte de Integración Técnica</p>
              </div>
              <button 
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-[#F2A900]/20 text-[#d99700] rounded hover:bg-[#F2A900]/30 font-semibold transition-colors"
                aria-label="Descargar reporte en PDF"
              >
                <Download size={16} /> Descargar PDF
              </button>
            </div>

            {selectedNodes.length === 0 && (
              <p className="text-gray-500 italic">No hay servicios seleccionados.</p>
            )}

            {selectedNodes.map((item) => (
              <article 
                key={item.id} 
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm border-l-4 border-l-[#005C35]"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <StatusIcon status={item.status} className="w-5 h-5" />
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="h-8 w-auto max-w-[80px] object-contain"
                      />
                    )}
                    <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${item.status === 'done' ? 'bg-[#005C35]/10 text-[#005C35]' : 'bg-[#F2A900]/20 text-[#b58500]'}`}>
                      {item.status === 'done' ? 'IMPLEMENTADO' : 'PENDIENTE'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-1 ml-7">{item.description}</p>
                
                {item.techDetails && (
                  <div className="mt-3 ml-7 bg-gray-50 p-3 rounded text-sm text-gray-700 border border-gray-100">
                    <strong className="text-[#005C35]">Nota Técnica:</strong> {item.techDetails}
                  </div>
                )}

                {item.snippet && (
                  <div className="mt-2 ml-7">
                    <pre className="bg-[#1a2e26] text-gray-100 p-3 rounded-lg text-xs overflow-x-auto font-mono border-l-4 border-[#F2A900]">
                      {item.snippet}
                    </pre>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
        <div className="p-6 border-t bg-gray-50 rounded-b-2xl flex justify-end">
          <button 
            onClick={() => setShowReport(false)}
            className="px-8 py-3 bg-[#005C35] text-white rounded-full hover:bg-[#004d2c] font-bold shadow-lg transition-transform active:scale-95"
            aria-label="Cerrar reporte"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
