import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'
        // player.setComponentsTop(
            
        //     Components.hpBar(), {
        //         width: 42
        //     })
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }
    },
    async onJoinMap(player: RpgPlayer) {
        if (player.getVariable('AFTER_INTRO')) {
            return
        }

        // await player.showText('And, please, support the project on github https://github.com/RSamaium/RPG-JS ! :)')
        player.gui('my-hud').open()

        player.setVariable('AFTER_INTRO', true)
    }
}

export default player