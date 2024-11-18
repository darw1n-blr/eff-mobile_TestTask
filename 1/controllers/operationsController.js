import {Operations, Product} from "../models.js";
import {Op} from "sequelize";

class operationsController {

    async getOperationsHistory(req ,res) {

        const filter = {}
        const pageNumber = parseInt(req.query.page ) || 1
        const pageSize = parseInt(req.query.size) || 5

        if(req.query.shop){
           filter.ShopId = req.query.shop
        }
        if(req.query.plu){
            const product = await Product.findOne({where:{plu: req.query.plu}})
            if(!product) return res.status(404).json({message:'Product is not found'})
            filter.ProductId = product.id
        }
        if(req.query.dategreater && req.query.dateless){
            const dateGreater = new Date(req.query.dategreater)

            if(!dateGreater.getDate()) return res.status(401).json({message:'Invalid input data'})
            filter.date = {[Op.gt]: dateGreater,}
        }

        if(req.query.dateless){
            const dateLess = new Date(req.query.dateless)
            if(!dateLess.getDate()) return res.status(401).json({message:'Invalid input data'})
            filter.date = {[Op.lt]: dateLess}
        }

        if(req.query.action){
           filter.type = req.query.action
        }


        const history = await Operations.findAll({
            where:filter,
            limit:pageSize,
            offset: (pageNumber - 1) * pageSize,
        })
        if(!history.length) return res.status(404).json({message:'Operations not found'})
        return res.json(history)
    }

}

export default new operationsController()