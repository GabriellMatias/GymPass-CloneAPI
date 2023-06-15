import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../search-gymsUseCase'
/* Factories para criar os casos de uso, facilitar */
export function makeSearchGymsUseCase() {
  const checkInRepository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(checkInRepository)
  return useCase
}
