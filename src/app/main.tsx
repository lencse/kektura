import * as React from 'react'
import { dimensions } from '../draw/draw'

export default class Main extends React.Component<{}, {}> {

    public render(): React.ReactNode {
        return (
            <svg
                xmlns='http://www.w3.org/2000/svg' version='1.1'
                width='100%' height='100%'
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            >
            </svg>
        )
    }

}
