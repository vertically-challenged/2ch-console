import he from 'he'
import terminalImage from 'terminal-image'
import got from 'got'

import React, {useState, useEffect} from 'react'
import {Box, Text} from 'ink'

type File = {
  path: string,
  // add other properties of file here
}

type RecordThread = {
  date: string,
  files: Array<File>,
  num: number, 
  name: string,
  comment: string
}

type Content = Array<RecordThread>

const displayFilter = (comment: string): string => {
  return he.decode(comment.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '').trim())
}

const Threads:React.FC<{ content: Content }> = ({content}) => {

  const [imagesList, setImagesList] = useState({})

  const images = async (post: RecordThread) => {
    const arrayImages = []
    for (const file of post.files) {
      const body = await got('https://2ch.hk' + file.path)
      const IMG = await terminalImage.buffer(Buffer.from((body as any).rawBody), {height: '140px'})
      const text = <Box width={7} height={6} paddingY={1}><Text>{await IMG}</Text></Box>
      arrayImages.push(text)
    }
    return arrayImages
  }

  useEffect(() => { 
    const fetchImages = async () => {
      const imagesObj: Record<string, any> = {}
      for (const post of content) {
        imagesObj[post.num] = await images(post)
      }
      setImagesList(() => imagesObj)
    }
    fetchImages()
  }, [content])

  const threadsList =  content.map((post, index) => (
    <Box borderStyle="classic" flexDirection="column" key={index}>
      <Box flexDirection="column" paddingBottom={1}>
        <Text>{`Дата: ${post.date}`}</Text>
        <Text inverse color="yellow" >{`Номер: ${post.num}`}</Text>
        <Text>{`Имя: ${post.name}`}</Text>
      </Box>
      <Box alignItems="flex-start" flexWrap="wrap">
        {imagesList[post.num] ? imagesList[post.num][0] : ''}
      </Box>
      <Box flexDirection="column">
        <Text>{`${displayFilter(post.comment)}`}</Text>
      </Box>
    </Box>
  ))

  return (<Box flexDirection="column" paddingY={2} alignItems="flex-start" flexWrap="wrap">
    {threadsList}
  </Box>)
}

export default Threads