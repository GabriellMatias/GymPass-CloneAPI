import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memorie/in-memorie-gyms-repository'
import { SearchGymsUseCase } from '../search-gymsUseCase'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Fetch Check In user History use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JS Gym',
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
    })
    await gymsRepository.create({
      title: 'TS Gym',
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
    })

    const { gyms } = await sut.execute({
      query: 'JS',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JS Gym' })])
  })
  it('should be able to search paginated gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TS Gym ${i}`,
        description: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TS',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TS Gym 21' }),
      expect.objectContaining({ title: 'TS Gym 22' }),
    ])
  })
})
