import { Move, RpgPlayer } from "@rpgjs/server";
import { timer } from "rxjs";
import KillableMob from "../../enemies/mobs/KillableMob";

export default class FollowManager {
    stuck: boolean = false;

    follow(victim: KillableMob, attacker: RpgPlayer) {
        victim.breakRoutes(true);
        victim.stopMoveTo();

        this.followPayer(victim, attacker);
        timer(60000).subscribe({
            next: () => this.stopFollow(victim)
        })
    }

    stopFollow(victim: KillableMob) {
        this.moveRandomly(victim)
        victim.stopFight();
    }

    followPayer(victim: KillableMob, attacker: RpgPlayer) {
        victim.moveTo(attacker).subscribe();
    }

    moveRandomly(victim: RpgPlayer) {
        victim.stopMoveTo();
        victim.breakRoutes(true);
        victim.infiniteMoveRoute([
            Move.tileRandom()
        ]);
    }

    
}