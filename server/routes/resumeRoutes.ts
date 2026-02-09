import express from 'express';
import { tailorResume } from '../controllers/resumeController';
import { checkCredits } from '../middleware/creditCheck';

const router = express.Router();

router.post('/tailor', checkCredits, tailorResume);

export default router;
