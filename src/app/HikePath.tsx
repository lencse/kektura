import * as React from 'react'
import Point from '../map/Point'
import Hike from '../map/Hike'

export default class HikePath extends React.Component<{
    transform: (points: Point[]) => Point[]
    hike: Hike
}, {}> {

    public render(): React.ReactNode {
        return (
            <polyline
                points='83.47431758880299,270.70383739020616 83.80645515311949,270.38489778533005'
                className='hike-path'
                opacity='1'>
            </polyline>
        )
    }

}
