import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepositoryProps } from '../interfaces/check-ins-repositoy'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInsRepositoryProps {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = prisma.checkIn.create({ data })
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          /* Procurando um checkIn que e maior que (GTE) que o comeco do dia e menor que o fim do dia,
          ou seja um checkIn que esta dentro das 24hrs */
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return checkIns
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })
    return count
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }
}
