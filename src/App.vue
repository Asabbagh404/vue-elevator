<template>
    <div id="app">
        <div>retrait  : {{ pickupList }}</div>
        <div>dépot  : {{ dropoutList }}</div>
        <div>etage actuel  : {{ currentFloor }}</div>
        <div>direction : {{ direction }} </div>
        <div class="container">
            <AppConfig
                :floors="floors"
            />
            <div class="row border-top pt-3 pb-3" v-for="floor in ReversedFloors" :key="floor.key">
                <div class="col-6">
                    <AppElevator v-if="floor.key === currentFloor.key"></AppElevator>
                </div>
                <div class="col-6">
                    <AppFloor :current-floor="floor">{{ floor.name }}</Appfloor>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppFloor from './components/AppFloor'
    import AppElevator from './components/AppElevator'
    import AppConfig from './components/AppConfig'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import {settings} from './config/settings'

    export default {
        name: 'App',
        components: {
            AppFloor,
            AppElevator,
            AppConfig
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
            ...mapState('floors', {
                floors: state => state.floors
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