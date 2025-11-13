# Production-Ready React Native EAS Template

A comprehensive, production-ready React Native template built with Expo Application Services (EAS). This template includes everything you need to build, deploy, and maintain a professional mobile application.

## Features

### Build & Deployment
- **EAS Build** - Pre-configured build profiles for development, preview, and production
- **EAS Update** - Over-the-air updates for instant bug fixes and feature deployments
- **EAS Submit** - Automated app store submission workflow
- **CI/CD** - GitHub Actions workflows for automated testing and building

### Developer Experience
- **TypeScript** - Full type safety across the codebase
- **Expo Router** - File-based routing with typed routes
- **ESLint & Prettier** - Consistent code style and quality
- **Jest & React Native Testing Library** - Comprehensive testing setup
- **Hot Reload** - Fast refresh for rapid development

### Production Features
- **Error Boundaries** - Graceful error handling with user-friendly fallbacks
- **Sentry Integration** - Production error tracking and performance monitoring
- **Secure Storage** - Encrypted storage for sensitive data (Keychain/Keystore)
- **Biometric Authentication** - Face ID, Touch ID, and Android biometric support
- **API Client** - Axios-based client with interceptors and token refresh
- **Environment Management** - Multi-environment configuration (.env support)
- **Logging System** - Structured logging with monitoring integration

### Security
- **Secure Storage** - Native encrypted storage for tokens and sensitive data
- **Biometric Auth** - Built-in biometric authentication utilities
- **API Key Management** - Secure environment variable handling
- **ProGuard** - Code obfuscation for Android release builds
- **SSL Pinning Ready** - Easy to add certificate pinning

## Prerequisites

- Node.js 18 or later
- npm 9 or later
- Expo CLI
- EAS CLI (`npm install -g eas-cli`)
- An Expo account (free tier is fine)

## Quick Start

### 1. Clone and Install

```bash
# Clone the template
git clone <your-repo-url>
cd react-native-eas-template

# Install dependencies
npm install
```

### 2. Configure Environment

```bash
# Copy environment example
cp .env.example .env

# Update .env with your values
# - API_URL
# - SENTRY_DSN (if using Sentry)
# - Other app-specific variables
```

### 3. Update App Configuration

Edit `app.config.js` and update:
- `name` - Your app name
- `slug` - Your app slug
- `bundleIdentifier` / `package` - Your unique app identifier
- `scheme` - Your app's URL scheme

### 4. Initialize EAS

```bash
# Login to Expo
eas login

# Initialize EAS in your project
eas init

# Configure EAS Build
eas build:configure
```

### 5. Run Development Server

```bash
# Start Expo
npm start

# Or run on specific platform
npm run ios
npm run android
```

## EAS Build Profiles

### Development
For internal testing with development client:
```bash
npm run build:dev:ios
npm run build:dev:android
```

### Preview
For internal distribution and QA testing:
```bash
npm run build:preview:ios
npm run build:preview:android
```

### Production
For App Store and Google Play submission:
```bash
npm run build:prod:ios
npm run build:prod:android
npm run build:prod:all
```

## EAS Update

Push OTA updates without rebuilding:

```bash
# Update preview environment
npm run update:preview

# Update production
npm run update:prod
```

## Environment Configuration

The template supports multiple environments:

### Development
- Uses `.env.development`
- Bundle ID: `com.yourcompany.yourapp.dev`
- App Name: "YourApp (Dev)"

### Preview/Staging
- Uses `.env.preview`
- Bundle ID: `com.yourcompany.yourapp.preview`
- App Name: "YourApp (Preview)"

### Production
- Uses `.env.production`
- Bundle ID: `com.yourcompany.yourapp`
- App Name: "YourApp"

## Project Structure

```
react-native-eas-template/
├── app/                          # Application code
│   ├── _layout.tsx              # Root layout with error boundary
│   ├── index.tsx                # Home screen
│   ├── modal.tsx                # Example modal screen
│   ├── api/                     # API client and services
│   │   └── client.ts            # Axios client with interceptors
│   ├── components/              # Reusable components
│   │   └── ErrorBoundary.tsx    # Error boundary component
│   └── utils/                   # Utility functions
│       ├── logger.ts            # Logging system
│       ├── monitoring.ts        # Sentry integration
│       ├── secureStorage.ts     # Secure storage utilities
│       └── biometric.ts         # Biometric auth utilities
├── assets/                      # Static assets
│   ├── images/                  # Images, icons, splash screens
│   └── fonts/                   # Custom fonts
├── config/                      # Configuration
│   └── env.ts                   # Environment variables
├── __tests__/                   # Test files
├── .github/workflows/           # CI/CD workflows
│   ├── eas-build.yml           # EAS build workflow
│   └── pr-checks.yml           # PR quality checks
├── app.config.js               # Dynamic Expo configuration
├── eas.json                    # EAS build configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── jest.config.js             # Jest configuration
├── .eslintrc.js               # ESLint configuration
├── .prettierrc.js             # Prettier configuration
└── README.md                  # This file
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Check TypeScript types
npm run type-check

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

## App Store Submission

### iOS

1. Build production version:
```bash
npm run build:prod:ios
```

2. Submit to App Store:
```bash
npm run submit:ios
```

### Android

1. Build production AAB:
```bash
npm run build:prod:android
```

2. Submit to Google Play:
```bash
npm run submit:android
```

## Setting Up Sentry (Optional)

1. Create a Sentry account and project

2. Install Sentry CLI:
```bash
npm install -g @sentry/cli
```

3. Add Sentry configuration to `.env`:
```
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_org
SENTRY_PROJECT=your_project
```

4. Uncomment Sentry plugin in `app.config.js`

5. Configure source maps upload in `eas.json` (see Sentry docs)

## GitHub Actions Secrets

Add these secrets to your GitHub repository:

- `EXPO_TOKEN` - Expo access token (required)
- `CODECOV_TOKEN` - Codecov token (optional)
- `SNYK_TOKEN` - Snyk security token (optional)
- `SENTRY_AUTH_TOKEN` - Sentry auth token (if using Sentry)

## Customization

### Adding Custom Fonts

1. Place font files in `assets/fonts/`
2. Load fonts in `app/_layout.tsx`
3. Use in your styles

### Adding App Icons

1. Generate icons using https://www.appicon.co/
2. Place icons in `assets/images/`
3. Update paths in `app.config.js`

### Configuring Push Notifications

1. Install expo-notifications:
```bash
npx expo install expo-notifications
```

2. Configure in `app.config.js`
3. Implement notification handlers

## Performance Optimization

### Production Builds
- ProGuard enabled for Android (shrinks and obfuscates code)
- Dead code elimination
- Asset optimization
- Hermes engine enabled

### Best Practices
- Use React.memo for expensive components
- Implement proper list virtualization
- Optimize images (use WebP when possible)
- Lazy load screens with dynamic imports
- Monitor bundle size

## Troubleshooting

### Build Failures

Check EAS build logs:
```bash
eas build:list
eas build:view [BUILD_ID]
```

### Common Issues

**Issue**: Build fails with "Could not find ..."
**Solution**: Run `npm ci` to clean install dependencies

**Issue**: Environment variables not working
**Solution**: Ensure variables are defined in `eas.json` under `env`

**Issue**: OTA updates not appearing
**Solution**: Check app version and runtime version match

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

## Support

For issues and questions:
- Create an issue in this repository
- Check existing issues for solutions
- Review Expo documentation

---

Built with ❤️ using Expo and React Native
