<template>
    <div class="hud">
        <div class="name-container">
            <name></name>
        </div>
        
        <div class="life-container">
            <life></life>
        </div>
    </div>

</template>

<script>
import life from './life.vue'
import name from './name.vue'

export default {
    name: 'hud-2',
    data() {
        return {
            
        }
    }
}
</script>

<style scoped>
.hud {
    position: absolute; 
    width: 350px; 
    height: 150px;
    top: 0px; 
    left: 0px; 
    background-image: url('./imgs/hud-v2.png');
    background-repeat: no-repeat;
    background-size: contain;
    font-family: 'SpaceMission';
    /* border: 2px solid #fff; */
    color: white;
    
}

.name-container {
    width: 180px;
    margin-top: 25px; 
    margin-left: 50px;
    margin-right: auto;
    margin-bottom:0px;
    /* transform-origin: 34% 50%;
    transform: rotateY(5deg) skewX(-15deg); */
}

.life-container {
    width: 180px;
    margin-top: 0px; 
    margin-left: 50px;
    margin-right: auto;
    /* transform-origin: 34% 50%;
    transform: rotateY(5deg) skewX(-15deg); */
}

</style>