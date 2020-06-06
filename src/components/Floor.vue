<template>
    <div class="text-center">
        Etage
        <slot></slot>
        <div class="btn-list row justify-content-center mt-2">
            <button @click="addDestination(currentFloor.key)" v-for="floor in floors" :key="floor.key"
                    class="btn btn-info mr-1 btn-elevator"
                    v-show="floor.name !== currentFloor.name">
                {{ floor.name }}
            </button>
        </div>
        <div v-for="person in this.pickupList" :key="person.from" class="d-flex listPickup">
            <img v-if="person.from === currentFloor.key" src="../assets/images/user.svg" class="person" alt="Jean" >
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'Floor',
        props: {
            currentFloor: Object
        },
        computed: {
            ...mapState('floors', {
                floors: state => state.floors
            }),
            ...mapState('elevator', {
                waitingList: state => state.waitingList,
            })
        },
        methods: {

            addDestination: function (currentFloor) {
                this.$store.dispatch("elevator/addDestination", currentFloor);

            }
        }
    }
</script>

<style lang="scss" scoped>
        .listPickup {
            margin-top: 20px;
            .person {
                width: 20px;
                height: 20px;
            }
        }
</style>
