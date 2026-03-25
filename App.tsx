import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { SubscriptionProvider } from './context/SubscriptionContext';
import PaywallScreen from './screens/PaywallScreen';
import MeditationsScreen from './screens/MeditationsScreen';

enableScreens();

export type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SubscriptionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Paywall"
            component={PaywallScreen}
            options={{ title: 'ZenPulse' }}
          />
          <Stack.Screen
            name="Meditations"
            component={MeditationsScreen}
            options={{ title: 'ZenPulse' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SubscriptionProvider>
  );
}

