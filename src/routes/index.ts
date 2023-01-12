import express from 'express'
import card from './card.route'

const router = express.Router();

router.use('/card', card);


export default router
