import api from '../api'
import { RecordBoard } from '../api/boards'

interface BoardList {
  list: {[category: string] : Array<{
    id: string, 
    label: string 
  }>},
  displayMethod: (boardList: BoardList) => void
}

const ls = async (context: string) => {
  if (context === 'mainPage') {
    const response = await api.boards.getBoards()
    const boardList: BoardList = {
      list: {},
      displayMethod: (boardList: BoardList): void => {
        for (const category in boardList.list) {
          console.log('\n')
          if(!category) console.log('Другое')
          else console.log(category)
          console.log('----------')
          boardList.list[category].forEach((board) => {
            console.log(`${board.id} ${board.label}`)
          })
        }
      }
    }
    response.data.forEach((record: RecordBoard): void => {
      if (!boardList.list[record.category]) boardList.list[record.category] = []
      boardList.list[record.category].push({
        id: record.id, 
        label: record.name
      })
    })
    return boardList
  }
}

export default ls