import express, { Request, Response } from 'express'
import { User, Users } from '../models/users'

const user = new Users()

const create = async (req: Request, res: Response) => {
  const newUser: User = {
    firstName: req.body.firstName as string,
    lastName: req.body.lastName as string,
    password: req.body.password as string,
  }
  try {
    const u = await user.create(newUser)
    res.json(u)
  } catch (error) {
    res.status(400).send(`${error}`)
  }
}

export const userRoutes = (app: express.Application) => {
  app.post('/user/signUp', create)
  app.get('/user/index', index)
  app.get('/user/:id', show)
  app.put('/user/:id/update', update)
  app.delete('/user/:id/delete',remove)
}

const index = async (req: Request, res: Response) => {
  try {
    const users = await user.index()
    res.json(users)
  } catch (error) {
    res.status(400).send(`${error}`)
  }
}
const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string)
    const showUser = await user.show(id)
    if (!showUser) {
      return res.send(`There is no user with id = ${id}`)
    }
    res.json(showUser)
  } catch (error) {
    res.status(400).send(error)
  }
}
const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string)
    const updatedUser: User = {
      firstName: req.body.firstName as string,
      lastName: req.body.lastName as string,
      password: req.body.password as string,
    }
    await user.update(updatedUser, id)
    const showUpdatedUser = await user.show(id)
    res.json(showUpdatedUser)
  } catch (error) {
    res.status(400).send(`${error}`)
  }
}
const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await user.delete(id)
    res.json(await user.index())
  } catch (error) {
    res.status(400).send(error)
  }
}


