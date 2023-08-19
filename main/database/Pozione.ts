import { Item } from '@rpgjs/database'
import { RpgPlayer } from '@rpgjs/server'

@Item({
    id: '96ab6ba0-3c7b-11ee-be56-0242ac120002',
    name: 'Pozione',
    description: 'Ricarica 100 HP',
    price: 100,
    hpValue: 100,
    hitRate: 1,
    consumable: true
})

export default class Pozione {

    onUse(player: RpgPlayer) {
        player.hp = ((player.hp + 100) >= player.param.maxHp) ? player.param.maxHp : player.hp + 100
    }
}