import {Operations, Product} from '../models.js';


class ProductController {

    async createProduct(req ,res) {
        try {
            const {name, plu} = req.body;
            const product = await Product.create({name, plu})
            const operation = { type: "Product created", date: new Date().toISOString(), ProductId: product.id}
            await Operations.create(operation)
            return res.json(product)
        }catch(err) {
            console.log(err)
            return res.status(400).json({message: 'Invalid input data'})
        }

    }

    async getProducts(req ,res) {
        if(req.query.name && !req.query.plu){
            const {name} = req.query
            const products = await Product.findAll({where: {name:name}})
            if(!products.length) return res.status(404).json({message:'Products is not found'})
            return res.json(products)
        }
        if(req.query.plu && !req.query.name){
            const {plu} = req.query
            const products = await Product.findAll({where: {plu:plu}})
            if(!products.length) return res.status(404).json({message:'Products is not found'})
            return res.json(products)
        }
        if(req.query.plu && req.query.name){
            const {plu, name} = req.query
            const products = await Product.findAll({where: {plu:plu, name: name}})
            if(!products.length) return res.status(404).json({message:'Products is not found'})
            return res.json(products)
        }
        const products = await Product.findAll()
        if(!products.length) return res.status(404).json({message:'Products is not found'})
        return res.json(products)
    }
}

export default new ProductController();
