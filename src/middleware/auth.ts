import { Request, Response, NextFunction } from 'express'
import Jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../models/users'
const { TOKEN_SECRET } = process.env
export const authMidd = (req: Request, res: Response, next: NextFunction) => {
  try {
    const autherHeader = req.headers.authorization as string
    const token = autherHeader.split(' ')[1]
    const verify = (Jwt.verify(token, TOKEN_SECRET as Secret) as JwtPayload)
      .user
    if (verify.user_id !== parseInt(req.params.id)) {
      console.log(verify)
      throw new Error()
    }
    next()
  } catch (error) {
    res.sendStatus(401)
  }
}
export const roleMidd =
  (role: string) =>
    (req: Request, res: Response, next: NextFunction): void => {
      try {
        const autherHeader = req.headers.authorization as string
        const token = autherHeader.split(' ')[1]
        const user: User = (Jwt.decode(token) as JwtPayload).user as User
        if (user.role !== role) {
          throw new Error()
        }
        next()
      } catch (error) {
        res.sendStatus(403)
      }
    }
