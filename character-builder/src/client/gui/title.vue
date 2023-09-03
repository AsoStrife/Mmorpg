<template>
    <div>
        RPG Character Builder
    </div>
</template>

<script lang="ts">
import { Control } from '@rpgjs/client'

const name = 'rpg-title-screen'

export default {
    name,
    inject: ['rpgEngine', 'rpgGui', 'rpgGuiInteraction', 'rpgKeypress', 'rpgSound'],
    data() {
        return {
            step: 'title',
            title: ''
        }
    },
    mounted() {
        const { titleScreen } = this.rpgEngine.globalConfig
        
        this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
            if (!control) return
            if (control.actionName == Control.Back) {
                this.step = 'title'
            }
        })
    },
    unmounted() {
        this.obsKeyPress.unsubscribe()
    },
    methods: {
    },
    computed: {
        
    }
}
</script>

<style scoped lang="scss">

</style>