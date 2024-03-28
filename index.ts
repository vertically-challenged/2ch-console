import { createInterface } from 'readline'
import Controller from './src/controller.ts'
import functionList from './src/functionList.ts';


const readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ', 
});

const controller = new Controller(functionList)

readlineInterface.prompt()
readlineInterface.on('line', (input: string) => {
  controller.parse(input).then(() => {
    readlineInterface.prompt()
  })
});