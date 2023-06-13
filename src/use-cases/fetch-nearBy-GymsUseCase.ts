import { Gym } from '@prisma/client'
import { GymRepositoryProps } from '@/repositories/prisma/gyms-repository'

interface FetchNearByGymsUseCaseParams {
  userLongitude: number
  userLatitude: number
}

interface FetchNearByGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private gymsRepository: GymRepositoryProps) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsUseCaseParams): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return { gyms }
  }
}
