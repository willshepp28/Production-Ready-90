import Constants from 'expo-constants';

/**
 * Environment configuration
 * Access environment variables through Constants.expoConfig.extra
 */
export const ENV = {
  // App environment
  APP_ENV: Constants.expoConfig?.extra?.appEnv || 'development',

  // API Configuration
  API_URL: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000',
  API_KEY: Constants.expoConfig?.extra?.apiKey || '',

  // Feature Flags
  ENABLE_ANALYTICS: Constants.expoConfig?.extra?.enableAnalytics || false,
  ENABLE_CRASH_REPORTING: Constants.expoConfig?.extra?.enableCrashReporting || false,
  ENABLE_PERFORMANCE_MONITORING: Constants.expoConfig?.extra?.enablePerformanceMonitoring || false,

  // Sentry
  SENTRY_DSN: Constants.expoConfig?.extra?.sentryDsn || '',

  // EAS
  EAS_PROJECT_ID: Constants.expoConfig?.extra?.eas?.projectId || '',
} as const;

export const isDevelopment = ENV.APP_ENV === 'development';
export const isPreview = ENV.APP_ENV === 'preview';
export const isProduction = ENV.APP_ENV === 'production';

// Log environment in development
if (__DEV__) {
  console.log('🌍 Environment:', ENV.APP_ENV);
  console.log('🔗 API URL:', ENV.API_URL);
}
