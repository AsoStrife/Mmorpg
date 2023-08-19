<template>
    <div class="items-container" @keydown="handleShortcut">
        <div :class="['items-hud icon', setIconClass(item)]" v-for="item in items" v-bind:key="item" @click="usePotion">
            <div class="item-quantity">{{ item.nb}}</div>    
            <div class="item-name">{{ item.item.name}}</div>    
        </div>
    </div>
    
</template>

<script lang="ts">

import Pozione from '../database/Pozione'
import Granpozione from '../database/Granpozione'
import { RpgPlayer} from '@rpgjs/server'

export default {
    name: 'potions',
    inject: ['rpgCurrentPlayer', 'rpgKeypress', 'rpgSocket'],
    data() {
        return {
            items: [],
            
        }
    },
    mounted() {

        this.obsCurrentPlayer = this.rpgCurrentPlayer
            .subscribe(( { object } ) => {
                
                this.items = Object.values(object.items || [])

            })

        this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
            if (!control) return

            if (control.actionName == "one") {
                this.usePotion()
            }
        
        })
    },
    unmounted() {
        this.obsCurrentPlayer.unsubscribe()
    },
    methods: {
        setIconClass(obj) {
            switch(obj?.item?.id){
                case '96ab6ba0-3c7b-11ee-be56-0242ac120002': 
                    return 'potion'
                break
                case '674b2e00-3153-41de-9166-e6689efb6773': 
                    return 'hipotion'
                break
                case '8a02eea8-c9f3-4915-b105-f2bee51b884a': 
                    return 'ether'
                break
                default:
                    return 'potion'
            }
        },
        usePotion() {
            
            this.rpgSocket().emit('gui.interaction', {
                guiId: 'potions',
                name: 'useItem',
                data: '96ab6ba0-3c7b-11ee-be56-0242ac120002'
            })
            
            // plaayer.useItem('96ab6ba0-3c7b-11ee-be56-0242ac120002')
        },
        handleShortcut(event : any) {
            if (event.keyCode === 49) {
                this.usePotion()
            }
        }
    }
}

</script>

<style scoped>
@font-face {
    font-family: 'SpaceMission';
    src: url('./fonts/TechnoRaceItalic-eZRWe.otf') format('opentype'); 
}

.items-container {
    margin-left: 220px;
}
.items-hud {
    position: relative;
    width: 60px;
    height: 60px;
    float: left;
    background: #000;
    opacity: 0.8;
    font-size: 10px;
    border: 1px solid #fff;
    color: white;
    display: flex;
    flex-direction: column;
}

.item-name {
    font-family: 'Arial';
    margin-top: auto;
    text-align: right;
}

.item-quantity {
    font-family: 'SpaceMission';
    margin-bottom: auto;
    text-align: right;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
    font-size: 12px;
}

.icon {
    background-size: contain;
}
.potion {
    background-image: url('./imgs/potion.jpg');
}

.hipotion {
    background-image: url('./imgs/hi-potion.jpg');
}

.ether {
    background-image: url('./imgs/ether.jpg');
}


</style>