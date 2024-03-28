import { FunctionList } from "./functionList.ts"
import display from "./views/display.tsx"

interface DataForDisplay {
  templateName: string 
  content: any
}

class Controller {
  public functionsList: FunctionList = {}
  public context = 'mainPage'
  constructor(functionsList: FunctionList) {
    this.functionsList = functionsList
  }

  display(data: any) {
    display(data.templateName, data.content)
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
  }
}

export default Controller