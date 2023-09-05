import { RpgPlayer, RpgPlayerHooks, Control, Components } from '@rpgjs/server'

// const graphics = ['pale-green-body', 'pale-green-head', 'pale-green-wings', 'pale-green-wings-fg', 'dark-grey-coat', 'boots-black', 'hood-black']
const graphics = ['PLAYER_BODY_male', 'PLAYER_HAIR_afro', 'PLAYER_SHIRT_red', 'PLAYER_LEGS_purple', 'PLAYER_WEAPON_blue']
// const graphics = ['PLAYER_HAIR_afro', 'PLAYER_SHIRT_red', 'PLAYER_LEGS_purple', 'PLAYER_WEAPON_blue']
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