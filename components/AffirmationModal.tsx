import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type MoodKey = 'calm' | 'sad' | 'anxious';

const moodLabels: Record<MoodKey, { emoji: string; label: string }> = {
  calm: { emoji: '😊', label: 'спокойствие' },
  sad: { emoji: '😌', label: 'грусть' },
  anxious: { emoji: '😤', label: 'тревога' },
};

export default function AffirmationModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(null);

  useEffect(() => {
    if (!visible) setSelectedMood(null);
  }, [visible]);

  const placeholderText = useMemo(() => {
    if (!selectedMood) return null;

    switch (selectedMood) {
      case 'calm':
        return 'Дышите медленно. Представьте спокойный океан внутри вас. Ваш ум становится яснее с каждым вдохом и выдохом.';
      case 'sad':
        return 'Позвольте грусти быть. С каждым дыханием она становится мягче, а в груди появляется маленький, добрый свет.';
      case 'anxious':
        return 'Сделайте паузу. Ваша тревога проходит волнами. Сосредоточьтесь на дыхании и отпустите контроль.';
    }
  }, [selectedMood]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.title}>Выберите настроение</Text>

          <View style={styles.moodRow}>
            {(Object.keys(moodLabels) as MoodKey[]).map((key) => {
              const item = moodLabels[key];
              const isActive = selectedMood === key;

              return (
                <Pressable
                  key={key}
                  onPress={() => setSelectedMood(key)}
                  style={[styles.moodButton, isActive && styles.moodButtonActive]}
                >
                  <Text style={styles.moodEmoji}>{item.emoji}</Text>
                  <Text style={styles.moodLabel}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>

          {placeholderText ? (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>{placeholderText}</Text>
            </View>
          ) : (
            <Text style={styles.helperText}>
              Нажмите на настроение, чтобы увидеть текст-афирмацию.
            </Text>
          )}

          <View style={styles.actionsRow}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
  },
  moodRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  moodButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  moodButtonActive: {
    borderColor: '#4f46e5',
    backgroundColor: '#eef2ff',
  },
  moodEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
    textAlign: 'center',
  },
  helperText: {
    color: '#555',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  placeholderBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
  },
  placeholderText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#111',
  },
  actionsRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#111827',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

