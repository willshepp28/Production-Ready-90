# Setup Guide

This guide will walk you through setting up this template for your new project.

## Step 1: Project Initialization

### 1.1 Clone or Copy Template

```bash
# Option 1: Clone and rename
git clone <template-repo-url> my-new-app
cd my-new-app
rm -rf .git
git init

# Option 2: Use as template on GitHub
# Click "Use this template" button on GitHub
```

### 1.2 Install Dependencies

```bash
npm install
```

## Step 2: Configure Your App

### 2.1 Update package.json

Edit `package.json`:
```json
{
  "name": "my-new-app",
  "version": "1.0.0",
  "description": "Your app description"
}
```

### 2.2 Update app.config.js

Edit `app.config.js` and replace:

```javascript
const getAppIdentifier = () => {
  if (IS_PROD) {
    return 'com.yourcompany.yourapp'; // <- Change this
  }
  if (IS_PREVIEW) {
    return 'com.yourcompany.yourapp.preview'; // <- Change this
  }
  return 'com.yourcompany.yourapp.dev'; // <- Change this
};

const getAppName = () => {
  if (IS_PROD) {
    return 'YourApp'; // <- Change this
  }
  if (IS_PREVIEW) {
    return 'YourApp (Preview)'; // <- Change this
  }
  return 'YourApp (Dev)'; // <- Change this
};

export default {
  expo: {
    slug: 'your-app', // <- Change this
    scheme: 'yourapp', // <- Change this
    // ...
  }
};
```

### 2.3 Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your preferred editor
```

Required variables:
- `API_URL` - Your backend API URL
- `APP_ENV` - Environment (development/preview/production)

Optional variables:
- `SENTRY_DSN` - Sentry error tracking
- `API_KEY` - API authentication key

## Step 3: Set Up EAS

### 3.1 Install EAS CLI

```bash
npm install -g eas-cli
```

### 3.2 Login to Expo

```bash
eas login
```

### 3.3 Initialize EAS Project

```bash
eas init
```

This will:
- Create an EAS project
- Link it to your Expo account
- Update `app.config.js` with project ID

### 3.4 Configure iOS (if targeting iOS)

```bash
# Generate iOS credentials
eas credentials

# Or let EAS manage automatically during first build
```

### 3.5 Configure Android (if targeting Android)

```bash
# Generate Android keystore
eas credentials

# Or let EAS manage automatically during first build
```

## Step 4: Add App Assets

### 4.1 App Icon

1. Create a 1024x1024px icon
2. Save as `assets/images/icon.png`
3. For Android adaptive icon:
   - Create `assets/images/adaptive-icon.png` (1024x1024px)

### 4.2 Splash Screen

1. Create splash screen image (1284x2778px)
2. Save as `assets/images/splash.png`
3. Create splash icon (200x200px)
4. Save as `assets/images/splash-icon.png`

### 4.3 Favicon (for web)

1. Create 48x48px favicon
2. Save as `assets/images/favicon.png`

**Tip**: Use https://www.appicon.co/ to generate all required sizes

## Step 5: Set Up Error Monitoring (Optional)

### 5.1 Create Sentry Account

1. Go to https://sentry.io
2. Create account and new project
3. Get your DSN

### 5.2 Configure Sentry

Add to `.env`:
```
SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
```

Uncomment Sentry plugin in `app.config.js`:
```javascript
plugins: [
  // ...
  [
    '@sentry/react-native/expo',
    {
      organization: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      url: 'https://sentry.io/'
    }
  ]
],
```

## Step 6: Set Up GitHub Actions

### 6.1 Create GitHub Repository

```bash
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### 6.2 Add GitHub Secrets

Go to Repository Settings > Secrets and add:

**Required:**
- `EXPO_TOKEN` - Get from: `eas whoami` then create at expo.dev

**Optional:**
- `CODECOV_TOKEN` - For coverage reports
- `SNYK_TOKEN` - For security scanning
- `SENTRY_AUTH_TOKEN` - For Sentry source maps

### 6.3 Configure Branches

Create develop branch:
```bash
git checkout -b develop
git push -u origin develop
```

The CI/CD is configured for:
- `main` - Production builds and updates
- `develop` - Preview builds and updates
- Pull requests - Quality checks

## Step 7: First Build

### 7.1 Development Build

```bash
# Build for iOS
npm run build:dev:ios

# Build for Android
npm run build:dev:android
```

Wait for build to complete (usually 10-20 minutes)

### 7.2 Install Development Build

**iOS:**
1. Get build URL from EAS dashboard
2. Open on iOS device
3. Install

**Android:**
1. Download APK from EAS dashboard
2. Install on device

### 7.3 Start Development Server

```bash
npm start
```

Connect from your development build app

## Step 8: Testing

### 8.1 Update Tests

Update test files to match your app:
- `__tests__/Home.test.tsx`
- Add more tests as needed

### 8.2 Run Tests

```bash
npm test
```

### 8.3 Check Coverage

```bash
npm run test:coverage
```

## Step 9: Production Preparation

### 9.1 App Store Connect (iOS)

1. Create app in App Store Connect
2. Get ASC App ID
3. Add to `.env`:
```
APPLE_ID=your@email.com
ASC_APP_ID=1234567890
APPLE_TEAM_ID=TEAM123
```

### 9.2 Google Play Console (Android)

1. Create app in Google Play Console
2. Generate service account key
3. Save as `google-service-account.json`
4. Add to `.gitignore` (already included)

### 9.3 Production Build

```bash
# Build both platforms
npm run build:prod:all

# Or individually
npm run build:prod:ios
npm run build:prod:android
```

## Step 10: Deployment

### 10.1 iOS Submission

```bash
npm run submit:ios
```

Follow prompts for TestFlight/App Store

### 10.2 Android Submission

```bash
npm run submit:android
```

Follow prompts for internal/production track

## Next Steps

### Recommended Setup

1. **Analytics** - Add Firebase or Amplitude
2. **Push Notifications** - Configure expo-notifications
3. **Deep Linking** - Configure URL schemes
4. **App Review** - Set up in-app review prompts
5. **Feature Flags** - Implement feature toggles

### Code Customization

1. Update color scheme in components
2. Add your custom fonts
3. Implement authentication flow
4. Create your screens and navigation
5. Integrate with your backend API

### Monitoring

1. Set up Sentry alerts
2. Configure performance monitoring
3. Enable crash reporting
4. Set up analytics events

## Troubleshooting

### Build Issues

**Problem**: "Could not authenticate"
**Solution**: Run `eas logout` then `eas login`

**Problem**: Build fails immediately
**Solution**: Check `eas.json` syntax, ensure valid JSON

**Problem**: iOS provisioning errors
**Solution**: Run `eas credentials` and regenerate

### Runtime Issues

**Problem**: App crashes on startup
**Solution**: Check error logs in Sentry, verify environment config

**Problem**: API calls failing
**Solution**: Verify API_URL in env config, check network permissions

## Getting Help

- Expo Discord: https://chat.expo.dev/
- Expo Forums: https://forums.expo.dev/
- GitHub Issues: Create an issue in this repo
- Documentation: https://docs.expo.dev/

## Checklist

Before going to production:

- [ ] Updated app name and bundle identifier
- [ ] Configured all environment variables
- [ ] Added app icons and splash screens
- [ ] Set up error monitoring (Sentry)
- [ ] Configured GitHub Actions secrets
- [ ] Added privacy policy URL
- [ ] Configured App Store Connect / Play Console
- [ ] Tested on real devices
- [ ] Run production build
- [ ] Submitted for review

Congratulations! Your app is ready for production! 🎉
