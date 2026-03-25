import React, { useLayoutEffect, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useSubscription } from '../context/SubscriptionContext';
import AffirmationModal from '../components/AffirmationModal';
import type { RootStackParamList } from '../App';

type Props = StackScreenProps<RootStackParamList, 'Meditations'>;

type MeditationItem = {
  id: string;
  title: string;
  duration: number;
  emoji: string;
  isPremium: boolean;
};

const meditationData: MeditationItem[] = [
  { id: '1', title: 'Morning Awakening', duration: 5, emoji: '🌅', isPremium: false },
  { id: '2', title: 'Anxiety Relief', duration: 10, emoji: '😌', isPremium: true },
  { id: '3', title: 'Deep Sleep', duration: 15, emoji: '🌙', isPremium: true },
  { id: '4', title: 'Mindfulness', duration: 8, emoji: '🧘', isPremium: false },
];

function isPremiumLocked(item: MeditationItem, isSubscribed: boolean) {
  return item.isPremium && !isSubscribed;
}

export default function MeditationsScreen({ navigation }: Props) {
  const { isSubscribed } = useSubscription();
  const [modalVisible, setModalVisible] = useState(false);
  const versionText = useMemo(() => {
    const version =
      Constants.expoConfig?.version ??
      // Backward-compat for older manifest-based configs.
      (Constants as any).manifest?.version ??
      '1.1.0';

    return `Version ${version}`;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'ZenPulse',
      headerStyle: { backgroundColor: '#1a1a2e' },
      headerTitleStyle: { color: '#ffd166', fontWeight: '900' },
      headerTintColor: '#ffd166',
      headerShadowVisible: false,
      headerRight: () => (
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.aiMoodButton}
        >
          <Text style={styles.aiMoodButtonText}>
            <Text style={styles.aiMoodIcon}>🧠</Text> AI Mood
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const data = useMemo(() => meditationData, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#1a1a2e', '#2a2a3e', '#3a2a4e']}
        style={styles.backgroundGradient}
      >
        <FlatList
          contentContainerStyle={styles.listContent}
          data={data}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={() => (
            <View style={styles.headerBlock}>
              <Text style={styles.screenTitle}>Медитации</Text>
              <Text style={styles.screenSubtitle}>
                Выберите практику для вашего состояния
              </Text>
            </View>
          )}
          ListFooterComponent={() => (
            <Text style={styles.footerText}>{versionText}</Text>
          )}
          renderItem={({ item }) => {
            const locked = isPremiumLocked(item, isSubscribed);

            return (
              <Pressable
                onPress={() => {
                  if (locked) {
                    navigation.navigate('Paywall');
                    return;
                  }

                  Alert.alert(item.title, `${item.duration} min meditation`);
                }}
                style={[styles.card, locked && styles.cardLocked]}
              >
                <View style={styles.cardTop}>
                  <Text style={[styles.cardEmoji, locked && styles.cardEmojiLocked]}>
                    {item.emoji}
                  </Text>

                  {locked ? (
                    <Text style={styles.lockEmoji}>🔒</Text>
                  ) : (
                    <Text style={styles.durationText}>{item.duration} min</Text>
                  )}
                </View>

                <Text style={[styles.cardTitle, locked && styles.cardTitleLocked]}>
                  {item.title}
                </Text>
              </Pressable>
            );
          }}
        />
      </LinearGradient>

      <AffirmationModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backgroundGradient: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
  headerBlock: {
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffd166',
    marginBottom: 6,
  },
  screenSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
  },
  card: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,209,102,0.5)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  cardLocked: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardEmoji: {
    fontSize: 36,
  },
  cardEmojiLocked: {
    opacity: 0.7,
  },
  lockEmoji: {
    fontSize: 20,
    color: '#ffd166',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#ffd166',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  cardTitleLocked: {
    color: 'rgba(255,255,255,0.85)',
  },
  aiMoodButton: {
    marginRight: 12,
    backgroundColor: 'rgba(255,209,102,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,209,102,0.35)',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  aiMoodButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
  aiMoodIcon: {
    color: '#ffd166',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    paddingVertical: 20,
    marginTop: 'auto',
  },
});

