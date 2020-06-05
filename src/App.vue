<template>
    <div id="app">
        {{ waitingList }}
        <div class="container" v-for="stage in stages" :key="stage.value">
            <div class="row border-top pt-3 pb-3">
                <div class="col-6"><span v-if="stage.value === currentStage">X</span></div>
                <div class="col-6">
                    <Elevator v-if="floor.key === currentFloor"></Elevator>
                </div>
                <div class="col-6">
                    <Floor :current-floor="floor">{{ floor.name }}</Floor>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Floor from './components/Floor'
    import Elevator from './components/Elevator'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import {settings} from './config/settings'

    export default {
        name: 'App',
        components: {
            Floor,
            Elevator
        },
        mounted: function () {

            window.setInterval(() => {
                this.elevatorMove();
            }, settings.elevatorSpeed);

        },
        computed: {
            ...mapState('elevator', {
                currentFloor: state => state.currentFloor,
                waitingList: state => state.waitingList
            }),

            //Floors
            ...mapGetters('floors', {
                ReversedFloors: 'getReversedFloors'
            }),

        },
        methods : {
            elevatorMove: function(){
                this.$store.dispatch("elevator/elevatorMove")
            }
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