import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryProps } from '@/repositories/interfaces/check-ins-repositoy'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  CheckIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepositoryProps) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const CheckIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { CheckIns }
  }
}
