import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initializeMonitoring } from './utils/monitoring';
import * as SplashScreen from 'expo-splash-screen';
import { logger } from './utils/logger';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize monitoring (Sentry, etc.)
      initializeMonitoring();

      // Load fonts, check auth, etc.
      await loadResources();

      logger.info('App initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize app', { error });
    } finally {
      // Hide splash screen
      await SplashScreen.hideAsync();
    }
  };

  const loadResources = async () => {
    // Load fonts, check authentication, etc.
    // This is where you'd load any initial resources
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
