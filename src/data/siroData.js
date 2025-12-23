// --- PALETA DE COLORES SIRO ---
export const SIRO_COLORS = {
  primary: '#005C35',
  secondary: '#F2A900',
  background: '#F3F4F6',
};

// Data y constantes separadas
// --- DATA DE EJEMPLO (Árbol Genérico) ---
export const SIRO_DATA = {
  id: 'root',
  title: 'Nodo Raíz',
  type: 'root',
  description: 'Este es el nodo principal del árbol. Aquí iría la descripción general del servicio V2.',
  children: [
    {
      id: 'node_1',
      title: 'Nodo 1',
      type: 'branch',
      description: 'Descripción del primer nodo. Aquí se explicaría el contexto general de esta rama.',
      techDetails: 'Aquí irían los detalles técnicos o documentación relevante para este nodo.',
      children: [
        {
          id: 'node_1_1',
          title: 'Nodo 1.1',
          type: 'service',
          description: 'Descripción del subnodo 1.1. Explicación de funcionalidad específica.',
          techDetails: 'Detalles de implementación. Información técnica relevante sobre configuración o uso.',
          snippet: `// endpint api/Pago`,
          children: [
            { 
              id: 'node_1_1_1', 
              title: 'Nodo 1.1.1', 
              type: 'feature', 
              description: 'Funcionalidad específica del nodo 1.1.1.',
              techDetails: 'Documentación técnica de esta característica.'
            },
            { 
              id: 'node_1_1_2', 
              title: 'Nodo 1.1.2', 
              type: 'feature', 
              description: 'Funcionalidad específica del nodo 1.1.2.',
              snippet: `<!-- Ejemplo de configuración -->\n<config>\n  <item>valor</item>\n</config>`
            }
          ]
        },
        {
          id: 'node_1_2',
          title: 'Nodo 1.2',
          type: 'service',
          description: 'Descripción del subnodo 1.2. Otra funcionalidad relacionada.',
          techDetails: 'Aquí irían especificaciones técnicas, requisitos o documentación de uso.',
          snippet: `// Otro ejemplo de código\nconst ejemplo = {\n  propiedad: "valor"\n};`,
          children: []
        }
      ]
    },
    {
      id: 'node_2',
      title: 'Nodo 2',
      type: 'branch',
      description: 'Descripción del segundo nodo principal. Contexto de esta sección.',
      children: [
        {
          id: 'node_2_1',
          title: 'Nodo 2.1',
          type: 'service',
          description: 'Descripción de funcionalidad del nodo 2.1.',
          techDetails: 'Aquí iría documentación técnica o guías de implementación.',
          children: []
        },
        {
          id: 'node_2_2',
          title: 'Nodo 2.2',
          type: 'process',
          description: 'Descripción del proceso o flujo del nodo 2.2.',
          techDetails: 'Detalles del proceso, pasos a seguir o configuraciones necesarias.',
          snippet: `# Ejemplo de comando o script\nscript --param valor\noutput: resultado esperado`,
          children: [
            { 
              id: 'node_2_2_1', 
              title: 'Nodo 2.2.1', 
              type: 'config', 
              description: 'Configuración específica del subnodo.',
              techDetails: 'Aquí irían instrucciones de configuración detalladas.'
            },
            { 
              id: 'node_2_2_2', 
              title: 'Nodo 2.2.2', 
              type: 'config', 
              description: 'Otra configuración del mismo nivel.',
              techDetails: 'Documentación de esta configuración en particular.'
            }
          ]
        }
      ]
    },
    {
      id: 'node_3',
      title: 'Nodo 3',
      type: 'branch',
      description: 'Descripción del tercer nodo. Información adicional sobre esta rama.',
      techDetails: 'Documentación general de este módulo o sección.',
      children: [
        { 
          id: 'node_3_1', 
          title: 'Nodo 3.1', 
          type: 'feature', 
          description: 'Característica o funcionalidad del nodo 3.1.',
          snippet: `/* Ejemplo de implementación */\nclass Ejemplo {\n  constructor() {\n    // Inicialización\n  }\n}`
        },
        { 
          id: 'node_3_2', 
          title: 'Nodo 3.2', 
          type: 'feature', 
          description: 'Otra característica del mismo nivel.',
          techDetails: 'Aquí iría la explicación técnica de cómo usar esta funcionalidad.'
        }
      ]
    }
  ]
};
