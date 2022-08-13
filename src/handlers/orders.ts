import express, { Request, Response } from 'express'
import { authMidd } from '../middleware/auth'
import { Order, Orders } from '../models/orders'
import { Ordered_Product } from '../models/orders'

const order = new Orders()

export const ordersRoutes = (app:express.Application) => {
    app.post('/user/:id/addOrder',authMidd, createOrder)
    app.post('/order/user/:id/addProduct',authMidd, addProduct)
    app.post('/order/user/:id/setStatus',authMidd, setStatus)
    app.get('/order/user/:id/current',authMidd, getCurrentOrder)
    app.get('/order/user/:id/completed',authMidd, getCompletedOrder)
    app.get('/order/user/:id/show',authMidd, show)
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder: Order = {
            userId: parseInt(req.params.id),
            status: req.body.status
        }
        const createdOrder = await order.createOrder(newOrder)
        res.json(createdOrder)
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}
const addProduct = async (req: Request, res: Response) => {
    try {
        const newOrderedProduct:Ordered_Product = {
            userId: parseInt(req.params.id),
            productId: req.body.productId,
            quantity:req.body.quantity
        }
        res.json(await order.addProduct(newOrderedProduct))
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}
const getCurrentOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        res.json(await order.CurrentOrder(parseInt(id)))
    } catch (error) {
        res.status(400).send(`${error}`)    
    }
}
const getCompletedOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        res.json(await order.CompletedOrder(parseInt(id)))
    } catch (error) {
        res.status(400).send(`${error}`)    
    }
}
const setStatus = async (req: Request, res: Response) => {
    try {
        const newStatus: Order = {
            userId:parseInt(req.params.id),
            status : req.body.status
        }
        await order.setStatus(newStatus)
        res.json(await order.show(newStatus.userId))
    } catch (error) {
        res.status(400).send(`${error}`)    
    }
}
const show = async (req: Request, res: Response) => {
    try {
        res.json(await order.show(parseInt(req.params.id)))
    } catch (error) {
        res.status(400).send(`${error}`)
    }
}