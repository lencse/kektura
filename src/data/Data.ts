import Point from '../map/Point'
import Checkpoint from '../map/Checkpoint'

export default interface Data {
    hungary: Point[],
    budapest: Point[],
    kektura: Point[],
    checkpoints: Checkpoint[]
}
