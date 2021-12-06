import { TokenEntryPoint } from './type'

export class AbstractSyntaxTree {
    _level: number = 0
    _tree: TokenEntryPoint[] = []
    _name: string = ''
    _height: number = 0

    constructor(name?: string, height?: number, tree?: TokenEntryPoint[]) {
        if (name) {
            this._name = name
        }

        if (tree) {
            this._tree = tree
        }

        if (height) {
            this._height = height
        }
    }

    // take lastest of tree; if (level) return lastest _tree same level
    take_lastest(level?: number) {
        if (!level || level < 0) {
            throw new Error('level is less than 0')
        }

        if (level) {
            return Array.prototype.lastIndexOf(
                this._tree.filter((vl, k) => vl.level === level)
            )
        } else {
            return Array.prototype.lastIndexOf(this._tree)
        }
    }

    // push into _tree
    push(point: TokenEntryPoint) {
        this._tree.push(point)
        this._height++

        return this._tree[this._height]
    }

    // get list with level
    get_list(level?: number, start?: number, end?: number) {
        if (level && level <= 0) {
            throw new Error('level is ')
        }

        if (start <= 0) {
            throw new Error('start is more than 0 ')
        }

        if (end <= 0 || end <= start) {
            throw new Error('end is smaller than 0 or start')
        }

        if (level) {
            return this._tree.filter(
                (vl: TokenEntryPoint, k: number) => vl.level === level
            )
        } else {
            return this._tree.filter(
                (vl: TokenEntryPoint, k: number) => k >= start && k <= end
            )
        }
    }

    // find entry_point with index with level and index
    find(index?: number, level?: number) {
        // error
        if (!index && index < 0) {
            throw new Error('index is less than 0')
        }

        if (level < 0) {
            throw new Error('level is less than 0')
        }

        // level
        if (level) {
            return this._tree.filter((vl, k) => k === level)
        }

        //
        if (level && index) {
            const qr_list = this._tree.filter((vl, k) => k === level)
            return qr_list.filter((vl, k) => k === index)
        } else {
            return this._tree[index]
        }
    }

    // convert _tree into json
    make_json() {
        const copy_tree: TokenEntryPoint[] = this._tree
        copy_tree.forEach((vl: TokenEntryPoint, k: number) => {})
    }
}

export abstract class ActionHandle {
    // handle
    hash_tree(metadata: string) {}
    // method
}

export class ActionTree {}
