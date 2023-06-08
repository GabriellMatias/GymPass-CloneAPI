import { Gym, Prisma } from '@prisma/client'

import { GymRepositoryProps } from '../prisma/gyms-repository'
import { randomUUID } from 'crypto'
import Decimal from 'decimal.js'

export class InMemoryGymsRepository implements GymRepositoryProps {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const Gym = {
      id: randomUUID(),
      title: data.title,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
      description: data.description ?? null,
      phone: data.phone ?? null,
      checkIns: data.checkIns,
    }
    this.items.push(Gym)

    return Gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => {
      return item.id === id
    })

    if (!gym) {
      return null
    }
    return gym
  }
}
