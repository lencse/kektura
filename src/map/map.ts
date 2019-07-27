import Coordinate from './Coordinate'
import { getDistance } from 'geolib'

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
