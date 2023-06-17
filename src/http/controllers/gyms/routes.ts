import { VerifyJwt } from '@/http/middlewares/verifyy-jwt'
import { FastifyInstance } from 'fastify'
import { searchGym } from './search-gyms'
import { searchNearByGym } from './serach-nearBy-gyms'
import { createGym } from './create-gym'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)

  app.get('/gyms/search', searchGym)
  app.get('/gyms/nearby', searchNearByGym)
  app.post('/gyms', createGym)
}
