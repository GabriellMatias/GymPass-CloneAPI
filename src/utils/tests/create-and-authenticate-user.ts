import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateuser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Jhon doe',
    email: 'Jonh@example.com',
    password: '123456',
  })
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'Jonh@example.com',
    password: '123456',
  })
  const { token } = authResponse.body
  return { token }
}
