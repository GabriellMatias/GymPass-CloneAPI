import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memorie/in-memorie-check-in-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-chekIns-UseCase'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch Check In user History use case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch user history checkin', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { CheckIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(CheckIns).toHaveLength(2)
    expect(CheckIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })
  it('should be able to fetch paginated user history checkin', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { CheckIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(CheckIns).toHaveLength(2)
    expect(CheckIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
