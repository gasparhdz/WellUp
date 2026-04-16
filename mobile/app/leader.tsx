import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../constants/theme';
import { clearSession } from '../lib/auth';

export default function LeaderScreen() {
  const insets = useSafeAreaInsets();

  const salir = async () => {
    await clearSession();
    router.replace('/welcome');
  };

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top, 16), paddingBottom: 24 }]}
    >
      <Text style={styles.title}>Líder</Text>
      <Text style={styles.sub}>Dashboard agregado: pendiente de portar desde la web.</Text>

      <Pressable onPress={salir} style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}>
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: '900', color: colors.foreground },
  sub: { fontSize: 14, color: colors.muted, lineHeight: 20 },
  btn: {
    marginTop: 24,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  btnPressed: { opacity: 0.85 },
  btnText: { fontWeight: '700', color: colors.primary },
});
