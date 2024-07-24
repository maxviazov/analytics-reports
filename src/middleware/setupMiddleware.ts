import { INestApplication } from '@nestjs/common';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { NextFunction, Request, Response } from 'express';

export function setupMiddleware(app: INestApplication): void {
  app.use(
    cors({
      origin: [
        '*',
        process.env.CLIENT_URL || '',
        process.env.MARKETING_CLIENT_URL || '',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true, // enable set cookie
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });

  app.use(
    cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== 'development',
    }),
  );

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);
}
