import { motion } from 'motion/react';
import { Wind, Moon, Circle, Timer, Waves } from 'lucide-react';

export type WellbeingToolId = 'release' | 'breathing' | 'reset' | 'pause' | 'ritual';

type Props = {
  onOpenTool: (tool: WellbeingToolId) => void;
  /** Delay base de la animación de entrada (sección en Hoy vs. pantalla dedicada) */
  motionDelay?: number;
};

export default function WellbeingToolsGrid({ onOpenTool, motionDelay = 0.4 }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: motionDelay }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onOpenTool('release')}
          className="group flex min-h-[168px] flex-col items-start rounded-2xl border border-border/50 bg-card p-6 text-left transition-all hover:border-primary/50"
        >
          <span className="mb-3 inline-flex size-8 items-center justify-center">
            <Wind className="size-8 text-primary transition-transform group-hover:scale-110" />
          </span>
          <h3 className="font-bold mb-1">Soltá lo que te pesa</h3>
          <p className="text-xs text-muted-foreground">Escribilo y dejá que se vaya</p>
        </button>

        <button
          type="button"
          onClick={() => onOpenTool('breathing')}
          className="group flex min-h-[168px] flex-col items-start rounded-2xl border border-border/50 bg-card p-6 text-left transition-all hover:border-primary/50"
        >
          <span className="mb-3 inline-flex size-8 items-center justify-center">
            <Circle className="size-8 text-primary transition-transform group-hover:scale-110" />
          </span>
          <h3 className="font-bold mb-1">Respiración guiada</h3>
          <p className="text-xs text-muted-foreground">Ciclo 4-2-6 segundos</p>
        </button>

        <button
          type="button"
          onClick={() => onOpenTool('reset')}
          className="group flex min-h-[168px] flex-col items-start rounded-2xl border border-border/50 bg-card p-6 text-left transition-all hover:border-primary/50"
        >
          <span className="mb-3 inline-flex size-8 items-center justify-center">
            <Timer className="size-8 text-primary transition-transform group-hover:scale-110" />
          </span>
          <h3 className="font-bold mb-1">Reseteo de 60s</h3>
          <p className="text-xs text-muted-foreground">Un minuto para reiniciar</p>
        </button>

        <button
          type="button"
          onClick={() => onOpenTool('pause')}
          className="group flex min-h-[168px] flex-col items-start rounded-2xl border border-border/50 bg-card p-6 text-left transition-all hover:border-primary/50"
        >
          <span className="mb-3 inline-flex size-8 items-center justify-center">
            <Waves className="size-8 text-primary transition-transform group-hover:scale-110" />
          </span>
          <h3 className="font-bold mb-1">Modo pausa</h3>
          <p className="text-xs text-muted-foreground">Sonidos ambientes</p>
        </button>

        <button
          type="button"
          onClick={() => onOpenTool('ritual')}
          className="group col-span-2 flex min-h-[168px] flex-col items-start rounded-2xl border border-border/50 bg-card p-6 text-left transition-all hover:border-primary/50"
        >
          <span className="mb-3 inline-flex size-8 items-center justify-center">
            <Moon className="size-8 text-primary transition-transform group-hover:scale-110" />
          </span>
          <h3 className="font-bold mb-1">Ritual de cierre</h3>
          <p className="text-xs text-muted-foreground">Cerrá el día con intención</p>
        </button>
      </div>
    </motion.section>
  );
}
