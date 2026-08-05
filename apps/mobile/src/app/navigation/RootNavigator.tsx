import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getAuthStatus } from '../../features/authentication/domain/authSession';
import { AuthNavigator } from './AuthNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root navigation graph:
 * Root Stack → Auth Stack | Main Tabs → Feature Stacks
 *
 * Auth gate reads a local session stub today; Zustand auth store replaces it later.
 */
export function RootNavigator() {
  const isAuthenticated = getAuthStatus() === 'authenticated';

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
