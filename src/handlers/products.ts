import express, { Request, Response } from 'express'
import { Product, Products } from '../models/products'

const product = new Products()
export const productsRoutes = (app: express.Application) => {
    app.get('/product/index', index)
    app.post('/product/create', create)
    app.get('/product/:id', show)
    app.get('/product/category/:cat',byCategory)
}
const create = async (req: Request, res: Response) => {
    try {
        const newProduct: Product = {
            name: req.body.name,
            price: req.body.price,
            category:req.body.category
        }
        const createdProduct = await product.create(newProduct)
        res.json(createdProduct)
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}
const index = async(req: Request, res: Response) => {
    try {
        res.json(await product.index())
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        res.json(await product.show(id))
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}
const byCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.cat
        res.json(await product.byCategory(category))
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}