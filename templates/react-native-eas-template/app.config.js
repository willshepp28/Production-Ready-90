const IS_DEV = process.env.APP_ENV === 'development';
const IS_PREVIEW = process.env.APP_ENV === 'preview';
const IS_PROD = process.env.APP_ENV === 'production';

const getAppIdentifier = () => {
  if (IS_PROD) {
    return 'com.yourcompany.yourapp';
  }
  if (IS_PREVIEW) {
    return 'com.yourcompany.yourapp.preview';
  }
  return 'com.yourcompany.yourapp.dev';
};

const getAppName = () => {
  if (IS_PROD) {
    return 'YourApp';
  }
  if (IS_PREVIEW) {
    return 'YourApp (Preview)';
  }
  return 'YourApp (Dev)';
};

export default {
  expo: {
    name: getAppName(),
    slug: 'your-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'yourapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,

    // Splash screen configuration
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },

    // Updates configuration (EAS Update)
    updates: {
      url: process.env.EAS_UPDATE_URL,
      fallbackToCacheTimeout: 0,
      enabled: true
    },
    runtimeVersion: {
      policy: 'appVersion'
    },

    // iOS configuration
    ios: {
      supportsTablet: true,
      bundleIdentifier: getAppIdentifier(),
      buildNumber: '1',
      infoPlist: {
        NSCameraUsageDescription: 'This app uses the camera to...',
        NSPhotoLibraryUsageDescription: 'This app accesses your photos to...',
        NSLocationWhenInUseUsageDescription: 'This app uses your location to...'
      },
      config: {
        usesNonExemptEncryption: false
      }
    },

    // Android configuration
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: getAppIdentifier(),
      versionCode: 1,
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'ACCESS_FINE_LOCATION'
      ],
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: true
    },

    // Web configuration
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro'
    },

    // Plugins
    plugins: [
      'expo-router',
      'expo-secure-store',
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 34,
            targetSdkVersion: 34,
            buildToolsVersion: '34.0.0',
            enableProguardInReleaseBuilds: true,
            enableShrinkResourcesInReleaseBuilds: true
          },
          ios: {
            deploymentTarget: '15.0'
          }
        }
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000'
          }
        }
      ],
      // Sentry integration (optional - add if using Sentry)
      // [
      //   '@sentry/react-native/expo',
      //   {
      //     organization: process.env.SENTRY_ORG,
      //     project: process.env.SENTRY_PROJECT,
      //     url: 'https://sentry.io/'
      //   }
      // ]
    ],

    // Experiments
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },

    // Extra configuration
    extra: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
      sentryDsn: process.env.SENTRY_DSN,
      appEnv: process.env.APP_ENV || 'development',
      eas: {
        projectId: process.env.EAS_PROJECT_ID
      }
    },

    // Hooks
    hooks: {
      postPublish: []
    }
  }
};
