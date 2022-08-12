import express from 'express'
import bodyParser from 'body-parser'
import { userRoutes } from './handlers/users'
import {productsRoutes} from './handlers/products'
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

export default app 