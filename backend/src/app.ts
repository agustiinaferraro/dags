import cors from 'cors'
import express from 'express'
import { healthRouter } from './routes/health.js'

function allowedOrigins() {
  const configured = process.env.CORS_ORIGIN ?? 'http://localhost:5173'
  return configured
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

export function createApp() {
  const app = express()

  app.use(cors({ origin: allowedOrigins() }))
  app.use(express.json())

  app.get('/', (_req, res) => {
    res.json({ name: 'dags-api', endpoints: ['/api/health'] })
  })

  app.use('/api', healthRouter)

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' })
  })

  return app
}

export default createApp()
