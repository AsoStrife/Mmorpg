<template>
    <div v-bind:class="getClass()">
        <h1>{{ name }}</h1>
    </div>
</template>

<script>

export default {
    name: 'name',
    inject: ['rpgCurrentPlayer'],
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        this.obsCurrentPlayer = this.rpgCurrentPlayer
            .subscribe(({ object }) => {
                this.name = object.name
            })
    },
    methods: {
        getClass() {
            return this.name == '' ? 'container-10' : 'container-20'
        }
    },
    unmounted() {
        this.obsCurrentPlayer.unsubscribe()
    }
}
</script>

<style scoped>

    .container-10 {
        height: 10px;
    }
    .container-20 {
        height: 20px;
    }

    h1 {
        /* font-family: 'SpaceMission'; */
        font-family: Helvetica;
        color: white;
        font-size: 13px;
        margin: 3px;
        font-weight: 700;
    }
</style>