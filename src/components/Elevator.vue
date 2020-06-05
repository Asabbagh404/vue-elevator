<template>
    <div class="elevator">
        <img :src="require('../assets/images/elevator/elevator_' + this.mode + '.svg')" alt="">
    </div>
</template>
<script>

    import {mapState} from 'vuex'

    export default {
        name: 'Elevator',
        computed: {
            // VUEX
                //Elevator
            ...mapState('elevator', {
                mode: state => state.mode,
            }),
        },
    }
</script>

