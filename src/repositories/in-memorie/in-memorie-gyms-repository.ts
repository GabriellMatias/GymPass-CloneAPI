import { Gym, Prisma } from '@prisma/client'

import { GymRepositoryProps } from '../prisma/gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime'

export class InMemoryGymsRepository implements GymRepositoryProps {
  public items: Gym[] = []

  // async create(data: Prisma.GymCreateInput) {
  //   const gym = {
  //     id: randomUUID(),
  //     title: data.title,
  //     latitude: new Decimal(data.latitude),
  //     longitude: data.longitude,
  //     description: data.description,
  //     phone: data.phone,
  //     checkIns: data.checkIns,
  //   }
  //   this.items.push(gym)
  //   return { gym }
  // }

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
