import { FetchUserCheckInsHistoryUseCase } from './../fetch-user-chekIns-UseCase'

import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-checkIns-repository'
/* Factories para criar os casos de uso, facilitar */
export function makeFetchUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInRepository)
  return useCase
}
