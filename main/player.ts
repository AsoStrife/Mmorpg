import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'

// const graphics = ['pale-green-body', 'pale-green-head', 'pale-green-wings', 'pale-green-wings-fg', 'dark-grey-coat', 'boots-black', 'hood-black']
const graphics = ['PLAYER_BODY_male', 'PLAYER_HEAD_male']

const player: RpgPlayerHooks = {
    props: {
        graphics: String
    },
    onConnected(player: RpgPlayer) {
        player.name = ''
        player.setComponentsTop(Components.text('{name}'))
        player.setGraphic(graphics)
    },
    onInput(player: RpgPlayer, { input }) {
        if (input == Control.Back) {
            // player.callMainMenu()
            player.gui('sprite').open()
        }

        if (input === Control.Attack) {
            player.showAnimation(graphics, 'attack', true)

            const otherPlayers = player.otherPlayersCollision
            
            for (let otherPlayer of otherPlayers) {
                if(otherPlayer.type == 'mob'){
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

        const healthGui = player.gui('health')
        healthGui.on('useItem', (id) => {
            try {
                player.useItem(id)
            }
            catch (err) {
                console.log(err)
            }
        })

        const spriteGui = player.gui('sprite')

        spriteGui.on('changeGraphics', (data) => {
            player.setGraphic(data)
        })

    },
    async onJoinMap(player: RpgPlayer) {
        player.gui('hud').open()
    }
}

export default player