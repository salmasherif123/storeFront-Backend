import jasmine from 'jasmine'
import { User, Users } from '../../models/users'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const user = new Users()
const { PEPPER, SALT, TOKEN_SECRET } = process.env
let u:User
describe('user model test', () => {
  let newUser: User = {
    firstname: 'testFirst',
    lastname: 'testLast',
    password: 'testPass',
    role: 'admin',
  }
  let createdUser:User = {user_id:1,...newUser}
  it('should have index method', () => {
    expect(user.index).toBeDefined()
  })
  it('should have create method', () => {
    expect(user.create).toBeDefined()
  })
  it('should have authenticate method', () => {
    expect(user.authenticate).toBeDefined()
  })
  it('should have show method', () => {
    expect(user.show).toBeDefined()
  })
  it('should have update method', () => {
    expect(user.update).toBeDefined()
  })
  it('should have delete method', () => {
    expect(user.delete).toBeDefined()
  })
  it('should create method returns a created user', async() => {
    const result: User = await user.create(createdUser)
    const token = jwt.sign({user:result},TOKEN_SECRET as string)
    u = (jwt.decode(token) as JwtPayload).user as User
    expect(result.user_id).toEqual(createdUser.user_id)
    expect(result.firstname).toEqual(createdUser.firstname)
    expect(result.lastname).toEqual(createdUser.lastname)
    expect(result.password).toEqual(u.password)
    expect(result.role).toEqual(createdUser.role)
  })
  it('should authenticate method returns user if correct info',async()=> {
    const result = await user.authenticate(createdUser) as User
    expect(result.password).toEqual(u.password)
  })
  it('null if wrong info', async () => {
    createdUser.password='pass'
    const result = await user.authenticate(createdUser) as null
    expect(result).toBeNull()
    createdUser.password='testPass'
  })
  it('should index method returns a list of users', async () => {
    const result = await user.index()
    expect(result.length).toEqual(1)
    expect(result[0].user_id).toEqual(createdUser.user_id)
    expect(result[0].firstname).toEqual(createdUser.firstname)
    expect(result[0].lastname).toEqual(createdUser.lastname)
    expect(result[0].password).toEqual(u.password)
    expect(result[0].role).toEqual(createdUser.role)
  })
  it('should show method return user with specific id', async () => {
    const result = await user.show(createdUser.user_id as number)
    expect(result.firstname).toEqual(createdUser.firstname)
    expect(result.lastname).toEqual(createdUser.lastname)
    expect(result.password).toEqual(u.password)
    expect(result.role).toEqual(createdUser.role)
  })
  it('update method', async() => {
    const updatedUser: User = {
      user_id:1,
      firstname: 'updateF',
      lastname: 'updateL',
      password: 'updateP',
      role:'admin'
    }
    await user.update(updatedUser, 1)
    const result = await user.show(1)
    updatedUser.password=bcrypt.hashSync(updatedUser.password+PEPPER,parseInt(SALT as string))
    expect(updatedUser).toEqual(result)
  })
  it('should delete method deletes the user with the specific id',async () => {
    
  })
})
