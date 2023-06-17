import { makeFetchNearByGymsUseCase } from '@/use-cases/factories/make-fetch-nearBy-gyms-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchNearByGym(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymNearByQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = searchGymNearByQuerySchema.parse(
    request.query,
  )

  const searchNearByGymUseCase = makeFetchNearByGymsUseCase()
  const { gyms } = await searchNearByGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
