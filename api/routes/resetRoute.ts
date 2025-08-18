import express, { Router } from 'express';
import { resetRequestSchema } from '../zod/zod-types';
import { validateRequest } from '../zod/validateRequest';
import resetController from '../controllers/resetController';

const router: Router = express.Router();

router.patch('/', validateRequest(resetRequestSchema), resetController);

export default router;
