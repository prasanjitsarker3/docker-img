import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerServices implements LoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) { }

    log(message: string, context?: string) {
        this.logger.info(message, { context });
    }

    error(message: string, trace?: string, context?: string) {
        this.logger.error(message, { context, trace });
    }

    warn(message: string, context?: string) {
        this.logger.warn(message, { context });
    }

    debug(message: string, context?: string) {
        this.logger.debug(message, { context });
    }

    verbose(message: string, context?: string) {
        this.logger.verbose(message, { context });
    }

    // Additional custom methods
    logApiRequest(method: string, url: string, statusCode: number, duration: number) {
        this.logger.info('API Request', {
            context: 'HTTP',
            method,
            url,
            statusCode,
            duration: `${duration}ms`,
        });
    }

    logDatabaseQuery(query: string, duration: number) {
        this.logger.debug('Database Query', {
            context: 'Prisma',
            query,
            duration: `${duration}ms`,
        });
    }

    logUserAction(userId: string, action: string, details?: any) {
        this.logger.info('User Action', {
            context: 'UserActivity',
            userId,
            action,
            details,
        });
    }
}