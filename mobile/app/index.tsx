import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { loadSession } from '../lib/auth';

/**
 * Raíz: evita choque de URL con (tabs)/index.
 * Si hay sesión → app empleado o líder; si no → bienvenida.
 */
export default function Index() {
  const [href, setHref] = useState<'/(tabs)' | '/leader' | '/welcome' | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const user = await loadSession();
      if (cancelled) return;
      if (!user) {
        setHref('/welcome');
        return;
      }
      setHref(user.role === 'lider' ? '/leader' : '/(tabs)');
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!href) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={href} />;
}
