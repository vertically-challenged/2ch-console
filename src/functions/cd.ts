export interface ContextResponse {
  context: string
}

const cd = async (context: string, token?: string) => {
  if (context === 'mainPage') {
    const contextResponse: ContextResponse = {
      context: '',
    }
    contextResponse.context = token ? token : context
    return contextResponse
  }
}

export default cd