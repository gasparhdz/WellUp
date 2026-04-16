import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Pause, Heart, Star } from 'lucide-react';

const CONCEPTS = [
  {
    id: 1,
    title: 'CAOS',
    description: 'El desorden como parte del proceso. Lo que parece caótico puede ser transformación.',
    emotion: 'Estrés / sobrecarga',
    gradient: 'from-red-100/90 to-emerald-100/90',
    duration: '3:45',
  },
  {
    id: 2,
    title: 'LÍMITES',
    description: 'Poner límites no es egoismo. Es supervivencia y respeto propio.',
    emotion: 'Agotamiento / presión laboral',
    gradient: 'from-purple-100/90 to-pink-100/90',
    duration: '4:12',
  },
  {
    id: 3,
    title: 'MIEDO',
    description: 'El miedo como brújula y como freno. Cómo vivir con él sin que te pare.',
    emotion: 'Ansiedad / bloqueo',
    gradient: 'from-blue-100/90 to-cyan-100/90',
    duration: '3:28',
  },
  {
    id: 4,
    title: 'DESCANSO',
    description: 'Descansar no es perder el tiempo. Es el único camino al rendimiento real.',
    emotion: 'Cansancio crónico',
    gradient: 'from-indigo-100/90 to-blue-100/90',
    duration: '2:55',
  },
  {
    id: 5,
    title: 'FOCO',
    description: 'Lo que elegis no hacer define más que lo que elegis hacer.',
    emotion: 'Dispersión / multitarea',
    gradient: 'from-green-100/90 to-emerald-100/90',
    duration: '3:18',
  },
  {
    id: 6,
    title: 'CONTRADICCIÓN',
    description: 'Ser contradictorios no nos hace falsos. Nos hace humanos.',
    emotion: 'Conflicto interno',
    gradient: 'from-yellow-100/90 to-emerald-100/90',
    duration: '4:05',
  },
  {
    id: 7,
    title: 'CRECER',
    description: 'Crecer duele. Y eso está bien. El malestar no siempre es señal de algo malo.',
    emotion: 'Transición / cambio',
    gradient: 'from-teal-100/90 to-green-100/90',
    duration: '3:52',
  },
  {
    id: 8,
    title: 'EXISTIR',
    description: 'El simple hecho de estar. Presente. Sin rendir. Sin justificarse.',
    emotion: 'Vacío / desconexión',
    gradient: 'from-gray-100/90 to-slate-100/90',
    duration: '2:40',
  },
  {
    id: 9,
    title: 'PRESIÓN',
    description: 'Qué hacés con la presión cuando no se va. Cómo no dejarte aplastar.',
    emotion: 'Alta demanda / deadlines',
    gradient: 'from-red-100/90 to-pink-100/90',
    duration: '3:33',
  },
  {
    id: 10,
    title: 'SOLEDAD',
    description: 'La soledad elegida como recurso. La no elegida como señal.',
    emotion: 'Aislamiento / drenaje social',
    gradient: 'from-violet-100/90 to-purple-100/90',
    duration: '4:20',
  },
  {
    id: 11,
    title: 'RENDIMIENTO',
    description: 'Rendir no es lo mismo que existir. El peligro de definirte por tu productividad.',
    emotion: 'Exigencia / burnout',
    gradient: 'from-lime-100/90 to-red-100/90',
    duration: '3:15',
  },
  {
    id: 12,
    title: 'ACEPTAR',
    description: 'Aceptar no es resignarse. Es dejar de pelear con lo que no podés cambiar.',
    emotion: 'Frustración / impotencia',
    gradient: 'from-blue-100/90 to-indigo-100/90',
    duration: '2:48',
  },
  {
    id: 13,
    title: 'ENERGÍA',
    description: 'De dónde viene tu energía real. Qué te la da y qué te la roba.',
    emotion: 'Bajo ánimo / apatía',
    gradient: 'from-yellow-100/90 to-amber-100/90',
    duration: '3:42',
  },
  {
    id: 14,
    title: 'SILENCIO',
    description: 'Lo que aparece cuando parás el ruido. El silencio como herramienta.',
    emotion: 'Saturación de estímulos',
    gradient: 'from-slate-100/90 to-gray-100/90',
    duration: '4:10',
  },
  {
    id: 15,
    title: 'URGENCIA',
    description: 'Todo parece urgente. Nada lo es tanto. Cómo recuperar el criterio.',
    emotion: 'Reactividad / estrés agudo',
    gradient: 'from-red-100/90 to-rose-100/90',
    duration: '3:25',
  },
  {
    id: 16,
    title: 'PROPÓSITO',
    description: 'Para qué hacés lo que hacés. La pregunta que pocos se hacen en serio.',
    emotion: 'Desmotivación / vacío',
    gradient: 'from-purple-100/90 to-violet-100/90',
    duration: '4:35',
  },
  {
    id: 17,
    title: 'CONFIANZA',
    description: 'Confiar en vos cuando nada garantiza el resultado. El acto de fe interno.',
    emotion: 'Inseguridad / dudas',
    gradient: 'from-cyan-100/90 to-blue-100/90',
    duration: '3:08',
  },
  {
    id: 18,
    title: 'CAMBIO',
    description: 'El cambio no pide permiso. Cómo moverte cuando el suelo se mueve.',
    emotion: 'Incertidumbre / transición',
    gradient: 'from-teal-100/90 to-cyan-100/90',
    duration: '3:50',
  },
  {
    id: 19,
    title: 'PAUSA',
    description: 'Parar no es debilidad. Es la decisión más inteligente en ciertos momentos.',
    emotion: 'Agotamiento / on-demand',
    gradient: 'from-indigo-100/90 to-purple-100/90',
    duration: '2:30',
  },
  {
    id: 20,
    title: 'IDENTIDAD',
    description: 'No sos tu cargo, tu sueldo, ni tu productividad. Quién sos cuando todo eso desaparece.',
    emotion: 'Crisis de sentido / burnout',
    gradient: 'from-pink-100/90 to-rose-100/90',
    duration: '4:18',
  },
];

export default function Explore() {
  const [selectedConcept, setSelectedConcept] = useState<typeof CONCEPTS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-full bg-transparent pb-4">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 bg-gradient-to-b from-card/70 via-card/25 to-transparent backdrop-blur-[2px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-black mb-2">EXPLORAR</h1>
          <p className="text-sm text-muted-foreground">
            20 conceptos que importan. Elegí el que te resuena ahora.
          </p>
        </motion.div>
      </div>

      {/* Concept Grid */}
      <div className="grid grid-cols-1 gap-4 px-6">
        {CONCEPTS.map((concept, index) => (
          <motion.button
            key={concept.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedConcept(concept)}
            className={`min-h-44 rounded-2xl bg-gradient-to-br ${concept.gradient} backdrop-blur-sm border border-border/30 p-6 flex flex-col items-start justify-between relative overflow-hidden group`}
          >
            {/* Favorite indicator */}
            {favorites.includes(concept.id) && (
              <Star className="absolute top-3 right-3 size-4 text-primary fill-primary" />
            )}

            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(45,106,79,0.12),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 w-full">
              <h3 className="mb-2 min-h-[2.6em] text-left text-xl font-black leading-tight tracking-tight [overflow-wrap:anywhere] sm:text-2xl">
                {concept.title}
              </h3>
              <p className="text-xs text-muted-foreground text-left line-clamp-2">
                {concept.emotion}
              </p>
            </div>

            <Play className="size-6 text-primary/80 group-hover:text-primary transition-colors relative z-10" />
          </motion.button>
        ))}
      </div>

      {/* Concept Player Modal */}
      <AnimatePresence>
        {selectedConcept && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/98 backdrop-blur-lg z-50 flex items-center justify-center p-6"
            onClick={() => {
              setSelectedConcept(null);
              setIsPlaying(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md relative"
            >
              {/* Close button */}
              <button
                onClick={() => {
                  setSelectedConcept(null);
                  setIsPlaying(false);
                }}
                className="absolute -top-12 right-0 p-3 bg-card/80 hover:bg-card rounded-full transition-colors z-10"
              >
                <X className="size-6" />
              </button>

              {/* Player card */}
              <div className={`rounded-3xl bg-gradient-to-br ${selectedConcept.gradient} backdrop-blur-sm border border-border/30 overflow-hidden`}>
                {/* Cinematic image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-black/40 to-black/60 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,106,79,0.2),transparent_70%)]" />
                  <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-6xl font-black text-center relative z-10"
                  >
                    {selectedConcept.title}
                  </motion.h2>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 bg-card/90 backdrop-blur-sm">
                  <p className="text-base leading-relaxed">
                    {selectedConcept.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                    <span className="px-3 py-1 bg-muted/50 rounded-full">
                      {selectedConcept.emotion}
                    </span>
                    <span className="px-3 py-1 bg-muted/50 rounded-full">
                      {selectedConcept.duration}
                    </span>
                  </div>

                  {/* Play button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlay}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/30"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="size-5" />
                        Reproduciendo...
                      </>
                    ) : (
                      <>
                        <Play className="size-5" />
                        Escuchar
                      </>
                    )}
                  </motion.button>

                  {/* Progress bar (when playing) */}
                  {isPlaying && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3 }}
                      className="h-1 bg-primary rounded-full origin-left"
                    />
                  )}

                  {/* Favorite button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleFavorite(selectedConcept.id)}
                    className={`w-full py-3 font-medium rounded-xl flex items-center justify-center gap-2 border-2 transition-all ${
                      favorites.includes(selectedConcept.id)
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-transparent border-border/50 text-foreground hover:border-primary/50'
                    }`}
                  >
                    <Heart
                      className={`size-5 ${
                        favorites.includes(selectedConcept.id) ? 'fill-primary' : ''
                      }`}
                    />
                    {favorites.includes(selectedConcept.id) ? 'Guardado' : 'Guardar en favoritos'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
