import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../constants/theme';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const dateLabel = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top, 16), paddingBottom: 24 }]}
    >
      <Text style={styles.title}>HOY</Text>
      <Text style={styles.date}>{dateLabel}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximo paso</Text>
        <Text style={styles.cardBody}>
          Acá vamos a portar el check-in emocional, score e intención desde la app web. Esta pantalla ya está cableada
          en la navegación nativa.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, gap: 12 },
  title: { fontSize: 32, fontWeight: '900', color: colors.foreground },
  date: { fontSize: 14, color: colors.muted, textTransform: 'capitalize' },
  card: {
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.foreground, marginBottom: 8 },
  cardBody: { fontSize: 14, lineHeight: 21, color: colors.muted },
});
