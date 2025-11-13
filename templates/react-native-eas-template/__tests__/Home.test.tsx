import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../app/index';

jest.mock('../config/env', () => ({
  ENV: {
    APP_ENV: 'test',
    API_URL: 'http://test-api.com',
    ENABLE_ANALYTICS: false,
    ENABLE_CRASH_REPORTING: false,
    ENABLE_PERFORMANCE_MONITORING: false,
    SENTRY_DSN: '',
    EAS_PROJECT_ID: '',
  },
  isDevelopment: false,
  isPreview: false,
  isProduction: false,
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Production Ready')).toBeTruthy();
    expect(screen.getByText('React Native EAS Template')).toBeTruthy();
  });

  it('displays environment information', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Environment')).toBeTruthy();
    expect(screen.getByText('test')).toBeTruthy();
  });

  it('displays API URL', () => {
    render(<HomeScreen />);

    expect(screen.getByText('API URL')).toBeTruthy();
    expect(screen.getByText('http://test-api.com')).toBeTruthy();
  });

  it('shows features list', () => {
    render(<HomeScreen />);

    expect(screen.getByText('✓ EAS Build & Update')).toBeTruthy();
    expect(screen.getByText('✓ Error Boundaries')).toBeTruthy();
    expect(screen.getByText('✓ Secure Storage')).toBeTruthy();
  });
});
