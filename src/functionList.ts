import ls from "./functions/ls"

export type FunctionList = {[key: string]: (context: string) => any | undefined}

const functionList = {
  ls: ls
}

export default functionList