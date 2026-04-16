import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../constants/theme';

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scroll,
        { paddingTop: Math.max(insets.top, 24), paddingBottom: Math.max(insets.bottom, 24) },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inner}>
        <Text style={styles.brand}>Well Up</Text>
        <View style={styles.brandLine} />

        <Text style={styles.headline}>
          Lo que es tuyo está <Text style={styles.headlineAccent}>bajo tu piel.</Text>
        </Text>

        <Pressable
          onPress={() => router.push('/login')}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaText}>Empezar</Text>
        </Pressable>

        <Text style={styles.legal}>
          <Text style={styles.legalBold}>Privacidad real.</Text> Tu empresa mide el pulso del equipo, pero nunca tu
          diario personal.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
    paddingHorizontal: 24,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
    gap: 28,
  },
  brand: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -1,
    color: colors.foreground,
    textAlign: 'center',
  },
  brandLine: {
    alignSelf: 'center',
    width: 96,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.primary,
    opacity: 0.85,
  },
  headline: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.foreground,
    textAlign: 'center',
    lineHeight: 28,
  },
  headlineAccent: {
    color: colors.primary,
    fontWeight: '900',
  },
  cta: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  ctaPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  legal: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    textAlign: 'center',
  },
  legalBold: {
    color: colors.foreground,
    fontWeight: '600',
  },
});
