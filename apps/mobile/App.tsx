import { StatusBar } from 'react-native';

import { AppBootstrap } from '@/app/bootstrap/AppBootstrap';
import { RootNavigator } from '@/app/navigation/RootNavigator';
import { AppProviders } from '@/app/providers/AppProviders';
import { useThemePreference } from '@/app/providers/ThemeProvider';

function AppStatusBar() {
  const { resolved } = useThemePreference();

  return <StatusBar barStyle={resolved === 'dark' ? 'light-content' : 'dark-content'} />;
}

/**
 * Thin composition root: providers → bootstrap → navigation.
 */
function App() {
  return (
    <AppProviders>
      <AppStatusBar />
      <AppBootstrap>
        <RootNavigator />
      </AppBootstrap>
    </AppProviders>
  );
}

export default App;
