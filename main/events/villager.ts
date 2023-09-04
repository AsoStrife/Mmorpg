import { RpgEvent, EventData, RpgPlayer, EventMode } from '@rpgjs/server'
import Pozione from '../database/Pozione'
import Granpozione from '../database/Granpozione'
import { PlayerType } from '@rpgjs/types'

import { Components, EventData, Move, Presets, RpgEvent, Speed } from '@rpgjs/server';

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

        this.setComponentsTop([
            Components.hpBar({}, '{name}')
        ], {
            marginBottom: -10
        });
    }
    async onAction(player: RpgPlayer) {
        // await player.showText('I give you 10 gold.', {
        //     talkWith: this
        // })

        // await player.showText('Ti tolgo anche 300 di vita', {
        //     talkWith: this
        // })

        player.gold += 10000
        
        // player.hp = 100

        player.addItem('96ab6ba0-3c7b-11ee-be56-0242ac120002', 10) // Pozione
        player.addItem('8a02eea8-c9f3-4915-b105-f2bee51b884a', 50) // Etere

        player.callShop([Pozione])

        // player.name = 'AsoStrife22'
        // player.setGraphic(['nenna'])
    }
} 