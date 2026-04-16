import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Users, TrendingUp, BarChart3, Flame, LogOut, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';

// Mock aggregated data - in production this would come from the backend
const TEAM_TREND_DATA = [
  { day: 'Lun', avgScore: 6.2 },
  { day: 'Mar', avgScore: 5.8 },
  { day: 'Mié', avgScore: 6.5 },
  { day: 'Jue', avgScore: 6.1 },
  { day: 'Vie', avgScore: 7.2 },
  { day: 'Sáb', avgScore: 6.8 },
  { day: 'Dom', avgScore: 6.5 },
];

const FEATURE_USAGE_DATA = [
  { feature: 'Check-in', count: 245 },
  { feature: 'Respiración', count: 128 },
  { feature: 'Biblioteca', count: 156 },
  { feature: 'Ritual', count: 89 },
  { feature: 'Liberar', count: 112 },
];

const ACTIVE_EMPLOYEES = 42;
const TOTAL_EMPLOYEES = 50;
const ACTIVE_PERCENTAGE = (ACTIVE_EMPLOYEES / TOTAL_EMPLOYEES * 100).toFixed(0);
const TEAM_AVG_STREAK = 5.8;
const TEAM_AVG_SCORE = (TEAM_TREND_DATA.reduce((acc, day) => acc + day.avgScore, 0) / TEAM_TREND_DATA.length).toFixed(1);

export default function LeaderDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="size-full bg-transparent overflow-y-auto">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 bg-gradient-to-b from-card/70 via-card/25 to-transparent backdrop-blur-[2px] border-b border-primary/15">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-black mb-1">Dashboard de Equipo</h1>
            <p className="text-sm text-muted-foreground">
              Datos agregados y anónimos · Semana actual
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="p-3 bg-card hover:bg-muted rounded-full transition-colors"
          >
            <LogOut className="size-5" />
          </button>
        </motion.div>
      </div>

      <div className="px-6 py-8 space-y-8 max-w-6xl mx-auto">
        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-card/50 rounded-xl border border-border/30 flex items-start gap-3"
        >
          <Shield className="size-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">Privacidad garantizada.</span> Este dashboard muestra únicamente datos agregados y anónimos del equipo. Nunca tenés acceso a información individual de ningún empleado.
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Active Employees */}
          <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/30">
            <Users className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-primary mb-1">{ACTIVE_PERCENTAGE}%</div>
            <div className="text-sm text-muted-foreground">Empleados activos</div>
            <div className="text-xs text-muted-foreground mt-2">
              {ACTIVE_EMPLOYEES} de {TOTAL_EMPLOYEES} usuarios activos esta semana
            </div>
          </div>

          {/* Team Average Score */}
          <div className="p-6 bg-card rounded-2xl border border-border/50">
            <TrendingUp className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-foreground mb-1">{TEAM_AVG_SCORE}</div>
            <div className="text-sm text-muted-foreground">Score promedio del equipo</div>
            <div className="text-xs text-muted-foreground mt-2">
              Tendencia semanal
            </div>
          </div>

          {/* Average Streak */}
          <div className="p-6 bg-card rounded-2xl border border-border/50">
            <Flame className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-foreground mb-1">{TEAM_AVG_STREAK}</div>
            <div className="text-sm text-muted-foreground">Racha promedio</div>
            <div className="text-xs text-muted-foreground mt-2">
              Días consecutivos activos
            </div>
          </div>

          {/* Total Interactions */}
          <div className="p-6 bg-card rounded-2xl border border-border/50">
            <BarChart3 className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-foreground mb-1">
              {FEATURE_USAGE_DATA.reduce((acc, f) => acc + f.count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Interacciones totales</div>
            <div className="text-xs text-muted-foreground mt-2">
              Esta semana
            </div>
          </div>
        </motion.div>

        {/* Team Emotional Trend */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Tendencia emocional del equipo</h2>
            <p className="text-sm text-muted-foreground">
              Promedio de scores diarios del equipo completo
            </p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TEAM_TREND_DATA}>
                <XAxis
                  dataKey="day"
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 10]}
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(15, 20, 25, 0.12)',
                    borderRadius: '12px',
                    color: '#0f1419',
                    boxShadow: '0 4px 24px rgba(15, 20, 25, 0.08)',
                  }}
                  labelStyle={{ color: '#0f1419' }}
                  formatter={(value: number) => [`${value.toFixed(1)}`, 'Score promedio']}
                />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#2D6A4F"
                  strokeWidth={3}
                  dot={{
                    fill: '#2D6A4F',
                    strokeWidth: 2,
                    r: 6,
                  }}
                  activeDot={{
                    r: 8,
                    fill: '#2D6A4F',
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 p-4 bg-muted/20 rounded-xl">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">Insight:</span> El equipo mostró una mejora notable hacia el final de la semana, con el viernes alcanzando el score más alto (7.2).
            </p>
          </div>
        </motion.section>

        {/* Feature Usage */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Funcionalidades más usadas</h2>
            <p className="text-sm text-muted-foreground">
              Ranking de herramientas utilizadas por el equipo
            </p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FEATURE_USAGE_DATA} layout="vertical">
                <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis
                  type="category"
                  dataKey="feature"
                  stroke="#9CA3AF"
                  style={{ fontSize: '12px' }}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(15, 20, 25, 0.12)',
                    borderRadius: '12px',
                    color: '#0f1419',
                    boxShadow: '0 4px 24px rgba(15, 20, 25, 0.08)',
                  }}
                  cursor={{ fill: 'rgba(45, 106, 79, 0.14)' }}
                  formatter={(value: number) => [`${value}`, 'Usos']}
                />
                <Bar
                  dataKey="count"
                  fill="#2D6A4F"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {FEATURE_USAGE_DATA.map((feature, index) => (
              <div
                key={feature.feature}
                className="p-3 bg-muted/20 rounded-xl flex items-center justify-between"
              >
                <span className="text-sm font-medium">{feature.feature}</span>
                <span className="text-sm text-primary font-bold">{feature.count} usos</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Action Insights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/30"
        >
          <h2 className="text-xl font-bold mb-4">Recomendaciones</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="leading-relaxed">
                <span className="font-semibold text-foreground">Alta adopción del check-in:</span> El 84% del equipo está usando activamente la app. Considerá reforzar la comunicación interna sobre el valor de las herramientas complementarias.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="leading-relaxed">
                <span className="font-semibold text-foreground">Pico de bienestar el viernes:</span> El score promedio más alto fue el último día laboral. Esto podría indicar alivio de carga semanal o mejor gestión del cierre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="leading-relaxed">
                <span className="font-semibold text-foreground">Oportunidad de mejora:</span> El ritual de cierre tiene menor adopción. Considerá comunicar sus beneficios para el descanso y la desconexión laboral.
              </span>
            </li>
          </ul>
        </motion.section>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-muted-foreground pb-8"
        >
          Dashboard de WellUp · Datos agregados y anónimos · Actualizado semanalmente
        </motion.div>
      </div>
    </div>
  );
}
