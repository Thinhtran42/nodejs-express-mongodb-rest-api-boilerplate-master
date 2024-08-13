/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser' // Middleware để parse request body
import { connectDB } from './config/mongodb'
import requestLoggerMiddleware from './middlewares/requestLogger'
import { env } from './config/environment'
import logger from './config/logger'
import { APIs_V1 } from './routes/v1'

const app = express()

app.use(requestLoggerMiddleware) // -> Log cac request
app.use(bodyParser.json()) // -> Parse JSON Request body
app.use(bodyParser.urlencoded({ extends: true })) // -> Parse URL Request body

connectDB()

app.use('/v1', APIs_V1)

app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal Server Error' })
})

app.listen(env.APP_PORT, env.APP_HOST, () => {
    logger.info(`Server running at http://${env.APP_HOST}:${env.APP_PORT}/`)
})