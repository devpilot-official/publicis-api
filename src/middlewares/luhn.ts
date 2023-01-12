import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';
import { NextFunction, Request, Response } from 'express';

export const isLuhn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.cardNumber) {
      // get the credit card stuff here
      next();
    } else {
      throw new ApiError (httpStatus.BAD_REQUEST, 'credit card number is required!')
    }

  } catch (err) {
    next(err)
  }
}