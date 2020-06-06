<template>
    <div id="app">
        <div>retrait  : {{ pickupList }}</div>
        <div>dépot  : {{ dropoutList }}</div>
        <div>etage actuel  : {{ currentFloor }}</div>
        <div>direction : {{ direction }} </div>
        <br>
        <div class="container">
            <div class="row border-top pt-3 pb-3" v-for="floor in ReversedFloors" :key="floor.key">
                <div class="col-6">
                    <Elevator v-if="floor.key === currentFloor.key"></Elevator>
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
            // VUEX
            //Elevator
            ...mapState('elevator', {
                currentFloor: state => state.currentFloor,
                pickupList: state => state.pickupList,
                dropoutList: state => state.dropoutList,
                direction : state => state.direction

            }),

            //Floors
            ...mapGetters('floors', {
                ReversedFloors: 'getReversedFloors'
            }),

        },
        methods: {
            ...mapActions('elevator', {
                elevatorMove: 'elevatorMove'
            }),
        },
        data() {
            return {}
        },

    }
</script>
<style lang="scss">
    @import "./assets/styles/init.scss";
</style>