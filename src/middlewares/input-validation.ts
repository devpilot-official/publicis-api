import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';
import { NextFunction, Request, Response } from 'express';

export const payloaddValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { name, cardNumber, limit } = req.body
  const messages = []

  try {
    if (name === "" || typeof name === 'undefined') messages.push('Name is required!')
    if (cardNumber === "" || typeof cardNumber === 'undefined' || typeof cardNumber !== 'string') messages.push('Card Number is required!')
    if (limit === "" || typeof limit === 'undefined') messages.push('Limit is required!')

    if (messages.length === 0) {
      next()
    } else {
      throw new ApiError (httpStatus.BAD_REQUEST, messages)
    }
  } catch (err) {
    next(err)
  }
}