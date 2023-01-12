import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';
import { NextFunction, Request, Response } from 'express';

export const isLuhn = async (req: Request, res: Response, next: NextFunction) => {
  const { cardNumber } = req.body

  try {
    // first I had to check to make sure the card number is not less than 15 and is also not greater than 19
    // Also made sure after removing space and hyphen, there is no other special character
    if ((!/\d{15,19}(~\W[a-zA-Z])*$/g.test(cardNumber.toString())) || (cardNumber.toString().length > 19)) {
      throw new ApiError (httpStatus.BAD_REQUEST, 'Invalid card number!')
    }

    // first step into the algorithm: I split the card number into an array
    let cardNumberArray = cardNumber.toString().split("")

    // I am checking to make sure if the card number array length is odd or even whch help me determine which index I am to double
    // what I have done here is to start from the LHS to the RHS (Note: this can be done from RHS to LHS too)
    // I decided to use map for cleaner code, this process can also be achieved using a for loop
    if (cardNumberArray.length % 2 !== 0) {
      cardNumberArray = cardNumberArray.map((num: string, id: number) => id % 2 === 1 ? (Number(num) * 2).toString() : num)
    } else {
      cardNumberArray = cardNumberArray.map((num: string, id: number) => id % 2 === 0 ? (Number(num) * 2).toString() : num) 
    }
    
    // I check to make sure there is no 2-digit number in tthe array and of there is anyone, I deduct 9
    // which is the highest single number
    cardNumberArray = cardNumberArray.map((num: string) => Number(num) > 9 ? (Number(num) - 9).toString() : num)


    // I sum all the numbers in the array together
    const sum = cardNumberArray.reduce((prev: string, curr: string) => prev = (Number(prev) + Number(curr)).toString())


    if (Number(sum) % 10 === 0) {
      req.body.cardNumber = cardNumber.toString().match(/.{1,4}/g).toString().replace(/,/g, " ")
      next();
    } else {
      console.log('Na me', sum)
      throw new ApiError (httpStatus.BAD_REQUEST, 'Invalid card number!')
    }

  } catch (err) {
    next(err)
  }
}