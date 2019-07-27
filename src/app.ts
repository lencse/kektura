import * as SVG from 'svg.js'
import Data from './data/Data'

fetch('/data/data.json').then((resp) => resp.json().then((data: Data) => {
    const coords = data.hungary
    const xValues = coords.map((p) => p.x)
    const yValues = coords.map((p) => p.y)
    const minX = Math.min(...xValues)
    const maxX = Math.max(...xValues)
    const minY = Math.min(...yValues)
    const maxY = Math.max(...yValues)
    const xRat = maxX - minX
    const yRat = maxY - minY
    const yCenter = yRat / 2
    const transformed = coords.map((p) => {
        return {
            x: (p.x - minX) / xRat * 1000,
            y: -(p.y - minY - yCenter) / xRat * 1000 + 500
        }
    })
    const draw = SVG('map').size('100%', '100%')
    const s = transformed
        .map((p) => [p.x, p.y])
        .map((coo) => coo.join(',')).join(' ')
    draw.polygon(s).fill('#0033CC').stroke({ width: 5, color: '#001144' }) // .move(-200, -400)
}))

// #320BD9
// #0B13E3
// #0033CC
// #0B70E3
// #0096DB

// #130452
// #130452
// #001144
// #052D5C
// #003A54
