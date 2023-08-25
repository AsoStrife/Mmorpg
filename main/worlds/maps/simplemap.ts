import { MapData, RpgMap, RpgPlayer } from '@rpgjs/server'
import Mob  from '../../events/mob'
import { Spawn } from '../../utils/Spawn'

@MapData({
     id: 'simplemap',
     file: require('./simplemap.tmx')
})

class TownMap extends RpgMap {
    // When the player enters the map
    onEnter(player: RpgPlayer) {
        const spawns = new Spawn(this.getShapes(), this)
        spawns.populate()
    }
    
    // When the player leaves the map
    onLeave(player: RpgPlayer) {}
    

}