import httpStatus from 'http-status';
import ApiError from '@/utils/ApiError';
import { NextFunction, Request, Response } from 'express';

export const isLuhn = async (req: Request, res: Response, next: NextFunction) => {
  const { cardNumber } = req.body

  // putttingg into consideration that user might enter the details seperatted by hyphen or space so I removed them here
  let creditCardNumber: string = cardNumber.trim().search(" ") > -1
                    ? cardNumber.trim().replace(/ /g, "")
                    : cardNumber.trim().indexOf("-") > -1
                      ? cardNumber.trim().replace(/-/g, "")
                      : cardNumber;
  
  try {
    // first I had to check to make sure the card number is not less than 15 and is also not greater than 16
    // Also made sure after removing space and hyphen, there is no other special character
    if ((!/\d{15,16}(~\W[a-zA-Z])*$/g.test(creditCardNumber)) || (creditCardNumber.length > 16)) {
      throw new ApiError (httpStatus.BAD_REQUEST, 'Invalid card number!')
    }

    // first step into the algorithm: I splitt the card number into an array
    let cardNumberArray = creditCardNumber.split("")

    // I am checking to make sure if the card number array length is 15 I double the value of the odd indexes
    // what I have done here is to start from the LHS to the RHS (Note: this can be donoe fromo RHS to LHS too)
    if (creditCardNumber.length === 15) {
      cardNumberArray = cardNumberArray.map((num: string, id: number) => id % 2 === 1 ? (Number(num) * 2).toString() : num)
    }

    // I am checking to make sure if the card number array length is 16 I double the value of the even indexes
    // what I have done here is to start from the LHS to the RHS (Note: this can be donoe fromo RHS to LHS too)
    if (creditCardNumber.length === 16) {
      cardNumberArray = cardNumberArray.map((num: string, id: number) => id % 2 === 0 ? (Number(num) * 2).toString() : num)
    }
    
    // I check to make sure there is no 2-digit number in tthe array and of there is anyone, I deduct 9
    // which is the highest single number
    cardNumberArray = cardNumberArray.map(num => Number(num) > 9 ? (Number(num) - 9).toString() : num)


    // I sum all the numbers in the array together
    const sum = cardNumberArray.reduce((prev, curr) => prev = (Number(prev) + Number(curr)).toString())
    console.log({ sum })


    if (Number(sum) % 10 === 0) {
      req.body.cardNumber = creditCardNumber.match(/.{1,4}/g).toString().replace(/,/g, " ")
      next();
    } else {
      throw new ApiError (httpStatus.BAD_REQUEST, 'Invalid card number!')
    }

  } catch (err) {
    next(err)
  }
}