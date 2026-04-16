import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Timer, RotateCcw } from 'lucide-react';

interface ResetModalProps {
  onClose: () => void;
}

export default function ResetModal({ onClose }: ResetModalProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (!isActive || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(60);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(60);
  };

  const progress = ((60 - timeLeft) / 60) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/98 backdrop-blur-lg z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-3 bg-card/80 hover:bg-card rounded-full transition-colors z-10"
        >
          <X className="size-6" />
        </button>

        <div className="space-y-8 text-center">
          <div>
            <h2 className="text-3xl font-black mb-2">Reseteo de 60 segundos</h2>
            <p className="text-sm text-muted-foreground">Un minuto para reiniciar</p>
          </div>

          {/* Timer Display */}
          <div className="relative w-64 h-64 mx-auto">
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-card"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                className="text-primary"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ duration: 0.5 }}
                style={{
                  pathLength: progress / 100,
                  strokeDasharray: '283',
                  strokeDashoffset: `${283 - (283 * progress) / 100}`,
                }}
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <motion.p
                  key={timeLeft}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black text-primary"
                >
                  {timeLeft}
                </motion.p>
                <p className="text-sm text-muted-foreground">segundos</p>
              </div>
            </div>
          </div>

          {/* Message */}
          {isActive && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base text-foreground/90 leading-relaxed px-4"
            >
              {timeLeft > 45 && "Cerrá los ojos. Respirá profundo."}
              {timeLeft <= 45 && timeLeft > 30 && "Dejá que tu mente descanse."}
              {timeLeft <= 30 && timeLeft > 15 && "No tenés que pensar en nada."}
              {timeLeft <= 15 && timeLeft > 5 && "Ya casi. Seguí respirando."}
              {timeLeft <= 5 && "Listo. Volvé cuando estés."}
            </motion.p>
          )}

          {timeLeft === 60 && !isActive && (
            <p className="text-base text-muted-foreground leading-relaxed px-4">
              Pará un segundo. En serio. Un minuto de nada puede cambiar todo.
            </p>
          )}

          {/* Controls */}
          <div className="space-y-3">
            {!isActive ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                <Timer className="size-5" />
                Comenzar
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="w-full py-4 bg-card text-foreground font-bold rounded-xl border border-border/50 flex items-center justify-center gap-2"
              >
                <RotateCcw className="size-5" />
                Reiniciar
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
