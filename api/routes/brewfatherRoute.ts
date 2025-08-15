import express, { Router } from 'express';
import brewfatherController from '../controllers/brewfatherController.ts';

const router: Router = express.Router();

router.get('/', brewfatherController);

export default router;
