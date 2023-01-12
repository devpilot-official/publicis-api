import ApiError from "@/utils/ApiError";
import httpStatus from 'http-status';

/**
 * 
 * 
 * @export
 * @class CardService
 */
export class CardService {
    cards: any = []

    GetAll = async () => {
        try {
            return this.cards
        } catch (error) {
            throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message)
        }
    }

    Create = async (payload: any) => {
        const { name, cardNumber, limit } = payload
        try {
            this.cards.push({
                name,
                cardNumber,
                balance: '£0',
                limit: `£${limit}`
            })
            return payload
        } catch (error) {
            throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message)
        }
    }
}