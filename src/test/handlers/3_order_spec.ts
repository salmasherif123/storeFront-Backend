import { jsonHeaders } from './1_user_spec'
import app from '../../index'
import supertest from 'supertest'
import { Order, OrderedProduct } from '../../models/orders'
import client from '../../database'
import { User, Users } from '../../models/users'
import { Product, Products } from '../../models/products'
const req = supertest(app)
const user = new Users()
const product = new Products()
const newOrderedProduct: OrderedProduct = {
  user_id: 2,
  product_id: 2,
  quantity: 1,
}
const newOrder: Order = {
  user_id: 2,
  status: true,
}
let token: string
it('', async () => {
  const conn = await client.connect()
  const sql = `delete from Products;
    delete from Users;`
  await conn.query(sql)
  conn.release()
  const newUser: User = {
    firstname: 'testFirst',
    lastname: 'testLast',
    password: 'testPass',
    role: 'admin',
  }
  const newProduct: Product = {
    name: 'testProduct',
    price: 10,
    category: 'testCat',
  }
  const result = await req.post('/user/signUp').send(newUser)
  token = result.body
  await product.create(newProduct)
})
describe('order routes test', () => {
  it('createOrder endpoint test', async () => {
    const result = await req
      .post('/user/2/order/addOrder')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send(newOrder)
    expect(result.status).toBe(200)
    expect(result.body.order_id).toEqual(1)
    expect(result.body.user_id).toEqual(newOrder.user_id)
    expect(result.body.status).toEqual(newOrder.status)
  })
  it('addProdcut endpoint test', async () => {
    const result = await req
      .post('/user/2/order/addProduct')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send(newOrderedProduct)
    expect(result.status).toBe(200)
    expect(result.body.ordered_product_id).toEqual(1)
    expect(result.body.product_id).toEqual(newOrderedProduct.product_id)
    expect(result.body.user_id).toEqual(newOrderedProduct.user_id)
    expect(result.body.quantity).toEqual(newOrderedProduct.quantity)
  })
  it('getCurrentOrder endpoint test', async () => {
    const result = await req
      .get('/user/2/order/current')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ user_id: 2 })
    expect(result.status).toBe(200)
    expect(result.body.order_id).toEqual(1)
    expect(result.body.product_id).toEqual(newOrderedProduct.product_id)
    expect(result.body.quantity).toEqual(newOrderedProduct.quantity)
    expect(result.body.ordered_product_id).toEqual(1)
  })
  it('setStatus endpoint', async () => {
    newOrder.status = false
    const result = await req
      .put('/user/2/order/setStatus')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send(newOrder)
    expect(result.status).toBe(200)
  })
  it('getCompletedOrder endpoint test', async () => {
    const result = await req
      .get('/user/2/order/completed')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ user_id: 2 })
    expect(result.status).toBe(200)
    expect(result.body.order_id).toEqual(1)
    expect(result.body.product_id).toEqual(newOrderedProduct.product_id)
    expect(result.body.quantity).toEqual(newOrderedProduct.quantity)
    expect(result.body.ordered_product_id).toEqual(1)
  })
  it('show endpoint test', async () => {
    const result = await req
      .get('/user/2/order/show')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ user_id: 2 })
    expect(result.status).toBe(200)
    expect(result.body[0].order_id).toEqual(1)
    expect(result.body[0].status).toEqual(newOrder.status)
  })
  describe('unauthorized status ,get status 401 for trying get in route without right token & status 403 if forbidden', () => {
    it('createOrder endpoint test', async () => {
      const result = await req.post('/user/2/order/addOrder').send(newOrder)
      expect(result.status).toBe(401)
    })
    it('addProdcut endpoint test', async () => {
      const result = await req
        .post('/user/2/order/addProduct')
        .send(newOrderedProduct)
      expect(result.status).toBe(401)
    })
    it('getCurrentOrder endpoint test', async () => {
      const result = await req.get('/user/2/order/current').send({ user_id: 2 })
      expect(result.status).toBe(401)
    })
    it('setStatus endpoint', async () => {
        newOrder.status = false
        const result = await req
          .put('/user/2/order/setStatus')
          .send(newOrder)
        expect(result.status).toBe(401)
      })
      it('getCompletedOrder endpoint test', async () => {
        const result = await req
          .get('/user/2/order/completed')
          .send({ user_id: 2 })
          expect(result.status).toBe(401)
      })
      it('show endpoint test', async () => {
        const result = await req
          .get('/user/2/order/show')
          .send({ user_id: 2 })
          expect(result.status).toBe(401)
      })
  })
})
