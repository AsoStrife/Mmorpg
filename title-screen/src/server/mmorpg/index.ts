import { RpgServer, RpgModule, RpgServerEngine, RpgPlayer, RpgWorld, RpgPlugin } from '@rpgjs/server'
import Player from './model'
import { v4 as uuidv4 } from 'uuid';

declare module '@rpgjs/server' {
    export interface RpgPlayer {
        mongoId: string
    }
}

function Error401() {
    const error = new Error()
    error['status'] = 401
    return error
}

async function login(body) {
    const { nickname  } = body

    const obj = {
        nickname: nickname,
        _id: uuidv4(),
        data: undefined
    }
    return obj
}

const originalSaveMethod = RpgPlayer.prototype.save
RpgPlayer.prototype.save = function (): string {
    const json = originalSaveMethod.apply(this)
    Player.findByIdAndUpdate(this.mongoId, { data: json }).catch(err => {
        console.log(err)
    })
    return json
}

@RpgModule<RpgServer>({
    hooks: {
        player: ['onAuth', 'onAuthFailed']
    },
    engine: {
        onStart(engine: RpgServerEngine) {
            const app = engine.app
            
            app.post('/login', async (req, res, next) => {
                try {
                    const user = await login(req.body)
                    res.json(user)
                }
                catch (err: any) {
                    res.status((err).status || 500).json(err)
                }
            })

        }
    },
    player: {
        props: {
            mongoId: {
                $syncWithClient: false
            }
        },
        onConnected(player: RpgPlayer) {
            const { start } = player.server.globalConfig

            const gui = player.gui('rpg-title-screen')
            
            gui.on('login', async (body) => {
                try {
                    const user = await login(body)

                    const nickname = user.nickname
                    const playerIsAlreadyInGame = !!RpgWorld.getPlayers().find(p => {
                        const inMap = p.getCurrentMap()
                        return p.name == nickname && inMap
                    })
                    if (playerIsAlreadyInGame) {
                        throw new Error('PLAYER_IN_GAME')
                    }

                    player.mongoId = user._id

                    const ret: (undefined | boolean)[] = await player.server.module.emit('server.player.onAuth', [player, user.data, gui], true)


                    if (ret.some(r => r === false)) {
                        return
                    }

                    if (!user.data) {
                        player.name = user.nickname
                        if (start) {
                            if (start.map) player.changeMap(start.map)
                            if (start.hitbox) player.setHitbox(...(start.hitbox as [number, number]))
                            if (start.graphic) player.setGraphic(start.graphic)
                        }
                    }
                    else {
                        player.load(user.data)
                        player.canMove = true
                    }


                    gui.close()
                }
                catch (err: any) {
                    console.error(err)
                    let error = {}
                    if (err.status == 401) {
                        error = {
                            message: 'LOGIN_FAIL'
                        }
                    }
                    else {
                        error = {
                            message: err.message
                        }
                    }
                    player.server.module.emit('server.player.onAuthFailed', [player, error], true)
                    player.emit('login-fail', error)
                }
            })
            gui.open()
        }
    }
})
export default class RpgServerModule { }