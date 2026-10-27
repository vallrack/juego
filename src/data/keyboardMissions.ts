import { TacticalQuestion } from '../types/game';

export const KEYBOARD_MISSIONS: TacticalQuestion[] = [
  {
    id: 1,
    code: 'OBJ-SW-01',
    sector: 'SECTOR ALPHA // VANGUARDIA MECÁNICA',
    category: 'SWITCHES',
    categoryLabel: 'MECANISMOS DE DISPARO',
    title: 'Identificación de Switch de Reacción Inmediata',
    intelBrief: 'Operador, en combate a corta distancia necesitas una pulsación fluida y sin tropiezos para ejecutar ametrallamientos laterales continuos ("strafe"). ¿Qué tipología de switch mecánico carece de protuberancia táctil y de clic sonoro, ofreciendo un recorrido directo y suave de inicio a fin?',
    options: [
      {
        letter: 'A',
        text: 'Switch Lineal (ej. Cherry MX Red / Gateron Yellow)',
        subtext: 'Recorrido uniforme y suave sin resistencia intermedia'
      },
      {
        letter: 'B',
        text: 'Switch Táctil (ej. Cherry MX Brown / Holy Panda)',
        subtext: 'Bache físico de resistencia perceptible antes de la activación'
      },
      {
        letter: 'C',
        text: 'Switch Clicky / Sonoro (ej. Cherry MX Blue / Kailh Box White)',
        subtext: 'Chicote acústico y golpe táctil con lámina resonante'
      },
      {
        letter: 'D',
        text: 'Switch Silenciador de Cúpula de Caucho Pasivo',
        subtext: 'Membrana de contacto sin resorte de retorno metálico'
      }
    ],
    correctIndex: 0,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: SWITCHES LINEALES',
      summary: 'Los switches lineales son el estándar táctico de asalto para eSports y shooters de ritmo acelerado. Al no presentar bache táctil ni retardo acústico, permiten dobles pulsaciones (double-tapping) con la mínima latencia motriz.',
      tacticalTakeaway: 'Fuerza típica de 45cN y recorrido de 4.0mm (2.0mm de activación). Ideal para movimiento rápido de infantería.',
      technicalSpecs: [
        { label: 'Tipo de Recorrido', value: 'Lineal Constante' },
        { label: 'Retroalimentación', value: 'Suave / Cero Clack' },
        { label: 'Punto de Activación', value: '1.2mm a 2.0mm' },
        { label: 'Misión Óptima', value: 'Shooters en 1ª Persona (FPS)' }
      ]
    }
  },
  {
    id: 2,
    code: 'OBJ-TECH-02',
    sector: 'SECTOR BRAVO // ARQUITECTURA BASE',
    category: 'COMPONENTES',
    categoryLabel: 'MECÁNICO VS MEMBRANA',
    title: 'Descifrado de Matriz de Contactos',
    intelBrief: 'La base de datos táctica interceptó un periférico convencional de baja graduación. ¿Cuál es la diferencia estructural crítica entre un teclado de membrana tradicional y uno mecánico de grado militar?',
    options: [
      {
        letter: 'A',
        text: 'Los teclados mecánicos solo funcionan mediante enlace inalámbrico Bluetooth',
        subtext: 'La membrana requiere cable coaxial blindado'
      },
      {
        letter: 'B',
        text: 'El de membrana usa una cúpula de goma elastómera compartida; el mecánico integra interruptores individuales con muelle y contactos metálicos independientes',
        subtext: 'Modularidad individual por tecla vs lámina flexora unificada'
      },
      {
        letter: 'C',
        text: 'Los teclados de membrana tienen una vida útil superior a 100 millones de pulsaciones',
        subtext: 'La degradación del caucho es nula en combate'
      },
      {
        letter: 'D',
        text: 'El teclado mecánico no cuenta con vástago ni resortes internos de compresión',
        subtext: 'Opera mediante levitación magneto-iónica únicamente'
      }
    ],
    correctIndex: 1,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: INTEGRIDAD DEL INTERRUPTOR',
      summary: 'Los teclados de membrana emplean láminas plásticas con pistas conductoras y cúpulas de silicona que deben aplastarse por completo para cerrar circuito. En cambio, cada interruptor mecánico posee su propio resorte de acero y láminas de cobre (leaf spring), garantizando consistencia milimétrica por 50 a 100 millones de ciclos.',
      tacticalTakeaway: 'Evita la fatiga de "tocar fondo" (bottom-out) y previene falsos contactos bajo fuego intenso.',
      technicalSpecs: [
        { label: 'Durabilidad Mecánica', value: '50M - 100M de pulsaciones' },
        { label: 'Durabilidad Membrana', value: '5M - 10M (pierde elasticidad)' },
        { label: 'Registro de Fuerza', value: 'Curva predecible y uniforme' },
        { label: 'Reparabilidad', value: 'Interruptores reemplazables 1 a 1' }
      ]
    }
  },
  {
    id: 3,
    code: 'OBJ-FORM-03',
    sector: 'SECTOR CHARLIE // LOGÍSTICA DE COMBATE',
    category: 'FORMATOS',
    categoryLabel: 'FACTOR DE FORMA TACTICAL',
    title: 'Protocolo TKL (Tenkeyless / 80%)',
    intelBrief: 'Un tirador de asalto requiere ampliar el radio de giro de su ratón óptico táctico sobre la alfombrilla sin chocar contra el flanco derecho del teclado. ¿Qué sección prescinde específicamente un teclado formato TKL (Tenkeyless / 80%) para optimizar la ergonomía?',
    options: [
      {
        letter: 'A',
        text: 'Elimina las 4 flechas direccionales de navegación',
        subtext: 'Reemplazadas obligatoriamente por joystick analógico'
      },
      {
        letter: 'B',
        text: 'Elimina por completo la fila superior de números (1 al 0)',
        subtext: 'Dejando únicamente el bloque alfanumérico'
      },
      {
        letter: 'C',
        text: 'Prescinde del bloque numérico táctico de 10 teclas (Numpad)',
        subtext: 'Mantiene teclas de función (F1-F12), flechas y bloque de navegación'
      },
      {
        letter: 'D',
        text: 'Elimina las teclas modificadoras de combate (Ctrl, Alt, Shift y Espacio)',
        subtext: 'Condensa la matriz a 40 teclas primarias'
      }
    ],
    correctIndex: 2,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: FACTOR TENKEYLESS (TKL)',
      summary: 'El factor de forma TKL (80% / ~87 teclas) suprime el Numpad numérico de la derecha. Esto acorta el teclado entre 8 y 10 centímetros, permitiendo situar los brazos alineados con los hombros y concediendo amplio espacio de maniobra libre para movimientos rápidos de mira (flick shots).',
      tacticalTakeaway: 'Estándar preferido en torneos profesionales COD League (CDL) para mantener postura centrada.',
      technicalSpecs: [
        { label: 'Teclas Totales', value: '87 (ANSI) / 88 (ISO)' },
        { label: 'Porcentaje de Escala', value: 'Aproximadamente 80%' },
        { label: 'Área Ganada para Mouse', value: '+35% de barrido lateral' },
        { label: 'Elementos Conservados', value: 'F1-F12, Flechas, Ins/Del/Home' }
      ]
    }
  },
  {
    id: 4,
    code: 'OBJ-COMP-04',
    sector: 'SECTOR DELTA // DESPLIEGUE ULTRALIGERO',
    category: 'FORMATOS',
    categoryLabel: 'MINIMALISMO TÁCTICO',
    title: 'Formato de Operaciones Encubiertas 60%',
    intelBrief: 'Para misiones de reconocimiento ultraligero y mochilas de evacuación táctica, los operadores eligen teclados formato 60%. ¿Cuál es la configuración de teclas característica de este factor compacto?',
    options: [
      {
        letter: 'A',
        text: 'Conserva únicamente el teclado numérico derecho montado como macro-pad',
        subtext: 'Elimina todas las letras'
      },
      {
        letter: 'B',
        text: 'Elimina el numpad, las teclas de navegación dedicadas, las flechas y la fila de función F1-F12',
        subtext: 'Acceso a funciones secundarias mediante capas programables con la tecla FN'
      },
      {
        letter: 'C',
        text: 'Mantiene las teclas F1-F12 pero elimina la barra espaciadora principal',
        subtext: 'Dividida en dos botones tácticos pequeños'
      },
      {
        letter: 'D',
        text: 'Conserva el bloque numérico pero remueve las vocales del bloque alfa',
        subtext: 'Para codificación militar criptográfica'
      }
    ],
    correctIndex: 1,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: FORMATO 60% COMPACTO',
      summary: 'El formato 60% consta usualmente de 61 teclas. Suprime el teclado numérico, la fila superior F1-F12 y las flechas de navegación dedicadas. El operador accede a ellas mediante combinaciones de la tecla modificadora FN (por ejemplo, FN+WASD para flechas o FN+1 para F1).',
      tacticalTakeaway: 'Máxima portabilidad táctica y ángulo oblicuo (teclado ladeado) para jugadores con poco espacio de escritorio.',
      technicalSpecs: [
        { label: 'Recuento de Teclas', value: '61 teclas (ANSI)' },
        { label: 'Superficie Ocupada', value: 'Aprox. 29 x 10 cm' },
        { label: 'Mecanismo de Acceso', value: 'Capas de Software / FN Layer' },
        { label: 'Ventaja Principal', value: 'Posicionamiento angular extremo' }
      ]
    }
  },
  {
    id: 5,
    code: 'OBJ-DIST-05',
    sector: 'SECTOR ECHO // MAPA DE OPERACIONES',
    category: 'DISTRIBUCIÓN',
    categoryLabel: 'TOPOGRAFÍA DE TECLAS',
    title: 'Identificación de Distribución ANSI vs ISO',
    intelBrief: 'Durante una incursión internacional, capturas dos teclados: uno con distribución estándar estadounidense (ANSI) y otro europeo (ISO). ¿Cuál es la señal visual irrefutable para distinguir la distribución ISO táctica?',
    options: [
      {
        letter: 'A',
        text: 'La tecla Enter tiene forma de "bota" o "L invertida" de doble fila y la tecla Shift izquierda es más corta con una tecla adicional al lado',
        subtext: 'Marcado europeo con 1 tecla extra en total frente a ANSI'
      },
      {
        letter: 'B',
        text: 'La tecla Shift derecha mide el doble y no existe barra espaciadora',
        subtext: 'Ubicación centralizada de botones de pulgar'
      },
      {
        letter: 'C',
        text: 'La distribución ANSI tiene la tecla Enter vertical de triple fila y carece de tecla Escape',
        subtext: 'Diseño para terminales teletipo del siglo pasado'
      },
      {
        letter: 'D',
        text: 'En ISO todas las letras están dispuestas en orden alfabético estricto de la A a la Z',
        subtext: 'Protocolo de señalización de la OTAN'
      }
    ],
    correctIndex: 0,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: TOPOGRAFÍA ANSI VS ISO',
      summary: 'ANSI (American National Standards Institute) usa un Enter horizontal plano de 2.25U (1 sola fila) y un Left Shift largo de 2.25U. En cambio, ISO (International Organization for Standardization) cuenta con un Enter alto de 2 filas en forma de L invertida, un Left Shift corto (1.25U) y añade una tecla extra contigua (en España alberga los símbolos < >).',
      tacticalTakeaway: 'Comprobar siempre la compatibilidad ANSI/ISO al adquirir sets de keycaps personalizados de combate.',
      technicalSpecs: [
        { label: 'Enter ANSI', value: 'Rectangular horizontal (2.25U)' },
        { label: 'Enter ISO', value: 'Vertical de doble fila (Forma de bota)' },
        { label: 'Shift Izquierdo ANSI', value: 'Largo (2.25U)' },
        { label: 'Shift Izquierdo ISO', value: 'Corto (1.25U) + tecla contigua' }
      ]
    }
  },
  {
    id: 6,
    code: 'OBJ-MAT-06',
    sector: 'SECTOR FOXTROT // BLINDAJE BALÍSTICO',
    category: 'COMPONENTES',
    categoryLabel: 'MATERIALES DE TECLAS',
    title: 'Blindaje de Keycaps: Polímero PBT vs Plástico ABS',
    intelBrief: 'Bajo intensas horas de combate, las teclas de baja graduación desarrollan una pátina aceitosa y brillante que arruina el agarre táctico. ¿Por qué los operadores de élite prefieren keycaps fabricadas en PBT (Polibutileno Tereftalato) sobre las de ABS convencional?',
    options: [
      {
        letter: 'A',
        text: 'El PBT es más denso, resistente a la abrasión por fricción, mantiene su textura mate y no se "abrillanta" con el tiempo ni con el sudor',
        subtext: 'Mayor masa acústica y resistencia térmica y química'
      },
      {
        letter: 'B',
        text: 'El PBT es completamente transparente como el cristal y conduce electricidad',
        subtext: 'Para recargar la batería del teclado con pulsaciones'
      },
      {
        letter: 'C',
        text: 'El plástico ABS resiste 5 veces más temperatura que el PBT y nunca se pule',
        subtext: 'Utilizado en el blindaje de tanques de guerra'
      },
      {
        letter: 'D',
        text: 'El material PBT es de goma blanda y flexible que se deforma al presionar',
        subtext: 'Amortiguación hidrostática de impacto'
      }
    ],
    correctIndex: 0,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: BLINDAJE PBT DE ALTA DENSIDAD',
      summary: 'El ABS (Acrilonitrilo Butadieno Estireno) es económico y fácil de moldear, pero con el roce continuo de las yemas se desgasta y adquiere ese brillo pulido resbaladizo. El PBT es un polímero termoplástico de ingeniería mucho más duro, quebradizo y denso, que conserva su textura rugosa ("chalky") intacta por años.',
      tacticalTakeaway: 'Combinado con la técnica de doble inyección (Double-Shot), las leyendas de las teclas jamás se borrarán.',
      technicalSpecs: [
        { label: 'Resistencia al Brillo ("Shine")', value: 'PBT: Sobresaliente | ABS: Vulnerable' },
        { label: 'Tacto Superficial', value: 'PBT: Texturizado mate | ABS: Liso' },
        { label: 'Sonoridad', value: 'PBT: Grave (Thock) | ABS: Agudo (Clack)' },
        { label: 'Resistencia Térmica', value: 'PBT soporta tintado por sublimación' }
      ]
    }
  },
  {
    id: 7,
    code: 'OBJ-MOD-07',
    sector: 'SECTOR GOLF // MANTENIMIENTO EN CAMPO',
    category: 'TECNOLOGÍA_AVANZADA',
    categoryLabel: 'MODULARIDAD DE CAMPO',
    title: 'Capacidad Hot-Swap (Intercambio en Caliente)',
    intelBrief: 'En pleno despliegue, un switch táctico sufre una falla o el operador desea cambiar a switches lineales más rápidos. ¿Qué tecnología de PCB permite cambiar los interruptores al instante sin recurrir al taller de soldadura con estaño?',
    options: [
      {
        letter: 'A',
        text: 'Protocolo Over-The-Air (OTA) vía radiofrecuencia militar',
        subtext: 'Reprogramación cuántica de la resistencia física'
      },
      {
        letter: 'B',
        text: 'Sockets Hot-Swap (tomas mecánicas Kailh / Gateron / Outemu en la PCB)',
        subtext: 'Permiten insertar o extraer interruptores mecánicos mediante un extractor manual'
      },
      {
        letter: 'C',
        text: 'Soldadura criogénica por plasma de argón',
        subtext: 'Fusión térmica con rayo láser portátil'
      },
      {
        letter: 'D',
        text: 'Blindaje electromagnético hermético con resina epoxi no desmontable',
        subtext: 'Fijación permanente de fábrica a prueba de sabotaje'
      }
    ],
    correctIndex: 1,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: SOCKETS HOT-SWAP',
      summary: 'Las placas base con Hot-Swap incorporan receptáculos metálicos con láminas elásticas en el envés de la PCB. Esto permite retirar un switch averiado con un extractor de teclas y montar uno nuevo de 3 o 5 pines en cuestión de segundos, sin calor ni soldadura.',
      tacticalTakeaway: 'Crucial para personalizar distintas durezas de switch según el sector (WASD lineales rápidos, barra espaciadora más pesada).',
      technicalSpecs: [
        { label: 'Vida Útil del Socket', value: '100 a 200 inserciones seguras' },
        { label: 'Compatibilidad de Pines', value: '3-Pin (Plate-mount) y 5-Pin (PCB-mount)' },
        { label: 'Tiempo de Reemplazo', value: '< 10 segundos por interruptor' },
        { label: 'Mantenimiento', value: 'Lubricación y afinado sin desoldar' }
      ]
    }
  },
  {
    id: 8,
    code: 'OBJ-SENS-08',
    sector: 'SECTOR HOTEL // TRANSMISIÓN CRIPTOGRÁFICA',
    category: 'TECNOLOGÍA_AVANZADA',
    categoryLabel: 'TELEMETRÍA DE ENTRADA',
    title: 'Protocolos Anti-Ghosting y N-Key Rollover (NKRO)',
    intelBrief: 'En combate táctico estás corriendo (Shift), desplazándote en diagonal (W + D), recargando el arma táctica (R) y comunicándote por radio (V) en simultáneo. ¿Qué protocolo de hardware garantiza que TODAS esas pulsaciones se registren sin bloqueos ni teclas fantasmas?',
    options: [
      {
        letter: 'A',
        text: 'N-Key Rollover (NKRO) con diodos independientes por cada interruptor en la PCB',
        subtext: 'Capacidad de registrar ilimitadas teclas presionadas simultáneamente'
      },
      {
        letter: 'B',
        text: 'Limitador de tasa de muestreo PS/2 a 30 Hertzios',
        subtext: 'Buffer de cola simple FIFO de 2 comandos'
      },
      {
        letter: 'C',
        text: 'Filtro de atenuación pasiva por condensador cerámico',
        subtext: 'Ignora pulsaciones consecutivas de más de 3 teclas'
      },
      {
        letter: 'D',
        text: 'Protocolo de bloqueo de emergencia "Panic-Key Override"',
        subtext: 'Cancela la entrada si se detecta pánico en el operador'
      }
    ],
    correctIndex: 0,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: SISTEMA ANTI-GHOSTING Y NKRO',
      summary: 'El "Ghosting" ocurre en teclados baratos cuando al presionar 3 teclas en una misma cuadrícula matricial, la corriente toma un camino cruzado y el controlador registra falsamente una 4ª tecla no presionada. El N-Key Rollover auténtico equipa un diodo de señal unidireccional en cada tecla de la PCB, permitiendo pulsar las 104 teclas al mismo instante con 100% de fiabilidad.',
      tacticalTakeaway: 'Sin NKRO, tus acciones de combate combinadas (Sprint + Slide + Jump + Aim) se perderán en el fragor de la batalla.',
      technicalSpecs: [
        { label: 'Capacidad NKRO', value: 'Todas las teclas a la vez (100% fiabilidad)' },
        { label: 'Solución de Hardware', value: 'Diodo de conmutación 1N4148 por switch' },
        { label: 'Estándar USB Básico', value: '6KRO (6 teclas + modificadores)' },
        { label: 'Ventaja Táctica', value: 'Cero comandos anulados en combate' }
      ]
    }
  },
  {
    id: 9,
    code: 'OBJ-MECH-09',
    sector: 'SECTOR INDIA // BALANCE DE ARTILLERÍA',
    category: 'COMPONENTES',
    categoryLabel: 'ESTABILIDAD ESTRUCTURAL',
    title: 'Dispositivos de Estabilización (Stabilizers)',
    intelBrief: 'La barra espaciadora, la tecla Shift y la tecla Enter superan las 2 unidades (2U) de longitud. Si presionas solo un extremo de la barra espaciadora, ¿qué componente mecánico interno equilibra la fuerza a lo largo de toda la tecla para evitar que se incline o se trabe?',
    options: [
      {
        letter: 'A',
        text: 'Un giróscopo piezoeléctrico alimentado por la línea de 5 Voltios',
        subtext: 'Estabilización giroscópica activa tipo dron'
      },
      {
        letter: 'B',
        text: 'Estabilizadores (Stabilizers: Cherry / Screw-in / Plate-mount) con alambre de acero de torsión',
        subtext: 'Vástagos acoplados y barra metálica horizontal que transfieren la fuerza de un extremo al otro'
      },
      {
        letter: 'C',
        text: 'Un juego de imanes de neodimio de polaridad invertida en las esquinas',
        subtext: 'Suspensión magnética pasiva sin alambres'
      },
      {
        letter: 'D',
        text: 'Múltiples capas de cinta adhesiva de carrocero bajo el policarbonato',
        subtext: 'Modificación de amortiguación acústica casera'
      }
    ],
    correctIndex: 1,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: ANATOMÍA DE ESTABILIZADORES',
      summary: 'Sin estabilizadores, presionar el borde izquierdo de la barra espaciadora causaría una palanca despareja y trabaría el vástago central del switch. Los estabilizadores montados en la PCB (Screw-in o Clip-in) utilizan una barra de alambre de acero acerado conectada a dos vástagos gemelos para forzar un descenso perfectamente horizontal y equilibrado.',
      tacticalTakeaway: 'Lubricar el alambre con grasa dialéctica (Krytox 205g0 o XHT-BDZ) elimina el traqueteo y holgura táctica ("rattle").',
      technicalSpecs: [
        { label: 'Umbral de Aplicación', value: 'Teclas de tamaño >= 2U' },
        { label: 'Montaje de Élite', value: 'Screw-in atornillado directo a PCB' },
        { label: 'Mecanismo Central', value: 'Alambre de torsión de acero inoxidable' },
        { label: 'Mantenimiento Clave', value: 'Lubricación dieléctrica y Holee Mod' }
      ]
    }
  },
  {
    id: 10,
    code: 'OBJ-ELITE-10',
    sector: 'SECTOR JULIET // ARMAS DE NUEVA GENERACIÓN',
    category: 'TECNOLOGÍA_AVANZADA',
    categoryLabel: 'SENSORICA MAGNÉTICA',
    title: 'Switches Magnéticos de Efecto Hall y Función "Rapid Trigger"',
    intelBrief: 'La vanguardia de los tiradores de eSports utiliza teclados con interruptores de Efecto Hall (sensores magnéticos analógicos). ¿Cuál es la ventaja táctica letal de la tecnología "Rapid Trigger" frente a los switches mecánicos tradicionales?',
    options: [
      {
        letter: 'A',
        text: 'El interruptor se reinicia instantáneamente en el microsegundo en que el dedo comienza a subir, sin necesidad de alcanzar un punto fijo de reset mecánico',
        subtext: 'Permite contra-strafing inmediato y detención de inercia perfecta para disparar al blanco'
      },
      {
        letter: 'B',
        text: 'Emite pulsos electromagnéticos que desorientan las miras de los rivales en la partida',
        subtext: 'Función de interferencia táctica pasiva'
      },
      {
        letter: 'C',
        text: 'Aumenta automáticamente los fotogramas por segundo (FPS) de la tarjeta gráfica',
        subtext: 'Acelerador de renderizado por hardware de teclado'
      },
      {
        letter: 'D',
        text: 'Requiere ejercer más de 120 gramos de fuerza física para dispararse',
        subtext: 'Para evitar clics accidentales con armas pesadas'
      }
    ],
    correctIndex: 0,
    xpValue: 10,
    intelDebrief: {
      title: 'REPORTE DE INTELIGENCIA: EFECTO HALL Y RAPID TRIGGER',
      summary: 'Los teclados magnéticos (como Wooting, SteelSeries Apex Pro, DrunkDeer) no tienen contactos metálicos físicos que reboten. Un imán en el vástago mide el flujo magnético continuo en la PCB. "Rapid Trigger" recalcula el punto de desactivación dinámicamente: tan pronto como inicias el movimiento ascendente (incluso 0.1mm), la tecla se desactiva de inmediato; y si vuelves a bajar, se reactiva al instante sin esperar el retorno completo.',
      tacticalTakeaway: 'Proporciona la ventaja de frenado y disparo más letal en juegos como Valorant, CS2 y Call of Duty Warzone.',
      technicalSpecs: [
        { label: 'Detección', value: 'Flujo magnético continuo analógico (Hall Effect)' },
        { label: 'Ajuste de Actuación', value: 'Configurable de 0.1mm a 4.0mm' },
        { label: 'Latencia de Reset', value: 'Cero rebote de debounce físico (< 0.1ms)' },
        { label: 'Técnica Militar', value: 'Counter-strafing de precisión absoluta' }
      ]
    }
  }
];
