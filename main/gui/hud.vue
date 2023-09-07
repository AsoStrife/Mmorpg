<template>
    <div class="container">
        <div class="row justify-content-end fixed-bottom">
            <div class="col-4 hud mr-1">
                <name></name>
            </div>
        </div>
        <div class="row">
            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
        </div>
    </div>

    <!-- <div class="hud">
        <div class="name-container">
            <name></name>
        </div>
        
        <div class="life-container">
            <life></life>
        </div>
    </div> -->

</template>

<script>
import life from './life.vue'
import name from './name.vue'
import 'bootstrap/dist/css/bootstrap.css'

export default {
    name: 'hud',
    data() {
        return {
            
        }
    }
}
</script>

<style scoped lang="scss">

$title-screen-window-bg: #07111c;
$title-screen-window-border: 2px solid #0dcaf0;
.hud {
    background-color: $title-screen-window-bg;
    border: $title-screen-window-border;
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