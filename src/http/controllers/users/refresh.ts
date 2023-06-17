import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  /* vai ignorar body, params, header e olha apenas os cookies */
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign(
    { role: request.user.role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )
  const refreshToken = await reply.jwtSign(
    { role: request.user.role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )
  return reply
    .setCookie('refreshToken', refreshToken, {
      /* Quem pode ter acesso */
      path: '/',
      /* Apenas rotas https - front end nao consegue ler o valor como tipo bruto */
      secure: true,
      /* acessivel apenas do msm dominio */
      sameSite: true,
      /* acessado apenas pelo back-end e nao vai ficar salvo no front end */
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
