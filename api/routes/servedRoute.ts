import express, { Router } from 'express';
import { validateRequest } from '../zod/validateRequest';
import { servedRequestSchema } from '../zod/zod-types';
import servedController from '../controllers/servedController';

const router: Router = express.Router();

router.patch('/', validateRequest(servedRequestSchema), servedController);

export default router;
