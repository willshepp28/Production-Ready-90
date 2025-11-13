# Security Policy

## Overview

This document outlines security best practices and guidelines for the Favorite Foods mobile application.

## Environment Variables and Secrets

### DO NOT Commit Secrets

- Never commit `.env` files to version control
- Never commit API keys, tokens, or passwords
- Never commit service account keys or certificates
- The `.gitignore` file is configured to prevent this, but always double-check

### Use `.env.example`

- Document all required environment variables in `.env.example`
- Never include actual values in `.env.example`
- Use placeholder values to demonstrate format

### EAS Secrets

For production and staging environments, use EAS Secrets to store sensitive data:

```bash
# Store a secret
eas secret:create --scope project --name API_KEY --value "your-actual-key"

# List all secrets
eas secret:list

# Delete a secret
eas secret:delete --name API_KEY
```

### Environment Variable Naming

Use descriptive names for environment variables:

- `API_URL` - Base API URL
- `API_TIMEOUT` - API request timeout
- `SENTRY_DSN` - Error tracking DSN
- `GOOGLE_MAPS_API_KEY` - Third-party API keys

## API Security

### HTTPS Only

- Always use HTTPS URLs for production APIs
- Never send sensitive data over HTTP
- Validate SSL certificates

### Authentication

```typescript
import { apiClient } from '@/services/api-client';

// Set auth token after login
apiClient.setAuthToken(userToken);

// Clear token on logout
apiClient.clearAuthToken();
```

### Request Timeouts

- Default timeout is 30 seconds
- Configure per-request timeouts for long operations
- Handle timeout errors gracefully

### Rate Limiting

- Implement client-side rate limiting if needed
- Handle 429 (Too Many Requests) responses
- Use exponential backoff for retries

## Data Security

### User Data

- Encrypt sensitive user data before storage
- Use secure storage for tokens and credentials
- Never log sensitive user information
- Implement data retention policies

### Local Storage

For secure local storage on mobile:

```typescript
// Use expo-secure-store for sensitive data
import * as SecureStore from 'expo-secure-store';

// Save
await SecureStore.setItemAsync('userToken', token);

// Retrieve
const token = await SecureStore.getItemAsync('userToken');

// Delete
await SecureStore.deleteItemAsync('userToken');
```

### Input Validation

Always validate and sanitize user input:

```typescript
// Example validation
function validateFoodName(name: string): boolean {
  if (!name || name.trim().length === 0) {
    return false;
  }
  if (name.length > 100) {
    return false;
  }
  // Add more validation as needed
  return true;
}
```

## Build Security

### Code Obfuscation

For production builds:

```json
{
  "expo": {
    "android": {
      "enableProguardInReleaseBuilds": true
    },
    "ios": {
      "bitcode": "Release"
    }
  }
}
```

### Certificate Pinning

Consider implementing SSL pinning for production:

```typescript
// Example configuration
const pinnedServers = {
  'api.yourcompany.com': {
    'sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=': true,
  },
};
```

## Dependency Security

### Regular Updates

- Run `npm audit` regularly
- Update dependencies monthly
- Review security advisories
- Use `npm audit fix` to auto-fix vulnerabilities

### Package Verification

- Only install packages from trusted sources
- Review package permissions before installing
- Check package download counts and maintenance status
- Use lock files (`package-lock.json`)

## Error Handling

### Error Messages

- Never expose sensitive information in error messages
- Don't reveal system internals in production errors
- Log detailed errors server-side only
- Show user-friendly messages to users

### Error Logging

```typescript
// Development
if (__DEV__) {
  console.error('Detailed error:', error);
}

// Production - send to error tracking service
if (!__DEV__ && config.sentryDsn) {
  // Sentry.captureException(error);
}
```

## Code Review

### Security Checklist

Before merging code, verify:

- [ ] No secrets or API keys in code
- [ ] Input validation is implemented
- [ ] Error messages don't expose sensitive info
- [ ] HTTPS is used for all API calls
- [ ] User data is encrypted if needed
- [ ] Dependencies are up to date
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Authentication is properly implemented
- [ ] Authorization checks are in place

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: security@yourcompany.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Updates

This project follows semantic versioning for security updates:

- **Patch** (1.0.X) - Security fixes
- **Minor** (1.X.0) - New security features
- **Major** (X.0.0) - Breaking changes to security implementation

## Compliance

### GDPR Compliance

- Implement data deletion on user request
- Provide data export functionality
- Obtain user consent for data collection
- Document data processing activities

### COPPA Compliance

If targeting children under 13:

- Implement parental consent mechanisms
- Limit data collection
- No targeted advertising
- Provide clear privacy policies

## Additional Resources

- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
- [Expo Security Guidelines](https://docs.expo.dev/guides/security/)
- [React Native Security](https://reactnative.dev/docs/security)
- [EAS Security](https://docs.expo.dev/eas/security/)

## Version History

- **1.0.0** (2025-01-13) - Initial security policy
