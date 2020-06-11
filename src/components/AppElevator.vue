<template>
    <!--Affichage de l'ascenseur-->
    <div class="elevator">
        <img :src="require('../assets/images/elevators/elevator_' + this.doors + '.svg')" alt="">
        <AppUsers :persons="this.dropoutList"></AppUsers>
    </div>
    <!--FIN : Affichage de l'ascenseur-->
</template>
<script>
    import {mapState} from 'vuex'
    import AppUsers from './AppUsers'

    export default {
        name: 'Elevator',
        components : {
          AppUsers
        },
        computed: {
            // VUEX
            //Elevator
            ...mapState('elevator', {
                doors: state => state.doors,
                dropoutList: state => state.dropoutList
            }),
        },
    }
</script>
<style lang="scss" scoped>
    .elevator {
        img {
            width: 150px;
            height: 150px;
        }
        .listDropout {
            margin-top: 20px;

            .person {
                width: 20px;
                height: 20px;
            }
        }
    }
</style>

