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
    onAdd(player: RpgPlayer) {
        const item = player.items.filter(i => i.item.id == '8a02eea8-c9f3-4915-b105-f2bee51b884a')[0]
        item.nb = item?.nb > 99 ? 99 : item?.nb
    }

    onUse(player: RpgPlayer) {
        if(player.sp != player.param.maxSp)
            player.sp = ((player.sp + 50) >= player.param.maxSp) ? player.param.maxSp : player.sp + 50
        else
            player.addItem('8a02eea8-c9f3-4915-b105-f2bee51b884a', 1)
    }
}