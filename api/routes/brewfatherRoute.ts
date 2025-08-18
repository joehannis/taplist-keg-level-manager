import express, { Router } from 'express';
import brewfatherController from '../controllers/brewfatherController';

const router: Router = express.Router();

router.get('/', brewfatherController);

export default router;
