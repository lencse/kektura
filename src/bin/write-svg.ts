import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { rawFromKml } from '../map/kml'
import { rawToCoordinates } from '../map/map'

(async () => {
    const raw = await rawFromKml(
        resolve(process.cwd(), 'map/kml/gadm36_HUN_0.kml'),
        'Hungary'
    )
    const coordinates = rawToCoordinates(raw)
    console.dir(coordinates)
}) ()

writeFileSync(resolve(process.cwd(), 'build/svg/hungary.svg'),
`<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 14.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 43363)  -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="504px"
     height="504px" viewBox="0 0 504 504" enable-background="new 0 0 504 504"
     xml:space="preserve">
<g id="Layer_2">
    <path d="M415.833,134.334c0,0,70.001,59.167,16.668,211.667c0,0-34.165,108.667-123.332,
    133.333c0,0-18.334,9.166-44.167-4.167
        c0,0-15.833-14.166-56.667-0.833c0,0-22.5,8.332-50.833-13.334c0,
        0-125.833-102.5-136.667-215.833c0,0-14.167-92.499,85-128.333
        c0,0,60.833-19.167,109.167,15.833c0,0-14.999-57.499-38.333-90.832c0,0,25.833-21.667,
        38.333-1.667
		c0,0,15.834,20.833,30.833,94.167c0,0,3.333-2.5,25-11.667c0,0,80.833-77.5,204.166-61.666
		C475.001,61.003,467.498,100.998,415.833,134.334z"/>
</g>
<g id="Layer_3">
    <path fill="#006600" d="M247,157c0,0,73.333-96,218.667-90c0,0-18,54-85.333,77.334c0,0-58.666,
    26-132.667,20L247,157z"/>
</g>
<g id="Layer_4">
    <path fill="#660000" d="M188.334,43c0,0,14-12.667,22,2.667c0,0,40,74.667,26,144c0,0-10,
    4.667-6-21.333c0,0,4.667-8-10.667-48
		C219.667,120.333,198.334,58.334,188.334,43z"/>
</g>
<g id="Layer_5">
	<path fill="#999900" d="M247,171.667c0,0,89.333,11.333,162.666-34c0,0,52.668,51.333,31.334,152
    c0,0-20.002,127.998-109.335,173.332c0,0-32.667,17.333-50,8c0,0-29.999-18.665-75.333-3.999c0,
    0-25.334,6.666-38.667-8.667
        c0,0-104.667-89.334-132.667-180c0,0-32-88,45.334-142c0,0,65.333-42.667,140.667,
        7.333c0,0,4.667,16.667,2,32
		c0,0-1.334,29.333,16.667,18.667C239.666,194.331,247,186.333,247,171.667z"/>
</g>
</svg>
`)
