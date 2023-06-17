import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateuser } from '@/utils/tests/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create CheckIn E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a CheckIn', async () => {
    const { token } = await createAndAuthenticateuser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Js Gym',
        description: 'Some thing',
        phone: '109283',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })
    const createCheckInResponse = await request(app.server)
      .post(
        `/gyms/${gym.id}/check-ins
      `,
      )
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(createCheckInResponse.statusCode).toEqual(201)
  })
})
