import * as React from 'react'
import Point from '../map/Point'
import Hike from '../map/Hike'

export default class HikePath extends React.Component<{
    section: (startIdx: number, endIdx: number) => Point[]
    hike: Hike
}, {}> {

    public render(): React.ReactNode {
        const str = this.props.section(this.props.hike.startPointIdx, this.props.hike.endPointIdx)
            .map((p) => [p.x, p.y])
            .map((coo) => coo.join(',')).join(' ')
        return (
            <polyline
                points={ str }
                className='hike-path'
                opacity='1'
                >
            </polyline>
        )
    }

}
