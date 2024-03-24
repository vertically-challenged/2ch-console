import { FunctionList } from "./functionList.ts"

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
    const response = action ? await action(this.context, token[1]?.trim()) : null
    if (response?.context) {
      this.context = response.context?.trim()
      return
    }
    if (response) this.display(response)
    else this.display({
      displayMethod: (): void => {
        console.log(`\nДоска или тред "${this.context}" не существует!`)
      }
    })
  }
}

export default Controller