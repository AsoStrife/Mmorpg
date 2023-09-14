import { Components, RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'Signora-Fagiolo', 
    hitbox: {
        width: 32,
        height: 16
    }
})

export default class VillagerEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')
        this.name = "Signora Fagiolo"
        this.setComponentsTop(Components.text('{name}'))
    }
    async onAction(player: RpgPlayer) {
        await player.showText('I give you 10 gold.', {
            talkWith: this
        })


        

        player.addItem('96ab6ba0-3c7b-11ee-be56-0242ac120002', 1) // Panino
        player.addItem('8a02eea8-c9f3-4915-b105-f2bee51b884a', 3) // Birra

        // player.gold += 10000
        // player.hp = 100
        // player.sp = 100
        // player.callShop([Panino, Birra])
        // player.name = 'AsoStrife22'
        // player.setGraphic(['nenna'])
    }
} 