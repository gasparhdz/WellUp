import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Wind } from 'lucide-react';

interface ReleaseModalProps {
  onClose: () => void;
}

export default function ReleaseModal({ onClose }: ReleaseModalProps) {
  const [releaseText, setReleaseText] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);

  const handleRelease = () => {
    if (releaseText.trim()) {
      setIsReleasing(true);
      setTimeout(() => {
        setReleaseText('');
        setIsReleasing(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={() => !isReleasing && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-card rounded-3xl p-6 border border-border/50 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X className="size-5" />
        </button>

        <h2 className="text-2xl font-black mb-2">Soltá lo que te pesa</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Escribí lo que necesitás soltar. No se guarda. Es solo tuyo.
        </p>

        <textarea
          value={releaseText}
          onChange={(e) => setReleaseText(e.target.value)}
          placeholder="Dejalo salir..."
          className="w-full h-40 p-4 bg-background border border-border/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
          disabled={isReleasing}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleRelease}
          disabled={!releaseText.trim() || isReleasing}
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
        >
          {isReleasing ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2 }}
              className="flex items-center justify-center gap-2"
            >
              <Wind className="size-5" />
              Liberando...
            </motion.span>
          ) : (
            'Soltar'
          )}
        </motion.button>

        {isReleasing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-primary/10 rounded-3xl pointer-events-none"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
