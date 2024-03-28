import {render} from 'ink'
import React from 'react'

import Boards from './ templates/boards.tsx'
import Threads from './ templates/threads.tsx'

const display = (templateName: string, props: any = null) => {
  const Page = ({templateName}) => {
    switch (templateName) {
      case 'Boards':
        return (<Boards content={props}/>)
        break;
      case 'Threads':
        return (<Threads content={props}/>)
        break;
    }
  }
  render(<Page templateName={templateName}/>)
}

export default display