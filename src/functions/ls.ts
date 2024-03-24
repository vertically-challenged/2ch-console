import he from 'he'
import terminalImage from 'terminal-image'
import got from 'got'
import api from '../api/index.ts'
import { RecordBoard } from '../api/boards.ts'

export interface BoardList {
  list: {[category: string] : Array<{
    id: string, 
    label: string 
  }>},
  displayMethod: (boardList: BoardList) => void
}

export interface Content {
  list: Array<RecordThread>,
  displayMethod: (content: Content) => void
}

export interface RecordThread {
  date: string,
  files: Array<File>,
  num: number, 
  name: string,
  comment: string
}

export interface File {
  displayname: string, 
  path: string
}

const displayFilter = (comment: string): string => {
  
  return he.decode(comment
  .replace(/<br>/g, '\n')
  .replace(/<[^>]*>/g, '').trim())
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
  } else {
    const response = await api.boards.getContent(context)
    const content: Content = {
      list: [],
      displayMethod: async (content: Content, page: number = 1) => {
        const pageContent = content.list.slice((0 + page - 1) * 10, (1 + page) * 10)
        
        for( const record of pageContent ) {
          console.log('----------')
          console.log('Дата: ', record.date)
          console.log('Номер: ', record.num)
          console.log('Имя: ', record.name)
          console.log('\n')

          for (const file of record.files) {
            const body = await got('https://2ch.hk' + file.path)
            console.log(file.displayname +'\n')
            console.log(await terminalImage.buffer(Buffer.from((body as any).rawBody), { 
              height: '140px'
            }))
            console.log('\n')
          }
          console.log(displayFilter(record.comment.trim()))
          console.log('----------\n')
        }
        console.log('Страница: ', page)
      }
    }
    // TODO: Здесь нужно уточнять пост или тред
    response.data.threads.forEach((record: RecordThread): void => {
      content.list.push({
        date: record.date,
        files: record.files, 
        num: record.num,
        name: record.name,
        comment: record.comment
      })
    })
    return content
  }
}

export default ls