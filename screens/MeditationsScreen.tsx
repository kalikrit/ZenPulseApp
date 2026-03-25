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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'ZenPulse',
      headerRight: () => (
        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.aiMoodButton}
        >
          <Text style={styles.aiMoodButtonText}>🧠 AI Mood</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const data = useMemo(() => meditationData, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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

      <AffirmationModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  separator: {
    height: 10,
  },
  card: {
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#f9fafb',
  },
  cardLocked: {
    backgroundColor: '#e5e7eb',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardEmoji: {
    fontSize: 26,
  },
  cardEmojiLocked: {
    opacity: 0.7,
  },
  lockEmoji: {
    fontSize: 20,
    opacity: 0.9,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6b7280',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },
  cardTitleLocked: {
    color: '#6b7280',
  },
  aiMoodButton: {
    marginRight: 12,
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  aiMoodButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
});

