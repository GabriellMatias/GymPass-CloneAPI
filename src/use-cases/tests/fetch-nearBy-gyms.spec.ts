import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memorie/in-memorie-gyms-repository'
import { FetchNearByGymsUseCase } from '../fetch-nearBy-GymsUseCase'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Fetch Check In user History use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it('should be able to fetch near by gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      latitude: -21.2092052,
      longitude: -42.6401091,
      phone: null,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
