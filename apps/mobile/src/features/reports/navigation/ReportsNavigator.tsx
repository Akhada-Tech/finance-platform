import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ReportsScreen } from '../screens/ReportsScreen';
import type { ReportsStackParamList } from '../../../app/navigation/types';

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export function ReportsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reports"
        component={ReportsScreen}
        options={{ title: 'Reports' }}
      />
    </Stack.Navigator>
  );
}
