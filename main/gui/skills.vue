<template>
    <!-- <div class="items-container">
        <div :class="['items-hud icon', setIconClass(item)]" v-for="item in items" v-bind:key="item">
            <div class="item-quantity">{{ item.nb}}</div>    
            <div class="item-name">{{ item.item.name}}</div>    
        </div>
    </div> -->
    <div></div>
</template>

<script>



export default {
    name: 'skills',
    
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