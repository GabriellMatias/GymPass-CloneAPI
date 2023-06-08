import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryProps } from '@/repositories/prisma/check-ins-repositoy'
import { GymRepositoryProps } from '@/repositories/prisma/gyms-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
interface CheckInUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepositoryProps,
    private gymsRepository: GymRepositoryProps,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KM = 0.1
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return { checkIn }
  }
}
