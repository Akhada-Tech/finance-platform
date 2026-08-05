import { StatusBar } from 'react-native';

import { AppBootstrap } from './src/app/bootstrap/AppBootstrap';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { AppProviders } from './src/app/providers/AppProviders';
import { useThemePreference } from './src/app/providers/ThemeProvider';

function AppStatusBar() {
  const { resolved } = useThemePreference();

  return (
    <StatusBar
      barStyle={resolved === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
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
