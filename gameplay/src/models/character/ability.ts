class Ability {
    name: string
    description?: string
    id: string
    dmg: number
    amr: number
    heal: number
    poison: number
    count: number
    turn: number
    energy: number
    enemyEnergy: number
    type: 'single' | 'multi'
}

export default Ability