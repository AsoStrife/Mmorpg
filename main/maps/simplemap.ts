import { MapData, RpgMap, RpgPlayer } from '@rpgjs/server'
import Gaggio  from '../events/mob/gaggio'
import { Spawner } from '../utils/Spawner'
import { getMobsOnMapCount, getMobsOnMap } from '../utils/utils'

const MobSpawnList: NPC = {
    'Gaggio': {
        class: Gaggio,
        hitbox: {
            width: 64,
            height: 64,
        }
    }
}

@MapData({
    id: 'simplemap',
    file: require('../worlds/maps/simplemap.tmx')
})

export default class simplemap extends RpgMap {

    
    onLoad() {
        const spawner = new Spawner(this, MobSpawnList);

        setInterval(() => {
            const mobs = getMobsOnMapCount(this)
            spawner.populate(mobs)
        }, 6 * 1000)
    }

    // When the player leaves the map
    onLeave(player: RpgPlayer) {}
    

}