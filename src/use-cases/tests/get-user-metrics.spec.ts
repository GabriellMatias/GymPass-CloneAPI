import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memorie/in-memorie-check-in-repository'
import { GetUserMetricsUseCase } from '../get-user-metricsUseCase'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get user Metrics use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get checkIns Count from user metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { CheckInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(CheckInsCount).toEqual(2)
  })
})
