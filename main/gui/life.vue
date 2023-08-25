<template>
    <div class="container">
        <div class="row">
            <div class="value-container">
                HP: {{ hp }} / {{ maxHp }}
            </div>
        
            <div class="bar-container">
                <div class="bar hp">
                    <div class="inner-bar hp" :style="{ width }"></div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="value-container">
                MP: {{ mp }} / {{ maxMP }}
            </div>

            <div class="bar-container">
                <div class="bar mp">
                    <div class="inner-bar mp" :style="{ widthMP }"></div>
                </div>
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

.container {
    width: 270px;
    height: 50px;
    /* border: 1px solid white; */
    font-family: Helvetica;
    font-size:11px;
}

.row {
    width: 100px; 
    height: 25px;
}

.row {
    margin-top: 5px;
}
.value-container {
    width: 75px;
    /* border: 1px solid white;  */
    float: left;
}

.bar-container {
    float: left;
    width: 270px;
    /* border: 1px solid white; */
}
.bar {
    background-color: white;
    width: 100%;
}

.bar.hp {
    border: 2px solid #abdbf5;
}
.bar.mp {
    border: 2px solid #6090a8;
}
.inner-bar {
    height: 10px;
    position: relative;
    transition: width .5s linear;
}

.inner-bar.hp {
    background: #6394ad;
}
.inner-bar.mp {
    background: #39596e;
}
</style>