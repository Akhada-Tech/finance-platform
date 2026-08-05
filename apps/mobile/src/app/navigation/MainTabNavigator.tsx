import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AccountsNavigator } from '../../features/accounts/navigation/AccountsNavigator';
import { DashboardNavigator } from '../../features/dashboard/navigation/DashboardNavigator';
import { ReportsNavigator } from '../../features/reports/navigation/ReportsNavigator';
import { SettingsNavigator } from '../../features/settings/navigation/SettingsNavigator';
import { TransactionsNavigator } from '../../features/transactions/navigation/TransactionsNavigator';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="DashboardTab"
        component={DashboardNavigator}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen
        name="AccountsTab"
        component={AccountsNavigator}
        options={{ title: 'Accounts' }}
      />
      <Tab.Screen
        name="TransactionsTab"
        component={TransactionsNavigator}
        options={{ title: 'Transactions' }}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportsNavigator}
        options={{ title: 'Reports' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsNavigator}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
