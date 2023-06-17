import { VerifyJwt } from '@/http/middlewares/verifyy-jwt'
import { FastifyInstance } from 'fastify'
import { searchGym } from './search-gyms'
import { searchNearByGym } from './serach-nearBy-gyms'
import { createGym } from './create-gym'
import { VerifyUserRole } from '@/http/middlewares/only-admin'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJwt)

  app.get('/gyms/search', searchGym)
  app.get('/gyms/nearby', searchNearByGym)
  app.post('/gyms', { onRequest: [VerifyUserRole('ADMIN')] }, createGym)
}
