import express, { Router } from 'express';
import { resetRequestSchema } from '../zod/zod-types.ts';
import { validateRequest } from '../zod/validateRequest.ts';
import resetController from '../controllers/resetController.ts';

const router: Router = express.Router();

router.patch('/', validateRequest(resetRequestSchema), resetController);

export default router;
