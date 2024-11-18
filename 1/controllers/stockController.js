import {Operations, Product, Stock} from "../models.js";
import Sequelize, {Op} from "sequelize";


class stockController {

    async addStock(req,res) {
        try {
            const {productId, shopId} = req.body;
            const stock = await Stock.create({ProductId: productId, ShopId: shopId});
            const operation = { type: "Stock created", date: new Date().toISOString(), ProductId: productId, ShopId: shopId};
            await Operations.create(operation)
            return res.json(stock)
        } catch (err) {
            return res.status(400).json({message: 'Invalid input data'})
        }
    }


    async updateShelfAmount(req ,res) {

            const {productId, shopId, type, value} = req.body;
            if(type === 'add') {
                 const [stock] = await Stock.update(
                    {
                        shelf_amount: Sequelize.literal(`shelf_amount + ${value}`)
                    },
                    {
                        where: {  ProductId: productId, ShopId: shopId }
                    }
                )
                if(stock === 0) return res.status(404).json({message:'Stock is not found'})
                const operation = { type: "Shelf_amount increased", date: new Date().toISOString(), ProductId: productId, ShopId: shopId};
                await Operations.create(operation)
                return res.json(stock)
            }
            if(type === 'delete'){
                const stock = await Stock.update(
                    {
                        shelf_amount: Sequelize.literal(`shelf_amount - ${value}`)
                    },
                    {
                        where: {  ProductId: productId, ShopId: shopId }
                    }
                )
                const operation = { type: "Shelf_amount decreased", date: new Date().toISOString(), ProductId: productId, ShopId: shopId};
                await Operations.create(operation)
                return res.json(stock)

            } else throw new Error('Invalid input data');

    }

    async updateOrderAmount(req ,res) {

        const {productId, shopId, type, value} = req.body;
        if(type === 'add') {
            const [stock] = await Stock.update(
                {
                    order_amount: Sequelize.literal(`order_amount + ${value}`)
                },
                {
                    where: {  ProductId: productId, ShopId: shopId }
                }
            )
            if(stock === 0) return res.status(404).json({message:'Stock is not found'})
            const operation = { type: "Order_amount increased", date: new Date().toISOString(), ProductId: productId, ShopId: shopId};
            await Operations.create(operation)
            return res.json(stock)
        }
        if(type === 'delete'){
            const stock = await Stock.update(
                {
                    order_amount: Sequelize.literal(`order_amount - ${value}`)
                },
                {
                    where: {  ProductId: productId, ShopId: shopId }
                }
            )
            const operation = { type: "Order_amount decreased", date: new Date().toISOString(), ProductId: productId, ShopId: shopId};
            await Operations.create(operation)
            return res.json(stock)

        } else throw new Error('Invalid input data');

    }

    async getStocks(req ,res) {

        const filter = {}

        if(req.query.plu){
            const product = await Product.findOne({where: {plu:req.query.plu}})
            if(!product) return res.status(404).json({message:'Product is not found'})
            filter.ProductId = product.id
        }
        if(req.query.shop){
           filter.ShopId = req.query.shop
        }
        if(req.query.shelfgreater){
            const shelfGreater = Number(req.query.shelfgreater)
            if(!shelfGreater) return res.status(401).json({message:'Invalid input data'})
            filter.shelf_amount = {[Op.gt]: shelfGreater,}
        }
        if(req.query.shelfless){
            const shelfLess = Number(req.query.shelfless)
            if(!shelfLess) return res.status(401).json({message:'Invalid input data'})
            filter.shelf_amount = {[Op.gt]: shelfLess}
        }
        if(req.query.ordergreater){
            const orderGreater = Number(req.query.ordergreater)
            if(!orderGreater) return res.status(401).json({message:'Invalid input data'})
            filter.order_amount = {[Op.lt]: orderGreater}
        }
        if(req.query.orderless){
            const orderLess = Number(req.query.orderless)
            if(!orderLess) return res.status(401).json({message:'Invalid input data'})
            filter.order_amount = {[Op.lt]: orderLess}
        }


        const stocks = await Stock.findAll({where: filter})
        if(!stocks.length) return res.status(404).json({message:'Stocks are not found'})
        return res.json(stocks)
    }

}

export default new stockController()