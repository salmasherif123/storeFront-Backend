import client from '../database'

export type Order = {
    userId:number,
    productId: number,
    quantity: number,
    status:boolean,
}

export class Orders{
    async createOrder(order:Order): Promise<Order>{
        try {
            const conn =await client.connect()
            const sql = 'INSERT INTO Orders (ordered_product_id,user_id,quantity,status) VALUES ($1,$2,$3,$4) RETURNING *;'
            const result = await conn.query(sql, [order.productId, order.userId, order.quantity, order.status])
            return result.rows[0]
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async CurrentOrder(id: number): Promise<Order>{
        try {
            const conn =await client.connect()
            const sql = 'SELECT * FROM Orders WHERE id=($1) and status=TRUE;'
            const result = await conn.query(sql, [id])
            return result.rows[0]
        } catch (error) {
            throw new Error(`${error}`)
        }
    }

}