import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function EmailVerification() {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Simulate email verification after 2 seconds
    const timer = setTimeout(() => {
      setIsVerified(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigate('/setup-notification');
  };

  return (
    <div className="size-full flex flex-col items-center justify-center px-6 bg-transparent">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8"
      >
        {!isVerified ? (
          <>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center"
            >
              <Mail className="size-10 text-primary" />
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-3xl font-black">Verificá tu email</h1>
              <p className="text-muted-foreground leading-relaxed">
                Te enviamos un email de verificación. Revisá tu bandeja de entrada y hacé clic en el enlace para confirmar tu cuenta.
              </p>
            </div>

            <div className="flex gap-2 items-center justify-center text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Esperando confirmación...</span>
            </div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="size-10 text-primary" />
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-3xl font-black">¡Cuenta verificada!</h1>
              <p className="text-muted-foreground leading-relaxed">
                Tu email fue confirmado exitosamente. Ahora configuremos tu experiencia.
              </p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all uppercase tracking-wide"
            >
              Continuar
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}
