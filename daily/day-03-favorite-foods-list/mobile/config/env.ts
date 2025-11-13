import Constants from 'expo-constants';

export interface AppConfig {
  apiUrl: string;
  apiTimeout: number;
  enableAnalytics: boolean;
  sentryDsn?: string;
  environment: 'development' | 'staging' | 'production';
}

const extra = Constants.expoConfig?.extra || {};

export const config: AppConfig = {
  apiUrl: extra.apiUrl || 'http://localhost:5000',
  apiTimeout: extra.apiTimeout || 30000,
  enableAnalytics: extra.enableAnalytics || false,
  sentryDsn: extra.sentryDsn,
  environment: (extra.environment || 'development') as AppConfig['environment'],
};

export const isDev = config.environment === 'development';
export const isStaging = config.environment === 'staging';
export const isProd = config.environment === 'production';

// Log configuration in development
if (__DEV__) {
  console.log('📱 App Configuration:', {
    environment: config.environment,
    apiUrl: config.apiUrl,
    enableAnalytics: config.enableAnalytics,
  });
}
