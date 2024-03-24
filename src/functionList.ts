import ls from './functions/ls.ts'
import cd from './functions/cd.ts'

export type FunctionList = {[key: string]: (context: string, token?: string) => any | undefined}

const functionList = {
  ls,
  cd
}

export default functionList