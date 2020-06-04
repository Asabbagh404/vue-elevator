<template>
    <div id="app">
        {{ waitingList }}
        <div class="container" v-for="stage in stages" :key="stage.value">
            <div class="row border-top pt-3 pb-3">
                <div class="col-6"><span v-if="stage.value === currentStage">X</span></div>
                <div class="col-6">
                    <Stage :nbr="stage.name"></Stage>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Stage from './components/Stage'
    import {mapState} from 'vuex'


    export default {
        name: 'App',
        components: {
            Stage
        },
        computed: {
            ...mapState('elevator', {
                currentStage: state => state.currentStage,
                waitingList : state =>state.waitingList
            }),
            ...mapState('stages', {
                stages: state => state.stages
            })
        },
        data() {
            return {}
        }
    }
</script>
<style lang="scss">
    /* Ajout de tous les CSS */
    @import "./assets/styles/init.scss";
</style>