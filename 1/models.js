import sequelize from './db.js'
import {DataTypes} from "sequelize";

export const Product = sequelize.define("Product", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    plu: {type: DataTypes.STRING, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
})

export const Shop = sequelize.define("Shop", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

export const Stock = sequelize.define("Stock", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    shelf_amount: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: {min: 0}},
    order_amount: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false, validate: {min: 0}},
})

export const Operations = sequelize.define("Operations", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
})

Product.hasMany(Stock)
Stock.belongsTo(Product)

Shop.hasMany(Stock)
Stock.belongsTo(Shop)

Product.hasMany(Operations)
Operations.belongsTo(Product)

Shop.hasMany(Operations)
Operations.belongsTo(Shop)

