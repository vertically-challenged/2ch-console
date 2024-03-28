import React from 'react'
import {Box, Text} from 'ink'

export type Content = {[category: string] : Array<{
  id: string, 
  label: string 
}>}

interface BoardsProps {
  content: Content;
}

const Boards: React.FC<BoardsProps> = ({content}) => {
  const boardList =  Object.keys(content).map((key) => (
    <Box key={key} borderStyle="round" flexDirection="column">
      <Box flexDirection="column" paddingBottom={1}>
        <Text inverse color="yellow" >{`${key}`}</Text>
      </Box>
      {content[key].map((record) => (
        <Box key={record.id} flexDirection="column">
          <Text>{`${record.id} | ${record.label}`}</Text>
        </Box>
      ))}
    </Box>
  ))
    return <Box flexDirection="column" paddingY={2} alignItems="flex-start" flexWrap="wrap">
    {boardList}
  </Box>
};

export default Boards