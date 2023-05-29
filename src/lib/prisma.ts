import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  /* Loga os comandos que ele esta fazendo em SQL */
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
