import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearByGymsUseCase } from '../fetch-nearBy-GymsUseCase'
/* Factories para criar os casos de uso, facilitar */
export function makeFetchNearByGymsUseCase() {
  const checkInRepository = new PrismaGymsRepository()
  const useCase = new FetchNearByGymsUseCase(checkInRepository)
  return useCase
}
