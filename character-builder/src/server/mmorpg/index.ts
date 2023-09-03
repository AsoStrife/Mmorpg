import { RpgServer, RpgModule, RpgServerEngine, RpgPlayer, RpgWorld, RpgPlugin } from '@rpgjs/server'
import { v4 as uuidv4 } from 'uuid';




@RpgModule<RpgServer>({
    hooks: {
        player: ['onAuth', 'onAuthFailed']
    },
    engine: {
        onStart(engine: RpgServerEngine) {
            const app = engine.app
            
            app.post('/', async (req, res, next) => {
            })

        }
    },
    player: {
        props: {
        },
        onConnected(player: RpgPlayer) {
            const { start } = player.server.globalConfig

            const gui = player.gui('rpg-title-screen')
            
            gui.on('login', async (body) => {
            })
            
            gui.open()
        }
    }
})
export default class RpgServerModule { }