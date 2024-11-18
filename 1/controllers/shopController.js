import {Operations, Shop} from "../models.js";

class shopController {

    async createShop(req ,res) {
        try {
            const {name} = req.body;
            const shop = await Shop.create({name})
            return res.json(shop)
        }catch(err) {
            return res.status(400).json({message: 'Invalid input data'})
        }

    }

}

export default new shopController();