import api from '../api/index.ts'
import { RecordBoard } from '../api/boards.ts'

export interface BoardList {
  content: {[category: string] : Array<{
    id: string, 
    label: string 
  }>},
  templateName: string, 
}

export interface Posts {
  content: Array<RecordThread>,
  templateName: string, 
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

const ls = async (context: string) => {
  if (context === 'mainPage') {
    const response = await api.boards.getBoards()
    const boardList: BoardList = {
      content: {},
      templateName: 'Boards'
    }
    response.data.forEach((record: RecordBoard): void => {
      if (!boardList.content[record.category]) boardList.content[record.category] = []
      boardList.content[record.category].push({
        id: record.id, 
        label: record.name
      })
    })
    return boardList
  } else {
    const response = await api.boards.getContent(context)
    const posts: Posts = {
      content: [],
      templateName: 'Threads'
    }
    // TODO: Здесь нужно уточнять пост или тред
    response.data.threads.forEach((record: RecordThread): void => {
      posts.content.push({
        date: record.date,
        files: record.files, 
        num: record.num,
        name: record.name,
        comment: record.comment
      })
    })
    return posts
  }
}

export default ls