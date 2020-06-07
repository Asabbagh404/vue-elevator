<template>
    <!--Affichage de l'ascenseur-->
    <div class="elevator">
        <img :src="require('../assets/images/elevators/elevator_' + this.doors + '.svg')" alt="">
        <div class="d-flex listDropout">
            <img src="../assets/images/user.svg" class="person" alt="Jean" v-for="person in this.dropoutList" :key="person">
        </div>
    </div>
    <!--FIN : Affichage de l'ascenseur-->
</template>
<script>

    import {mapState} from 'vuex'

    export default {
        name: 'Elevator',
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

