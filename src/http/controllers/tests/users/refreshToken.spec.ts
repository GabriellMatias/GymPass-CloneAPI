import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh Token E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to Refresh Token', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon doe',
      email: 'Jonh@example.com',
      password: '123456',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'Jonh@example.com',
      password: '123456',
    })
    const cookies = response.get('Set-Cookie')
    const responseCookies = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(responseCookies.statusCode).toEqual(200)
    expect(responseCookies.body).toEqual({
      token: expect.any(String),
    })
    expect(responseCookies.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
