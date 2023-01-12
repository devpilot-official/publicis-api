import { CardService } from "@/services/CardService";
import ApiError from "@/utils/ApiError";
import httpStatus from 'http-status';

export class CardController {
    private cardService: CardService;
    constructor() {
        this.cardService = new CardService();
    }

    /**
     * Create Card
     * @route POST /api/card
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns {Promise<Object>}
     * @memberOf CardController
     */
    GetAllCards = async (req: any, res: any, next: any) => {
        try {
            res
            .status(httpStatus.OK)
            .json({
                code: httpStatus.OK,
                message: "All Cards",
                data: await this.cardService.GetAll()
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create Card
     * @route POST /api/card/new
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns {Promise<Object>}
     * @memberOf CardController
     */
    CreateCards = async (req: any, res: any, next: any) => {
        try {
            console.log(req.body)
            res
            .status(httpStatus.CREATED)
            .json({
                code: httpStatus.CREATED,
                message: "User card created",
                data: await this.cardService.Create(req.body)
            });
        } catch (error) {
            next(error);
        }
    }
}