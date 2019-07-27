import { writeData } from '../data/export'
import { resolve } from 'path'

writeData(resolve(process.cwd(), 'build/data/data.json'))
