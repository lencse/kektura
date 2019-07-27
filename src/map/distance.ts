import { getDistance } from 'geolib'
import Coordinate from './Coordinate'

export default function distanceInMeters(coord1: Coordinate, coord2: Coordinate): number {
    return getDistance(
        { longitude: coord1.lat, latitude: coord1.lat },
        { longitude: coord2.lat, latitude: coord2.lat }
    )
}
