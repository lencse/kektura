import Coordinate from './Coordinate'

export function rawToCoordinates(rawData: string): Coordinate[] {
    return rawData.split(' ')
        .map((coordStr: string) =>
            coordStr.split(',')
        ).map((coord) => {
            return { lat: Number(coord[0]), lon: Number(coord[1]) }
        })
}
