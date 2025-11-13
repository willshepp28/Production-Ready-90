import * as Sentry from '@sentry/react-native';
import { ENV, isProduction, isDevelopment } from '../../config/env';
import * as Application from 'expo-application';
import * as Device from 'expo-device';

/**
 * Initialize monitoring services (Sentry)
 */
export function initializeMonitoring() {
  if (!ENV.ENABLE_CRASH_REPORTING || !ENV.SENTRY_DSN) {
    console.log('📊 Monitoring disabled or not configured');
    return;
  }

  try {
    Sentry.init({
      dsn: ENV.SENTRY_DSN,
      environment: ENV.APP_ENV,
      enabled: isProduction,
      debug: isDevelopment,

      // Performance Monitoring
      enableAutoPerformanceTracing: ENV.ENABLE_PERFORMANCE_MONITORING,
      tracesSampleRate: isProduction ? 0.2 : 1.0,

      // Session tracking
      enableAutoSessionTracking: true,

      // Native crash reporting
      enableNative: true,
      enableNativeCrashHandling: true,

      // Additional context
      beforeSend(event) {
        // Don't send events in development
        if (isDevelopment) {
          console.log('Sentry Event (dev):', event);
          return null;
        }
        return event;
      },

      integrations: [
        new Sentry.ReactNativeTracing({
          routingInstrumentation: new Sentry.ReactNavigationInstrumentation(),
        }),
      ],
    });

    // Set user context
    setUserContext();

    // Set device context
    setDeviceContext();

    console.log('📊 Monitoring initialized successfully');
  } catch (error) {
    console.error('Failed to initialize monitoring:', error);
  }
}

/**
 * Set user context for monitoring
 */
export function setUserContext(userId?: string, email?: string, username?: string) {
  if (!ENV.ENABLE_CRASH_REPORTING) return;

  Sentry.setUser({
    id: userId,
    email,
    username,
  });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext() {
  if (!ENV.ENABLE_CRASH_REPORTING) return;
  Sentry.setUser(null);
}

/**
 * Set device and app context
 */
async function setDeviceContext() {
  try {
    Sentry.setContext('device', {
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      modelName: Device.modelName,
      osName: Device.osName,
      osVersion: Device.osVersion,
      platformApiLevel: Device.platformApiLevel,
      deviceYearClass: Device.deviceYearClass,
    });

    Sentry.setContext('app', {
      version: Application.nativeApplicationVersion,
      buildNumber: Application.nativeBuildVersion,
      bundleId: Application.applicationId,
    });
  } catch (error) {
    console.error('Failed to set device context:', error);
  }
}

/**
 * Manually capture exceptions
 */
export function captureException(error: Error, context?: Record<string, any>) {
  if (!ENV.ENABLE_CRASH_REPORTING) {
    console.error('Exception:', error, context);
    return;
  }

  if (context) {
    Sentry.setContext('additional', context);
  }

  Sentry.captureException(error);
}

/**
 * Manually capture messages
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (!ENV.ENABLE_CRASH_REPORTING) {
    console.log('Message:', message, level);
    return;
  }

  Sentry.captureMessage(message, level);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, category?: string, data?: Record<string, any>) {
  if (!ENV.ENABLE_CRASH_REPORTING) return;

  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: 'info',
  });
}

/**
 * Performance monitoring
 */
export function startTransaction(name: string, op: string) {
  if (!ENV.ENABLE_PERFORMANCE_MONITORING) return null;
  return Sentry.startTransaction({ name, op });
}
