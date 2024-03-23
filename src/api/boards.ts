import instance from "./axios"

export interface RecordBoard {
  category: string,
  id: string,
  name: string
}

const boardsQuery = {
  async getBoards () {
    return instance.get('/api/mobile/v2/boards')
  },
}

export default boardsQuery