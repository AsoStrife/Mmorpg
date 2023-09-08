import { Item } from '@rpgjs/database'
import { RpgPlayer } from '@rpgjs/server'

@Item({
    id: '8a02eea8-c9f3-4915-b105-f2bee51b884a',
    name: 'Birra Ichnusa',
    description: 'Ricarica 50 MP',
    price: 500,
    spValue: 50
})

export default class Birra {
    onUse(player: RpgPlayer) {
        player.hp = ((player.sp + 50) >= player.param.maxSp) ? player.param.maxSp : player.sp + 50
    }
}