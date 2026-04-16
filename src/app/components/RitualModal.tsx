import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Moon, Check } from 'lucide-react';

interface RitualModalProps {
  onClose: () => void;
}

const RITUAL_QUESTIONS = [
  {
    id: 1,
    question: '¿Qué logré hoy que me haga sentir bien?',
    placeholder: 'Escribí aunque sea una cosa pequeña...',
  },
  {
    id: 2,
    question: '¿Qué me costó más de lo esperado?',
    placeholder: 'Sin juzgarte, solo reconocelo...',
  },
  {
    id: 3,
    question: '¿Qué necesito soltar antes de dormir?',
    placeholder: 'Algo que no quieras llevar a mañana...',
  },
];

export default function RitualModal({ onClose }: RitualModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (currentStep < RITUAL_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
  };

  const currentQuestion = RITUAL_QUESTIONS[currentStep];
  const currentAnswer = answers[currentStep] || '';
  const canContinue = currentAnswer.trim().length > 0;

  if (isComplete) {
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
          className="w-full max-w-md text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center"
          >
            <Check className="size-10 text-primary" />
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-3xl font-black">Ritual completado</h2>
            <p className="text-base text-muted-foreground leading-relaxed px-4">
              Cerraste tu día con intención. Descansá sabiendo que hiciste lo que pudiste.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30"
          >
            Finalizar
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

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

        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Moon className="size-8 text-primary" />
            </div>
            <h2 className="text-3xl font-black mb-2">Ritual de cierre</h2>
            <p className="text-sm text-muted-foreground">
              Pregunta {currentStep + 1} de {RITUAL_QUESTIONS.length}
            </p>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            {RITUAL_QUESTIONS.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Question */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold leading-tight">{currentQuestion.question}</h3>
            <textarea
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full h-32 p-4 bg-card border border-border/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              autoFocus
            />
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                className="px-6 py-4 bg-card text-foreground font-bold rounded-xl border border-border/50"
              >
                Anterior
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!canContinue}
              className="flex-1 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep < RITUAL_QUESTIONS.length - 1 ? 'Siguiente' : 'Completar'}
            </motion.button>
          </div>

          {/* Helper text */}
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            Tus respuestas son privadas. Solo vos las ves.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
