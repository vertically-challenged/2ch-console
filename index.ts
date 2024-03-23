import readline from 'readline'
import Controller from './src/controller'
import functionList from './src/functionList';

const readlineInterface = readline.createInterface({
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