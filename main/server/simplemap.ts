import { MapData, RpgMap, RpgPlayer } from '@rpgjs/server'
import Mob  from '../events/mob'
import { Spawner } from '../utils/Spawner'
import { getMobsOnMapCount, getMobsOnMap } from '../utils/utils'

const MobSpawnList: NPC = {
    'mob': {
        class: Mob,
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
    // When the player enters the map
    onEnter(player: RpgPlayer) {
        console.log("onEnter")
    }
    
    onLoad() {
        console.log("Onload")
        const spawner = new Spawner(this, MobSpawnList);

        setInterval(() => {
            const mobs = getMobsOnMapCount(this)
            spawner.populate(mobs)

            console.log("Spawno un mostro")
        }, 6 * 1000)

        spawner.populate({});
    }

    // When the player leaves the map
    onLeave(player: RpgPlayer) {}
    

}