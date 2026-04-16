import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'empleado' | 'lider'>('empleado');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - store in localStorage
    localStorage.setItem('wellup_user', JSON.stringify({ email, role }));
    navigate('/verify-email');
  };

  return (
    <div className="size-full flex flex-col bg-transparent">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-card rounded-full transition-colors"
        >
          <ArrowLeft className="size-6" />
        </button>
        <h1 className="text-2xl font-black">Crear cuenta</h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleRegister}
          className="space-y-6 max-w-md mx-auto w-full"
        >
          {/* Privacy reassurance */}
          <div className="p-4 bg-card/50 rounded-xl border border-border/30">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="text-foreground font-semibold">Privacidad real.</span> Tu empresa mide el pulso del equipo, pero nunca tu diario personal.
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full pl-12 pr-4 py-4 bg-input-background border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
                className="w-full pl-12 pr-12 py-4 bg-input-background border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground">
              ¿Cómo vas a usar WellUp?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('empleado')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  role === 'empleado'
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="font-bold mb-1">Empleado</div>
                <div className="text-xs text-muted-foreground">
                  Uso personal diario
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('lider')}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  role === 'lider'
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border/50 hover:border-primary/50'
                }`}
              >
                <div className="font-bold mb-1">Líder</div>
                <div className="text-xs text-muted-foreground">
                  Dashboard de equipo
                </div>
              </button>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all uppercase tracking-wide"
          >
            Crear cuenta
          </motion.button>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground">
            ¿Ya tenés cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-primary font-semibold hover:underline"
            >
              Iniciá sesión
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
