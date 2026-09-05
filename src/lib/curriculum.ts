// Currículum autónomo tipo cuartilla — Rubén Prep-to-Code
// Cada día sigue la plantilla obligatoria de 14 secciones

export type RubricCriterion = {
  criterion: string;
  evidence: string;
  logrado: string; // 2 pts
  enProceso: string; // 1 pt
  reforzar: string; // 0 pts
  maxPts: number;
};

export type SelfEvalItem = { text: string };

export type Exercise =
  | {
      type: "quiz";
      title: string;
      questions: { q: string; opts: string[]; correct: number; exp?: string }[];
    }
  | {
      type: "match";
      title: string;
      pairs: { left: string; right: string }[];
    }
  | {
      type: "typing";
      title: string;
      text: string;
      targetWPM?: number;
    }
  | {
      type: "logic";
      title: string;
      instructions: string;
      steps: string[]; // orden correcto
    };

export type DaySession = {
  id: number;
  week: number;
  day: number;
  month: number; // 1..4
  title: string;
  file: string;
  duration: number; // minutos
  // 2. Objetivo observable
  objective: string;
  // 3. ¿Para qué me sirve?
  purpose: string[];
  // 4. Materiales
  materials: string[];
  // 5. Lo que debes saber
  concept: string;
  analogies: string[];
  vocabulary: { term: string; def: string }[];
  comprehensionQuestions: string[];
  // 6. Repaso (10 min)
  review: string[];
  // 7. Explora y Aprende (25 min)
  theory: string;
  worked: string[]; // pasos/actividades guiadas
  // 8. Práctica Guiada Paso a Paso (35 min)
  steps: { title: string; substeps: string[]; verify: string }[];
  // 9. Aplicación a Preparatoria (15 min)
  schoolApp: { context: string; tasks: string[]; product: string };
  // 10. Cierre y Bitácora (5 min)
  closure: string[];
  // 11. Ejercicios adicionales (texto)
  extraExercises: { level: 1 | 2 | 3; title: string; instructions: string[] }[];
  // 12. Reto de aplicación
  challenge: { title: string; instructions: string[]; success: string };
  // 13. Autoevaluación S/P/N
  selfEval: SelfEvalItem[];
  // 14. Evaluación por rúbrica
  rubric: RubricCriterion[];
  // Checklist rápido lateral
  checklist: string[];
  // Ejercicio interactivo (para pestaña Ejercicios)
  exercise?: Exercise;
};

// ============ DÍA 1 (completo, según plan solicitado) ============
const DIA_1: DaySession = {
  id: 1,
  week: 1,
  day: 1,
  month: 1,
  title: "Diagnóstico Digital y Metas del Curso",
  file: "PREPA_COMP_S1_D1_Diagnostico.txt",
  duration: 90,
  objective:
    "Al finalizar la sesión, Rubén será capaz de realizar una autoevaluación honesta sobre cómo usa la computadora para estudiar, identificar al menos 3 fortalezas y 3 áreas de mejora, y redactar 3 metas personales y medibles para este curso, explicando cada una con sus propias palabras.",
  purpose: [
    "Te ayuda a conocerte: sabes en qué punto estás y hacia dónde quieres avanzar.",
    "En preparatoria, te permite organizar mejor tus tareas y ahorrar tiempo buscando archivos.",
    "En programación, aprenderás a fijarte metas pequeñas, medibles y a evaluar tu propio avance (una habilidad muy importante para aprender a programar por tu cuenta).",
  ],
  materials: [
    "Computadora encendida y funcionando",
    "Bloc de Notas (Notepad) o Procesador de Texto",
    "Carpeta Prepa_Ruben/05_Computacion/Bitacora/",
    "Cuaderno para anotar ideas (opcional)",
  ],
  concept:
    "Autoevaluación significa analizar tu propio trabajo o tus hábitos, de manera honesta, para mejorarlos paso a paso.",
  analogies: [
    "«¿Estudio 30 minutos al día o me distraigo?» → te estás autoevaluando.",
    "«¿Guardo mis tareas en una carpeta o las dejo todas en el Escritorio?» → eso es un hábito digital.",
  ],
  vocabulary: [
    { term: "Hábitos digitales", def: "Las acciones que repites al usar la computadora (guardar archivos, buscar información, organizar tu trabajo)." },
    { term: "Meta", def: "Algo que deseas lograr, escrito de manera clara y con un plazo para alcanzarlo." },
    { term: "Meta medible", def: "Una meta a la que puedes saber si la lograste (ej.: «Escribir 40 palabras por minuto con 90% de precisión para diciembre», en lugar de «escribir mejor»)." },
  ],
  comprehensionQuestions: [
    "¿Qué significa para ti «evaluarte a ti mismo»? Explícalo en 2 o 3 líneas, con tus palabras.",
    "¿Qué diferencia hay entre decir «Quisiera organizar mis archivos» y «Quisiera crear carpetas por materia antes del 30 de septiembre»?",
    "¿Por qué crees que es importante saber en qué punto estás antes de empezar a aprender algo nuevo?",
  ],
  review: [
    "R1a. ¿Para qué usas la computadora en casa o en la escuela? (Menciona al menos 2 usos)",
    "R1b. ¿Dónde guardas normalmente tus tareas escolares? (Escritorio, Descargas, Documentos, otro)",
    "R1c. ¿Qué es lo que más se te facilita al usar la computadora? Explícalo.",
    "R1d. ¿Qué es lo que más se te dificulta al usar la computadora? Explícalo con detalle.",
    "R1e. ¿Cuántos minutos crees que pierdes buscando un archivo desordenado? ¿Por qué?",
    "Verifica: relee tus respuestas. Si alguna tiene 1 palabra, amplíala a 1-2 frases completas.",
  ],
  theory:
    "Para evaluarte de manera justa, usarás 5 aspectos: (1) Organización de archivos, (2) Escritura y ortografía, (3) Uso de Internet, (4) Seguridad digital, (5) Productividad para estudiar. Califica cada uno como Alto/Medio/Bajo y justifica con una frase concreta. Una buena META responde: ¿Qué quiero lograr?, ¿Cómo sabré que lo logré?, ¿Para cuándo? Fórmula: «Para [fecha], yo lograré [acción medible], demostrando que lo logré al [evidencia]».",
  worked: [
    "Ejemplo resuelto de evaluación: «Organización → Medio. Guardo algunos trabajos en Documentos, pero otros los dejo en el Escritorio, así que a veces no los encuentro».",
    "Meta correcta: «Para finales de diciembre, lograré crear y mantener ordenadas mis tareas en carpetas por materia, y lo demostraré teniendo al menos 15 archivos correctamente organizados».",
    "Meta incorrecta (evítala): «Quisiera escribir mejor» — es vaga, no se puede medir.",
    "Actividad A1: Completa la tabla de 5 aspectos con nivel + justificación (mínimo 15-20 palabras totales).",
    "Actividad A2: Escribe una acción concreta para mejorar cada aspecto.",
    "Actividad B1: Redacta 3 metas con la fórmula (plazo + acción + evidencia + por qué es importante).",
  ],
  steps: [
    {
      title: "PASO 1: Crea tu archivo de diagnóstico (5 min)",
      substeps: [
        "Abre Bloc de Notas (Windows: Buscar → Bloc de notas).",
        "Escribe el título: DIAGNÓSTICO DIGITAL Y METAS PERSONALES - RUBÉN",
        "Pulsa Enter dos veces para dejar espacio.",
      ],
      verify: "Debes ver ese título escrito en la primera línea, claramente.",
    },
    {
      title: "PASO 2: Escribe tus datos y fecha (3 min)",
      substeps: [
        "Escribe: Fecha: ____/____/________",
        "Escribe: Nombre: Rubén",
        "Escribe: Curso: Computación Básica → Preparación para Programación",
        "Deja 1 línea en blanco.",
      ],
      verify: "Tu información está completa y legible.",
    },
    {
      title: "PASO 3: Transcribe tu tabla de autoevaluación (10 min)",
      substeps: [
        "Copia al archivo el título: 1. AUTOEVALUACIÓN DE HÁBITOS DIGITALES",
        "Completa las 5 filas con Nivel (Alto/Medio/Bajo) y Justificación clara.",
        "Verifica cada justificación leyéndola en voz alta.",
      ],
      verify: "Lee cada justificación: ¿te explica claramente por qué pusiste ese nivel? Si no, mejórala.",
    },
    {
      title: "PASO 4: Fortalezas y áreas de mejora (7 min)",
      substeps: [
        "Escribe subtítulo «Fortalezas (al menos 2)».",
        "Redacta 2 fortalezas en frases completas.",
        "Escribe subtítulo «Áreas por mejorar (al menos 3)».",
        "Redacta 3 áreas por mejorar en frases completas.",
      ],
      verify: "Tienes mínimo 2+3=5 ideas y ninguna está escrita con una sola palabra.",
    },
    {
      title: "PASO 5: Escribe tus 3 metas (10 min)",
      substeps: [
        "Crea sección «2. MIS METAS PARA ESTE CURSO».",
        "Escribe las 3 metas usando la fórmula: «Para [plazo], yo lograré... y lo demostraré...».",
        "Justifica por qué es importante para ti cada meta.",
      ],
      verify: "Pregúntate: «Si leyera esta meta en 2 meses, ¿podría saber con toda claridad si ya la logré?» Si NO, reescríbela.",
    },
  ],
  schoolApp: {
    context:
      "Piensa en alguna materia de preparatoria en la que necesitas entregar trabajos escritos (Español, Historia, Biología, Química, Formación Cívica, etc.).",
    tasks: [
      "a) En esa materia, ¿qué tipo de trabajo digital tengo que entregar con frecuencia?",
      "b) ¿Qué problema tengo actualmente para organizar o entregar ese trabajo a tiempo?",
      "c) ¿Cómo podría ayudarme este hábito de organizar carpetas y fijarme metas a resolver ese problema?",
    ],
    product:
      "Las 3 respuestas escritas, ordenadas y guardadas dentro de tu archivo PREPA_COMP_S1_D1_Diagnostico.txt.",
  },
  closure: [
    "Archivo → Guardar como… → carpeta Documentos/Prepa_Ruben/05_Computacion/Bitacora.",
    "Nombre exacto: PREPA_COMP_S1_D1_Diagnostico.txt",
    "Tipo de archivo: Todos los archivos (*.*)",
    "Verifica que aparece en la carpeta con ese nombre exacto.",
    "Registra en Bitacora_Semana_01.txt: Fecha, Semana/Día, Tema, ¿Qué aprendí?, ¿Qué se me dificultó?, ¿Qué haré mejor la próxima sesión?",
  ],
  extraExercises: [
    {
      level: 1,
      title: "Corrige lo vago",
      instructions: [
        "Transforma cada una en meta medible con la fórmula:",
        "a) «Quisiera organizar mis archivos»",
        "b) «Quisiera mejorar mi ortografía al escribir en la computadora»",
        "c) «Necesito estudiar mejor con la computadora»",
      ],
    },
    {
      level: 2,
      title: "Justifica con lógica",
      instructions: [
        "Analiza: «Organización de archivos → Alto. Justificación: Tengo carpetas».",
        "1) ¿Es suficiente esa justificación? Sí/No en 2 líneas.",
        "2) Mejórala para que sea clara y convincente, explicando qué haces concretamente.",
      ],
    },
    {
      level: 3,
      title: "Pensamiento crítico",
      instructions: [
        "En 3 meses abres tu carpeta y encuentras la mayoría de tus trabajos mezclados en el Escritorio.",
        "a) ¿Qué indica esto sobre tus metas y hábitos? Explica en 3-4 líneas.",
        "b) ¿Qué pequeño cambio de acción harías desde hoy? Sé concreto (acción, cuándo, dónde).",
      ],
    },
  ],
  challenge: {
    title: "RETO #1: El «Test del Robot Ciego»",
    instructions: [
      "Toma únicamente tu lista de 3 metas.",
      "Léelas como si fueras alguien que nunca ha visto este trabajo.",
      "Pregúntate: «¿Esta meta me indica claramente cómo comprobar si está lograda?»",
      "Si alguna NO pasa la prueba, reescríbela hasta que sí la pase.",
      "Explica por escrito en 2-3 líneas cómo probaste tus metas y qué corregiste.",
    ],
    success:
      "Las 3 metas son tan claras que cualquier compañero podría leerlas y determinar, sin dudar, si Rubén ya las alcanzó o aún no.",
  },
  selfEval: [
    { text: "Puedo explicar qué es una autoevaluación, con mis propias palabras, sin leer la teoría." },
    { text: "Logré completar la tabla de 5 aspectos, con justificaciones claras para cada uno." },
    { text: "Redacté 3 metas siguiendo la fórmula y todas son medibles." },
    { text: "Puedo leer mis metas y decir con seguridad: «Ya sé cómo comprobaré si las logré»." },
    { text: "Apliqué lo aprendido a alguna materia real de mi preparatoria (preguntas a, b, c)." },
    { text: "Guardé mi archivo con el nombre exacto y en la carpeta correcta." },
    { text: "Actualicé mi bitácora con las 6 preguntas." },
    { text: "Superé el Reto del Robot Ciego: mis 3 metas son claras para otra persona." },
    { text: "Puedo explicar este tema a otra persona, paso a paso, sin ayuda." },
  ],
  rubric: [
    { criterion: "Autoevaluación completa (5 aspectos)", evidence: "Tabla con Nivel + Justificación", logrado: "Completa, justificaciones claras y razonadas", enProceso: "Completa pero justificaciones cortas", reforzar: "Incompleta o sin justificaciones", maxPts: 2 },
    { criterion: "Fortalezas y áreas de mejora", evidence: "≥2 fortalezas y ≥3 áreas en frases completas", logrado: "Identifica con argumentos claros", enProceso: "Mínimo, explicaciones poco desarrolladas", reforzar: "No alcanza mínimo o una sola palabra", maxPts: 2 },
    { criterion: "Metas personales (3)", evidence: "Metas con fórmula (plazo + acción + evidencia)", logrado: "Las 3 concretas, medibles y con plazo", enProceso: "1 o 2 completas, otras vagas", reforzar: "Ninguna o solo 1 medible", maxPts: 3 },
    { criterion: "Aplicación a Preparatoria", evidence: "Respuestas a, b, c sobre una materia", logrado: "Responde las 3 con lógica clara", enProceso: "Responde las 3 con relación débil", reforzar: "Falta alguna o no se relaciona", maxPts: 3 },
    { criterion: "Producto y nomenclatura", evidence: "Archivo guardado correctamente", logrado: "Carpeta correcta, nombre exacto, ordenado", enProceso: "Guardado con pequeño error", reforzar: "Sin nombre exacto o incompleto", maxPts: 2 },
    { criterion: "Bitácora y Reflexión", evidence: "6 elementos + párrafo final", logrado: "Completa, honesta, reflexiva", enProceso: "Completa, poca profundidad", reforzar: "Incompleta o poco reflexiva", maxPts: 3 },
    { criterion: "Reto «Robot Ciego»", evidence: "Explicación escrita y correcciones", logrado: "Metas verificables + correcciones explicadas", enProceso: "Corrige parcialmente", reforzar: "No realizó o no justificó", maxPts: 5 },
  ],
  checklist: [
    "Tabla de autoevaluación completa con 5 aspectos",
    "3 metas escritas con la fórmula (plazo + acción + evidencia)",
    "Fortalezas (≥2) y áreas de mejora (≥3) redactadas",
    "Aplicación escolar (a, b, c) respondida",
    "Archivo guardado con nombre exacto PREPA_COMP_S1_D1_Diagnostico.txt",
    "Bitácora Semana 1 - Día 1 actualizada",
    "Reto Robot Ciego superado",
  ],
  exercise: {
    type: "quiz",
    title: "Diagnóstico de Hábitos Digitales y Metas",
    questions: [
      {
        q: "¿Cuál de estas es una META MEDIBLE?",
        opts: [
          "Quisiera escribir mejor.",
          "Para finales de octubre, escribiré 35 palabras por minuto con 90% de precisión, demostrado en una prueba registrada.",
          "Organizarme más.",
          "Estudiar cuando pueda.",
        ],
        correct: 1,
        exp: "Una meta medible incluye plazo, acción concreta y evidencia observable.",
      },
      {
        q: "¿Qué significa autoevaluarse?",
        opts: [
          "Que otro te ponga una calificación.",
          "Analizar tu propio trabajo o hábitos de manera honesta para mejorarlos.",
          "Estudiar más tiempo.",
          "Copiar la meta de otro compañero.",
        ],
        correct: 1,
        exp: "Autoevaluar es un ejercicio honesto de análisis personal, no una calificación externa.",
      },
      {
        q: "Verdadero o Falso: «Tengo carpetas» es una justificación suficiente para calificar mi organización como Alto.",
        opts: ["Verdadero", "Falso"],
        correct: 1,
        exp: "Falso: la justificación debe explicar QUÉ haces concretamente (nombrar, ordenar, ubicar rápido).",
      },
      {
        q: "En la fórmula de meta: «Para [plazo], yo lograré [X], demostrando que lo logré al [Y]», ¿qué es [Y]?",
        opts: ["La fecha", "La evidencia observable", "El nombre de la materia", "La calificación esperada"],
        correct: 1,
        exp: "[Y] es la evidencia que permite verificar objetivamente si se cumplió.",
      },
    ],
  },
};

// ============ DÍA 2 (completo) ============
const DIA_2: DaySession = {
  id: 2,
  week: 1,
  day: 2,
  month: 1,
  title: "Arquitectura de Carpetas Escolares",
  file: "Estructura Prepa_Ruben (evidencia + captura)",
  duration: 90,
  objective:
    "Crear, organizar y explicar una estructura jerárquica de carpetas para tus materias de preparatoria, aplicando numeración ordenada, de manera que puedas ubicar cualquier tarea en menos de 15 segundos, justificando dónde guardarías un archivo determinado.",
  purpose: [
    "Preparatoria: dejas de perder tiempo buscando tareas en el Escritorio o en Descargas.",
    "Orden mental: organizar carpetas entrena tu mente para organizar proyectos.",
    "Programación: los programadores organizan archivos en rutas (paths). Estás aprendiendo ese pensamiento desde hoy.",
  ],
  materials: [
    "Computadora",
    "Explorador de Archivos (Windows: Explorador / Mac: Finder)",
    "Carpeta de trabajo: Documentos/Prepa_Ruben/",
  ],
  concept:
    "Una carpeta (directorio) sirve para agrupar archivos relacionados. Una estructura jerárquica significa que dentro de una carpeta puedes crear otras subcarpetas, formando un árbol de organización.",
  analogies: [
    "Un archivero con gavetas: cada gaveta es una materia; adentro hay separadores para Tareas, Apuntes o Trabajos.",
  ],
  vocabulary: [
    { term: "Directorio", def: "Sinónimo técnico de carpeta." },
    { term: "Jerarquía", def: "Orden por niveles: carpeta padre → subcarpeta → archivo." },
    { term: "Regla de oro", def: "«Un archivo, un lugar correcto». Ningún archivo suelto en el Escritorio." },
  ],
  comprehensionQuestions: [
    "¿Qué es una carpeta y para qué sirve? Da un ejemplo escolar.",
    "¿Por qué es mejor tener carpetas por materia que juntar todo en una sola?",
    "¿Qué ventaja tiene numerar las carpetas (01_Matematicas, 02_Espanol) en lugar del orden alfabético?",
  ],
  review: [
    "R1: Relee tus 3 metas del Día 1 y di: «esta semana, ¿qué pequeña acción haré para acercarme a al menos una meta?». Escríbelo.",
    "R2: Observa tu Escritorio. ¿Cuántos archivos sueltos sin clasificar tienes? Anótalo en la bitácora.",
  ],
  theory:
    "Vas a crear esta estructura exacta:\n\nDocumentos/\n└── Prepa_Ruben/\n    ├── 01_Matematicas/\n    ├── 02_Espanol/\n    ├── 03_Quimica/\n    ├── 04_Historia/\n    ├── 05_Computacion/\n    │   ├── Tareas/\n    │   ├── Evidencias/\n    │   └── Proyectos/\n    └── 99_Bitacora/\n\n¿Por qué los números? Para que el Explorador las muestre en el orden que tú deseas, no alfabético. Se llama «orden lógico de trabajo». 99_Bitacora se pone al final para separarla visualmente de las materias.",
  worked: [
    "Abre Explorador de Archivos → Documentos. Observa qué existe.",
    "Localiza si ya existe Prepa_Ruben. Si no, hoy la crearás.",
    "Comprueba: explica en 1 línea por qué 99_Bitacora va al final.",
  ],
  steps: [
    {
      title: "PASO 1: Abrir Explorador (2 min)",
      substeps: [
        "Abre Explorador de Archivos (Windows + E).",
        "Da clic en Documentos en el panel izquierdo.",
      ],
      verify: "Estás dentro de la carpeta Documentos.",
    },
    {
      title: "PASO 2: Crear carpeta raíz Prepa_Ruben (5 min)",
      substeps: [
        "Clic derecho → Nuevo → Carpeta.",
        "Nombre exacto: Prepa_Ruben",
        "Presiona Enter y entra a la carpeta.",
      ],
      verify: "La carpeta aparece con nombre exacto y puedes entrar en ella.",
    },
    {
      title: "PASO 3: Crear las 5 carpetas de materias (8 min)",
      substeps: [
        "Crea: 01_Matematicas",
        "Crea: 02_Espanol",
        "Crea: 03_Quimica",
        "Crea: 04_Historia",
        "Crea: 05_Computacion",
      ],
      verify: "Cuenta: hay exactamente 5 carpetas con número al inicio.",
    },
    {
      title: "PASO 4: Subcarpetas de Computación (10 min)",
      substeps: [
        "Abre 05_Computacion (doble clic).",
        "Crea Tareas",
        "Crea Evidencias",
        "Crea Proyectos",
      ],
      verify: "Dentro de 05_Computacion hay 3 subcarpetas sin errores de escritura.",
    },
    {
      title: "PASO 5: Bitácora y prueba de ubicación (10 min)",
      substeps: [
        "Estando en Prepa_Ruben, crea 99_Bitacora.",
        "Prueba: un resumen de Español → Prepa_Ruben/02_Espanol/",
        "Prueba: una práctica de Computación → Prepa_Ruben/05_Computacion/Tareas/",
        "Prueba: la bitácora semanal → Prepa_Ruben/99_Bitacora/",
      ],
      verify: "Tu estructura completa coincide con el árbol propuesto.",
    },
  ],
  schoolApp: {
    context:
      "Tienes 4 archivos en el Escritorio: Resumen_del_Libro.docx (Español), Ejercicios_de_fracciones.docx (Matemáticas), Tabla_periodica_tarea.docx (Química), Linea_del_tiempo.docx (Historia).",
    tasks: [
      "Para cada archivo, indica la ruta exacta donde lo guardarías.",
      "Justifica cada decisión en 1 frase: «Lo guardo ahí porque…»",
      "Escribe una tabla con 3 columnas: Archivo | Ruta destino | Justificación.",
    ],
    product:
      "Tabla clara de 4 filas, tan explícita que otra persona pudiera guardar los archivos correctamente sin adivinar.",
  },
  closure: [
    "Lista las 10 carpetas creadas y márcalas una por una revisando el Explorador.",
    "Bitácora Semana 1 - Día 2: fecha, tema, ¿qué aprendí?, ¿qué se me dificultó?, ¿cómo lo resolví?, ¿para qué me servirá en preparatoria?",
  ],
  extraExercises: [
    {
      level: 1,
      title: "Detecta el error",
      instructions: [
        "Señala la INCORRECTA y explica por qué (≥3 líneas):",
        "a) Crear carpetas por materia.",
        "b) Guardar todo como Documento1, Documento2 en el Escritorio.",
        "c) Guardar cada tarea en su carpeta con nombre claro.",
      ],
    },
    {
      level: 2,
      title: "Ordena lógicamente",
      instructions: [
        "Clasifica cada archivo en su carpeta con ruta completa y justifica:",
        "Tarea_Historia.docx, Apuntes_Mate.docx, Examen_Español.pdf, Practica_Quimica.docx",
      ],
    },
    {
      level: 3,
      title: "Propuesta creativa",
      instructions: [
        "Piensa en una sexta materia (Biología, Geografía, Inglés, etc.).",
        "Propón un nombre lógico para su carpeta siguiendo el sistema de numeración y justifícalo.",
      ],
    },
  ],
  challenge: {
    title: "RETO #2: Prueba de Recuperación Rápida",
    instructions: [
      "Cronometra 15 segundos.",
      "Desde Documentos, abre Prepa_Ruben/05_Computacion/Evidencias en ≤15 s.",
      "Repite 3 veces y anota tus 3 tiempos.",
      "Meta: lograrlo 3 veces seguidas en ≤15 s.",
    ],
    success: "Consigues abrir la ruta correcta 3 veces consecutivas en ≤15 segundos, sin buscar archivo por archivo.",
  },
  selfEval: [
    { text: "Puedo explicar qué es una estructura de carpetas con mis palabras." },
    { text: "Creé correctamente las 10 carpetas siguiendo el esquema." },
    { text: "Sé explicar por qué uso números al inicio." },
    { text: "Sé indicar la ruta para guardar una tarea de Español o Matemáticas." },
    { text: "Resolví la actividad de los 4 archivos justificando cada ruta." },
    { text: "Superé el reto de localizar la carpeta en ≤15 s." },
    { text: "Puedo explicar este orden a otro compañero sin leer las instrucciones." },
  ],
  rubric: [
    { criterion: "Estructura correcta", evidence: "10 carpetas creadas", logrado: "Completa, sin errores", enProceso: "1 error leve de escritura", reforzar: "2+ errores o incompleta", maxPts: 2 },
    { criterion: "Subcarpetas de Computación", evidence: "Tareas, Evidencias, Proyectos", logrado: "Correctas y bien ubicadas", enProceso: "Ubicadas con error de nombre", reforzar: "Faltan o mal ubicadas", maxPts: 2 },
    { criterion: "Aplicación práctica", evidence: "Tabla Archivo→Ruta→Justificación", logrado: "4/4 correctas y justificadas", enProceso: "3/4 correctas", reforzar: "≤2 correctas", maxPts: 4 },
    { criterion: "Explicación conceptual", evidence: "Explica «por qué» usa numeración", logrado: "Explicación clara con sus palabras", enProceso: "Parcial", reforzar: "No logra explicarlo", maxPts: 3 },
    { criterion: "Reto de rapidez", evidence: "3 intentos ≤15 s registrados", logrado: "3 veces seguidas ≤15 s", enProceso: "1-2 intentos ≤15 s", reforzar: ">15 s o no registrado", maxPts: 5 },
    { criterion: "Orden y limpieza digital", evidence: "Aplica regla «1 archivo, 1 lugar»", logrado: "Aplica y justifica", enProceso: "Aplica parcialmente", reforzar: "No aplica", maxPts: 4 },
  ],
  checklist: [
    "Carpeta Prepa_Ruben creada",
    "5 carpetas de materias numeradas",
    "Subcarpetas Tareas/Evidencias/Proyectos",
    "Carpeta 99_Bitacora al final",
    "Tabla de 4 archivos justificada",
    "Reto de recuperación ≤15 s superado",
  ],
  exercise: {
    type: "match",
    title: "Rutas correctas para cada archivo",
    pairs: [
      { left: "Resumen_del_Libro.docx (Español)", right: "Prepa_Ruben/02_Espanol/" },
      { left: "Ejercicios_de_fracciones.docx", right: "Prepa_Ruben/01_Matematicas/" },
      { left: "Tabla_periodica_tarea.docx", right: "Prepa_Ruben/03_Quimica/" },
      { left: "Linea_del_tiempo.docx", right: "Prepa_Ruben/04_Historia/" },
      { left: "Bitacora_Semana_01.txt", right: "Prepa_Ruben/99_Bitacora/" },
      { left: "Practica_Guiada_Excel.xlsx", right: "Prepa_Ruben/05_Computacion/Tareas/" },
    ],
  },
};

// ============ Guías autónomas para los días restantes ============
// Cada guía incluye teoría, ejemplo, procedimiento y datos de práctica para
// que la sesión se pueda realizar sin consultar material externo.

type SeedTopic = { t: string; e: string; module: string };

type TopicGuide = {
  tool: string;
  theory: string;
  example: string;
  practice: string;
  school: string;
  steps: string[];
  verify: string;
};

const MODULE_GUIDES: Record<string, TopicGuide> = {
  Sistema: {
    tool: "Explorador de archivos y Configuración del sistema; si no tienes Windows, usa el gestor de archivos disponible.",
    theory: "Una ruta identifica la ubicación de un recurso. La ruta absoluta empieza desde la unidad o raíz (por ejemplo C:\\Users\\Ruben\\Documents), mientras que una ruta relativa parte de la carpeta actual. Buscar por nombre, extensión y fecha reduce el tiempo de recuperación.",
    example: "Si estás en Prepa_Ruben/05_Computacion y necesitas Tarea.txt dentro de Tareas, la ruta relativa es Tareas/Tarea.txt; la ruta absoluta incluye todas las carpetas desde Documentos.",
    practice: "Crea tres archivos llamados Apunte_Mate.txt, Resumen_Esp.txt y Bitacora.txt en carpetas distintas. Después localízalos usando nombre, extensión y ubicación, y registra cuánto tardas.",
    school: "Un compañero te pide el resumen de Historia. Debes entregar la ruta exacta, no solo decir «está en Documentos».",
    steps: ["Crea las carpetas y archivos de prueba indicados.", "Usa la barra de búsqueda con el nombre completo y luego con *.txt.", "Abre las propiedades de un archivo y compara ubicación, tamaño y fecha.", "Escribe una ruta absoluta y una relativa para el mismo archivo."],
    verify: "Puedes localizar los tres archivos, distinguir ruta absoluta de relativa y explicar qué dato usaste para encontrarlos.",
  },
  Seguridad: {
    tool: "Bloc de notas, Explorador de archivos y la configuración de seguridad integrada; no necesitas instalar nada.",
    theory: "Una rutina segura combina contraseña única, bloqueo de pantalla, actualización, copia de respaldo y guardado ordenado. Un respaldo 3-2-1 significa 3 copias, en 2 medios distintos y 1 fuera del equipo principal.",
    example: "Antes de cerrar una tarea: guarda con nombre claro, verifica que el archivo abre, copia una versión en Evidencias y bloquea el equipo con Windows+L.",
    practice: "Trabaja con una copia de prueba llamada Evidencia_Segura.txt. Simula un error borrando solo la copia de trabajo y recupérala desde Evidencias.",
    school: "Debes entregar un trabajo mañana y tu computadora podría fallar. Diseña un plan de guardado y recuperación con carpeta local y USB o nube si está disponible.",
    steps: ["Crea una carpeta Evidencias_Seguras y guarda allí una copia.", "Comprueba que ambas copias abren y tienen la misma fecha de revisión.", "Activa el bloqueo de pantalla y revisa si hay actualizaciones pendientes.", "Escribe qué harías si perdieras el archivo original."],
    verify: "Puedes recuperar el archivo desde una segunda copia y enumerar cinco acciones de una rutina segura.",
  },
  Reflexión: {
    tool: "Bloc de notas o cualquier editor de texto local.",
    theory: "Una retrospectiva convierte experiencia en mejora: describe el hecho, identifica la causa y decide una acción concreta. Una buena bitácora distingue aprendizaje, dificultad, evidencia y siguiente paso.",
    example: "Hecho: tardé 12 minutos buscando un archivo. Causa: no tenía carpeta de destino. Acción: guardaré cada tarea en su materia antes de abrir otra.",
    practice: "Usa la sesión anterior como evidencia y escribe: 2 logros, 1 dificultad, su causa, una decisión y una meta medible para la próxima semana.",
    school: "Después de entregar una tarea de Español, analiza qué parte del proceso te ahorró tiempo y qué repetirás en la siguiente entrega.",
    steps: ["Escribe los hechos sin calificarlos como buenos o malos.", "Separa causa de consecuencia.", "Elige una acción que puedas hacer en menos de 10 minutos.", "Define cómo medirás si la acción funcionó."],
    verify: "Tu bitácora contiene evidencia concreta, una causa y una acción medible con fecha.",
  },
  Teclado: {
    tool: "Bloc de notas o editor local; usa el teclado físico que tengas y practica despacio antes de acelerar.",
    theory: "La fila guía coloca los índices en F y J (y en F y J para orientarte; en teclado español la fila incluye ASDF-JKLÑ). Los dedos regresan a esa posición, la barra espaciadora se pulsa con el pulgar y la precisión debe crecer antes que la velocidad.",
    example: "Practica asdf jklñ durante un minuto, sin mirar las manos. Luego escribe «Cada dato debe quedar claro y ordenado.» y cuenta palabras correctas y errores.",
    practice: "Texto de práctica: «Rubén organiza sus archivos, revisa cada nombre y guarda una copia antes de cerrar. La precisión ayuda a trabajar con confianza.» Escríbelo tres veces.",
    school: "Transcribe cinco líneas de tus apuntes de Historia manteniendo mayúsculas, acentos y signos. Registra tiempo, errores y palabras por minuto.",
    steps: ["Coloca índices en F y J y deja los demás dedos en ASDF y JKLÑ.", "Calienta con asdf jklñ, luego agrega g y h sin mirar.", "Copia el texto proporcionado durante 60 segundos.", "Cuenta palabras completas, errores y calcula precisión = caracteres correctos / caracteres escritos x 100."],
    verify: "Registras tres intentos y mejoras la precisión o la velocidad sin mirar el teclado.",
  },
  Redacción: {
    tool: "Bloc de notas o procesador de texto local.",
    theory: "Un texto estructurado tiene idea principal, desarrollo y cierre. Cada párrafo debe tratar una sola idea; los conectores (porque, además, sin embargo, por eso) muestran la relación entre frases.",
    example: "Tema: ordenar archivos. Inicio: presenta el problema. Desarrollo: explica dos acciones y su beneficio. Cierre: propone aplicarlas hoy.",
    practice: "Redacta 150 palabras sobre «Cómo una carpeta ordenada mejora mi estudio» con título, introducción, dos acciones y conclusión. Usa al menos cuatro conectores.",
    school: "Convierte tus apuntes de Biología en un texto de 150 palabras con una idea principal, dos datos y una conclusión.",
    steps: ["Escribe una oración que responda qué quieres comunicar.", "Anota tres ideas y ordénalas de general a específica.", "Redacta un párrafo por función: inicio, desarrollo y cierre.", "Revisa mayúsculas, acentos, conectores y cuenta las palabras."],
    verify: "El texto tiene 140-160 palabras, tres partes distinguibles y una idea principal clara.",
  },
  Archivos: {
    tool: "Explorador de archivos y compresor ZIP integrado del sistema.",
    theory: "La extensión después del punto indica el tipo de archivo y orienta al sistema sobre cómo abrirlo: .txt es texto, .docx documento, .xlsx hoja de cálculo, .pptx presentación, .zip contenedor comprimido. Cambiar la extensión no convierte el contenido.",
    example: "Informe_Semana03.docx es un documento editable; Informe_Semana03.pdf conserva la presentación; ambos pueden contener el mismo trabajo, pero cumplen usos distintos.",
    practice: "Crea cuatro archivos de texto, nómbralos con Materia_Tema_Fecha_Version.extensión y comprímelos en Entrega_S3.zip. Abre el ZIP para comprobar su contenido.",
    school: "Tu profesor pide un solo archivo con el trabajo y sus evidencias. Decide qué formato usar y qué archivos incluirías en el ZIP.",
    steps: ["Activa la vista de extensiones y observa tres tipos de archivo.", "Renombra una copia con una nomenclatura clara sin cambiar su contenido.", "Selecciona las evidencias, clic derecho y Comprimir en ZIP.", "Abre el ZIP y verifica nombres, cantidad y tamaño de los archivos."],
    verify: "Distingues extensión de nombre, explicas el uso de cada formato y el ZIP contiene exactamente las evidencias previstas.",
  },
  Mantenimiento: {
    tool: "Explorador de archivos, almacenamiento local y herramientas de limpieza integradas.",
    theory: "El mantenimiento preventivo evita problemas antes de que ocurran: revisar espacio, ordenar Descargas, eliminar duplicados con cuidado y conservar archivos importantes respaldados. Nunca borres un archivo sin identificarlo.",
    example: "En Descargas, un instalador repetido puede moverse a una carpeta temporal; una tarea escolar se mueve a su materia y no se elimina.",
    practice: "Haz un inventario de cinco elementos de Descargas con nombre, tipo, fecha, acción (conservar, mover o eliminar) y justificación.",
    school: "Antes de entregar un proyecto, limpia duplicados y confirma que la versión final está en la carpeta correcta y tiene respaldo.",
    steps: ["Ordena Descargas por fecha y registra el espacio ocupado.", "Clasifica archivos sin borrar nada todavía.", "Mueve solo los archivos identificados a su carpeta destino.", "Vacía la papelera únicamente después de comprobar el respaldo."],
    verify: "Cada archivo revisado tiene una decisión justificada y el archivo final se encuentra respaldado.",
  },
  Word: {
    tool: "Word, LibreOffice Writer o Google Docs; si no tienes editor, usa HTML o texto con marcas y conserva la estructura.",
    theory: "Los estilos separan estructura de apariencia: Título es el nombre del documento, Título 1 las secciones principales y Título 2 sus apartados. Márgenes, interlineado y listas mejoran lectura; una tabla compara datos en filas y columnas.",
    example: "Un trabajo puede tener Título 1 «Causas», Título 2 «Causa económica» y una tabla con Causa, Evidencia y Consecuencia. No uses espacios repetidos para simular títulos.",
    practice: "Crea un documento sobre seguridad digital con portada, tres títulos, una tabla de dos columnas, una lista numerada y un párrafo de 100 palabras.",
    school: "Formatea tus apuntes de Historia como resumen: título, tres secciones, tabla de fechas y conclusión de cinco líneas.",
    steps: ["Escribe el contenido base y aplica estilos de título por nivel.", "Configura márgenes de 2.5 cm e interlineado 1.5.", "Inserta una lista y una tabla con encabezados claros.", "Revisa vista de impresión, ortografía y consistencia antes de guardar."],
    verify: "La jerarquía se entiende sin leer todo, la tabla tiene encabezados y el documento conserva formato al abrirse.",
  },
  Internet: {
    tool: "Navegador; si no hay conexión, usa las fuentes de ejemplo incluidas en esta sesión y practica el análisis sin salir del equipo.",
    theory: "Los operadores acotan resultados: site: limita un dominio, filetype: un formato, comillas una frase exacta y - excluye una palabra. CRAAP evalúa actualidad, relevancia, autoridad, precisión y propósito.",
    example: "La consulta site:edu.mx " + '"cambio climático" filetype:pdf' + " busca una frase exacta en sitios educativos mexicanos y en PDF.",
    practice: "Compara dos fuentes sobre energía solar: una página institucional con autor y fecha, y un texto anónimo sin referencias. Registra cinco criterios CRAAP y decide cuál citar.",
    school: "Busca información para una tarea de Química y entrega una ficha con consulta usada, autor, fecha, institución, idea principal y enlace o nota «fuente local de práctica».",
    steps: ["Escribe una búsqueda amplia y anota el número aproximado de resultados.", "Añade site:, comillas o filetype: y compara qué cambia.", "Evalúa cada fuente con los cinco criterios CRAAP.", "Parafrasea una idea y conserva sus datos de atribución."],
    verify: "Tu búsqueda es reproducible, la fuente elegida tiene justificación y distingues información de opinión.",
  },
  Ética: {
    tool: "Bloc de notas o procesador de texto; puedes practicar con el texto fuente incluido aquí.",
    theory: "Parafrasear es explicar una idea con estructura y palabras propias sin cambiar su sentido. No es sustituir algunas palabras. Debes conservar la atribución y distinguir cita textual, paráfrasis y opinión personal.",
    example: "Fuente: «El respaldo reduce el riesgo de perder información». Paráfrasis: «Guardar una copia disminuye la posibilidad de perder datos». Atribución: (Material del curso, 2026).",
    practice: "Parafrasea estas ideas: «Una contraseña debe ser larga y única» y «Los datos se organizan para poder encontrarlos». Escribe después tu propia conclusión.",
    school: "Convierte un párrafo de tus apuntes en paráfrasis, anota la fuente y subraya qué parte es tu interpretación.",
    steps: ["Lee la idea hasta poder explicarla sin verla.", "Cierra la fuente y escribe el significado con otra estructura.", "Compara sentido, palabras repetidas y datos.", "Añade la atribución y separa tu opinión."],
    verify: "La paráfrasis conserva la idea, usa redacción propia y reconoce la fuente.",
  },
  Investigación: {
    tool: "Procesador de texto local; navegador opcional.",
    theory: "Una ficha de investigación registra pregunta, fuente, idea principal, evidencia y comentario propio. Esta separación evita confundir lo que dice la fuente con lo que tú concluyes.",
    example: "Pregunta: ¿por qué respaldar? Fuente: guía del curso. Evidencia: reduce pérdida. Comentario: aplicaré una copia semanal.",
    practice: "Completa una ficha para el tema «organización digital» usando la información de esta sesión y otra ficha con un tema escolar.",
    school: "Investiga una pregunta de Historia o Biología y entrega dos fichas comparables, cada una con una conclusión propia.",
    steps: ["Formula una pregunta que no se responda con una sola palabra.", "Registra fuente y fecha.", "Extrae dos datos y escribe tu comentario aparte.", "Compara fichas y redacta una conclusión de tres líneas."],
    verify: "Otra persona puede identificar qué dato proviene de la fuente y qué parte es tu análisis.",
  },
  Comunicación: {
    tool: "Bloc de notas o cliente de correo; la práctica puede hacerse sin enviar mensajes reales.",
    theory: "Un correo formal tiene asunto específico, saludo, contexto breve, petición clara, despedida y firma. Los adjuntos deben nombrarse profesionalmente y mencionarse en el cuerpo del mensaje.",
    example: "Asunto: Entrega de resumen de Historia - Rubén. Saludo, explicación de que adjuntas el archivo, petición de confirmación y firma.",
    practice: "Redacta un correo a tu profesor solicitando confirmación de una entrega. Adjunta de forma simulada Resumen_Historia_S3_Ruben.pdf y revisa tamaño y nombre.",
    school: "Escribe el mensaje que enviarías para preguntar una duda concreta sobre una tarea, sin usar lenguaje de chat ni frases ambiguas.",
    steps: ["Escribe un asunto que incluya acción y materia.", "Redacta contexto en dos líneas y una petición concreta.", "Menciona nombre y formato del adjunto.", "Revisa destinatario, tono, ortografía y archivos antes de enviar."],
    verify: "El receptor entiende quién eres, qué necesitas y qué archivo debe revisar.",
  },
  Cloud: {
    tool: "OneDrive, Google Drive u otra nube; si no tienes cuenta, simula la estructura con carpetas locales.",
    theory: "Sincronizar no es lo mismo que respaldar: la sincronización replica cambios y un respaldo conserva una copia recuperable. Los permisos pueden ser lector, comentarista o editor; comparte el mínimo necesario.",
    example: "Una carpeta Entrega contiene el PDF final como solo lectura y una carpeta Trabajo contiene el documento editable para colaboradores.",
    practice: "Construye localmente la estructura Curso/Compartido/Entrega y Curso/Privado/Borradores. Define permiso esperado para tres personas.",
    school: "Planea cómo compartirías un trabajo grupal: quién edita, quién revisa y qué archivo final queda protegido.",
    steps: ["Crea la estructura local o en tu nube.", "Separa borradores de entregas.", "Asigna un permiso diferente a cada rol.", "Comprueba que el nombre y la versión final son inequívocos."],
    verify: "Puedes explicar qué se sincroniza, qué se respalda y por qué cada persona tiene ese permiso.",
  },
  Productividad: {
    tool: "Calendario local, agenda de papel o aplicación de calendario disponible.",
    theory: "Una entrega se vuelve manejable cuando tiene fecha, hora, duración estimada, prioridad y siguiente acción. Programar recordatorios antes de la fecha evita trabajar solo al límite.",
    example: "Entrega viernes 20:00: miércoles investigar 30 min, jueves redactar 45 min, viernes revisar 20 min.",
    practice: "Planifica tres tareas escolares con fecha, bloques de trabajo, prioridad y recordatorio 24 horas antes.",
    school: "Organiza una semana con tareas de Matemáticas, Español y Computación sin colocar dos bloques en el mismo horario.",
    steps: ["Anota fecha real y duración de cada tarea.", "Divide cada tarea en acciones de 15-45 minutos.", "Ordena por fecha y prioridad.", "Revisa conflictos y agrega margen de revisión."],
    verify: "Tu calendario tiene tres entregas, acciones concretas y ningún bloque superpuesto.",
  },
  Excel: {
    tool: "Microsoft Excel, LibreOffice Calc o Google Sheets; las fórmulas se pueden escribir también en una tabla de texto.",
    theory: "Una hoja usa columnas con letras, filas con números y celdas como A1. Las fórmulas empiezan con =. SUMA agrega, PROMEDIO calcula media, MAX busca el mayor y MIN el menor. Un porcentaje se escribe como decimal: 80% = 0.8.",
    example: "Con calificaciones 8, 9 y 7 en B2:B4, =PROMEDIO(B2:B4) da 8; si el examen vale 40%, la ponderación es =B2*40%.",
    practice: "Captura: Matemáticas 8, 9, 7; Español 9, 8, 10; Química 7, 8, 9. Calcula promedio por materia, promedio general, máximo y mínimo.",
    school: "Crea una boleta con tres materias y ponderaciones: tareas 30%, proyecto 30%, examen 40%. Usa los datos 9,8,7 para Tareas, 8,9,8 para Proyecto y 7,8,9 para Examen.",
    steps: ["Escribe encabezados y captura los datos sin mezclar texto con números.", "Selecciona rangos y aplica la fórmula indicada en la teoría.", "Da formato de número o porcentaje sin cambiar el valor.", "Comprueba un resultado manualmente con una calculadora."],
    verify: "Las fórmulas apuntan al rango correcto, los resultados coinciden con una comprobación manual y la tabla se entiende.",
  },
  PPT: {
    tool: "PowerPoint, LibreOffice Impress o editor de presentaciones disponible; también puedes diseñar cada diapositiva como una página.",
    theory: "Una presentación comunica una idea por diapositiva. La estructura recomendada es problema, explicación, evidencia y conclusión. La regla 6x6 orienta: hasta seis líneas y aproximadamente seis palabras por línea; no es una ley, es un límite para evitar saturación.",
    example: "Tema: respaldo. Diapositiva 1 pregunta, 2 riesgo, 3 método 3-2-1, 4 ejemplo, 5 conclusión. La explicación oral lleva los detalles.",
    practice: "Diseña cinco diapositivas sobre «Cómo proteger una tarea digital» usando una idea, una evidencia y una frase corta por diapositiva.",
    school: "Convierte un tema de Biología en cinco diapositivas y prepara una exposición de tres minutos con inicio, desarrollo y cierre.",
    steps: ["Escribe la idea que debe recordar el público.", "Distribuye una idea principal por diapositiva.", "Reduce texto y usa contraste, alineación y tamaño consistente.", "Ensaya con cronómetro y elimina lo que tengas que leer."],
    verify: "La presentación se entiende al verla rápidamente y puedes explicarla sin leer las diapositivas.",
  },
  Oratoria: {
    tool: "Cronómetro del equipo y grabadora opcional; puedes ensayar frente a un espejo.",
    theory: "Una exposición breve necesita apertura, tres ideas y cierre. Hablar con pausas, mirar al público y usar palabras propias comunica mejor que leer. Tres minutos equivalen aproximadamente a 360-450 palabras habladas, según el ritmo.",
    example: "Apertura: una pregunta. Idea 1: problema. Idea 2: método. Idea 3: beneficio. Cierre: una acción que el público puede realizar.",
    practice: "Escribe un guion de 300-360 palabras sobre una habilidad aprendida y ensáyalo dos veces, registrando duración y una mejora.",
    school: "Explica un concepto de Historia o Química en tres minutos para un compañero que no lo conoce.",
    steps: ["Escribe una frase de apertura y una conclusión.", "Agrupa el contenido en tres ideas.", "Ensaya mirando puntos de referencia, no el texto.", "Mide tiempo, claridad y número de muletillas; repite con una mejora."],
    verify: "La exposición dura entre 2:30 y 3:30 minutos, tiene estructura y comunica una idea sin leer todo.",
  },
  Lógica: {
    tool: "Bloc de notas y papel; no necesitas Internet ni software.",
    theory: "La lógica transforma condiciones en decisiones. SI una condición es verdadera, ENTONCES ocurre una acción; SI NO, ocurre otra. Y exige que todas sean verdaderas, O exige al menos una y NO invierte el resultado.",
    example: "SI calificación >= 6 ENTONCES «Aprobado»; SI NO «Reforzar». Con edad >= 18 Y tiene_identificación, puede registrarse.",
    practice: "Resuelve: temperatura 28, lluvia falsa; contraseña correcta, usuario correcto; promedio 7.5. Escribe la salida de cada condición y justifica con V/F.",
    school: "Diseña las decisiones para entregar una tarea: fecha cumplida, archivo presente y nombre correcto. Indica qué mensaje aparece cuando falla cada condición.",
    steps: ["Subraya datos de entrada y salida esperada.", "Escribe condiciones en forma V/F.", "Combina con Y, O o NO según el caso.", "Prueba un caso verdadero y uno falso para cada regla."],
    verify: "Puedes mostrar la tabla de verdad o una explicación que justifique cada salida.",
  },
  Algoritmos: {
    tool: "Papel, Bloc de notas o editor de diagramas local.",
    theory: "Un algoritmo es una secuencia finita, ordenada y sin ambigüedades que recibe entradas, transforma datos y produce una salida. Descomponer divide un problema grande en módulos pequeños y comprobables.",
    example: "Promedio: iniciar, leer tres calificaciones, sumar, dividir entre 3, mostrar promedio y terminar. Cada verbo representa una acción verificable.",
    practice: "Escribe el algoritmo para calcular el promedio de 8, 9 y 7, y otro para decidir si una tarea está lista según fecha, archivo y nombre.",
    school: "Descompón «preparar exposición de Historia» en módulos: investigar, seleccionar, redactar, diseñar, ensayar y revisar.",
    steps: ["Define el problema y la salida.", "Lista entradas y reglas.", "Ordena acciones con verbos claros.", "Prueba el algoritmo con datos normales y con un caso límite."],
    verify: "Otra persona puede ejecutar tus pasos y obtener la salida esperada sin preguntarte qué significa una instrucción.",
  },
  Diagramas: {
    tool: "Papel y lápiz, diagrams.net si está disponible o formas de un procesador de texto.",
    theory: "En un diagrama de flujo, óvalo indica inicio/fin, rectángulo proceso, paralelogramo entrada/salida y rombo decisión. Las flechas deben tener una dirección clara y cada decisión debe indicar Sí/No.",
    example: "Inicio → leer calificación → ¿calificación >= 6? → Sí: mostrar Aprobado / No: mostrar Reforzar → Fin.",
    practice: "Dibuja el flujo del promedio de 3 calificaciones y del acceso a una entrega con tres validaciones.",
    school: "Representa cómo decides si una tarea de Matemáticas está lista para entregar, incluyendo revisión de fórmula y nombre del archivo.",
    steps: ["Escribe primero el algoritmo en texto.", "Convierte cada tipo de acción en su símbolo.", "Conecta con flechas y etiqueta decisiones.", "Recorre el diagrama con un caso Sí y uno No."],
    verify: "El diagrama tiene inicio y fin, no hay flechas sueltas y cada camino llega a una salida.",
  },
  Código: {
    tool: "Consola del navegador o Node.js si está instalado; si no, escribe el código en Bloc de notas y predice la salida.",
    theory: "En JavaScript, una variable guarda un valor: const no cambia y let puede cambiar. Cadenas van entre comillas, números no. console.log muestra una salida. Las comparaciones producen true o false.",
    example: "const tareas = 3; const hechas = 2; const porcentaje = hechas / tareas * 100; console.log(porcentaje); produce 66.666... y puede redondearse con Math.round.",
    practice: "Escribe un programa que reciba o defina tres calificaciones, calcule promedio y muestre «Aprobado» si es >= 6; prueba 8, 9, 7 y 5, 4, 6.",
    school: "Programa la salida de una boleta simplificada con materias y promedios, indicando qué materia requiere reforzar.",
    steps: ["Escribe entradas con nombres descriptivos.", "Separa proceso y salida en líneas distintas.", "Prueba primero valores sencillos que puedas calcular a mano.", "Lee el error de consola y corrige una sola cosa por vez."],
    verify: "El programa produce las salidas previstas para los dos casos de prueba y puedes explicar cada variable.",
  },
  Scratch: {
    tool: "Scratch si está disponible; si no, representa los bloques en papel usando las instrucciones textuales de esta sesión.",
    theory: "Scratch programa comportamientos con bloques: al presionar bandera inicia, movimiento cambia posición, apariencia comunica, sensores detectan y control repite o decide. El orden de bloques importa.",
    example: "Al presionar bandera → decir «Hola» 2 segundos → repetir 4 veces: mover 20 pasos y girar 90 grados. El objeto dibuja un cuadrado.",
    practice: "Crea una escena con un objeto que diga una instrucción, se mueva por cuatro lados y cambie de disfraz cuando toque el borde.",
    school: "Representa un concepto de Ciencias con un objeto que explique tres datos y haga una pregunta al final.",
    steps: ["Elige escenario, objeto y comportamiento esperado.", "Construye la secuencia de inicio y prueba.", "Agrega una condición o sensor y observa el cambio.", "Usa un ciclo para evitar repetir bloques innecesarios."],
    verify: "Al iniciar, el objeto realiza la secuencia completa, responde al sensor y termina en el estado esperado.",
  },
  Proyecto: {
    tool: "Editor de texto, hoja de cálculo y JavaScript o diagramas disponibles; el proyecto puede documentarse completamente offline.",
    theory: "Un proyecto viable tiene usuario, problema, entradas, proceso, salida, alcance y criterio de éxito. La base de datos puede comenzar como una tabla; la lógica debe poder probarse con casos concretos.",
    example: "Proyecto: control de tareas. Entrada: materia, fecha y estado. Proceso: comparar fecha y estado. Salida: lista de pendientes. Éxito: encontrar una tarea en menos de 10 segundos.",
    practice: "Define un proyecto escolar pequeño con tres registros de prueba, un diagrama, un módulo funcional y una presentación de cinco diapositivas.",
    school: "Elige una necesidad real de preparatoria, como organizar tareas o calificaciones, y limita el producto a una función que puedas demostrar.",
    steps: ["Escribe usuario, problema y resultado observable.", "Crea una tabla con al menos tres registros.", "Dibuja el flujo y programa o simula una función.", "Prueba dos casos normales y uno de error; documenta cambios."],
    verify: "Una persona puede entender el problema, ejecutar una demostración y comprobar el criterio de éxito.",
  },
  Evaluación: {
    tool: "Explorador de archivos, editor de texto y visor de PDF disponible.",
    theory: "Un portafolio reúne evidencias seleccionadas y las ordena para demostrar avance. Cada evidencia necesita título, fecha, objetivo, resultado y una reflexión sobre la mejora.",
    example: "Evidencia: Boleta_S9.xlsx. Objetivo: calcular promedios. Resultado: fórmulas verificadas. Mejora: revisar rangos antes de copiar.",
    practice: "Selecciona tres productos del curso, crea un índice y escribe una ficha de evidencia para cada uno.",
    school: "Construye un portafolio mensual que un profesor pueda revisar sin pedirte contexto adicional.",
    steps: ["Reúne tres archivos y comprueba que abren.", "Renómbralos con fecha y tema.", "Escribe índice y ficha de cada evidencia.", "Exporta o reúne el portafolio y revisa el orden."],
    verify: "El portafolio permite identificar qué aprendiste, con qué archivo lo demuestras y qué mejorarás.",
  },
  Graduación: {
    tool: "Tus archivos del proyecto, visor de documentos y cronómetro.",
    theory: "Defender un proyecto significa explicar problema, decisiones, demostración, resultado y limitaciones. Una conclusión honesta distingue lo que funciona de lo que todavía falta.",
    example: "Presento el control de tareas: resuelve la búsqueda por materia, falla si no hay fecha y como mejora futura agregaría recordatorios.",
    practice: "Prepara una defensa de cinco minutos: problema, diseño, demo, prueba, aprendizaje y mejora futura. Ensáyala dos veces.",
    school: "Explica tu solución a un compañero de preparatoria que no conoce el código y responde tres preguntas sobre sus decisiones.",
    steps: ["Ordena evidencias y abre la versión final.", "Escribe seis frases guía, no un texto para leer.", "Ensaya la demostración con un caso válido y uno inválido.", "Registra preguntas recibidas y responde con evidencia."],
    verify: "Puedes demostrar el producto, explicar una decisión técnica y reconocer una limitación con una mejora viable.",
  },
};

const REMAINING_TOPICS: SeedTopic[] = [
  // Semana 1 (días 3-5)
  { t: "Búsqueda Indexada y Rutas Absolutas", e: "txt", module: "Sistema" },
  { t: "Rutina de Seguridad Digital y Guardado", e: "txt", module: "Seguridad" },
  { t: "Bitácora Semanal y Retrospectiva S1", e: "txt", module: "Reflexión" },
  // Semana 2
  { t: "Mecanografía: Fila Guía ASDF-JKLÑ", e: "txt", module: "Teclado" },
  { t: "Acentos y Caracteres de Código", e: "txt", module: "Teclado" },
  { t: "Atajos de Edición y Portapapeles", e: "txt", module: "Teclado" },
  { t: "Redacción Estructurada 150 palabras", e: "txt", module: "Redacción" },
  { t: "Evaluación de Mecanografía y Bitácora S2", e: "txt", module: "Evaluación" },
  // Semana 3
  { t: "Extensiones y Tipos de Archivo", e: "txt", module: "Archivos" },
  { t: "Nomenclatura Estandarizada de Archivos", e: "txt", module: "Archivos" },
  { t: "Depuración de Descargas", e: "txt", module: "Mantenimiento" },
  { t: "Compresión ZIP y Envío", e: "zip", module: "Archivos" },
  { t: "Respaldo 3-2-1 y Bitácora S3", e: "txt", module: "Seguridad" },
  // Semana 4
  { t: "Configuración de Pantalla y Red", e: "txt", module: "Sistema" },
  { t: "Actualizaciones y Antivirus", e: "txt", module: "Seguridad" },
  { t: "Diagnóstico de Fallas Comunes", e: "txt", module: "Soporte" },
  { t: "Mantenimiento Preventivo", e: "txt", module: "Mantenimiento" },
  { t: "Portafolio Mensual de Evidencias (Sep)", e: "pdf", module: "Evaluación" },
  // Semana 5
  { t: "Jerarquía de Títulos H1, H2, H3", e: "docx", module: "Word" },
  { t: "Interlineado, Márgenes y Párrafos", e: "docx", module: "Word" },
  { t: "Listas Numeradas y Multinivel", e: "docx", module: "Word" },
  { t: "Tablas Comparativas", e: "docx", module: "Word" },
  { t: "Resumen Académico y Bitácora S5", e: "docx", module: "Word" },
  // Semana 6
  { t: "Portadas e Índices Automáticos", e: "docx", module: "Word" },
  { t: "Introducción y Tesis", e: "docx", module: "Word" },
  { t: "Cuerpo Argumentativo", e: "docx", module: "Word" },
  { t: "Conclusiones y Formato APA", e: "docx", module: "Word" },
  { t: "Trabajo Completo y Bitácora S6", e: "pdf", module: "Word" },
  // Semana 7
  { t: "Operadores de Búsqueda Avanzada", e: "txt", module: "Internet" },
  { t: "Confiabilidad Web (CRAAP)", e: "txt", module: "Internet" },
  { t: "Uso de Google Académico", e: "txt", module: "Internet" },
  { t: "Paráfrasis Anti-Plagio", e: "txt", module: "Ética" },
  { t: "Ficha de Investigación y Bitácora S7", e: "docx", module: "Investigación" },
  // Semana 8
  { t: "Correo Formal a Profesores", e: "txt", module: "Comunicación" },
  { t: "Gestión de Adjuntos", e: "txt", module: "Comunicación" },
  { t: "Nube y Carpetas Compartidas", e: "txt", module: "Cloud" },
  { t: "Calendario y Entregas", e: "txt", module: "Productividad" },
  { t: "Auditoría Digital y Bitácora S8", e: "pdf", module: "Evaluación" },
  // Semana 9
  { t: "Filas, Columnas y Celdas", e: "xlsx", module: "Excel" },
  { t: "Tipos de Datos en Excel", e: "xlsx", module: "Excel" },
  { t: "Operadores Aritméticos", e: "xlsx", module: "Excel" },
  { t: "SUMA, PROMEDIO, MAX, MIN", e: "xlsx", module: "Excel" },
  { t: "Boleta Automatizada y Bitácora S9", e: "xlsx", module: "Excel" },
  // Semana 10
  { t: "Porcentajes y Ponderaciones", e: "xlsx", module: "Excel" },
  { t: "Ordenar y Filtrar Datos", e: "xlsx", module: "Excel" },
  { t: "Gráficos Estadísticos", e: "xlsx", module: "Excel" },
  { t: "Interpretación de Tendencias", e: "xlsx", module: "Excel" },
  { t: "Reporte Integrado y Bitácora S10", e: "xlsx", module: "Excel" },
  // Semana 11
  { t: "Estructura Narrativa PPT", e: "pptx", module: "PPT" },
  { t: "Regla 6x6 y Claridad Visual", e: "pptx", module: "PPT" },
  { t: "Jerarquía Visual e Iconos", e: "pptx", module: "PPT" },
  { t: "Exposición Oral 3 minutos", e: "txt", module: "Oratoria" },
  { t: "Presentación en Vivo y Bitácora S11", e: "pptx", module: "PPT" },
  // Semana 12
  { t: "Instrucciones Atómicas", e: "txt", module: "Lógica" },
  { t: "Patrones y Secuencias", e: "txt", module: "Lógica" },
  { t: "Condicionales SI/ENTONCES", e: "txt", module: "Lógica" },
  { t: "Operadores Y, O, NO", e: "txt", module: "Lógica" },
  { t: "Reto Lógico y Bitácora S12", e: "txt", module: "Lógica" },
  // Semana 13
  { t: "Definición de Algoritmo", e: "txt", module: "Algoritmos" },
  { t: "Descomposición Modular", e: "txt", module: "Algoritmos" },
  { t: "Simbología de Diagramas de Flujo", e: "png", module: "Diagramas" },
  { t: "Diagramas con Bifurcaciones", e: "png", module: "Diagramas" },
  { t: "Algoritmo Validado y Bitácora S13", e: "txt", module: "Algoritmos" },
  // Semana 14
  { t: "Variables y Tipos de Dato", e: "js", module: "Código" },
  { t: "Entrada, Proceso y Salida", e: "js", module: "Código" },
  { t: "Operadores de Comparación", e: "js", module: "Código" },
  { t: "Depuración de Errores", e: "js", module: "Código" },
  { t: "Calculadora Lógica y Bitácora S14", e: "js", module: "Código" },
  // Semana 15
  { t: "Scratch: Escenario y Objetos", e: "sb3", module: "Scratch" },
  { t: "Secuencias y Movimiento", e: "sb3", module: "Scratch" },
  { t: "Sensores y Condiciones", e: "sb3", module: "Scratch" },
  { t: "Ciclos y Bucles", e: "sb3", module: "Scratch" },
  { t: "Mini Proyecto Visual y Bitácora S15", e: "sb3", module: "Scratch" },
  // Semana 16
  { t: "Definición del Proyecto Final", e: "docx", module: "Proyecto" },
  { t: "Base de Datos y Lógica del Proyecto", e: "xlsx", module: "Proyecto" },
  { t: "Módulo Funcional / Diagrama", e: "js", module: "Proyecto" },
  { t: "Documentación y PPT del Proyecto", e: "pptx", module: "Proyecto" },
  { t: "Defensa Final y Graduación", e: "pdf", module: "Graduación" },
];

function makeGeneratedDay(id: number, seed: SeedTopic): DaySession {
  const week = Math.ceil(id / 5);
  const day = ((id - 1) % 5) + 1;
  const month = Math.ceil(week / 4);
  const shortName = seed.t.split(" ")[0];
  const fileName = `PREPA_COMP_S${week}D${day}_${shortName}.${seed.e}`;
  const guide = MODULE_GUIDES[seed.module] ?? MODULE_GUIDES.Proyecto;

  return {
    id,
    week,
    day,
    month,
    title: seed.t,
    file: fileName,
    duration: 90,
    objective: `Al finalizar la sesión, Rubén será capaz de explicar «${seed.t}», completar el procedimiento de su módulo (${seed.module}) con los datos de práctica incluidos y producir ${fileName}, comprobando el resultado sin ayuda externa.`,
    purpose: [
      `Preparatoria: ${guide.school}`,
      `Autonomía: practicas un procedimiento completo con información y datos disponibles en la propia sesión.`,
      `Programación: separas entradas, proceso, salida y verificación, una forma de pensar que usarás al programar.`,
    ],
    materials: [
      "Computadora, papel y lápiz",
      guide.tool,
      `Carpeta destino: Prepa_Ruben/05_Computacion/Tareas/`,
      "Alternativa autónoma: si falta la aplicación o Internet, realiza el procedimiento en Bloc de notas y registra qué parte simulaste.",
    ],
    concept: `${guide.theory} En esta sesión el foco es «${seed.t}»: identifica qué parte de esta explicación se aplica al título y qué resultado debe producir.`,
    analogies: [
      guide.example,
      guide.practice,
    ],
    vocabulary: [
      { term: seed.module, def: `Área de trabajo: ${guide.tool}` },
      { term: seed.t, def: `Habilidad concreta que practicarás hoy usando la teoría y el procedimiento de esta sesión.` },
      { term: "Entrada / proceso / salida", def: "Datos que recibes, transformación que realizas y resultado que entregas." },
      { term: "Entregable", def: `Archivo o producto verificable que se guarda como evidencia (${fileName}).` },
      { term: "Autoverificación", def: guide.verify },
    ],
    comprehensionQuestions: [
      `Explica «${seed.t}» usando una definición, un ejemplo y su utilidad escolar.`,
      `Escribe las entradas, el proceso y la salida de la actividad: ${guide.practice}`,
      `¿Qué dato o prueba utilizarás para demostrar que tu resultado es correcto?`,
    ],
    review: [
      `Repasa el concepto relacionado con ${seed.module} y escribe una definición de una línea.`,
      `Resuelve mentalmente este ejemplo antes de abrir la herramienta: ${guide.example}`,
      "Verifica que tu carpeta Prepa_Ruben existe y prepara una copia de seguridad del entregable.",
    ],
    theory: `Tema de hoy: «${seed.t}». ${guide.theory}\n\nEjemplo resuelto:\n${guide.example}\n\nDatos y consigna de práctica:\n${guide.practice}`,
    worked: [
      `Ejemplo resuelto: ${guide.example}`,
      `Repite el ejemplo y después resuelve: ${guide.practice}`,
      `Compara tu resultado con este criterio: ${guide.verify}`,
    ],
    steps: [
      {
        title: "PASO 1: Preparación del entorno (5 min)",
        substeps: [
          `Abre la herramienta indicada: ${guide.tool}`,
          "Verifica que tu carpeta destino existe y está vacía o preparada.",
          `Crea un nuevo archivo con nombre exacto: ${fileName}`,
        ],
        verify: "El archivo aparece creado en la carpeta correcta.",
      },
      {
        title: "PASO 2: Aplicación guiada (15 min)",
        substeps: [
          guide.steps[0],
          guide.steps[1],
          "Guarda con Ctrl+S y compara tu resultado con el ejemplo resuelto.",
        ],
        verify: guide.verify,
      },
      {
        title: "PASO 3: Personalización con contenido escolar (10 min)",
        substeps: [
          guide.steps[2],
          guide.steps[3],
          `Aplica el resultado a este caso escolar: ${guide.school}`,
        ],
        verify: "El producto incluye datos, procedimiento y resultado; otra persona puede entenderlo sin material adicional.",
      },
      {
        title: "PASO 4: Autoverificación final (5 min)",
        substeps: [
          `Comprueba el resultado con este criterio: ${guide.verify}`,
          "Marca al menos 1 mejora y aplícala.",
          "Guarda la versión definitiva.",
        ],
        verify: "El archivo cumple con el objetivo del día y con la nomenclatura pedida.",
      },
    ],
    schoolApp: {
      context: guide.school,
      tasks: [
        `a) Resuelve el caso con estos datos: ${guide.practice}`,
        `b) Explica qué pasos de «${seed.t}» aplicaste y qué entrada, proceso y salida identificaste.`,
        `c) Compara tu resultado con este criterio: ${guide.verify}`,
      ],
      product: `Caso resuelto, explicación y comprobación integrados en ${fileName}; debe poder revisarse sin abrir otra fuente.`,
    },
    closure: [
      `Guarda ${fileName} en la carpeta indicada.`,
      `Escribe en la bitácora la definición, el ejemplo (${guide.example}) y el resultado de tu práctica.`,
      `Registra qué se te dificultó, cómo lo resolviste y si cumpliste este criterio: ${guide.verify}`,
      "Anota una mejora medible para la próxima sesión y conserva una copia del entregable.",
    ],
    extraExercises: [
      {
        level: 1,
        title: "Reproduce el procedimiento",
        instructions: [
          `Resuelve este caso distinto: ${guide.practice}`,
          `Anota qué te costó más y compáralo con el ejemplo: ${guide.example}`,
        ],
      },
      {
        level: 2,
        title: "Detecta y corrige un error",
        instructions: [
          `Un compañero obtuvo un resultado que no cumple: ${guide.verify}`,
          "Describe 2 errores probables, indica en qué paso ocurren y corrígelos con datos concretos.",
        ],
      },
      {
        level: 3,
        title: "Aplícalo a tu propia tarea",
        instructions: [
          `Aplica el tema a esta situación escolar: ${guide.school}`,
          `Guarda el resultado como evidencia y escribe una comprobación usando: ${guide.verify}`,
        ],
      },
    ],
    challenge: {
      title: `RETO: Explícalo sin ayuda`,
      instructions: [
        `Cierra estas instrucciones y explica qué es «${seed.t}», usando este ejemplo: ${guide.example}`,
        `Resuelve el caso de práctica sin mirar y describe sus pasos: ${guide.practice}`,
        `Comprueba tu explicación con este criterio: ${guide.verify}`,
      ],
      success: `Puedes explicar el tema, resolver el caso y justificar el resultado con el criterio: ${guide.verify}`,
    },
    selfEval: [
      { text: `Puedo explicar «${seed.t}» con definición, ejemplo y utilidad.` },
      { text: `Completé el procedimiento usando el caso: ${guide.practice}` },
      { text: `Puedo justificar mi resultado con este criterio: ${guide.verify}` },
      { text: "Guardé el archivo con el nombre exacto pedido." },
      { text: "Registré la sesión en mi bitácora." },
      { text: "Puedo enseñar este tema a otra persona." },
    ],
    rubric: [
      { criterion: "Comprensión del tema", evidence: "Explicación escrita u oral", logrado: "Explicación clara con palabras propias", enProceso: "Explica con apoyo del texto", reforzar: "No logra explicar", maxPts: 3 },
      { criterion: "Ejecución del procedimiento", evidence: "Producto del PASO 2", logrado: "Sin errores, siguiendo el orden", enProceso: "Errores menores corregibles", reforzar: "No sigue el orden o incompleto", maxPts: 4 },
      { criterion: "Personalización escolar", evidence: "Contenido real de una materia", logrado: "Aplicado con sentido y correcto", enProceso: "Aplicado con relación débil", reforzar: "Sin conexión escolar", maxPts: 3 },
      { criterion: "Nomenclatura del archivo", evidence: `Archivo ${fileName}`, logrado: "Nombre y carpeta correctos", enProceso: "1 error leve", reforzar: "Nombre o carpeta incorrectos", maxPts: 2 },
      { criterion: "Bitácora y reflexión", evidence: "Registro completo", logrado: "Reflexión honesta con acción de mejora", enProceso: "Registro completo poco profundo", reforzar: "Incompleto", maxPts: 3 },
      { criterion: "Reto autónomo", evidence: "Explicación sin ayuda", logrado: "Fluida y completa", enProceso: "Con apoyos", reforzar: "No lo intenta", maxPts: 5 },
    ],
    checklist: [
      `Archivo ${fileName} guardado en carpeta correcta`,
      "Procedimiento principal completado sin errores graves",
      "Ejemplo personalizado con contenido escolar",
      "Bitácora actualizada",
      "Reto de explicación autónoma superado",
    ],
    exercise: {
      type: "quiz",
      title: `Práctica guiada: ${seed.t}`,
      questions: [
        {
          q: `¿Cuál es la idea central para trabajar «${seed.t}»?`,
          opts: [guide.theory, "Copiar sin comprobar", "Trabajar sin guardar", "Usar cualquier resultado"],
          correct: 0,
          exp: `La sesión pertenece a ${seed.module} y se trabaja con esta guía: ${guide.theory}`,
        },
        {
          q: `¿Qué evidencia corresponde a «${seed.t}»?`,
          opts: [
            "Un archivo vacío con nombre genérico.",
            `${guide.practice} y una comprobación del resultado.`,
            "Una opinión sin datos.",
            "Una captura sin explicación.",
          ],
          correct: 1,
          exp: `La evidencia debe incluir práctica y cumplir: ${guide.verify}`,
        },
        {
          q: `¿Qué debes hacer si no tienes la herramienta principal para «${seed.t}»?`,
          opts: ["Abandonar la sesión.", "Realizar una simulación en Bloc de notas y registrar qué parte se simuló.", "Inventar el resultado.", "Descargar cualquier archivo."],
          correct: 1,
          exp: "La sesión incluye una alternativa offline para que puedas practicar el razonamiento y la verificación.",
        },
      ],
    },
  };
}

export const CURRICULUM: DaySession[] = [
  DIA_1,
  DIA_2,
  ...REMAINING_TOPICS.map((t, idx) => makeGeneratedDay(idx + 3, t)),
];

export function findDay(id: number): DaySession | undefined {
  return CURRICULUM.find((d) => d.id === id);
}
