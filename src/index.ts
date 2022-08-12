import express from 'express'
import bodyParser from 'body-parser'
import { userRoutes } from './handlers/users'
import { productsRoutes } from './handlers/products'
import { ordersRoutes } from './handlers/orders'

const port = 3000
const app = express()

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
app.use(bodyParser.json())
productsRoutes(app)
userRoutes(app)
ordersRoutes(app)
export default app 