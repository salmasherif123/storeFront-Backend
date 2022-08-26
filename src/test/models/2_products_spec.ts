/* eslint no-undef:"off" */
import { Product, Products } from '../../models/products'

const product = new Products()
const newProduct: Product = {
  product_id: 1,
  name: 'testProduct',
  price: 10,
  category: 'testCat'
}
describe('product model test', () => {
  it('should have create method', () => {
    expect(product.create).toBeDefined()
  })
  it('should have index method', () => {
    expect(product.index).toBeDefined()
  })
  it('should have show method', () => {
    expect(product.show).toBeDefined()
  })
  it('should have byCategory method', () => {
    expect(product.byCategory).toBeDefined()
  })
  it('should create method returns a new product', async () => {
    const result = await product.create(newProduct)
    expect(result.name).toEqual(newProduct.name)
    expect(result.price).toEqual(newProduct.price)
    expect(result.category).toEqual(newProduct.category)
  })
  it('should index method returns a list of products', async () => {
    const result = await product.index()
    expect(result.length).toEqual(1)
    expect(result[0].name).toEqual(newProduct.name)
    expect(result[0].category).toEqual(newProduct.category)
    expect(result[0].price).toEqual(newProduct.price)
    expect(result[0].product_id).toEqual(newProduct.product_id)
  })
  it('should show method returns a product with specific id', async () => {
    const result = await product.show(1)
    expect(result.name).toEqual(newProduct.name)
    expect(result.price).toEqual(newProduct.price)
    expect(result.category).toEqual(newProduct.category)
  })
  it('should byCategory method returns a product with specific category', async () => {
    const result = await product.byCategory('testCat')
    expect(result.length).toEqual(1)
    expect(result[0].product_id).toEqual(newProduct.product_id)
    expect(result[0].name).toEqual(newProduct.name)
    expect(result[0].price).toEqual(newProduct.price)
  })
})
