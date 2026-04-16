import { Tabs } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { colors } from '../../constants/theme';

function TabGlyph({ glyph, focused }: { glyph: string; focused: boolean }) {
  return (
    <Text style={[styles.glyph, { color: focused ? colors.primary : colors.muted }]}>{glyph}</Text>
  );
}

export default function EmployeeTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          borderTopColor: 'rgba(45, 106, 79, 0.15)',
          backgroundColor: 'rgba(255,255,255,0.92)',
        },
        tabBarLabelStyle: { fontSize: 9, fontWeight: '700', letterSpacing: 0.2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOY',
          tabBarLabel: 'HOY',
          tabBarIcon: ({ focused }) => <TabGlyph glyph="⌂" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="herramientas"
        options={{
          title: 'Herramientas',
          tabBarLabel: 'HERRAMIENTAS',
          tabBarIcon: ({ focused }) => <TabGlyph glyph="✦" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorar',
          tabBarLabel: 'EXPLORAR',
          tabBarIcon: ({ focused }) => <TabGlyph glyph="◎" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="yo"
        options={{
          title: 'Yo',
          tabBarLabel: 'YO',
          tabBarIcon: ({ focused }) => <TabGlyph glyph="●" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  glyph: {
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
