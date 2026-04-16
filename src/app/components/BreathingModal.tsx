import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Circle } from 'lucide-react';

interface BreathingModalProps {
  onClose: () => void;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'idle';

export default function BreathingModal({ onClose }: BreathingModalProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (phase === 'inhale' && prev >= 4) {
          setPhase('hold');
          return 0;
        }
        if (phase === 'hold' && prev >= 2) {
          setPhase('exhale');
          return 0;
        }
        if (phase === 'exhale' && prev >= 6) {
          setCycles((c) => c + 1);
          setPhase('inhale');
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCycles(0);
    setCount(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase('idle');
    setCount(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhalá';
      case 'hold':
        return 'Sostené';
      case 'exhale':
        return 'Exhalá';
      default:
        return 'Listo para empezar';
    }
  };

  const getCircleSize = () => {
    switch (phase) {
      case 'inhale':
        return 200;
      case 'hold':
        return 200;
      case 'exhale':
        return 120;
      default:
        return 160;
    }
  };

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
            <h2 className="text-3xl font-black mb-2">Respiración guiada</h2>
            <p className="text-sm text-muted-foreground">Ciclo 4-2-6 segundos</p>
          </div>

          {/* Breathing Circle */}
          <div className="flex items-center justify-center h-80">
            <motion.div
              animate={{
                width: getCircleSize(),
                height: getCircleSize(),
              }}
              transition={{
                duration: phase === 'inhale' ? 4 : phase === 'hold' ? 2 : phase === 'exhale' ? 6 : 0.5,
                ease: 'easeInOut',
              }}
              className="rounded-full bg-gradient-to-br from-primary/40 to-primary/20 backdrop-blur-sm border border-primary/50 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
              <div className="relative z-10 text-center">
                <p className="text-2xl font-black mb-2">{getPhaseText()}</p>
                {phase !== 'idle' && (
                  <p className="text-4xl font-black text-primary">
                    {phase === 'inhale' ? 4 - count : phase === 'hold' ? 2 - count : 6 - count}
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          {isActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              Ciclos completados: <span className="text-primary font-bold">{cycles}</span>
            </motion.p>
          )}

          {/* Controls */}
          <div className="space-y-3">
            {!isActive ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStart}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30"
              >
                Comenzar
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStop}
                className="w-full py-4 bg-card text-foreground font-bold rounded-xl border border-border/50"
              >
                Detener
              </motion.button>
            )}
          </div>

          {/* Instructions */}
          {!isActive && (
            <div className="p-4 bg-card/50 rounded-xl border border-border/30 text-left space-y-2 text-sm text-muted-foreground">
              <p><span className="text-primary font-bold">Inhalá</span> por 4 segundos</p>
              <p><span className="text-primary font-bold">Sostené</span> por 2 segundos</p>
              <p><span className="text-primary font-bold">Exhalá</span> por 6 segundos</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
