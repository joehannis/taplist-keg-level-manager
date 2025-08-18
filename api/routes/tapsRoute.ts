import express, { Router } from 'express';
import tapsController from '../controllers/tapsController';

const router: Router = express.Router();

router.get('/', tapsController);

export default router;
