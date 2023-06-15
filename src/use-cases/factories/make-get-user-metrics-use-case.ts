import { GetUserMetricsUseCase } from '../get-user-metricsUseCase'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkIns-repository'
/* Factories para criar os casos de uso, facilitar */
export function makeGetUserMetricsUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCase(checkInRepository)
  return useCase
}
