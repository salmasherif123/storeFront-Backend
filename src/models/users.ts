import client from '../database'
import bcrypt from 'bcrypt'

const {PEPPER,SALT}=process.env
export type User = {
  user_id?:number,
  firstname: string
  lastname: string
  password: string
  role:string
}
export class Users {
  async create(user: User): Promise<User> {
    try {
      if (user.firstname && user.lastname && user.password) {
        if (!user.role) {
          user.role='user'
        }
        const conn = await client.connect()
        const sql =
          'INSERT INTO Users (firstName,lastName,password,role) VALUES ($1,$2,$3,$4) RETURNING *;'
        const hash = bcrypt.hashSync(user.password+PEPPER,parseInt(SALT as string))
        const result = await conn.query(sql, [
          user.firstname,
          user.lastname,
          hash,
          user.role
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
  async authenticate(user: User): Promise<User|null>{
    try {
      const conn = await client.connect()
      const sql = 'SELECT password FROM Users WHERE firstName=($1) and lastName=($2);'
      const result = await conn.query(sql,[user.firstname,user.lastname])
      conn.release()
      if (result.rowCount) {
        if (bcrypt.compareSync(user.password+PEPPER,result.rows[0].password)) {
          return result.rows[0]
        }
      }
      return null
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
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
      if (user.firstname) {
        const sql = 'UPDATE Users SET firstname=($1) WHERE user_id=($2);'
        await conn.query(sql, [user.firstname, id])
      }
      if (user.lastname) {
        const sql = 'UPDATE Users SET lastName=($1) WHERE user_id=($2);'
        await conn.query(sql, [user.lastname, id])
      }
      if (user.password) {
        const sql = 'UPDATE Users SET password=($1) WHERE user_id=($2);'
        await conn.query(sql, [bcrypt.hashSync(user.password+PEPPER,parseInt(SALT as string)), id])
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
