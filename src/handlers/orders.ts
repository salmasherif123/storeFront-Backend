import express, { Request, Response } from 'express'
import { authMidd } from '../middleware/auth'
import { Order, Orders, OrderedProduct } from '../models/orders'

const order = new Orders()

export const ordersRoutes = (app: express.Application) => {
  app.post('/user/:id/order/addOrder', authMidd, createOrder)
  app.post('/user/:id/order/addProduct', authMidd, addProduct)
  app.put('/user/:id/order/setStatus', authMidd, setStatus)
  app.get('/user/:id/order/current', authMidd, getCurrentOrder)
  app.get('/user/:id/order/completed', authMidd, getCompletedOrder)
  app.get('/user/:id/order/show', authMidd, show)
}

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: Order = {
      user_id: parseInt(req.params.id),
      status: req.body.status
    }
    const createdOrder = await order.createOrder(newOrder)
    res.json(createdOrder)
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
const addProduct = async (req: Request, res: Response) => {
  try {
    const newOrderedProduct: OrderedProduct = {
      user_id: parseInt(req.params.id),
      product_id: req.body.product_id,
      quantity: req.body.quantity
    }
    res.json(await order.addProduct(newOrderedProduct))
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
const getCurrentOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    res.json(await order.CurrentOrder(parseInt(id)))
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
const getCompletedOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    res.json(await order.CompletedOrder(parseInt(id)))
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
const setStatus = async (req: Request, res: Response) => {
  try {
    const newStatus: Order = {
      user_id: parseInt(req.params.id),
      status: req.body.status
    }
    await order.setStatus(newStatus)
    res.json(await order.show(newStatus.user_id))
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
const show = async (req: Request, res: Response) => {
  try {
    res.json(await order.show(parseInt(req.params.id)))
  } catch (error) {
    res.status(401).send(`${error}`)
  }
}
