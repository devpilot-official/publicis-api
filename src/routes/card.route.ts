import express from 'express';
import { isLuhn } from '@/middlewares/luhn';
import { CardController } from '@/controllers/CardController';
import { payloaddValidation } from '@/middlewares/input-validation';


const router = express.Router()

const { Create } = new CardController();

router.post('/new', payloaddValidation, isLuhn, Create);

export default router
