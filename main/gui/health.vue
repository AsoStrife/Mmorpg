<template>

    <div class="row justify-content-end">
        <div class="col-xs-6 col-sm-6 col-md-3 item-col" :class="{ 'hover-class': isPaninoHover }">
            <span class="align-top m-txt">{{this.panino?.nb ? this.panino?.nb : 0 }}</span>
            <img src="./imgs/potion.jpg" class="img-fluid col-5" />
            <span class="align-bottom m-txt"><strong>P</strong></span>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 item-col">
            <span class="align-top m-txt">{{this.birra?.nb ? this.birra?.nb : 0 }}</span>
            <img src="./imgs/ether.jpg" class="img-fluid col-5" />
            <span class="align-bottom m-txt"><strong>B</strong></span>
        </div>
        
        <!-- <div class="col-xs-6 col-sm-6 col-md-3 item-col">
            <img src="./imgs/potion.jpg" class="img-fluid col-5" />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-3 item-col">
            <img src="./imgs/potion.jpg" class="img-fluid col-5" />
        </div> -->

    </div>
    
    
</template>

<script lang="ts">

import Panino from '../database/Panino'
import Birra from '../database/Birra'

export default {
    name: 'health',
    inject: ['rpgCurrentPlayer', 'rpgKeypress', 'rpgSocket'],
    data() {
        return {
            items: [],
            panino: {},
            isPaninoHover: false, 
            birra: {}
            
        }
    },
    mounted() {

        this.obsCurrentPlayer = this.rpgCurrentPlayer
            .subscribe(( { object } ) => {
                this.items = Object.values(object.items || [])
                this.panino = this.items.filter(i => i.item.id == '96ab6ba0-3c7b-11ee-be56-0242ac120002')[0]
                this.birra = this.items.filter(i => i.item.id == '8a02eea8-c9f3-4915-b105-f2bee51b884a')[0]
            })

        this.obsKeyPress = this.rpgKeypress.subscribe(({ inputName, control }) => {
            if (!control) return

            if (control.actionName == "potion") {
                this.useP()
                this.isPaninoHover = true
                
                setTimeout(() => {
                    this.isPaninoHover = false;
                }, 200)
            }

            if (control.actionName == "b") {
                this.useB()
            }
        
        })
    },
    unmounted() {
        this.obsCurrentPlayer.unsubscribe()
    },
    methods: {
        
        useP() {
            
            this.rpgSocket().emit('gui.interaction', {
                guiId: 'health',
                name: 'useItem',
                data: '96ab6ba0-3c7b-11ee-be56-0242ac120002'
            })
            
        },
        useB() {
            
            this.rpgSocket().emit('gui.interaction', {
                guiId: 'health',
                name: 'useItem',
                data: '8a02eea8-c9f3-4915-b105-f2bee51b884'
            })
            
        }
    }
}

</script>

<style scoped lang="scss">
$title-screen-window-bg: #07111c;
$title-screen-window-border: 2px solid #0dcaf0;

@font-face {
    font-family: 'SpaceMission';
    src: url('./fonts/TechnoRaceItalic-eZRWe.otf') format('opentype'); 
}

.item-col {
    // border: 1px solid white;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.5s ease;
}

.item-col:hover {
    background-color: #416884;
}

.hover-class {
    background-color: #416884;
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

.ether {
    background-image: url('./imgs/ether.jpg');
}

.m-txt {
    margin-left: 5px;
    margin-right: 5px;
}

</style>