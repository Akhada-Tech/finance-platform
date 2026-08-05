import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccountsScreen } from '../screens/AccountsScreen';
import type { AccountsStackParamList } from '../../../app/navigation/types';

const Stack = createNativeStackNavigator<AccountsStackParamList>();

export function AccountsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accounts"
        component={AccountsScreen}
        options={{ title: 'Accounts' }}
      />
    </Stack.Navigator>
  );
}
