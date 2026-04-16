/** Datos de la pantalla HOY (alineado al PRD / app web). */

export const EMOTIONS = [
  {
    label: 'Genial',
    value: 'genial',
    emoji: '🔥',
    bg: '#d8f3e4',
    border: 'rgba(15, 20, 25, 0.12)',
    selectedBorder: '#059669',
  },
  {
    label: 'Bien',
    value: 'bien',
    emoji: '😊',
    bg: '#dbeafe',
    border: 'rgba(15, 20, 25, 0.12)',
    selectedBorder: '#0891b2',
  },
  {
    label: 'Regular',
    value: 'regular',
    emoji: '😐',
    bg: '#fef3c7',
    border: 'rgba(15, 20, 25, 0.12)',
    selectedBorder: '#d97706',
  },
  {
    label: 'Mal',
    value: 'mal',
    emoji: '😔',
    bg: '#fee2e2',
    border: 'rgba(15, 20, 25, 0.12)',
    selectedBorder: '#ea580c',
  },
  {
    label: 'Estresado',
    value: 'estresado',
    emoji: '😰',
    bg: '#ffe4e6',
    border: 'rgba(15, 20, 25, 0.12)',
    selectedBorder: '#e11d48',
  },
] as const;

export const INTENTIONS = [
  'Calma',
  'Foco',
  'Energía',
  'Claridad',
  'Paciencia',
  'Confianza',
  'Fuerza',
  'Libertad',
] as const;

export const INTENTION_MESSAGES: Record<string, string> = {
  Calma: 'Respirá más lento de lo normal: cuando vos bajás el ritmo, tu mente también.',
  Foco: 'Una sola cosa a la vez. Terminá lo importante antes de abrir otra pestaña mental.',
  Energía: 'Mové el cuerpo dos minutos y volvé: la acción chica destraba el día.',
  Claridad: 'Nombrá en una frase qué te importa hoy y todo lo demás se ordena alrededor.',
  Paciencia: 'No todo se resuelve ya. Avanzar constante también es avanzar fuerte.',
  Confianza: 'Ya superaste días difíciles antes; hoy también tenés con qué.',
  Fuerza: 'Hacé lo que evitás primero: después de ese paso, todo pesa menos.',
  Libertad: 'Elegí desde vos, no desde la presión. Tu día mejora cuando te pertenece.',
};

export function getEmotionMessage(emotion: string): string {
  switch (emotion) {
    case 'genial':
      return 'Aprovechá esta energía. Es tuya.';
    case 'bien':
      return 'Un día sólido. Así se construye.';
    case 'regular':
      return 'Un día más. Eso también cuenta.';
    case 'mal':
      return 'Está bien sentirse así. No tenés que estar perfecto.';
    case 'estresado':
      return 'Pará un segundo. En serio. Tu cuerpo está pidiendo una pausa.';
    default:
      return '';
  }
}

export function getIntentionMessage(selectedIntention: string): string {
  return INTENTION_MESSAGES[selectedIntention] ?? 'Elegiste una intención valiosa para guiar tu día.';
}
