import express, { Router } from 'express';
import servedController from '../controllers/servedController.ts';

const router: Router = express.Router();

router.patch('/', servedController);

export default router;
