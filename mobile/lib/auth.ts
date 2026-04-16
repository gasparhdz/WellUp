import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = 'wellup_user';

export const HARDCODED_USERS: Record<string, 'empleado' | 'lider'> = {
  'user@mail.com': 'empleado',
  'leader@mail.com': 'lider',
};

export type StoredUser = { email: string; role: 'empleado' | 'lider' };

export async function saveSession(user: StoredUser) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export async function clearSession() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export async function loadSession(): Promise<StoredUser | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}
