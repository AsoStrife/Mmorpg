import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'
import Pozione from '../database/Pozione'
import Granpozione from '../database/Granpozione'
import { PlayerType } from '@rpgjs/types'
@EventData({
    name: 'EV-1', 
    hitbox: {
        width: 32,
        height: 16
    }
})

export default class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')
    }
    async onAction(player: RpgPlayer) {
        // await player.showText('I give you 10 gold.', {
        //     talkWith: this
        // })

        // await player.showText('Ti tolgo anche 300 di vita', {
        //     talkWith: this
        // })

        player.gold += 10000
        
        player.hp = 100

        player.addItem('96ab6ba0-3c7b-11ee-be56-0242ac120002', 100) // Pozione
        player.addItem('674b2e00-3153-41de-9166-e6689efb6773', 100) // Granpozione
        player.addItem('8a02eea8-c9f3-4915-b105-f2bee51b884a', 50) // Etere
        player.addItem('ca4dbc23-449d-48f3-a7f6-dec7888dd5d9', 20) // Turboetere

        // player.callShop([Pozione, Granpozione])
    }
} 