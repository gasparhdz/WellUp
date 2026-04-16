import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../constants/theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top, 16), paddingBottom: 24 }]}
    >
      <Text style={styles.title}>YO</Text>
      <Text style={styles.sub}>Perfil y métricas se portarán desde la web (gráficos con lib RN).</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, gap: 8 },
  title: { fontSize: 28, fontWeight: '900', color: colors.foreground },
  sub: { fontSize: 14, color: colors.muted, lineHeight: 20 },
});
