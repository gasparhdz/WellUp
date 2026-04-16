import { useState } from 'react';
import { motion } from 'motion/react';
import WellbeingToolsGrid, { type WellbeingToolId } from './WellbeingToolsGrid';
import ReleaseModal from './ReleaseModal';
import BreathingModal from './BreathingModal';
import ResetModal from './ResetModal';
import PauseModeModal from './PauseModeModal';
import RitualModal from './RitualModal';

type ActiveModal = WellbeingToolId | null;

export default function ToolsScreen() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <div className="min-h-full bg-transparent pb-4">
      <div className="px-6 pt-8 pb-6 bg-gradient-to-b from-card/70 via-card/25 to-transparent backdrop-blur-[2px]">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-black mb-2">HERRAMIENTAS</h1>
          <p className="text-sm text-muted-foreground">Ejercicios rápidos cuando los necesites</p>
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        <WellbeingToolsGrid onOpenTool={setActiveModal} motionDelay={0.12} />
      </div>

      {activeModal === 'release' && <ReleaseModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'breathing' && <BreathingModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'reset' && <ResetModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'pause' && <PauseModeModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'ritual' && <RitualModal onClose={() => setActiveModal(null)} />}
    </div>
  );
}
