import client from '../database'
import bcrypt from 'bcrypt'

const {PEPPER,SALT}=process.env
export type User = {
  firstName: string
  lastName: string
  password: string
}
export class Users {
  async create(user: User): Promise<User> {
    try {
      if (user.firstName && user.lastName && user.password) {
        const conn = await client.connect()
        const sql =
          'INSERT INTO Users (firstName,lastName,password) VALUES ($1,$2,$3) RETURNING *;'
        const hash = bcrypt.hashSync(user.password+PEPPER,parseInt(SALT as string))
        const result = await conn.query(sql, [
          user.firstName,
          user.lastName,
          hash,
        ])
        const u = result.rows[0]
        conn.release()
        return u
      } else {
        throw ("please enter all information 'firstname,lastname,password'")
      }
    } catch (error) {
      throw new Error(`cannot register: ${error}`)
    }
  }
  // async authenticate()
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM Users;'
      const result = await conn.query(sql)
      conn.release()
      const user = result.rows
      return user
    } catch (error) {
      throw new Error(`cannot get users ${error}`)
    }
  }
  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM Users WHERE user_id=($1);'
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw new Error(`cannot get user with id=${id} ${error}`)
    }
  }
  async update(user: User, id: number): Promise<void> {
    try {
      const conn = await client.connect()
      if (user.firstName) {
        const sql = 'UPDATE Users SET firstName=($1) WHERE user_id=($2);'
        await conn.query(sql, [user.firstName, id])
      }
      if (user.lastName) {
        const sql = 'UPDATE Users SET lastName=($1) WHERE user_id=($2);'
        await conn.query(sql, [user.lastName, id])
      }
      if (user.password) {
        const sql = 'UPDATE Users SET password=($1) WHERE user_id=($2);'
        await conn.query(sql, [user.password, id])
      }
      conn.release()
    } catch (error) {
      throw new Error(`cannot update this user, ${error}`)
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const conn = await client.connect()
      const sql = 'DELETE FROM Users WHERE user_id=($1);'
      await conn.query(sql, [id])
      conn.release()
    } catch (error) {
      throw new Error(`cannot delete this user ${error}`)
    }
  }
}
