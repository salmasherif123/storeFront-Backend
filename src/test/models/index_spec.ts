import app from '../../index'
import supertest from 'supertest'

const req = supertest(app)
describe('main route test', () => {
    it('main endpoint test', async () => {
        const result = await req.get('/')
        expect(result.status).toBe(200)
      expect(result.text).toContain('Hello')  
    })
})