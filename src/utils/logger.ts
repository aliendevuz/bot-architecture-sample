import { config } from '../config/env';

/**
 * Log darajalari
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Ranglar (terminal uchun)
 */
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
};

/**
 * Logger class
 */
class Logger {
  private level: LogLevel;
  
  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }
  
  /**
   * Vaqt shtampini olish
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }
  
  /**
   * Log formatini yaratish
   */
  private format(level: LogLevel, message: string, meta?: unknown): string {
    const timestamp = this.getTimestamp();
    const metaStr = meta ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }
  
  /**
   * Rangli log chiqarish
   */
  private colorize(level: LogLevel, text: string): string {
    const colorMap = {
      [LogLevel.ERROR]: colors.red,
      [LogLevel.WARN]: colors.yellow,
      [LogLevel.INFO]: colors.green,
      [LogLevel.DEBUG]: colors.blue,
    };
    
    return `${colorMap[level]}${text}${colors.reset}`;
  }
  
  /**
   * Error log
   */
  error(message: string, error?: Error | unknown): void {
    const meta = error instanceof Error 
      ? { message: error.message, stack: error.stack }
      : error;
    
    console.error(this.colorize(LogLevel.ERROR, this.format(LogLevel.ERROR, message, meta)));
  }
  
  /**
   * Warning log
   */
  warn(message: string, meta?: unknown): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.colorize(LogLevel.WARN, this.format(LogLevel.WARN, message, meta)));
    }
  }
  
  /**
   * Info log
   */
  info(message: string, meta?: unknown): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.colorize(LogLevel.INFO, this.format(LogLevel.INFO, message, meta)));
    }
  }
  
  /**
   * Debug log
   */
  debug(message: string, meta?: unknown): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.colorize(LogLevel.DEBUG, this.format(LogLevel.DEBUG, message, meta)));
    }
  }
  
  /**
   * Log chiqarish kerakmi?
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    return levels.indexOf(level) <= levels.indexOf(this.level);
  }
}

// Logger instanceni export qilish
export const logger = new Logger(config.logLevel as LogLevel);