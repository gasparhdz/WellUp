import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';

const EMOTIONS = [
  {
    label: 'Genial',
    value: 'genial',
    emoji: '🔥',
    color: 'from-green-100/90 to-emerald-100/90',
    /** Borde de la card seleccionada: mismo matiz que el fondo, más oscuro */
    selectedBorder: 'border-emerald-600/75',
  },
  {
    label: 'Bien',
    value: 'bien',
    emoji: '😊',
    color: 'from-blue-100/90 to-cyan-100/90',
    selectedBorder: 'border-cyan-600/75',
  },
  {
    label: 'Regular',
    value: 'regular',
    emoji: '😐',
    color: 'from-yellow-100/90 to-amber-100/90',
    selectedBorder: 'border-amber-600/75',
  },
  {
    label: 'Mal',
    value: 'mal',
    emoji: '😔',
    color: 'from-amber-100/90 to-red-100/90',
    selectedBorder: 'border-orange-600/80',
  },
  {
    label: 'Estresado',
    value: 'estresado',
    emoji: '😰',
    color: 'from-red-100/90 to-rose-100/90',
    selectedBorder: 'border-rose-600/80',
  },
];

const INTENTIONS = [
  'Calma',
  'Foco',
  'Energía',
  'Claridad',
  'Paciencia',
  'Confianza',
  'Fuerza',
  'Libertad',
];

const INTENTION_MESSAGES: Record<string, string> = {
  Calma: 'Respirá más lento de lo normal: cuando vos bajás el ritmo, tu mente también.',
  Foco: 'Una sola cosa a la vez. Terminá lo importante antes de abrir otra pestaña mental.',
  Energía: 'Mové el cuerpo dos minutos y volvé: la acción chica destraba el día.',
  Claridad: 'Nombrá en una frase qué te importa hoy y todo lo demás se ordena alrededor.',
  Paciencia: 'No todo se resuelve ya. Avanzar constante también es avanzar fuerte.',
  Confianza: 'Ya superaste días difíciles antes; hoy también tenés con qué.',
  Fuerza: 'Hacé lo que evitás primero: después de ese paso, todo pesa menos.',
  Libertad: 'Elegí desde vos, no desde la presión. Tu día mejora cuando te pertenece.',
};

export default function Today() {
  const [dailyScore, setDailyScore] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intention, setIntention] = useState('');
  const [streak, setStreak] = useState(7);
  const intentionMessageRef = useRef<HTMLDivElement | null>(null);

  const getEmotionMessage = (emotion: string) => {
    switch (emotion) {
      case 'genial':
        return 'Aprovechá esta energía. Es tuya.';
      case 'bien':
        return 'Un día sólido. Así se construye.';
      case 'regular':
        return 'Un día más. Eso también cuenta.';
      case 'mal':
        return 'Está bien sentirse así. No tenés que estar perfecto.';
      case 'estresado':
        return 'Pará un segundo. En serio. Tu cuerpo está pidiendo una pausa.';
      default:
        return '';
    }
  };

  const getIntentionMessage = (selectedIntention: string) =>
    INTENTION_MESSAGES[selectedIntention] ?? 'Elegiste una intención valiosa para guiar tu día.';

  useEffect(() => {
    if (!intention) return;
    requestAnimationFrame(() => {
      intentionMessageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  }, [intention]);

  return (
    <div className="min-h-full bg-transparent">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 bg-gradient-to-b from-card/70 via-card/25 to-transparent backdrop-blur-[2px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-3xl font-black mb-1">HOY</h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>

          {/* Streak indicator */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-primary/15 to-chart-4/10 border border-primary/35 rounded-full shadow-md shadow-primary/15 ring-1 ring-primary/10">
            <Flame className="size-5 text-primary" />
            <span className="font-bold text-primary">{streak}</span>
            <span className="text-xs text-primary/80">días</span>
          </div>
        </motion.div>
      </div>

      <div className="px-6 pb-4 space-y-8">
        {/* Emotional Check-in - 5 estados del PRD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold">¿Cómo llegás hoy?</h2>

          <div className="grid grid-cols-5 gap-2">
            {EMOTIONS.map((emotion, index) => {
              const isSelected = selectedEmotion === emotion.value;
              const hasSelection = selectedEmotion !== null;
              return (
              <motion.button
                key={emotion.value}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{
                  opacity: 1,
                  scale: isSelected ? 1.12 : hasSelection ? 0.97 : 1,
                  boxShadow: isSelected
                    ? '0 16px 36px -10px rgba(15, 20, 25, 0.28), 0 8px 20px -12px rgba(45, 106, 79, 0.22), 0 0 0 2px rgba(45, 106, 79, 0.18)'
                    : '0 0 0 0 rgba(0,0,0,0)',
                }}
                transition={{
                  opacity: { delay: 0.1 + index * 0.05, duration: 0.35 },
                  scale: { type: 'spring', stiffness: 460, damping: 19 },
                  boxShadow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
                whileHover={{
                  scale: isSelected ? 1.14 : hasSelection ? 1.04 : 1.12,
                  transition: { type: 'spring', stiffness: 520, damping: 18 },
                }}
                whileTap={{
                  scale: isSelected ? 1.05 : 0.92,
                  transition: { type: 'spring', stiffness: 580, damping: 20 },
                }}
                onClick={() => setSelectedEmotion(emotion.value)}
                className={`relative aspect-square min-w-0 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 px-0.5 py-1 bg-gradient-to-br ${emotion.color} ${
                  isSelected
                    ? `${emotion.selectedBorder} z-10 brightness-[1.04]`
                    : 'border-border/50 z-0 hover:border-primary/50'
                }`}
              >
                <span className="text-3xl shrink-0 leading-none">{emotion.emoji}</span>
                <span className="w-full min-w-0 text-center text-[10px] font-medium leading-tight px-0.5 text-foreground/90 line-clamp-2 sm:text-xs">
                  {emotion.label}
                </span>
              </motion.button>
            );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedEmotion && (
              <motion.div
                key={selectedEmotion}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.2 }}
                className="border-l-[3px] border-primary pl-4 pr-1 py-0.5"
              >
                <p className="text-base font-medium leading-snug text-foreground">
                  {getEmotionMessage(selectedEmotion)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Daily Score */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Score del día</h2>
            <span className="text-4xl font-black text-primary">{dailyScore}</span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="1"
              max="10"
              value={dailyScore}
              onChange={(e) => setDailyScore(parseInt(e.target.value))}
              className="w-full h-3 bg-card rounded-full appearance-none cursor-pointer accent-primary
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-6
                [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:shadow-primary/50
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-6
                [&::-moz-range-thumb]:h-6
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-primary
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg
                [&::-moz-range-thumb]:shadow-primary/50
                [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2D6A4F 0%, #2D6A4F ${(dailyScore - 1) * 11.11}%, #e8eaef ${(dailyScore - 1) * 11.11}%, #e8eaef 100%)`
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>1</span>
              <span>10</span>
            </div>
          </div>
        </motion.section>

        {/* Intention */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold">Mi intención de hoy es...</h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INTENTIONS.map((word, index) => (
              <motion.button
                key={word}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.03 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIntention(word)}
                className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition-all ${
                  intention === word
                    ? 'border-primary/70 bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'border-border/50 bg-card text-foreground hover:border-primary/50'
                }`}
              >
                {word}
              </motion.button>
            ))}
          </div>

          {intention && (
            <motion.div
              ref={intentionMessageRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/30"
            >
              <p className="text-lg font-bold text-center">
                Mi intención hoy es: <span className="text-primary">{intention}</span>
              </p>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {getIntentionMessage(intention)}
              </p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
