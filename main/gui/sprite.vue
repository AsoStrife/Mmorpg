<template>
    <div class="main-window" style="z-index: 150; height: 100%;">
            asd
            <rpg-choice :choices="choices" @selected="selected"></rpg-choice>
            <!-- <div class="box" v-if="spritesheets">
                <div v-for="sprite in spritesheets" v-bind:key="sprite" class="spritesheet-preview" :style="spritesheet(sprite)"></div>
            </div> -->
    </div>
</template>

<script lang="ts">
import { LayoutObject } from '@rpgjs/types';
import { Control } from '@rpgjs/client'

export default {
    name: 'sprite', 
    inject: ['rpgEngine', 'rpgStage', 'rpgKeypress', 'rpgGuiClose', 'rpgCurrentPlayer', 'rpgResource', 'rpgGui', 'rpgGuiInteraction'],
    data() {
        return {
            spritesheets: [] as string[],
            choices: [ 
                { text: 'One', value: 1 }, 
                { text: 'Two', value: 2 } 
            ]
        }
    },
    methods: {
        mapSpritesheets(graphics: string[]): string[] {
            return graphics.map(
                graphic => this.rpgResource.spritesheets.get(graphic + '')?.image
            ).filter(sprite => !!sprite);
        },
        mapGraphics(layout: LayoutObject<any>): string[] {
            if (!layout || !layout.center || !layout.center.lines) return [];

            return layout.center.lines.map(
                line => line.col.map(
                    col => col.value
                )
            );
        },
        spritesheet(sprite: string) {
            // return sprite
            return {
                'background-image': `url(${sprite})`,
            }
        },
        close() {
            this.rpgGuiClose()
            this.rpgEngine.controls.listenInputs()
            if (this.rpgGui.exists('rpg-controls')){
                this.rpgGui.display('rpg-controls') 
            }
        }
    },
    mounted() {
        if (this.rpgGui.exists('rpg-controls')) 
            this.rpgGui.hide('rpg-controls') 
        
        this.rpgEngine.controls.stopInputs()

        this.obsCurrentPlayer = this.rpgCurrentPlayer
            .subscribe((obj: any) => {
                if (!obj || !obj.object) 
                    return

                this.spritesheets = this.mapSpritesheets(this.mapGraphics(obj.object.layout))
            })
            
            this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
            if (!control) return
            const name = control.actionName
            
            if (name == Control.Back) {
                this.close()
            }
            
        })
    },
    unmounted() {
        this.obsKeyPress.unsubscribe()
        this.obsCurrentPlayer.unsubscribe()
    }
}
</script>

<style lang="scss">
.main-window {
    width: 100%;
    height: 100%;
    z-index: 150;
    background-color: $window-background;
    border: $window-border;
    border-radius: $window-border-radius;
}

.spritesheet-preview {
    border: 1px solid #000;
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    background-position: 0px 64px;
}
</style>