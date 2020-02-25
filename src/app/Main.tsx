import * as React from 'react'
import { dimensions } from '../draw/draw'
import Point from '../map/Point'
import Hike from '../map/Hike'
import HikePath from './HikePath'

export default class Main extends React.Component<{
    width: number
    height: number
    transform: (points: Point[]) => Point[]
    hikes: Hike[]
}, {}> {

    public render(): React.ReactNode {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg' version='1.1'
                width='100%' height='100%'
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            >{
                this.props.hikes.map((hike, key) => (
                    <HikePath
                        transform={ this.props.transform }
                        hike={ hike }
                        key={ key }
                    />
                ))
            }</svg>
        )
    }

}
