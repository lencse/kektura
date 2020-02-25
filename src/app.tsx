import { drawMap, transformer, dimensions } from './draw/draw'
import * as ReactDom from 'react-dom'
import Main from './app/MainTMP'
import * as React from 'react'

fetch('/data/data.json').then((resp) => resp.json().then((data) => {
    data.hikes = data.hikes.map((hike) => ({
        ...hike,
        start: new Date(hike.start),
        end: new Date(hike.end)
    }))
    drawMap(data)
    const transform = transformer(dimensions.width, dimensions.height, data)
    ReactDom.render(
        <Main
            width={ dimensions.width }
            height={ dimensions.height }
            transform={ transform }
            hikes={ data.hikes }
        />,
        document.getElementById('react-root')
    )
}))
