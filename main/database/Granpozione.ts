import { Item } from '@rpgjs/database'
import { RpgPlayer } from '@rpgjs/server'

@Item({
    id: '674b2e00-3153-41de-9166-e6689efb6773',
    name: 'Granpozione',
    description: 'Ricarica 500 HP',
    price: 500,
    hpValue: 500,
    hitRate: 1,
    consumable: true
})

export default class Granpozione {
    onUse(player: RpgPlayer) {
        player.hp = ((player.hp + 500) >= player.param.maxHp) ? player.param.maxHp : player.hp + 500
    }
}