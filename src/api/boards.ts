import instance from "./axios.ts"

export interface RecordBoard {
  category: string,
  id: string,
  name: string
}

const boardsQuery = {
  async getBoards () {
    return instance.get('/api/mobile/v2/boards')
  },
  async getContent (context: string) {
    if  (context.split('/').length === 1) {
      return instance.get(`/${context}/catalog.json`)
    }
    return instance.get(`/api/mobile/v2/info/${context}`)
  },
}

export default boardsQuery