import { Gym } from '@prisma/client'
import { GymRepositoryProps } from '@/repositories/interfaces/gyms-repository'

interface CreateGymUseCaseParams {
  title: string
  /* Undefined e diferente de nulo, por isso nao passo a descricao como opicional
   */
  description: string | null
  phone: string | null
  longitude: number | string
  latitude: number | string
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymRepositoryProps) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUseCaseParams): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      latitude,
      longitude,
      title,
      description,
      phone,
    })
    return { gym }
  }
}
