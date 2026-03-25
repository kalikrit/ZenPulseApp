import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { useSubscription } from '../context/SubscriptionContext';
import type { RootStackParamList } from '../App';

type Props = StackScreenProps<RootStackParamList, 'Paywall'>;

export default function PaywallScreen({ navigation }: Props) {
  const { setSubscribed } = useSubscription();

  const onTryForFree = () => {
    setSubscribed(true);
    navigation.replace('Meditations');
  };

  // Tariffs are displayed as selectable cards (but selection isn't required by ТЗ).
  const monthlyPrice = '$9.99';
  const yearlyPrice = '$49.99';

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={['#6d28d9', '#2563eb']} style={styles.gradient} />

      <View style={styles.content}>
        <Text style={styles.title}>ZenPulse Premium</Text>
        <Text style={styles.subtitle}>
          Откройте персональные медитации и уберите ограничения.
        </Text>

        <View style={styles.benefitsRow}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitEmoji}>🌟</Text>
            <Text style={styles.benefitText}>Персональные планы</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitEmoji}>🧘</Text>
            <Text style={styles.benefitText}>Экспертные медитации</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitEmoji}>🔒</Text>
            <Text style={styles.benefitText}>Без рекламы</Text>
          </View>
        </View>

        <View style={styles.tariffs}>
          <View style={[styles.tariffCard, styles.tariffCardActive]}>
            <Text style={styles.tariffName}>Monthly</Text>
            <Text style={styles.tariffPrice}>{monthlyPrice}</Text>
            <Text style={styles.tariffHint}>per month</Text>
          </View>

          <View style={[styles.tariffCard, styles.tariffCardFeatured]}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Save 60%</Text>
            </View>
            <Text style={styles.tariffName}>Yearly</Text>
            <Text style={styles.tariffPrice}>{yearlyPrice}</Text>
            <Text style={styles.tariffHint}>per year</Text>
          </View>
        </View>

        <Pressable onPress={onTryForFree} style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Try for free</Text>
        </Pressable>

        <Text style={styles.legalText}>
          Нажимая кнопку, вы включаете премиум на демо-режиме.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 210,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 18,
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 10,
  },
  benefitItem: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  benefitEmoji: {
    fontSize: 18,
    marginBottom: 6,
  },
  benefitText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  tariffs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  tariffCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  tariffCardActive: {
    backgroundColor: '#fff',
  },
  tariffCardFeatured: {
    backgroundColor: '#eef2ff',
    borderColor: '#c7d2fe',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#111827',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
  tariffName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
  },
  tariffPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },
  tariffHint: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#6b7280',
  },
  ctaButton: {
    marginTop: 6,
    borderRadius: 16,
    backgroundColor: '#111827',
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
  legalText: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
});

