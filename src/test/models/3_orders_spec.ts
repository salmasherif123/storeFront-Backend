/* eslint no-undef:"off" */
import client from '../../database'
import { Order, OrderedProduct, Orders } from '../../models/orders'
import { Products, Product } from '../../models/products'
import { User, Users } from '../../models/users'

const order = new Orders()
const user = new Users()
const product = new Products()
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
    role: 'admin'
  }
  const newProduct: Product = {
    name: 'testProduct',
    price: 10,
    category: 'testCat'
  }
  await user.create(newUser)
  await product.create(newProduct)
})
describe('order model test', () => {
  const newOrder: Order = {
    user_id: 2,
    status: true
  }
  const newOrderedProduct: OrderedProduct = {
    user_id: 2,
    product_id: 2,
    quantity: 1
  }
  const createdOrderedProduct: OrderedProduct = {
    ordered_product_id: 1,
    ...newOrderedProduct
  }
  const createdOrder: Order = { order_id: 1, ...newOrder }
  it('should have createdOrder method', () => {
    expect(order.createOrder).toBeDefined()
  })
  it('should have addProduct method', () => {
    expect(order.addProduct).toBeDefined()
  })
  it('should have CurrentOrder method', () => {
    expect(order.CurrentOrder).toBeDefined()
  })
  it('should have CompletedOrder method', () => {
    expect(order.CompletedOrder).toBeDefined()
  })
  it('should have setStatus method', () => {
    expect(order.setStatus).toBeDefined()
  })
  it('should have show method', () => {
    expect(order.show).toBeDefined()
  })
  it('should createOrder returns order that created', async () => {
    const result = await order.createOrder(newOrder)
    expect(result.order_id).toEqual(createdOrder.order_id)
    expect(result.user_id).toEqual(createdOrder.user_id)
    expect(result.status).toBeTrue()
  })
  it('should addProduct returns order with that product', async () => {
    const result = await order.addProduct(newOrderedProduct)
    expect(result.ordered_product_id).toEqual(
      createdOrderedProduct.ordered_product_id
    )
    expect(result.product_id).toEqual(createdOrderedProduct.product_id)
    expect(result.user_id).toEqual(createdOrderedProduct.user_id)
    expect(result.quantity).toEqual(createdOrderedProduct.quantity)
  })
  it('should currentOrder returns current order of specific user id', async () => {
    const result = await order.CurrentOrder(2)
    expect(result.order_id).toEqual(createdOrder.order_id)
    expect(result.product_id).toEqual(createdOrderedProduct.product_id)
    expect(result.quantity).toEqual(createdOrderedProduct.quantity)
    expect(result.ordered_product_id).toEqual(
      createdOrderedProduct.ordered_product_id
    )
  })
  it('should setStatus method returns ', async () => {
    createdOrder.status = false
    await order.setStatus(createdOrder)
  })
  it('should completedOrder returns completed order of specific user id', async () => {
    const result = await order.CompletedOrder(2)
    expect(result.order_id).toEqual(createdOrder.order_id)
    expect(result.product_id).toEqual(createdOrderedProduct.product_id)
    expect(result.quantity).toEqual(createdOrderedProduct.quantity)
    expect(result.ordered_product_id).toEqual(
      createdOrderedProduct.ordered_product_id
    )
  })
  it('should show method returns order with specific id', async () => {
    const result = await order.show(2)
    expect(result[0].order_id).toEqual(createdOrder.order_id)
    expect(result[0].status).toEqual(createdOrder.status)
  })
})
