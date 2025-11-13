import * as SecureStore from 'expo-secure-store';
import { logger } from './logger';

/**
 * Secure storage utility for sensitive data
 * Uses Keychain (iOS) and Keystore (Android)
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  BIOMETRIC_ENABLED: 'biometric_enabled',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;

class SecureStorage {
  /**
   * Store a value securely
   */
  async set(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
      logger.debug(`Secure storage: Set ${key}`);
    } catch (error) {
      logger.error(`Failed to set secure storage for ${key}`, { error });
      throw error;
    }
  }

  /**
   * Get a value from secure storage
   */
  async get(key: string): Promise<string | null> {
    try {
      const value = await SecureStore.getItemAsync(key);
      logger.debug(`Secure storage: Get ${key}`, { found: !!value });
      return value;
    } catch (error) {
      logger.error(`Failed to get secure storage for ${key}`, { error });
      return null;
    }
  }

  /**
   * Delete a value from secure storage
   */
  async delete(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
      logger.debug(`Secure storage: Delete ${key}`);
    } catch (error) {
      logger.error(`Failed to delete secure storage for ${key}`, { error });
      throw error;
    }
  }

  /**
   * Clear all secure storage
   */
  async clear(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await Promise.all(keys.map(key => this.delete(key)));
      logger.info('Secure storage cleared');
    } catch (error) {
      logger.error('Failed to clear secure storage', { error });
      throw error;
    }
  }

  // Convenience methods for common operations

  async setAuthToken(token: string): Promise<void> {
    return this.set(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  async getAuthToken(): Promise<string | null> {
    return this.get(STORAGE_KEYS.AUTH_TOKEN);
  }

  async setRefreshToken(token: string): Promise<void> {
    return this.set(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return this.get(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async setUserId(userId: string): Promise<void> {
    return this.set(STORAGE_KEYS.USER_ID, userId);
  }

  async getUserId(): Promise<string | null> {
    return this.get(STORAGE_KEYS.USER_ID);
  }

  async clearAuth(): Promise<void> {
    await Promise.all([
      this.delete(STORAGE_KEYS.AUTH_TOKEN),
      this.delete(STORAGE_KEYS.REFRESH_TOKEN),
      this.delete(STORAGE_KEYS.USER_ID),
    ]);
  }
}

export const secureStorage = new SecureStorage();
export { STORAGE_KEYS };
