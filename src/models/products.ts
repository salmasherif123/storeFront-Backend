import client from '../database'

export type Product = {
  name: string
  price: number
  category?: string
}

export class Products {
    async create(product:Product): Promise<Product>{
        try {
            let result
            const conn = await client.connect()
            let sql = 'INSERT INTO Products (name,price) VALUES ($1,$2) RETURNING *;'
            if (product.category) {
                sql = 'INSERT INTO Products (name,price,category) VALUES ($1,$2,$3) RETURNING *;'
                result = await conn.query(sql,[product.name,product.price,product.category])
            } else {
                result = await conn.query(sql,[product.name,product.price])
            }
            return result.rows[0]
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async index(): Promise<Product[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM Products;'
            const result = await conn.query(sql)
            return result.rows
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async show(id: number): Promise<Product>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM Products WHERE product_id=($1);'
            const result = await conn.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async byProduct(category: string): Promise<Product[]>{
        try {
            console.log(category)
            const conn = await client.connect()
            const sql = 'SELECT * FROM Products WHERE category=($1);'
            const result = await conn.query(sql, [category])
            return result.rows
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}
