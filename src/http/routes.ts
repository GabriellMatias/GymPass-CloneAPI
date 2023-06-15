import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register-controller'
import { FastifyInstance } from 'fastify'
import { VerifyJwt } from './middlewares/verifyy-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  /* Rotas serao chamadas apenas quando o usuario estiver autenticado */
  app.get('/me', { onRequest: [VerifyJwt] }, profile)
}
