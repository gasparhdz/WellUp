import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Bell, Clock } from 'lucide-react';

const TIMES = [
  { value: '08:00', label: '8:00 AM', description: 'Comenzá el día con intención' },
  { value: '09:00', label: '9:00 AM', description: 'Después de llegar al trabajo' },
  { value: '12:00', label: '12:00 PM', description: 'Antes del almuerzo' },
  { value: '14:00', label: '2:00 PM', description: 'Post-almuerzo' },
  { value: '17:00', label: '5:00 PM', description: 'Antes de terminar el día' },
  { value: '20:00', label: '8:00 PM', description: 'Por la noche' },
];

export default function NotificationSetup() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState('09:00');

  const handleContinue = () => {
    // Store notification preference
    localStorage.setItem('wellup_notification_time', selectedTime);
    // Check user role to route appropriately
    const user = localStorage.getItem('wellup_user');
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === 'lider') {
        navigate('/leader');
      } else {
        navigate('/app');
      }
    } else {
      navigate('/app');
    }
  };

  return (
    <div className="size-full flex flex-col bg-transparent">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Bell className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Tu momento del día</h1>
            <p className="text-sm text-muted-foreground">Elegí cuándo querés tu check-in diario</p>
          </div>
        </motion.div>
      </div>

      {/* Time Selection */}
      <div className="flex-1 px-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 pb-32"
        >
          {TIMES.map((time, index) => (
            <motion.button
              key={time.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTime(time.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                selectedTime === time.value
                  ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20'
                  : 'bg-card border-border/50 hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedTime === time.value ? 'bg-primary/20' : 'bg-muted/50'
              }`}>
                <Clock className={`size-6 ${
                  selectedTime === time.value ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">{time.label}</div>
                <div className="text-sm text-muted-foreground">{time.description}</div>
              </div>
              {selectedTime === time.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-6 bg-gradient-to-t from-background via-background to-transparent">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all uppercase tracking-wide"
        >
          Continuar
        </motion.button>
      </div>
    </div>
  );
}
