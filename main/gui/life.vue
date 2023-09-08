<template>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-xl-3">
                HP: {{ hp }} / {{ maxHp }}
            </div>
        
            <div class="col-sm-12 col-md-12 col-xl-9">
                <div class="bar hp">
                    <div class="inner-bar hp" :style="widthHP"></div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-12 col-md-12 col-xl-3">
                MP: {{ mp }} / {{ maxMP }}
            </div>

            <div class="col-sm-12 col-md-12 col-xl-9">
                <div class="bar mp">
                    <div class="inner-bar mp" :style="widthMP"></div>
                </div>
            </div>
        </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

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
        widthHP() {
            return {
                width: ((this.hp / this.maxHp) * 100) + '%'
            }
        },
        widthMP() {
            return {
                width: ((this.mp / this.maxMP) * 100) + '%'
            }
        }
    },
    unmounted() {
        this.obsCurrentPlayer.unsubscribe()
    }
}
</script>

<style scoped>


.bar-container {
    float: left;
    width: 270px;
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