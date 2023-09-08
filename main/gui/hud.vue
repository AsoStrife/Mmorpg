<template>
    <div class="container-fluid">
        <div class="row justify-content-start fixed-top">
            
            <div class="row">
                <div class="col-xs-5 col-md-4 col-lg-3 hud hud-padding mr-1">

                    <div class="row">
                        <div class="col-12">
                            <name></name>
                        </div>
                    </div> <!-- / .row -->
                    
                    <div class="row">
                        <div class="col-12">
                            <life></life>
                        </div>
                    </div> <!-- / .row -->

                </div>
            </div> <!-- / .row -->

            <div class="row">
                <div class="col-xs-5 col-md-5 col-lg-3 hud">
                    <health></health>
                </div>
            </div> <!-- / .row -->
        </div> <!-- / .row -->
    </div> <!-- / .container -->
</template>

<script>
import life from './life.vue'
import name from './name.vue'
import health from './health.vue'

import 'bootstrap/dist/css/bootstrap.css'

export default {
    name: 'hud',
    data() {
        return {
            
        }
    },
    components: {
        life, 
        name
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
    margin-top: 5px;
    margin-left: 20px;
    opacity: 0.8;
    font-size: 13px;
}

.hud-padding {
    padding-top: 7px;
    padding-bottom: 7px;
}
</style>