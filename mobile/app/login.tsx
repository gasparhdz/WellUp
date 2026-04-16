import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../constants/theme';
import { HARDCODED_USERS, saveSession } from '../lib/auth';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async () => {
    const normalized = email.trim().toLowerCase();
    const role = HARDCODED_USERS[normalized];
    if (!role) {
      setError('Credenciales inválidas.');
      return;
    }
    setError('');
    await saveSession({ email: normalized, role });
    if (role === 'lider') {
      router.replace('/leader');
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: Math.max(insets.top, 16), paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.back}>← Volver</Text>
        </Pressable>

        <Text style={styles.title}>Iniciar sesión</Text>

        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.cardBold}>Privacidad real.</Text> Tu empresa mide el pulso del equipo, pero nunca tu
            diario personal.
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (error) setError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="tu@email.com"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (error) setError('');
            }}
            secureTextEntry
            placeholder="Tu contraseña"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable onPress={onSubmit} style={({ pressed }) => [styles.submit, pressed && styles.submitPressed]}>
          <Text style={styles.submitText}>Entrar</Text>
        </Pressable>

        <Text style={styles.hint}>
          Demo: <Text style={styles.hintMono}>user@mail.com</Text> o <Text style={styles.hintMono}>leader@mail.com</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 24, gap: 16, maxWidth: 480, width: '100%', alignSelf: 'center' },
  back: { fontSize: 15, color: colors.primary, fontWeight: '600', marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '900', color: colors.foreground, marginBottom: 8 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardText: { fontSize: 14, lineHeight: 20, color: colors.muted },
  cardBold: { color: colors.foreground, fontWeight: '600' },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '500', color: colors.muted },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.foreground,
  },
  error: { color: colors.destructive, fontWeight: '600', fontSize: 14 },
  submit: {
    marginTop: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitPressed: { opacity: 0.9 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  hint: { fontSize: 12, color: colors.muted, textAlign: 'center', marginTop: 8 },
  hintMono: { fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }) },
});
