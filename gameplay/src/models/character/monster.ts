import { AlienType } from '../../enums'
import Ability from './ability'

export default class Monster {
    id: string
    hash: string
    from: string
    type: AlienType
    name: string = 'test'
    dmg: number = 10
    def: number = 10
    crit_rate: number = 0.2
    heal: number = 100
    amr: number = 20
    mana: number = 20
    state: number = 1
    ownerId: string = '123123'
    position: number = 2
    speed: number = 20
    abilities: Record<string, Ability> = {
        '0': {
            name: 'attack',
            dmg: 0,
            amr: 0,
            id: '0',
            heal: 0,
            type: 'single',
            energy: 0,
            enemyEnergy: 0,
            count: -1,
            poison: 0,
            turn: 1,
        },
        '1': {
            name: 'dragon_call',
            dmg: 0,
            amr: 0,
            id: '0',
            heal: 0,
            type: 'single',
            energy: -2,
            enemyEnergy: -6,
            count: 2,
            poison: 0,
            turn: 1,
        },
    }
    src: string = '-'

    constructor(
        id: string,
        hash: string,
        from: string,
        type: AlienType,
        name: string,
        dmg: number,
        crit_rate: number,
        state: number,
        ownerId: string,
        src: string,
        heal: number,
        position: number
    ) {
        this.id = id
        this.hash = hash
        this.from = from
        this.type = type
        this.name = name
        this.dmg = dmg
        this.crit_rate = crit_rate
        this.state = state
        this.ownerId = ownerId
        this.src = src
        this.heal = heal
        this.position = position
    }

    useAbility(abilityId: string) {
        if (abilityId && this.abilities[abilityId]) {
            const ability: Ability = this.abilities[abilityId]
            if (ability && ability.count >= 1) {
                ability.count -= 1
                this.abilities[abilityId] = ability
            }
        }
    }

    addAbility(abilityId: string) {
        if (abilityId && this.abilities[abilityId]) {
            this.abilities[abilityId].count += 1
        }
    }

    onDie() {
        this.speed === 0
        this.state = -1
    }
}
