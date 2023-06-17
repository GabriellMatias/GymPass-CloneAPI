import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-checkIn-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function checkInHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const checkInHistoryUseCase = makeFetchUserCheckInHistoryUseCase()
  const { CheckIns } = await checkInHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    CheckIns,
  })
}
