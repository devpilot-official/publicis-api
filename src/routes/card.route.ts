import express from 'express';
import { isLuhn } from '@/middlewares/luhn';
import { CardController } from '@/controllers/CardController';
import { payloaddValidation } from '@/middlewares/input-validation';


const router = express.Router()

const { CreateCards, GetAllCards } = new CardController();

router.get('/', GetAllCards);
router.post('/new', payloaddValidation, isLuhn, CreateCards);

export default router
