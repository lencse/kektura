import Coordinate from './Coordinate'
import { getDistance } from 'geolib'
import Point from './Point'
import * as proj4 from 'proj4'

export function rawToCoordinates(rawData: string): Coordinate[] {
    return rawData.split(' ')
        .map((coordStr: string) =>
            coordStr.split(',')
        ).map((coord) => {
            return { lon: Number(coord[0]), lat: Number(coord[1]) }
        })
}

export function distanceInMeters(coord1: Coordinate, coord2: Coordinate): number {
    return getDistance(
        { longitude: coord1.lat, latitude: coord1.lat },
        { longitude: coord2.lat, latitude: coord2.lat }
    )
}

export function filterByDistance(coordinates: Coordinate[], thresholdMeters: number): Coordinate[] {
    return coordinates.reduce(
        (prev, curr, idx) => (
            idx === coordinates.length -1
                ||  distanceInMeters(curr, prev[prev.length - 1]) >= thresholdMeters
             ? prev.concat([curr]) : prev
        ),
        [coordinates[0]]
    )
}

export function project(coordinate: Coordinate): Point {
    const fromProjection = `WGS84`
    const toProjection = `+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y
        0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs`
    const proj = proj4(fromProjection, toProjection, [coordinate.lon, coordinate.lat])
    return { x: proj[0], y: proj[1] }
}
