import { Product } from '../../models/products'
import { jsonHeaders, token } from './1_user_spec'
import app from '../../index'
import supertest from 'supertest'
const req = supertest(app)

const newProduct: Product = {
  name: 'testProduct',
  price: 10,
  category: 'testCat',
}
describe('product routes test', () => {
  it('create endpoint test', async () => {
    const result = await req
      .post('/user/1/product/create')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send(newProduct)
    expect(result.status).toBe(200)
    expect(result.body.product_id).toEqual(1)
    expect(result.body.name).toEqual(newProduct.name)
    expect(result.body.price).toEqual(newProduct.price)
    expect(result.body.category).toEqual(newProduct.category)
  })
  it('index endpoint test', async () => {
    const result = await req
      .get('/user/1/product/index')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
    expect(result.status).toBe(200)
    expect(result.body[0].name).toEqual(newProduct.name)
    expect(result.body[0].category).toEqual(newProduct.category)
    expect(result.body[0].price).toEqual(newProduct.price)
    expect(result.body[0].product_id).toEqual(1)
  })
  it('show endpoint test', async () => {
    const result = await req
      .get('/user/1/product/1')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ ...newProduct, product_id: 1 })
    expect(result.status).toBe(200)
    expect(result.body.name).toEqual(newProduct.name)
    expect(result.body.price).toEqual(newProduct.price)
    expect(result.body.category).toEqual(newProduct.category)
  })
  it('byCategory endpoint test', async () => {
    const result = await req
      .get('/user/1/product/category/testCat')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ category: 'testCat' })
    expect(result.status).toBe(200)
    expect(result.body.length).toEqual(1)
    expect(result.body[0].product_id).toEqual(1)
    expect(result.body[0].name).toEqual(newProduct.name)
    expect(result.body[0].price).toEqual(newProduct.price)
  })
  describe('unauthorized status ,get status 401 for trying get in route without right token & status 403 if forbidden', () => {
    it('create endpoint', async () => {
      const result = await req.post('/user/1/product/create').send(newProduct)
      expect(result.status).toBe(403)
    })
    it('show endpoint', async () => {
      const result = await req
        .get('/user/1/product/1')
        .send({ ...newProduct, product_id: 1 })
      expect(result.status).toBe(401)
    })
    it('index endpoint', async () => {
      const result = await req.get('/user/1/product/index')
      expect(result.status).toBe(401)
    })
    it('byCategory endpoint', async () => {
      const result = await req
        .get('/user/1/product/category/testCat')
        .send({ category: 'testCat' })
      expect(result.status).toBe(401)
    })
  })
})
