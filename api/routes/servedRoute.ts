import express, { Router } from 'express';
import { validateRequest } from '../zod/validateRequest.ts';
import { servedRequestSchema } from '../zod/zod-types.ts';
import servedController from '../controllers/servedController.ts';

const router: Router = express.Router();

router.patch('/', validateRequest(servedRequestSchema), servedController);

export default router;
