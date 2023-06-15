import { Gym } from '@prisma/client'
import { GymRepositoryProps } from '@/repositories/interfaces/gyms-repository'

interface SearchGymsUseCaseParams {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymRepositoryProps) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseParams): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
