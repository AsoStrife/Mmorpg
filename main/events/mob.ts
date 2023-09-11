import { Components, EventData, Move, Presets, RpgEvent, Speed } from '@rpgjs/server';

// @ts-ignore
@EventData({
    name: 'Gaggio',
    hitbox: {
        width: 32,
        height: 48
    }
})
export default class Mob extends RpgEvent {
    type = 'mob';

    onInit() {
        this.through = false;
        this.throughOtherPlayer = false;

        this.addParameter(Presets.MAXHP, {
            start: 10,
            end: 10,
        });
        this.recovery({ hp: 1 });

        this.setComponentsTop([
            Components.hpBar({}, '{name}')
        ], {
            marginBottom: -10
        }
        );

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 7
            }
        }

        this.setGraphic(['NPC_gaggio'])
        this.speed = Speed.Slow
        this.infiniteMoveRoute([
            Move.tileRandom()
        ])
    }
}