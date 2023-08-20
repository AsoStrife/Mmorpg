import { Components, EventData, Move, Presets, RpgEvent, Speed } from '@rpgjs/server';

// @ts-ignore
@EventData({
    name: 'flying-eye',
    hitbox: {
        width: 32,
        height: 48
    }
})
export default class FlyingEye extends RpgEvent {
    onInit() {
        this.through = false;
        this.throughOtherPlayer = false;

        this.addParameter(Presets.MAXHP, {
            start: 100,
            end: 100,
        });
        this.recovery({ hp: 1 });

        this.setComponentsTop([
            Components.hpBar(),
        ]);

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 7
            }
        }

        this.setGraphic('flying-eye');
        this.speed = Speed.Slow;
        this.infiniteMoveRoute([
            Move.tileRandom()
        ])
    }
}