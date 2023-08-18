import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'

const graphics = ['pale-green-body', 'pale-green-head', 'pale-green-wings', 'pale-green-wings-fg', 'dark-grey-coat', 'boots-black', 'hood-black']

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = ''
        player.setComponentsTop(Components.text('{name}'))
        player.setGraphic(graphics)
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            player.callMainMenu()
        }

        if (input === Control.Attack) {
            player.showAnimation(graphics, 'attack', true);
        }

        if (input === Control.Skill) {
            player.showAnimation(graphics, 'skill', true);
        }

        const gui = player.gui('potions')
        gui.on('useItem', (id) => {
            try {
                player.useItem(id)
            }
            catch (err) {
                console.log(err)
            }
        })

    },
    async onJoinMap(player: RpgPlayer) {
        // await player.showText('And, please, support the project on github https://github.com/RSamaium/RPG-JS ! :)')
        player.gui('hud').open()
        // player.gui('skills').open()

    },
    async prova(player: RpgPlayer){

    }
}

export default player