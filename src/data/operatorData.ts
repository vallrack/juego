export interface CallingCard {
  id: string;
  name: string;
  tag: string;
  gradient: string;
  borderColor: string;
  iconName: string;
  description: string;
}

export const CALLING_CARDS: CallingCard[] = [
  {
    id: 'dark-matter',
    name: 'DARK MATTER ULTRA',
    tag: 'CAMUFLAJE DE MAESTRÍA',
    gradient: 'from-purple-950 via-purple-700 to-fuchsia-600',
    borderColor: 'border-fuchsia-500',
    iconName: 'Sparkles',
    description: 'Reservado para veteranos con control absoluto de pulsación.'
  },
  {
    id: 'ghost-purple',
    name: 'GHOST OPERATOR V',
    tag: 'OPERACIONES SECRETAS',
    gradient: 'from-slate-950 via-purple-900 to-indigo-800',
    borderColor: 'border-purple-400',
    iconName: 'Skull',
    description: 'Silencioso como switch lineal lubricado de 45g.'
  },
  {
    id: 'neon-cyber',
    name: 'CYBER-WARFARE 2042',
    tag: 'INTELIGENCIA ELECTRÓNICA',
    gradient: 'from-purple-900 via-violet-800 to-pink-600',
    borderColor: 'border-violet-400',
    iconName: 'Zap',
    description: 'Transmisión sin pérdidas mediante NKRO completo.'
  },
  {
    id: 'spec-ops',
    name: 'TACTICAL RECON TKL',
    tag: 'FUERZAS ESPECIALES',
    gradient: 'from-zinc-950 via-purple-950 to-purple-800',
    borderColor: 'border-purple-500',
    iconName: 'Crosshair',
    description: 'Despliegue compacto sin concesiones tácticas.'
  }
];

export interface FieldManualTopic {
  id: string;
  title: string;
  badge: string;
  summary: string;
  bullets: string[];
}

export const FIELD_MANUAL_TOPICS: FieldManualTopic[] = [
  {
    id: 'switches',
    title: 'Mecanismos de Switches (Lineal, Táctil, Clicky)',
    badge: 'MECÁNICA CRÍTICA',
    summary: 'El switch define la respuesta táctil, acústica y dinámica de cada pulsación.',
    bullets: [
      'Lineales (Rojos/Amarillos): Cero tope, accionamiento continuo. Los favoritos para shooters por velocidad de repetición.',
      'Táctiles (Marrones/Holy Panda): Presentan un escalón perceptible que confirma el accionamiento sin necesidad de llegar al fondo.',
      'Clicky (Azules): Añaden una lámina resonante que genera un "clic" sonoro agudo. Máxima confirmación auditiva.',
      'Efecto Hall / Magnéticos: Sin contacto metálico; accionan por magnetismo con Rapid Trigger continuo.'
    ]
  },
  {
    id: 'form-factors',
    title: 'Factores de Forma de Teclados (100% al 60%)',
    badge: 'ERGONOMÍA MILITAR',
    summary: 'La elección del tamaño dicta el radio de acción disponible para el mouse táctico.',
    bullets: [
      '100% Full-Size (~104 teclas): Integra teclado numérico, F1-F12 y flechas. Máxima utilidad, pero roba espacio al ratón.',
      '80% TKL (Tenkeyless, ~87 teclas): Elimina el bloque numérico lateral. Equilibrio militar perfecto para shooters y CDL.',
      '75% / 65%: Formatos compactos que agrupan las flechas y teclas de navegación sin espacios muertos.',
      '60% Ultracompacto (~61 teclas): Prescinde de flechas dedicadas y fila F; opera 100% mediante capas FN programables.'
    ]
  },
  {
    id: 'keycaps',
    title: 'Materiales Balísticos: PBT vs ABS',
    badge: 'BLINDAJE DE TECLAS',
    summary: 'El polímero de las teclas determina la durabilidad ante el sudor y la fricción prolongada.',
    bullets: [
      'PBT (Polibutileno Tereftalato): Alta densidad, sonido más grave ("thock"), no se desgasta ni produce brillo resbaladizo.',
      'ABS (Acrilonitrilo Butadieno Estireno): Más liviano y brillante. Con el uso genera una capa lustrosa aceitosa ("shine").',
      'Double-Shot: Técnica de moldeo de dos plásticos inyectados que hace imposible que las leyendas se borren.'
    ]
  },
  {
    id: 'layouts',
    title: 'Distribución Topográfica: ANSI vs ISO',
    badge: 'ESTÁNDARES DE MAPEO',
    summary: 'Diferencias anatómicas estándar entre regiones operativas internacionales.',
    bullets: [
      'ANSI (Estándar de EE. UU.): Tecla Enter horizontal recta (1 fila) y Shift izquierdo largo.',
      'ISO (Estándar Internacional/Europeo): Tecla Enter vertical en forma de L invertida (2 filas) y Shift izquierdo corto con tecla adicional contigua.',
      'Compatibilidad: Verifica siempre la distribución antes de equipar placas o conjuntos de teclas tácticos.'
    ]
  }
];

export function getRankBadge(scoreXP: number): { rank: string; tag: string; prestigeLevel: number } {
  if (scoreXP >= 100) {
    return { rank: 'OPERADOR ÉLITE EN TECLADOS', tag: 'PRESTIGIO MAESTRO', prestigeLevel: 5 };
  } else if (scoreXP >= 80) {
    return { rank: 'TENIENTE ESPECIALISTA', tag: 'PRESTIGIO 4', prestigeLevel: 4 };
  } else if (scoreXP >= 60) {
    return { rank: 'SARGENTO TÁCTICO', tag: 'PRESTIGIO 3', prestigeLevel: 3 };
  } else if (scoreXP >= 40) {
    return { rank: 'CABO DE ASALTO', tag: 'PRESTIGIO 2', prestigeLevel: 2 };
  } else if (scoreXP >= 20) {
    return { rank: 'SOLDADO DE PRIMERA', tag: 'PRESTIGIO 1', prestigeLevel: 1 };
  } else {
    return { rank: 'RECLUTA DE CAMPO', tag: 'SIN CLASIFICAR', prestigeLevel: 0 };
  }
}
