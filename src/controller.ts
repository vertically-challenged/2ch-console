import { FunctionList } from "./functionList"

class Controller {
  public functionsList: FunctionList = {}
  public context = 'mainPage'
  constructor(functionsList: FunctionList) {
    this.functionsList = functionsList
  }

  display(content: any) {
    content.displayMethod(content)
    console.log('\n')
  }

  async parse(message: string) {

    const token = message.toLowerCase().split(' ')
    const action = this.functionsList[token[0]]
    const response = action ? await action(this.context) : null
    this.display(response)
  }
}

export default Controller