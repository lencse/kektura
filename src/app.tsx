import { drawMap, transformer, dimensions } from './draw/draw'
import * as ReactDom from 'react-dom'
import Main from './app/Main'
import * as React from 'react'
import Data from './data/Data'

fetch('/data/data.json').then((resp) => resp.json().then((data: Data) => {
    data.hikes = data.hikes.map((hike) => ({
        ...hike,
        start: new Date(hike.start),
        end: new Date(hike.end)
    }))
    drawMap(data)
    const transform = transformer(dimensions.width, dimensions.height, data)
    const section = (startIdx: number, endIdx: number) => {
        const start = Math.min(startIdx, endIdx)
        const end = Math.max(startIdx, endIdx)
        const startPoint = data.checkpoints.find((cp) => start === cp.checkpointIdx)
        const endPoint = data.checkpoints.find((cp) => end === cp.checkpointIdx)
        return transform(data.kektura.slice(startPoint.pathIdx, endPoint.pathIdx + 1))
    }
    ReactDom.render(
        <Main
            width={ dimensions.width }
            height={ dimensions.height }
            section={ section }
            hikes={ data.hikes }
        />,
        document.getElementById('react-root')
    )
}))
