import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TransactionsScreen } from '../screens/TransactionsScreen';
import type { TransactionsStackParamList } from '../../../app/navigation/types';

const Stack = createNativeStackNavigator<TransactionsStackParamList>();

export function TransactionsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ title: 'Transactions' }}
      />
    </Stack.Navigator>
  );
}
