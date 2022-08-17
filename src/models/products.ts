import client from '../database'

export type Product = {
  product_id?: number
  name: string
  price: number
  category?: string
}

export class Products {
  async create(product: Product): Promise<Product> {
    try {
      let result
      const conn = await client.connect()
      let sql = 'INSERT INTO Products (name,price) VALUES ($1,$2) RETURNING *;'
      if (product.category) {
        sql =
          'INSERT INTO Products (name,price,category) VALUES ($1,$2,$3) RETURNING *;'
        result = await conn.query(sql, [
          product.name,
          product.price,
          product.category,
        ])
      } else {
        result = await conn.query(sql, [product.name, product.price])
      }
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM Products;'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM Products WHERE product_id=($1);'
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
  async byCategory(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM Products WHERE category=($1);'
      const result = await conn.query(sql, [category])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}
