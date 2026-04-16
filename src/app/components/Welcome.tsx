import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh w-full flex flex-col bg-gradient-to-b from-background via-background to-card relative overflow-hidden">
      {/* Background visual effect */}
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <div className="absolute -top-20 -left-20 w-[22rem] h-[22rem] bg-primary/25 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[-15%] w-72 h-72 bg-chart-4/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-64 bg-primary/15 rounded-full blur-3xl" />
      </div>

      {/* Content: ocupa la pantalla, centrado vertical con aire arriba/abajo y safe-area en móvil */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center text-center max-w-md w-full mx-auto px-6 gap-10 sm:gap-12 pt-[max(2.5rem,env(safe-area-inset-top,0px))] pb-[max(2rem,env(safe-area-inset-bottom,0px))]"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="shrink-0"
        >
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-3 bg-gradient-to-br from-foreground via-primary to-foreground/90 bg-clip-text text-transparent drop-shadow-sm">
            Well Up
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(45,106,79,0.45)]" />
        </motion.div>

        {/* Imagen bienestar (reemplaza el manifiesto breve; podés cambiar /welcome-hero.jpg en public/) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45 }}
          className="w-full shrink-0 relative max-w-sm mx-auto"
        >
          <div className="absolute -inset-[3px] rounded-[1.15rem] bg-gradient-to-br from-primary via-chart-4/80 to-primary opacity-90 blur-[1px]" />
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-primary/90 via-chart-4/70 to-primary shadow-2xl shadow-primary/25">
            <ImageWithFallback
              src="/welcome-hero.jpg"
              alt="Persona en calma y conexión con el cuerpo, bienestar laboral y salud mental."
              className="w-full aspect-[4/3] object-cover rounded-[14px] block"
            />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="shrink-0 w-full text-center font-bold text-foreground whitespace-nowrap text-[clamp(0.85rem,4vw,1.45rem)] sm:text-xl md:text-2xl tracking-tight px-2"
        >
          Lo que es tuyo está{' '}
          <span className="text-primary font-black">bajo tu piel.</span>
        </motion.h2>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="w-full shrink-0"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-gradient-to-br from-primary via-primary to-[#245a43] text-primary-foreground font-bold rounded-full text-lg shadow-xl shadow-primary/35 hover:shadow-primary/50 hover:brightness-[1.05] active:scale-[0.98] transition-all duration-200 uppercase tracking-[0.18em]"
          >
            Empezar
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="text-center text-sm leading-relaxed text-muted-foreground max-w-md w-full px-2 shrink-0 mt-2 sm:mt-4"
        >
          <span className="text-foreground font-semibold">Privacidad real.</span> Tu empresa mide el pulso del equipo, pero nunca tu diario personal.
        </motion.p>
      </motion.div>
    </div>
  );
}
