import { drawMap } from './draw/draw'
import * as ReactDom from 'react-dom'
import Main from './app/main'
import * as React from 'react'

fetch('/data/data.json').then((resp) => resp.json().then((data) => {
    drawMap(data)
    ReactDom.render(
        <Main />,
        document.getElementById('react-root')
    )
}))
