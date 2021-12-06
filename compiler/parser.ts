import { AbstractSyntaxTree } from './tree'
import fs from 'fs'
import path from 'path'
import { Decorator } from './type'
import _ from 'lodash'
import e from 'cors'

// parser
export class Parser {
    _action_syntax_tree: AbstractSyntaxTree
    _data: string = ''
    _base_readline: Record<number, string[]> = {}
    _token_list: Array<Record<string, string>>[] = []
    constructor() {}

    async read(link: string) {
        const _read_file: Buffer = await fs.readFileSync(
            path.join(__dirname, link)
        )

        if (!_read_file) {
            throw new Error('None file error')
        } else {
            const str_file = Buffer.from(_read_file).toString('utf8')
            this._data = str_file
            this._base_readline = pipeline_parser(str_file)
        }
    }
}

/**
 *
 * @param input
 * @returns { Array<[key]: Record<Token, string>>[]}
 * Convert grammar into Record for abstract_syntax_tree
 *
 * Example:
 * ┌─────────┬─────────┬──────┬─────┬───────────┬─────┬───────┐
 * │ (index) │    0    │  1   │  2  │     3     │  4  │   5   │
 * ├─────────┼─────────┼──────┼─────┼───────────┼─────┼───────┤
 * │    0    │ 'const' │ 'ab' │ ':' │ 'Uint256' │ '=' │ '125' │
 * │    1    │   'a'   │ '+'  │ '=' │    '2'    │     │       │
 * └─────────┴─────────┴──────┴─────┴───────────┴─────┴───────┘
 *
 *  Result:
 * [
 *      {"type":  "const"},
 *      {"var": "ab"},
 *      {"op": ":" },
 *      {unit: "Uint256" },
 *      {"op": "=" },
 *      {"num": "125"}
 * ]
 *
 */

export function filter(
    input: Record<number, string[]>
): Array<Record<string, string>[]>[] {
    const result = Object.keys((k: string) => {
        const v = input[parseInt(k)]
        const parse_v = []
    })
    return []
}

/**
 * 
 * @param data 
 * @returns 
 * 
 * Convert grammar
* Example:

  const ab: Uint256 = 125
  a+=2
  print(ab)

  @transaction
  function test() {
      return ab
  }
* Result:

┌─────────┬────────────┬───────────────┬──────────┬───────────┬──────┬───────┐
│ (index) │     0      │       1       │    2     │     3     │  4   │   5   │
├─────────┼────────────┼───────────────┼──────────┼───────────┼──────┼───────┤
│    0    │  'const'   │     'ab'      │   ':'    │ 'Uint256' │ '='  │ '125' │
│    1    │    'ab'    │      '+'      │   '='    │    '2'    │      │       │
│    2    │  'print'   │      '('      │ '"Hello' │ 'world",' │ 'ab' │  ')'  │
│    3    │            │               │          │           │      │       │
│    4    │    '@'     │ 'transaction' │          │           │      │       │
│    5    │ 'function' │    'test'     │   '('    │    ')'    │ '{'  │       │
│    6    │  'return'  │     'ab'      │          │           │      │       │
│    7    │    '}'     │               │          │           │      │       │
└─────────┴────────────┴───────────────┴──────────┴───────────┴──────┴───────┘ 
*
*
*/

export function pipeline_parser(input: string) {
    if (!input) {
        throw new Error(
            '(mmc-compile):1 ParserErr: TypeError: Data is need to String'
        )
    }

    // init result
    const result: Record<string, string[]> = {}
    const f_split: Record<string, string> = {}

    // pretreatment
    const clear_comment_input: string[] = clear_comment(input)
    let count = 0

    // split array into many arr string without  '\n' and ';'
    console.log('> clear_comment_input ', clear_comment_input)

    const merge_word_arr: string[] = []
    let merge_str = ''

    // merge string without '{' and '}'
    while (count < clear_comment_input.length) {
        const word = clear_comment_input[count]
        let is_function = false

        // compare word
        if (word.includes(Decorator.open_curly_bracket)) {
            is_function = true
        }

        // curly bracket
        if (word.includes(Decorator.close_curly_bracket)) {
            is_function = false
            merge_str += word
        }

        if (!is_function) {
            merge_word_arr.push(merge_str)
        } else {
            merge_str += word
        }

        count++
    }

    // merge
    const remake_words: string[] = []

    // break word
    merge_word_arr.forEach((v: string, k: number) => {
        // decorator
        if (
            v === Decorator.init ||
            v === Decorator.add ||
            v === Decorator.dot ||
            v === Decorator.compare ||
            v === Decorator.divide ||
            v === Decorator.sub ||
            v === Decorator.mod ||
            v === Decorator.mul ||
            v === Decorator.open_curly_bracket ||
            v === Decorator.close_curly_bracket ||
            v === Decorator.open_parent_theses ||
            v === Decorator.close_parent_theses ||
            v === Decorator.sign
        ) {
            // merge world
            if (merge_word_arr[k - 1] !== Decorator.space) {
                remake_words.push(Decorator.space)
            }

            // remake word
            remake_words.push(v)

            // break word
            if (
                merge_word_arr[k + 1] !== Decorator.space &&
                merge_word_arr[k + 1] !== Decorator.compare
            ) {
                merge_word_arr.push(Decorator.space)
            }
        } else {
            // merge word
            merge_word_arr.push(v)
        }
    })

    // remake word
    console.log('> remake world', remake_words)
    let fix_word = ''

    // remake word
    remake_words.forEach((v) => (fix_word += v))
    fix_word.replace('  ', '')
    console.log(fix_word)
    let reader = fix_word.split('\n')

    // show fix word
    console.log('> fix world', fix_word)

    // split end line and divide into 2 object
    for (let i = 0; i < reader.length; i++) {
        const element: string = reader[i]
        console.log('element is', element)

        // if char is ';', push {[count]: line_reader} else line_read += data[i]
        Object.assign(f_split, { [String(count)]: element })
        count += 1
    }

    // split string into multi arr
    Object.keys(f_split).forEach((k: string) => {
        const data_str = f_split[k]
        let arr_splice = data_str.split(' ')

        // arr splice
        arr_splice.forEach((element: string, i) => {
            result[k] = arr_splice
        })
    })

    // filter and remove ""
    Object.keys(result).forEach((k: string) => {
        const arr_w = result[k]
        const arr_rm_sp = arr_w.filter((v: string) => v !== '')

        // result
        result[k] = arr_rm_sp
    })

    // show result
    console.table(result)

    // result
    return result
}

/**
 * 
 *  Convert Token List into Abstract Syntax Tree
 * 
 *  Example:
 *  [ { "type" : "const" },
        { "var" : "ab" },
        { "op" : ":" },
        { "unit" : "Uint256" },
        { "op" : "=" },
        { "num": "125" } ]
 *
 *  Result:
 * {
 *      "1": { 
 *          id: "1", 
 *          "type":  "const", 
 *          parent: null, 
 *          level: 0 
 *     },
 *      "2": { 
 *          id: "2", 
 *          "var": "ab", 
 *          parent: 1, 
 *          level: 1 
 *      },
 *      "3": { 
 *          id: "3", 
 *          "op": ":",  
 *          parent: 1, 
 *          level: 1 
 *      },
 *      "4": { 
 *          id: "4", 
 *          unit: "Uint256", 
 *          parent: 3, 
 *          level: 1 
 *      },
 *      "5": { 
 *          id: "5", 
 *          "op": "=", 
 *          parent: 3, 
 *          level: 1 
 *      },
 *      "6": { 
 *          id: "6", 
 *          "num": "125", 
 *          parent: 3, 
 *          level: 1 
 *      },
 * }
 */

export function parsing_abstract_tree() {}

// remove comment and params decorator
export function clear_comment(input: string): string[] {
    const result: string[] = input
        .split('*\n')
        .join('*')
        .split('* /\n')
        .join('')
        .split('* \n')
        .join('*')
        .split('\n')
        .join(';')
        .split(';')
        .filter(
            (v) =>
                v !== '' &&
                !v.includes('//') &&
                !v.includes('**') &&
                !v.includes('*/')
        )

    if (result.length === 0) {
        throw new Error('(parser_error:2) Result is error')
    }
    return result
}
