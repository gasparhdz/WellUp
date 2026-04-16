import Slider from '@react-native-community/slider';
import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../constants/theme';
import {
  EMOTIONS,
  getEmotionMessage,
  getIntentionMessage,
  INTENTIONS,
} from '../../constants/todayContent';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const { width: winW } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);

  const [dailyScore, setDailyScore] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [intention, setIntention] = useState('');
  const streak = 7;

  const dateLabel = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const intentionCellW = Math.max(140, (winW - 48 - 10) / 2);
  const hasSelection = selectedEmotion !== null;

  useEffect(() => {
    if (!intention) return;
    const t = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 120);
    return () => clearTimeout(t);
  }, [intention]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.flex}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, 12),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>HOY</Text>
          <Text style={styles.date}>{dateLabel}</Text>
        </View>
        <View style={styles.streakPill}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakNum}>{streak}</Text>
          <Text style={styles.streakLbl}>días</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>¿Cómo llegás hoy?</Text>
        <View style={styles.emotionRow}>
          {EMOTIONS.map((emotion) => {
            const isSelected = selectedEmotion === emotion.value;
            return (
              <Pressable
                key={emotion.value}
                onPress={() => setSelectedEmotion(emotion.value)}
                style={[
                  styles.emotionCard,
                  {
                    backgroundColor: emotion.bg,
                    borderColor: isSelected ? emotion.selectedBorder : emotion.border,
                    borderWidth: 2,
                  },
                  hasSelection && !isSelected && styles.emotionDim,
                  isSelected && styles.emotionSelected,
                ]}
              >
                <Text style={styles.emotionEmoji}>{emotion.emoji}</Text>
                <Text style={styles.emotionLabel} numberOfLines={2}>
                  {emotion.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {selectedEmotion ? (
          <View style={styles.emotionMsg}>
            <Text style={styles.emotionMsgText}>{getEmotionMessage(selectedEmotion)}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.section}>
        <View style={styles.scoreHeader}>
          <Text style={styles.sectionTitle}>Score del día</Text>
          <Text style={styles.scoreBig}>{dailyScore}</Text>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={dailyScore}
          onValueChange={(v) => setDailyScore(Math.round(v))}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor="#e8eaef"
          thumbTintColor={colors.primary}
        />
        <View style={styles.scoreScale}>
          <Text style={styles.scaleTxt}>1</Text>
          <Text style={styles.scaleTxt}>10</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mi intención de hoy es...</Text>
        <View style={styles.intentionGrid}>
          {INTENTIONS.map((word) => {
            const active = intention === word;
            return (
              <Pressable
                key={word}
                onPress={() => setIntention(word)}
                style={[
                  styles.intentionCell,
                  { width: intentionCellW },
                  active ? styles.intentionCellOn : styles.intentionCellOff,
                ]}
              >
                <Text style={[styles.intentionTxt, active && styles.intentionTxtOn]}>{word}</Text>
              </Pressable>
            );
          })}
        </View>

        {intention ? (
          <View style={styles.intentionCard}>
            <Text style={styles.intentionHead}>
              Mi intención hoy es: <Text style={styles.intentionAccent}>{intention}</Text>
            </Text>
            <Text style={styles.intentionSub}>{getIntentionMessage(intention)}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, gap: 22 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: { fontSize: 30, fontWeight: '900', color: colors.foreground },
  date: { fontSize: 14, color: colors.muted, marginTop: 4 },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(45, 106, 79, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(45, 106, 79, 0.35)',
  },
  streakEmoji: { fontSize: 18 },
  streakNum: { fontSize: 16, fontWeight: '800', color: colors.primary },
  streakLbl: { fontSize: 12, color: 'rgba(45, 106, 79, 0.85)' },
  section: { gap: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.foreground },
  emotionRow: { flexDirection: 'row', gap: 6 },
  emotionCard: {
    flex: 1,
    minWidth: 0,
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: 6,
  },
  emotionDim: { opacity: 0.88, transform: [{ scale: 0.97 }] },
  emotionSelected: {
    transform: [{ scale: 1.06 }],
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  emotionEmoji: { fontSize: 26, lineHeight: 30 },
  emotionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.foreground,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.92,
  },
  emotionMsg: {
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    paddingLeft: 12,
    paddingVertical: 4,
  },
  emotionMsgText: { fontSize: 16, fontWeight: '600', color: colors.foreground, lineHeight: 22 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreBig: { fontSize: 36, fontWeight: '900', color: colors.primary },
  scoreScale: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -4 },
  scaleTxt: { fontSize: 12, color: colors.muted },
  intentionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  intentionCell: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intentionCellOff: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  intentionCellOn: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: 'rgba(45, 106, 79, 0.65)',
  },
  intentionTxt: { fontSize: 14, fontWeight: '700', color: colors.foreground },
  intentionTxtOn: { color: '#fff' },
  intentionCard: {
    marginTop: 4,
    padding: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(45, 106, 79, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(45, 106, 79, 0.28)',
  },
  intentionHead: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.foreground,
    textAlign: 'center',
    lineHeight: 24,
  },
  intentionAccent: { color: colors.primary },
  intentionSub: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: colors.muted,
    textAlign: 'center',
  },
});
