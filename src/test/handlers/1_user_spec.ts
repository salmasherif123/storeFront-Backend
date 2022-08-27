import { User } from '../../models/users'
import app from '../../index'
import supertest from 'supertest'
import Jwt, { JwtPayload } from 'jsonwebtoken'
const req = supertest(app)

let newUser: User = {
  firstname: 'testFirst',
  lastname: 'testLast',
  password: 'testPass',
  role: 'admin',
}
export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export let token: string
describe('user routes test', () => {
  it('create endpoint test', async () => {
    const result = await req.post('/user/signUp').send({
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      password: newUser.password,
      role: newUser.role,
    })
    token = result.body
    expect(result.status).toBe(200)
    const user: User = (Jwt.decode(token) as JwtPayload).user as User
    expect(user.firstname).toEqual(newUser.firstname)
    expect(user.lastname).toEqual(newUser.lastname)
    expect(user.user_id).toEqual(1)
  })
  describe('authenticate endpoint test', () => {
    it('correct authentication', async () => {
      const result = await req.get('/user').send({
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        password: newUser.password,
        role: newUser.role,
      })
      expect(result.status).toBe(200)
      const user: User = (Jwt.decode(token) as JwtPayload).user as User
      expect(user.firstname).toEqual(newUser.firstname)
      expect(user.lastname).toEqual(newUser.lastname)
      expect(user.user_id).toEqual(1)
    })
    it('wrong authentication', async () => {
      const result = await req.get('/user').send({
        firstname: 'wrongF',
        lastname: newUser.lastname,
        password: newUser.password,
        role: newUser.role,
      })
      expect(result.status).toBe(401)
    })
  })
  describe('unauthorized status ,get status 401 for trying get in route without right token & status 403 if forbidden', () => {
    it('show endpoint', async() => {
        const result = await req.get('/user/1')
        expect(result.status).toBe(401)
    })  
    it('index endpoint', async() => {
        const result = await req.get('/user/index')
        expect(result.status).toBe(403)
    })  
      it('update endpoint', async () => {
          newUser.firstname='newF'
        const result = await req.put('/user/1/update')
        .send({ ...newUser, user_id: 1})
          expect(result.status).toBe(401)
          newUser.firstname='testFirst'
    })  
      it('remove endpoint', async () => {
        const result = await req.delete('/user/1/delete')
        .send({ ...newUser, user_id: 1})
          expect(result.status).toBe(401)
    })  
  })
  it('show endpoint test', async () => {
    const result = await req
      .get('/user/1')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ user_id: 1 })
    expect(result.status).toBe(200)
    expect(result.body.firstname).toEqual(newUser.firstname)
    expect(result.body.lastname).toEqual(newUser.lastname)
    expect(result.body.user_id).toEqual(1)
  })
  it('index endpoint test', async () => {
    const result = await req
      .get('/user/index')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
    expect(result.status).toBe(200)
    expect(result.body[0].firstname).toEqual(newUser.firstname)
    expect(result.body[0].lastname).toEqual(newUser.lastname)
    expect(result.body[0].user_id).toEqual(1)
  })
  it('update endpoint test', async () => {
    newUser.firstname = 'updatedF'
    const result = await req
      .put('/user/1/update')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ ...newUser, user_id: 1 })
    expect(result.status).toBe(200)
    expect(result.body.firstname as string).toEqual(newUser.firstname)
    expect(result.body.lastname as string).toEqual(newUser.lastname)
    expect(result.body.user_id as number).toEqual(1)
  })
  it('remove endpoint test', async () => {
    const result = await req
      .delete('/user/1/delete')
      .set({ ...jsonHeaders, Authorization: `Bearer ${token}` })
      .send({ user_id: 1 })
    expect(result.status).toBe(200)
    expect(result.body.user_id).toBeUndefined()
  })
  
})
