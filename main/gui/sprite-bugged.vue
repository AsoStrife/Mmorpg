<template>
    <div class="main-window">
        <div style="width: 20%; height: 100%;  border:1px solid #FFF; float: left; color: white;">
            <rpg-choice :choices="choices" :active="isCategoryActive" @selected="changeCategory"></rpg-choice>
        </div>

        <div style="width: 20%; height: 100%;  border:1px solid #FFF; float: left; color: white; margin-left: 1%;">
            <rpg-choice :choices="choices_2" :active="!isCategoryActive" @selected="changeItem"></rpg-choice>
        </div>

        <div style="width: 55%; height: 100%; border:1px solid #FFF; float: right; margin-left: 1%;">
            <div v-for="sprite in spritesheets" v-bind:key="sprite" class="spritesheet-preview" style="color: white;">
            asd
            </div>
        </div> 
    </div>
</template>

<script lang="ts">
import { LayoutObject } from '@rpgjs/types'
import { Control } from '@rpgjs/client'

export default {
    name: 'sprite', 
    inject: ['rpgEngine', 'rpgStage', 'rpgKeypress', 'rpgGuiClose', 'rpgCurrentPlayer', 'rpgResource', 'rpgGui', 'rpgGuiInteraction'],
    data() {
        return {
            graphics: [], 
            spritesheets: [] as string[],
            isCategoryActive: true,
            categoryIndex: 1,
            choices: [
                {
                    "text": "Sex",
                    "value": "sex",
                    "sub": [
                        {
                            "text": "Male",
                            "value": "PLAYER_BODY_male"
                        },
                        {
                            "text": "Male Muscolar",
                            "value": "PLAYER_BODY_muscolar"
                        },
                        {
                            "text": "Female",
                            "value": "PLAYER_BODY_female"
                        }
                    ]
                },
                {
                    "text": "Hair",
                    "value": "hair",
                    "sub": [
                        {
                            "text": "Afro",
                            "value": "PLAYER_HAIR_afro"
                        },
                        {
                            "text": "Dread",
                            "value": "PLAYER_HAIR_dread"
                        }
                    ]
                },
                {
                    "text": "Shirt",
                    "value": "shirt",
                    "sub": [
                        {
                            "text": "Blue",
                            "value": "PLAYER_SHIRT_blue"
                        },
                        {
                            "text": "Red",
                            "value": "PLAYER_SHIRT_red"
                        }
                    ]
                },
                {
                    "text": "Legs",
                    "value": "legs",
                    "sub": [
                        {
                            "text": "Purple",
                            "value": "PLAYER_LEGS_purple"
                        },
                        {
                            "text": "Yellow",
                            "value": "PLAYER_LEGS_yellow"
                        }
                    ]
                },
                {
                    "text": "Weapon",
                    "value": "weapon",
                    "sub": [
                        {
                            "text": "Blue",
                            "value": "PLAYER_WEAPON_blue"
                        },
                        {
                            "text": "Red",
                            "value": "PLAYER_WEAPON_red"
                        }
                    ]
                }
            ],
            choices_2 : []
        }
    },
    methods: {
        changeCategory(index) {
            this.categoryIndex = index
            this.isCategoryActive = false
            // Load second choices
            this.choices_2 = this.choices[index].sub
        },
        changeItem(index) {
            // TODO change item based on category index (this.categoryIndex)
            console.log(this.choices_2[index].value)    
        },
        mapSpritesheets(graphics: string[]): string[] {
            return graphics.map(
                graphic => this.rpgResource.spritesheets.get(graphic)?.image
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

                this.graphics = this.mapGraphics(obj.object.layout)
                this.spritesheets = this.mapSpritesheets(this.mapGraphics(obj.object.layout))

                console.log(this.graphics)
                console.log(this.spritesheets)
            })
            
            this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
            if (!control) return
            const name = control.actionName
            
            if (name == Control.Back) {
                if(this.isCategoryActive)
                    this.close()
                else{
                    this.isCategoryActive = !this.isCategoryActive
                    this.choices_2 = []
                }
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
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 95%;
    height: 93%;
    z-index: 150;
    background-color: #07111c;
    border: 3px solid #6394ad;
    opacity: 0.9;
    padding: 2%;
}

.spritesheet-preview {
    // border: 1px solid #6394ad;
    
    background-position: 0px 64px;
    
    width: 64px;
    height: 64px;
    position: relative;
    left: 45%;
    top: 25%;
    transform: scale(5);
}
</style>