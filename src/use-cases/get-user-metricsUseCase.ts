import { CheckInsRepositoryProps } from '@/repositories/prisma/check-ins-repositoy'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  CheckInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepositoryProps) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const CheckInsCount = await this.checkInRepository.countByUserId(userId)

    return { CheckInsCount }
  }
}
