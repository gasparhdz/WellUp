import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const HARDCODED_USERS: Record<string, 'empleado' | 'lider'> = {
  'user@mail.com': 'empleado',
  'leader@mail.com': 'lider',
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const role = HARDCODED_USERS[normalizedEmail];

    if (!role) {
      setLoginError('Credenciales inválidas.');
      return;
    }

    setLoginError('');
    localStorage.setItem('wellup_user', JSON.stringify({ email: normalizedEmail, role }));
    navigate(role === 'lider' ? '/leader' : '/app');
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
        <h1 className="text-2xl font-black">Iniciar sesión</h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="space-y-6 max-w-md mx-auto w-full"
        >
          {/* Privacidad — igual que en Crear cuenta */}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (loginError) setLoginError('');
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (loginError) setLoginError('');
                }}
                placeholder="Tu contraseña"
                required
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

          {loginError && (
            <p className="text-sm font-medium text-destructive">{loginError}</p>
          )}

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all uppercase tracking-wide"
          >
            Entrar
          </motion.button>

          {/* Register link */}
          <p className="text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-primary font-semibold hover:underline"
            >
              Registrate
            </button>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
