import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateuser } from '@/utils/tests/create-and-authenticate-user'

describe('Create Gym E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateuser(app, true)
    const createGymResonse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Js Gym',
        description: 'Some thing',
        phone: '109283',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(createGymResonse.statusCode).toEqual(201)
  })
})
