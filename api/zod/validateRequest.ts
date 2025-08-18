import { ZodType } from 'zod';
import express from 'express';

export const validateRequest = <T extends ZodType>(schema: T) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const parsed = schema.parse(req.body);
      console.log(parsed);
      req.body = parsed as unknown;
      next();
    } catch (error) {
      if (error instanceof Error && 'errors' in error) {
        return res.status(400).json({ error: (error as any).errors });
      }
      return res.status(400).json({ error: 'Invalid request body' });
    }
  };
};
