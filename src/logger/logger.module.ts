// logger.module.ts
import { Module, Global } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LoggerServices } from './logger.service';
// import * as DailyRotateFile from 'winston-daily-rotate-file';


const isProduction = process.env.NODE_ENV === 'production';

@Global()
@Module({
    imports: [
        WinstonModule.forRoot({
            level: isProduction ? 'info' : 'debug',

            transports: [
                // ✅ Console logs (always enabled, but cleaner in prod)
                new winston.transports.Console({
                    level: isProduction ? 'info' : 'debug',
                    format: winston.format.combine(
                        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                        isProduction
                            ? winston.format.json()
                            : winston.format.colorize({ all: true }),
                        winston.format.printf(
                            ({ timestamp, level, message, context, trace }) =>
                                `${timestamp} [${context || 'App'}] ${level}: ${message}${trace ? `\n${trace}` : ''}`,
                        ),
                    ),
                }),

                // ✅ File logs ONLY in production
                ...(isProduction
                    ? [
                        new DailyRotateFile({
                            filename: 'logs/error-%DATE%.log',
                            datePattern: 'YYYY-MM-DD',
                            level: 'error',
                            maxSize: '20m',
                            maxFiles: '14d',
                            format: winston.format.combine(
                                winston.format.timestamp(),
                                winston.format.json(),
                            ),
                        }),

                        new DailyRotateFile({
                            filename: 'logs/combined-%DATE%.log',
                            datePattern: 'YYYY-MM-DD',
                            maxSize: '20m',
                            maxFiles: '14d',
                            format: winston.format.combine(
                                winston.format.timestamp(),
                                winston.format.json(),
                            ),
                        }),
                    ]
                    : []),
            ],

            // ✅ Production-only crash logs
            exceptionHandlers: isProduction
                ? [new winston.transports.File({ filename: 'logs/exceptions.log' })]
                : [],

            rejectionHandlers: isProduction
                ? [new winston.transports.File({ filename: 'logs/rejections.log' })]
                : [],
        }),
    ],
    providers: [LoggerServices],
    exports: [LoggerServices],
})
export class LoggerModule { }
