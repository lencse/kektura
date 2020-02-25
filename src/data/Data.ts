import Point from '../map/Point'
import Checkpoint from '../map/Checkpoint'
import Hike from '../map/Hike'

export default interface Data {
    hungary: Point[],
    budapest: Point[],
    kektura: Point[],
    checkpoints: Checkpoint[],
    hikes: Hike[]
}
