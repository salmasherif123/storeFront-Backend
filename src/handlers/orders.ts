import express, { Request, Response } from 'express'
import { Order, Orders } from '../models/orders'

const order = new Orders()

export const ordersRoutes = (app:express.Application) => {
    app.post('/order/create',createOrder)
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder: Order = {
            userId: req.body.userId,
            productId: req.body.productId,
            quantity: req.body.quantity,
            status:req.body.status
        }
        const createdOrder = await order.createOrder(newOrder)
        res.json(createOrder)
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}