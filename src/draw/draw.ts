import Data from '../data/Data'
import Point from '../map/Point'

export function transformer(
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
