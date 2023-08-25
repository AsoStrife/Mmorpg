import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'

// const graphics = ['pale-green-body', 'pale-green-head', 'pale-green-wings', 'pale-green-wings-fg', 'dark-grey-coat', 'boots-black', 'hood-black']
const graphics = ['aso']
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
            player.showAnimation(graphics, 'attack', true)

            const otherPlayers = player.otherPlayersCollision
            
            for (let otherPlayer of otherPlayers) {
                if(otherPlayer.type == 'event'){
                    otherPlayer.hp -= 10
                    if (otherPlayer.hp <= 0) {
                        const map = player.getCurrentMap()
                        map.removeEvent(otherPlayer.id)
                    }
                }
            }

        }

        if (input === Control.Skill) {
            player.showAnimation(graphics, 'skill', true)
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
        player.gui('hud-2').open()
    }
}

export default player