import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register-controller'
import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '../../middlewares/verifyy-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  /* Rotas serao chamadas apenas quando o usuario estiver autenticado */
  app.get('/me', { onRequest: [VerifyJwt] }, profile)
}
