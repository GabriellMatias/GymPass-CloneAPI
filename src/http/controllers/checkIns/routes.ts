import { VerifyJwt } from '@/http/middlewares/verifyy-jwt'
import { FastifyInstance } from 'fastify'
import { createCheckIn } from './create-checkIn'
import { validateCheckIn } from './validate-checkIn'
import { checkInHistory } from './history-checkIn'
import { checkInMetrics } from './metris-checkIn'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)

  app.get('/check-ins/history', checkInHistory)
  app.get('/check-ins/metrics', checkInMetrics)

  app.post('/gyms/:gymId/check-ins', createCheckIn)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)
}
