# Favorite Foods - Production-Ready React Native Template

A production-ready React Native mobile application built with Expo Router, EAS (Expo Application Services), and modern development practices.

## Features

- **File-based Routing**: Using Expo Router with typed routes
- **State Management**: Zustand for simple and effective state management
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Type Safety**: Full TypeScript support with strict mode
- **Error Handling**: Global error boundaries with user-friendly error screens
- **API Integration**: Robust API client with retry logic and timeout handling
- **Environment Management**: Multi-environment support (dev, staging, production)
- **EAS Integration**: Complete EAS setup for builds, updates, and submissions
- **CI/CD**: GitHub Actions workflows for automated builds and deployments
- **Dark Mode**: Built-in dark mode support
- **New Architecture**: React Native New Architecture enabled

## Prerequisites

- Node.js 20.x or later
- npm or yarn
- Expo CLI
- EAS CLI (`npm install -g eas-cli`)
- An Expo account (sign up at https://expo.dev)
- iOS Simulator (for iOS development on macOS)
- Android Studio and Android Emulator (for Android development)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env.development
```

Edit `.env.development` and add your configuration:

```bash
APP_NAME=Favorite Foods (Dev)
APP_ENV=development
API_URL=http://localhost:5000
EXPO_PROJECT_ID=your-expo-project-id
# ... other variables
```

### 3. Configure EAS

Login to your Expo account:

```bash
eas login
```

Initialize EAS (if not already done):

```bash
eas init
```

Update the `eas.json` file with your project details.

### 4. Update App Configuration

Edit `app.config.ts` and update the following:

- Bundle identifiers for iOS and Android
- Expo project ID
- App name and metadata

### 5. Start Development Server

```bash
npm start
```

Or start with a specific environment:

```bash
npm run start:dev      # Development
npm run start:staging  # Staging
npm run start:prod     # Production
```

## Project Structure

```
mobile/
├── app/                    # Expo Router pages (file-based routing)
│   ├── _layout.tsx        # Root layout
│   ├── modal.tsx          # Modal screen
│   └── (tabs)/            # Tab navigation group
│       ├── _layout.tsx    # Tab layout
│       ├── index.tsx      # Home screen
│       └── explore.tsx    # Explore screen
├── components/            # Reusable components
│   ├── error-boundary.tsx # Global error boundary
│   └── ui/                # UI components
├── config/                # Configuration files
│   └── env.ts             # Environment configuration
├── services/              # API services
│   ├── api-client.ts      # HTTP client with retry logic
│   └── food-service.ts    # Food API service
├── store/                 # Zustand stores
│   └── useFood.ts         # Food state management
├── hooks/                 # Custom React hooks
├── constants/             # Constants and theme
├── assets/                # Images and static files
├── app.config.ts          # Expo app configuration
├── eas.json               # EAS build configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Available Scripts

### Development

- `npm start` - Start Expo development server
- `npm run android` - Start on Android emulator
- `npm run ios` - Start on iOS simulator
- `npm run web` - Start web version

### Type Checking & Linting

- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

### EAS Builds

#### Development Builds
```bash
npm run build:dev          # Build for all platforms
npm run build:dev:ios      # Build for iOS only
npm run build:dev:android  # Build for Android only
```

#### Preview Builds
```bash
npm run build:preview          # Build for all platforms
npm run build:preview:ios      # Build for iOS only
npm run build:preview:android  # Build for Android only
```

#### Production Builds
```bash
npm run build:prod          # Build for all platforms
npm run build:prod:ios      # Build for iOS only
npm run build:prod:android  # Build for Android only
```

### EAS Updates (OTA Updates)

```bash
npm run update:dev      # Publish to development channel
npm run update:preview  # Publish to preview channel
npm run update:prod     # Publish to production channel
```

### App Submission

```bash
npm run submit:ios      # Submit to App Store
npm run submit:android  # Submit to Google Play
```

## Build Profiles

The project includes three build profiles configured in `eas.json`:

### Development
- Internal distribution
- Development client enabled
- Fast build times
- Debugging enabled

### Preview
- Internal distribution
- Production-like build
- Testing and QA purposes
- Staging environment

### Production
- Store submission ready
- Auto-increment build numbers
- Optimized for performance
- Production environment

## Environment Management

The project supports three environments:

### Development
- Local API: `http://localhost:5000`
- Debug mode enabled
- Analytics disabled
- File: `.env.development`

### Staging
- Staging API: `https://staging-api.yourcompany.com`
- Debug mode disabled
- Analytics enabled
- File: `.env.staging`

### Production
- Production API: `https://api.yourcompany.com`
- Debug mode disabled
- Analytics enabled
- File: `.env.production`

## CI/CD Workflows

The project includes GitHub Actions workflows:

### CI (`ci.yml`)
- Runs on every PR and push
- Type checking with TypeScript
- Linting with ESLint
- Runs tests
- Comments on PRs

### EAS Build (`eas-build.yml`)
- Builds app on push to main/develop
- Manual workflow dispatch
- Supports all platforms
- Comments build status on PRs

### EAS Update (`eas-update.yml`)
- Publishes OTA updates
- Automatic on push to branches
- Manual workflow dispatch
- Creates release notes

## Error Handling

### Global Error Boundary

The app includes a global error boundary that catches and displays errors gracefully:

- User-friendly error screens
- Development mode shows error details
- Ability to retry or navigate home
- Ready for error tracking integration (Sentry, etc.)

### API Error Handling

The API client includes:
- Automatic retries with exponential backoff
- Timeout handling
- Network error detection
- User-friendly error messages

## API Integration

### Using the API Client

```typescript
import { apiClient } from '@/services/api-client';

// GET request
const data = await apiClient.get('/api/endpoint');

// POST request
const result = await apiClient.post('/api/endpoint', { data });

// With custom options
const response = await apiClient.get('/api/endpoint', {
  timeout: 10000,
  retries: 5,
});
```

### Using the Food Service

```typescript
import { foodService } from '@/services/food-service';

// Get all foods
const foods = await foodService.getAllFoods();

// Create a food
const newFood = await foodService.createFood({ name: 'Pizza' });

// Delete a food
await foodService.deleteFood(foodId);
```

## Security Best Practices

1. **Never commit `.env` files** - They are gitignored by default
2. **Use `.env.example`** - Document required environment variables
3. **Store secrets in EAS Secrets** - Use `eas secret:create` for sensitive data
4. **Use HTTPS** - Always use HTTPS URLs for production APIs
5. **Validate user input** - Always validate and sanitize user input
6. **Keep dependencies updated** - Regularly update npm packages

## EAS Secrets Management

Store sensitive environment variables as EAS secrets:

```bash
# Create a secret
eas secret:create --scope project --name API_KEY --value "your-api-key"

# List secrets
eas secret:list

# Delete a secret
eas secret:delete --name API_KEY
```

## Troubleshooting

### Build Fails

1. Check your `eas.json` configuration
2. Ensure all environment variables are set
3. Verify bundle identifiers are unique
4. Check EAS build logs: `eas build:list`

### Update Not Working

1. Ensure runtime version matches
2. Check update channel configuration
3. Verify app is checking for updates
4. Use `eas update:list` to see published updates

### Development Server Issues

1. Clear Metro bundler cache: `npx expo start -c`
2. Clear node modules: `rm -rf node_modules && npm install`
3. Reset project: `npm run reset-project`

## Contributing

1. Create a feature branch
2. Make your changes
3. Run type checking: `npm run type-check`
4. Run linting: `npm run lint`
5. Create a pull request

## Resources

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router Documentation](https://expo.github.io/router/docs)
- [EAS Documentation](https://docs.expo.dev/eas)
- [React Native Documentation](https://reactnative.dev)
- [NativeWind Documentation](https://www.nativewind.dev)

## License

MIT
