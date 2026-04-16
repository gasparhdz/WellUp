import { motion } from 'motion/react';
import { Flame, TrendingUp, Award, Heart, Star, Zap, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const WEEKLY_DATA = [
  { day: 'Lun', score: 6 },
  { day: 'Mar', score: 4 },
  { day: 'Mié', score: 7 },
  { day: 'Jue', score: 5 },
  { day: 'Vie', score: 8 },
  { day: 'Sáb', score: 7 },
  { day: 'Dom', score: 6 },
];

const BADGES = [
  { icon: Flame, label: '7 días consecutivos', description: 'Primera semana completada', unlocked: true },
  { icon: Zap, label: 'Racha activa', description: '10 check-ins realizados', unlocked: true },
  { icon: Heart, label: 'Liberador', description: '3 liberaciones completadas', unlocked: true },
  { icon: Target, label: 'Con propósito', description: '5 anclas definidas', unlocked: true },
  { icon: Star, label: 'Explorador', description: '10 conceptos escuchados', unlocked: true },
  { icon: Calendar, label: 'Constante', description: '21 días de racha', unlocked: false },
];

const FAVORITE_CONCEPTS = [
  { title: 'CAOS', emotion: 'Estrés / sobrecarga', gradient: 'from-red-100/90 to-emerald-100/90' },
  { title: 'LÍMITES', emotion: 'Agotamiento', gradient: 'from-purple-100/90 to-pink-100/90' },
  { title: 'FOCO', emotion: 'Dispersión', gradient: 'from-green-100/90 to-emerald-100/90' },
];

export default function Profile() {
  const totalDays = 7;
  const avgScore = (WEEKLY_DATA.reduce((acc, day) => acc + day.score, 0) / WEEKLY_DATA.length).toFixed(1);
  const unlockedBadges = BADGES.filter(b => b.unlocked).length;

  return (
    <div className="min-h-full bg-transparent pb-4">
      {/* Header */}
      <div className="px-6 pt-8 pb-6 bg-gradient-to-b from-card/70 via-card/25 to-transparent backdrop-blur-[2px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-black mb-2">YO</h1>
          <p className="text-sm text-muted-foreground">
            El espejo. Tu evolución personal.
          </p>
        </motion.div>
      </div>

      <div className="px-6 space-y-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/30">
            <Flame className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-primary mb-1">{totalDays}</div>
            <div className="text-sm text-muted-foreground">Racha activa</div>
          </div>

          <div className="p-6 bg-card rounded-2xl border border-border/50">
            <TrendingUp className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-foreground mb-1">{avgScore}</div>
            <div className="text-sm text-muted-foreground">Score promedio</div>
          </div>

          <div className="p-6 bg-card rounded-2xl border border-border/50">
            <Award className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-foreground mb-1">{unlockedBadges}</div>
            <div className="text-sm text-muted-foreground">Insignias</div>
          </div>

          <div className="p-6 bg-card rounded-2xl border border-border/50">
            <Heart className="size-8 text-primary mb-3" />
            <div className="text-4xl font-black text-foreground mb-1">{FAVORITE_CONCEPTS.length}</div>
            <div className="text-sm text-muted-foreground">Favoritos</div>
          </div>
        </motion.div>

        {/* Weekly Score Chart */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <h2 className="text-xl font-bold mb-6">Tu semana</h2>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY_DATA}>
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
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2D6A4F"
                  strokeWidth={3}
                  dot={{
                    fill: '#2D6A4F',
                    strokeWidth: 2,
                    r: 5,
                  }}
                  activeDot={{
                    r: 7,
                    fill: '#2D6A4F',
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Mejor: {Math.max(...WEEKLY_DATA.map(d => d.score))}</span>
            <span>Peor: {Math.min(...WEEKLY_DATA.map(d => d.score))}</span>
          </div>
        </motion.section>

        {/* Badges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold">Insignias</h2>

          <div className="grid grid-cols-2 gap-3">
            {BADGES.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`p-4 rounded-xl border transition-all ${
                  badge.unlocked
                    ? 'bg-card border-primary/30 shadow-lg shadow-primary/10'
                    : 'bg-muted/20 border-border/30 opacity-50'
                }`}
              >
                <badge.icon
                  className={`size-6 mb-2 ${
                    badge.unlocked ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <p className="text-sm font-bold mb-1 leading-tight">
                  {badge.label}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {badge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Favorite Concepts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold">Conceptos guardados</h2>

          <div className="space-y-3">
            {FAVORITE_CONCEPTS.map((concept, index) => (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className={`p-4 bg-gradient-to-r ${concept.gradient} rounded-xl border border-border/30 flex items-center justify-between hover:border-primary/50 transition-all cursor-pointer group`}
              >
                <div>
                  <span className="font-black text-lg tracking-tight block mb-1">{concept.title}</span>
                  <span className="text-xs text-muted-foreground">{concept.emotion}</span>
                </div>
                <Star className="size-5 text-primary fill-primary group-hover:scale-110 transition-transform" />
              </motion.div>
            ))}

            {FAVORITE_CONCEPTS.length === 0 && (
              <div className="p-6 bg-card/50 rounded-xl border border-border/30 text-center">
                <Heart className="size-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Todavía no guardaste ningún concepto
                </p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Motivational Message */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/30"
        >
          <p className="text-center font-bold text-lg leading-relaxed">
            Llevás {totalDays} días consecutivos.
            <br />
            <span className="text-primary">Esto es tuyo. Nadie te lo puede sacar.</span>
          </p>
        </motion.section>
      </div>
    </div>
  );
}
