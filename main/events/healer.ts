import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
import Pozione from '../database/Pozione'
import Granpozione from '../database/Granpozione'
import { PlayerType } from '@rpgjs/types'
@EventData({
    name: 'EV-2', 
    hitbox: {
        width: 32,
        height: 16
    }
})

export default class HealerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')
    }
    async onAction(player: RpgPlayer) {
        // player.useItem('96ab6ba0-3c7b-11ee-be56-0242ac120002')
        player.showAnimation('animation', 'default')
        // player.callShop([Pozione, Granpozione])
    }
} 