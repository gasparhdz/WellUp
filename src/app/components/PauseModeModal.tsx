import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Volume2, VolumeX, Cloud, Waves, TreePine } from 'lucide-react';

interface PauseModeModalProps {
  onClose: () => void;
}

const AMBIENT_SOUNDS = [
  { id: 'rain', label: 'Lluvia', icon: Cloud, description: 'Lluvia suave y constante' },
  { id: 'waves', label: 'Ondas', icon: Waves, description: 'Olas del mar' },
  { id: 'forest', label: 'Bosque', icon: TreePine, description: 'Sonidos del bosque' },
];

export default function PauseModeModal({ onClose }: PauseModeModalProps) {
  const [selectedSound, setSelectedSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const handlePlay = (soundId: string) => {
    setSelectedSound(soundId);
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
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

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-black mb-2">Modo pausa</h2>
            <p className="text-sm text-muted-foreground">Elegí tu ambiente</p>
          </div>

          {/* Sound Selection */}
          <div className="space-y-3">
            {AMBIENT_SOUNDS.map((sound, index) => (
              <motion.button
                key={sound.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlay(sound.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                  selectedSound === sound.id && isPlaying
                    ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
                    : 'bg-card border-border/50 hover:border-primary/50'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  selectedSound === sound.id && isPlaying
                    ? 'bg-primary/20'
                    : 'bg-muted/50'
                }`}>
                  <sound.icon className={`size-7 ${
                    selectedSound === sound.id && isPlaying
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{sound.label}</h3>
                  <p className="text-sm text-muted-foreground">{sound.description}</p>
                </div>
                {selectedSound === sound.id && isPlaying && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex gap-1"
                  >
                    <motion.div
                      animate={{ height: [12, 24, 12] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-1 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ height: [24, 12, 24] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                      className="w-1 bg-primary rounded-full"
                    />
                    <motion.div
                      animate={{ height: [12, 24, 12] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                      className="w-1 bg-primary rounded-full"
                    />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Volume Control */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-4 bg-card/50 rounded-xl border border-border/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Volumen</span>
                <span className="text-sm text-muted-foreground">{volume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <VolumeX className="size-4 text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-primary
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                />
                <Volume2 className="size-4 text-primary" />
              </div>
            </motion.div>
          )}

          {/* Controls */}
          {isPlaying && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStop}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30"
            >
              Detener
            </motion.button>
          )}

          {/* Message */}
          {!isPlaying && (
            <p className="text-sm text-center text-muted-foreground leading-relaxed px-4">
              Los sonidos ambientes te ayudan a desconectar del ruido mental y crear tu propio espacio.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
