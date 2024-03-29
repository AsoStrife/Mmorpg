import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

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
        player.showAnimation('animation', 'default')
    }
} 