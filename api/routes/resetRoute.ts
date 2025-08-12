import express, { Router } from 'express';
import resetController from '../controllers/resetController';

const router: Router = express.Router();

router.patch('/', resetController);

export default router;
