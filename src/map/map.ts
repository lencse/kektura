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

export function filterByDistance(coordinates: Coordinate[], thresholdMeters: number): Coordinate[] {
    const result = [coordinates[0]]
    for (let i = 1; i < coordinates.length - 1; ++i) {
        if (distanceInMeters(coordinates[i], coordinates[i-1]) >= thresholdMeters) {
            result.push(coordinates[i])
        }
    }
    result.push(coordinates[coordinates.length - 1])
    return result
}
