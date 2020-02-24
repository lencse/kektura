import Data from '../data/Data'
import Point from '../map/Point'
import * as SVG from 'svg.js'

export const dimensions = {
    width: 900,
    height: 600
}

function transformer(
    width: number,
    height: number,
    data: Data
): (points: Point[]) => Point[] {
    const xValues = data.hungary.map((p) => p.x)
    const yValues = data.hungary.map((p) => p.y)
    const minX = Math.min(...xValues)
    const maxX = Math.max(...xValues)
    const minY = Math.min(...yValues)
    const maxY = Math.max(...yValues)
    const deltaX = maxX - minX
    const deltaY = maxY - minY
    const yCenter = deltaY / 2
    const margin = 0.05 * width
    const scale = width - 2 * margin
    return (points: Point[]) => {
        return points.map((p) => {
            return {
                x: margin + (p.x - minX) / deltaX * scale,
                y: height / 2 - (p.y - minY - yCenter) / deltaX * scale
            }
        })
    }
}

export function drawMap(data: Data): void {
    const transform = transformer(dimensions.width, dimensions.height, data)
    const draw = SVG('map').viewbox(0, 0, dimensions.width, dimensions.height)
    function polygon(points: Point[], className: string): SVG.Polygon {
        const asString = transform(points)
            .map((p) => [p.x, p.y])
            .map((coo) => coo.join(',')).join(' ')
        return draw.polygon(asString).addClass(className)
    }
    function polyline(points: Point[], className: string): SVG.PolyLine {
        const asString = transform(points)
            .map((p) => [p.x, p.y])
            .map((coo) => coo.join(',')).join(' ')
        return draw.polyline(asString).addClass(className)
    }
    polygon(data.hungary, 'hungary')
        // .attr({ opacity: 0 })
        // .animate(1000)
        .attr({ opacity: 1 })
    polygon(data.budapest, 'budapest')
        // .attr({ opacity: 0 })
        // .animate(1000)
        .attr({ opacity: 1 })
    polyline(data.kektura, 'kektura')
        // .attr({ opacity: 0 })
        // .animate(1000)
        .attr({ opacity: 1 })
    // const cp = transform(data.checkpoints.map((checkpoint) => data.kektura[checkpoint.pathIdx]))
    // const names = data.checkpoints.map((checkpoint) => checkpoint.name)
    // cp.map((p, idx) => {
    //     draw.circle(3).move(p.x - 2.5, p.y - 2.5)
    //         .addClass('checkpoint')
    //         .data('checkpoint-name', names[idx])
    //         .attr({ opacity: 0 })
    //         .animate(1000)
    //         .attr({ opacity: 1 })
    // })
}
