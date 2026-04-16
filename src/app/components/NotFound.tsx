import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="size-full flex flex-col items-center justify-center px-6 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div>
          <h1 className="text-8xl font-black text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-2">Página no encontrada</h2>
          <p className="text-muted-foreground leading-relaxed">
            Esta ruta no existe. Pará un segundo y volvé al inicio.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          <Home className="size-5" />
          Volver al inicio
        </motion.button>
      </motion.div>
    </div>
  );
}
