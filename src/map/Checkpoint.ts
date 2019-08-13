import Coordinate from './Coordinate'

export default interface Checkpoint {
    coordinate: Coordinate,
    name: string,
    checkpointIdx: number
}
