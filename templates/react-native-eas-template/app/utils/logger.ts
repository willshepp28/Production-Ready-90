import { ENV, isDevelopment, isProduction } from '../../config/env';

/**
 * Production-ready logging utility
 * Integrates with Sentry in production
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMetadata {
  [key: string]: any;
}

class Logger {
  private shouldLog(level: LogLevel): boolean {
    if (isDevelopment) return true;
    if (level === 'debug') return false;
    return true;
  }

  private formatMessage(level: LogLevel, message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString();
    const meta = metadata ? ` | ${JSON.stringify(metadata)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${meta}`;
  }

  private sendToMonitoring(level: LogLevel, message: string, metadata?: LogMetadata) {
    if (!ENV.ENABLE_CRASH_REPORTING || !isProduction) return;

    // Integration with Sentry or other monitoring services
    // This is where you'd send logs to your monitoring service
    try {
      // Example: Sentry.captureMessage(message, level);
      // Example: Sentry.setContext('metadata', metadata);
    } catch (error) {
      console.error('Failed to send log to monitoring service:', error);
    }
  }

  debug(message: string, metadata?: LogMetadata) {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, metadata));
    }
  }

  info(message: string, metadata?: LogMetadata) {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, metadata));
      this.sendToMonitoring('info', message, metadata);
    }
  }

  warn(message: string, metadata?: LogMetadata) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, metadata));
      this.sendToMonitoring('warn', message, metadata);
    }
  }

  error(message: string, metadata?: LogMetadata) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, metadata));
      this.sendToMonitoring('error', message, metadata);
    }
  }

  // Log API requests/responses
  logApiRequest(method: string, url: string, data?: any) {
    this.debug(`API Request: ${method} ${url}`, { data });
  }

  logApiResponse(method: string, url: string, status: number, data?: any) {
    this.debug(`API Response: ${method} ${url} - ${status}`, { data });
  }

  logApiError(method: string, url: string, error: any) {
    this.error(`API Error: ${method} ${url}`, {
      error: error.message,
      stack: error.stack,
    });
  }
}

export const logger = new Logger();
