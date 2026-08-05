import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '../../features/authentication/screens/SignInScreen';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: 'Sign In' }}
      />
    </Stack.Navigator>
  );
}
