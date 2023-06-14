import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memorie/in-memorie-check-in-repository'

import { ValidateCheckInUseCase } from '../validate-checkInUseCase'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let checkInsRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validade Check In use case Tests', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const checkIn = await checkInsRepository.create({
      gym_id: '123',
      user_id: '123',
    })

    await sut.execute({
      checkInId: checkIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: ' inexistent check-in ID',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('Should not be able to validate check-in after 20 minutes after its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const checkIn = await checkInsRepository.create({
      gym_id: '123',
      user_id: '123',
    })
    /* mockei a data em cima, a funcao pra avancar no tempo avanca 20 minutos no tempo */
    const twentyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() => {
      return sut.execute({
        checkInId: checkIn.id,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
