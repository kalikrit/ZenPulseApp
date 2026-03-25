import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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
      <LinearGradient
        colors={['#1a1a2e', '#7b2cbf', '#ffd166']}
        style={styles.backgroundGradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>ZenPulse Premium</Text>
            <Text style={styles.subtitle}>Откройте путь к осознанности</Text>

            <View
              style={[
                styles.benefitsCard,
                { backdropFilter: 'blur(14px)' } as any,
              ]}
            >
              <View style={styles.benefitRow}>
                <Text style={styles.benefitIcon}>✨</Text>
                <Text style={styles.benefitText}>Персональные планы</Text>
              </View>
              <View style={styles.benefitRow}>
                <Text style={styles.benefitIcon}>🧘</Text>
                <Text style={styles.benefitText}>Экспертные медитации</Text>
              </View>
              <View style={[styles.benefitRow, { marginBottom: 0 }]}>
                <Text style={styles.benefitIcon}>🔒</Text>
                <Text style={styles.benefitText}>Без рекламы</Text>
              </View>
            </View>

            <View style={styles.tariffsRow}>
              <View style={styles.tariffCardMonthly}>
                <Text style={styles.tariffName}>Monthly</Text>
                <Text style={styles.tariffPrice}>{monthlyPrice}</Text>
                <Text style={styles.tariffHint}>per month</Text>
              </View>

              <View style={styles.tariffCardYearly}>
                <LinearGradient
                  colors={['#ffd166', '#f59e0b', '#ffb703']}
                  style={styles.tariffCardYearlyGradient}
                />

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Save 60%</Text>
                </View>

                <View style={styles.tariffCardYearlyContent}>
                  <Text style={[styles.tariffName, { color: '#1a1a2e' }]}>
                    Yearly
                  </Text>
                  <Text style={[styles.tariffPrice, { color: '#1a1a2e' }]}>
                    {yearlyPrice}
                  </Text>
                </View>
              </View>
            </View>

            <Pressable onPress={onTryForFree} style={styles.ctaButton}>
              <LinearGradient
                colors={['#ffd166', '#f59e0b', '#ffb703']}
                style={styles.ctaButtonGradient}
              />
              <Text style={styles.ctaButtonText}>Try for free</Text>
            </Pressable>

            <Text style={styles.legalText}>
              Нажимая кнопку, вы включаете премиум на демо-режиме.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffd166',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 14,
    // Extra depth in case shadows behave differently across platforms.
    elevation: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 22,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 28,
  },
  content: {
    flexGrow: 1,
    alignItems: 'stretch',
  },

  benefitsCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
    marginBottom: 22,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  benefitIcon: {
    width: 34,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginRight: 10,
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },

  tariffsRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  tariffCardMonthly: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  tariffCardYearly: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  tariffCardYearlyGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  tariffCardYearlyContent: {
    zIndex: 1,
  },

  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(26,26,46,0.85)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    zIndex: 2,
  },
  badgeText: {
    color: '#ffd166',
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
    fontSize: 26,
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
    marginTop: 12,
    borderRadius: 30,
    overflow: 'hidden',
    paddingVertical: 16,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  ctaButtonGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  ctaButtonText: {
    zIndex: 1,
    color: '#1a1a2e',
    fontWeight: '900',
    fontSize: 16,
  },

  legalText: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
  },
});

