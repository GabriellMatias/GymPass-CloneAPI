import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    console.log('executing')
    return {
      /* Executa o setup antes dos testes e o return executa DEPOIS dos testes
       */
      teardown() {
        console.log('teardown')
      },
    }
  },
}
