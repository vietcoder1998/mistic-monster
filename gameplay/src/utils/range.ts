import { Vector } from '../models/another/typing'

export default function inRange(p: Vector, p1: Vector, r: number) {
    const l = Math.sqrt((p.x - p1.x) ** 2 + (p.y - p1.y) ** 2)
    if (Math.abs(r) <= l) {
        return false
    }
    return true
}
