/* eslint-disable no-console */
import express from 'express'
import morgan from 'morgan' // Middleware để log request
import bodyParser from 'body-parser' // Middleware để parse request body
import { connectDB } from './config/mongodb'
import requestLoggerMiddleware from './middlewares/requestLogger'

const app = express()

const hostname = 'localhost'
const port = 8017

app.use(requestLoggerMiddleware) // -> Log cac request
app.use(bodyParser.json()) // -> Parse JSON Request body
app.use(bodyParser.urlencoded({ extends: true })) // -> Parse URL Request body

connectDB()

app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal Server Error' })
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})