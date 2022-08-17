import express, { Request, Response } from 'express'
import { User, Users } from '../models/users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authMidd,roleMidd } from '../middleware/auth'
const user = new Users()
dotenv.config()
const { TOKEN_SECRET } = process.env
export const userRoutes = (app: express.Application) => {
  app.post('/user/signUp', create)
  app.get('/user', authenticate)
  app.get('/user/index',roleMidd('admin'), index)
  app.get('/user/:id',authMidd, show)
  app.put('/user/:id/update',authMidd, update)
  app.delete('/user/:id/delete',authMidd, remove)
}

const create = async (req: Request, res: Response) => { 
  const newUser: User = {
    firstname: req.body.firstname as string,
    lastname: req.body.lastname as string,
    password: req.body.password as string,
    role: req.body.role as string,
  }
  try {
    const u = await user.create(newUser)
    const token = jwt.sign({user:u},TOKEN_SECRET as string)
    res.json(token)
  } catch (error) {
    res.status(400).send(`${error}`)
  }
}
const authenticate = async (req: Request, res: Response) => {
  try {
    const signedUser: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      role : req.body.role
    }
    const authUser = await user.authenticate(signedUser) as User
    const token = jwt.sign({
      user: {
        firstname: authUser.firstname,
        lastname: authUser.lastname,
        password: authUser.password
    } }, TOKEN_SECRET as string)
    res.json(token)
  } catch (error) {
    res.status(401).send(`invalid username or password`)
  
  }
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
      firstname: req.body.firstname as string,
      lastname: req.body.lastname as string,
      password: req.body.password as string,
      role: req.body.role as string,
    }
    if (await user.show(id)) {
      await user.update(updatedUser, id)
      const showUpdatedUser = await user.show(id)
      res.json(showUpdatedUser)
    } else {
      res.json('This user does not exist')
    }
  } catch (error) {
    res.status(400).send(`${error}`)
  }
}
const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    await user.delete(id)
    if (!await user.show(id)) {
      res.json('You deleted the account successfully')
    }
  } catch (error) {
    res.status(400).send(error)
  }
}
