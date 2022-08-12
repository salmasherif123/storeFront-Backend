import client from '../database'

export type Order = {
    userId:number,
    status:boolean,
}
export type Ordered_Product = {
    userId: number,
    productId: number,
    quantity:number
}
export class Orders{
    async createOrder(order:Order): Promise<Order>{
        try {
            const conn = await client.connect()
            if (!order.status) {
                order.status=true
            }
            const sql = 'INSERT INTO Orders (user_id,status) VALUES ($1,$2) RETURNING *;'
            const result = await conn.query(sql, [order.userId, order.status])
            return result.rows[0]
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async addProduct(O_P: Ordered_Product): Promise<Ordered_Product>{
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO Ordered_Products (user_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *;'
            const result = await conn.query(sql, [O_P.userId, O_P.productId, O_P.quantity])
            return result.rows[0]
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async CurrentOrder(id: number): Promise<Order[]>{
        try {
            const conn =await client.connect()
            const sql = 'SELECT Orders.order_id,Ordered_Products.product_id,Ordered_Products.quantity FROM' +
                ' Orders INNER JOIN Ordered_Products ON Orders.user_id=Ordered_Products.user_id ' +
                'WHERE Orders.user_id = ($1) and status = TRUE; '
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async CompletedOrder(id: number): Promise<Order[]>{
        try {
            const conn =await client.connect()
            const sql = 'SELECT Orders.order_id,Ordered_Products.product_id,Ordered_Products.quantity FROM' +
                ' Orders INNER JOIN Ordered_Products ON Orders.user_id=Ordered_Products.user_id ' +
                'WHERE Orders.user_id = ($1) and status = false; '
            const result = await conn.query(sql, [id])
            return result.rows
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async setStatus(order:Order): Promise<void>{
        try {
            const conn = await client.connect()
            const sql = 'UPDATE Orders SET status=($1) WHERE user_id=($2);'
            await conn.query(sql, [order.status, order.userId])
            conn.release()
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
    async show(userId:number): Promise<Order[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM Orders WHERE user_id=($1);'
            const result = await conn.query(sql, [userId])
            return result.rows
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}