import * as LocalAuthentication from 'expo-local-authentication';
import { logger } from './logger';

/**
 * Biometric authentication utility
 * Supports Face ID, Touch ID, and Android biometrics
 */

class BiometricAuth {
  private supported: boolean | null = null;
  private enrolled: boolean | null = null;

  /**
   * Check if device supports biometric authentication
   */
  async isSupported(): Promise<boolean> {
    if (this.supported !== null) {
      return this.supported;
    }

    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      this.supported = compatible;
      return compatible;
    } catch (error) {
      logger.error('Failed to check biometric support', { error });
      return false;
    }
  }

  /**
   * Check if biometric credentials are enrolled
   */
  async isEnrolled(): Promise<boolean> {
    if (this.enrolled !== null) {
      return this.enrolled;
    }

    try {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      this.enrolled = enrolled;
      return enrolled;
    } catch (error) {
      logger.error('Failed to check biometric enrollment', { error });
      return false;
    }
  }

  /**
   * Get available authentication types
   */
  async getAvailableTypes(): Promise<LocalAuthentication.AuthenticationType[]> {
    try {
      return await LocalAuthentication.supportedAuthenticationTypesAsync();
    } catch (error) {
      logger.error('Failed to get authentication types', { error });
      return [];
    }
  }

  /**
   * Authenticate with biometrics
   */
  async authenticate(
    promptMessage: string = 'Authenticate to continue'
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const supported = await this.isSupported();
      if (!supported) {
        return { success: false, error: 'Biometric authentication not supported' };
      }

      const enrolled = await this.isEnrolled();
      if (!enrolled) {
        return { success: false, error: 'No biometric credentials enrolled' };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
        fallbackLabel: 'Use passcode',
      });

      if (result.success) {
        logger.info('Biometric authentication successful');
        return { success: true };
      } else {
        logger.warn('Biometric authentication failed', { error: result.error });
        return { success: false, error: result.error };
      }
    } catch (error) {
      logger.error('Biometric authentication error', { error });
      return { success: false, error: 'Authentication failed' };
    }
  }

  /**
   * Get biometric type name for UI
   */
  async getBiometricTypeName(): Promise<string> {
    const types = await this.getAvailableTypes();

    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'Face ID';
    }
    if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'Touch ID';
    }
    if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      return 'Iris';
    }

    return 'Biometric';
  }
}

export const biometricAuth = new BiometricAuth();
