import express, { Router } from 'express';
import resetController from '../controllers/resetController.ts';

const router: Router = express.Router();

router.patch('/', resetController);

export default router;
