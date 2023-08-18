<template>
    <div class="hud">
        <life></life>
        <potions></potions>
    </div>

</template>

<script>
import life from './life.vue'
import potions from './potions.vue'
import skills from './skills.vue'

export default {
    name: 'hud',
    data() {
    }
}
</script>

<style scoped>
@font-face {
    font-family: 'SpaceMission';
    src: url('./fonts/TechnoRaceItalic-eZRWe.otf') format('opentype'); 
}
.hud {
    position: absolute; 
    width: 100%; 
    height: 60px;
    bottom: 0px; 
    left: 0px; 
    background: rgb(15, 4, 167);
    background-image: url('./imgs/hud.jpg');
    background-repeat: repeat;
    background-size: contain;
    opacity: 0.9;
    font-family: 'SpaceMission';
    border: 2px solid #fff;
    color: white;
}
</style>