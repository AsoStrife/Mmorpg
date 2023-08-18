<template>
    <div class="pg-hud">
        <!-- <h1>{{ name }}</h1> -->

        <div class="health-bar">
            <!-- <p>{{ hp }} / {{ maxHp }}</p> -->
            <div class="bar">
                <div class="inner-bar" :style="{ width }"></div>
            </div>
        </div>

        <div class="health-bar">
            <!-- <p>{{ mp }} / {{ maxMP }}</p> -->
            <div class="bar">
                <div class="inner-bar-mp" :style="{ widthMP }"></div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'life',
    inject: ['rpgCurrentPlayer'],
    data() {
        return {
            name: '',
            hp: 0,
            maxHp: 0,
            mp: 0, 
            maxMP: 0
        }
    },
    mounted() {
        this.obsCurrentPlayer = this.rpgCurrentPlayer
            .subscribe(({ object }) => {
                this.name = object.name
                this.hp = object.hp
                this.maxHp = object.param.maxHp
                this.mp = object.sp
                this.maxMP = object.param.maxSp

            })
    },
    computed: {
        width() {
            return ((this.hp / this.maxHp) * 100) + '%'
        },
        widthMP() {
            return ((this.mp / this.maxMP) * 100) + '%'
        }
    },
    unmounted() {
        this.obsCurrentPlayer.unsubscribe()
    }
}
</script>

<style scoped>
@font-face {
    font-family: 'SpaceMission';
    src: url('./fonts/TechnoRaceItalic-eZRWe.otf') format('opentype'); 
}
.pg-hud {
    position: absolute; 
    width: 200px; 
    height: 60px; 
    left: 0px; 
    padding-left: 10px;
    padding-right: 10px;
    opacity: 0.8;
    color: white;
    border-right: 1px solid white;
}

h1 {
    font-size: 20px;
    padding: 0;
    margin: 0;
    color: white;
}
.health-bar {
    width: 100%;
}
.health-bar:first-child {
    margin-top: 15px; 
}


.health-bar:not(:first-child) {
    margin-top: 10px; 
}

.health-bar p {
    font-size: 15px;
    margin: 5px;
    font-weight: bold;
}

.bar {
    background-color: white;
    border: 2px solid black;
    position: relative;
}

.inner-bar {
    background: #c54;
    height: 10px;
    position: relative;
    transition: width .5s linear;
}

.inner-bar-mp {
    background: rgb(68, 88, 204);
    height: 10px;
    position: relative;
    transition: width .5s linear;
}
</style>