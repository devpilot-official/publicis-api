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
    Create = async (payload: any) => {
        const { name, cardNumber, limit } = payload
        try {
            this.cards.push({
                name,
                cardNumber,
                limit: `£${limit}`
            })
            return payload
        } catch (error) {
            throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, error.message)
        }
    }
}