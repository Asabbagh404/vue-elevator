<template>
    <div class="text-center">
        <slot></slot>
        <div class="btn-list row justify-content-center mt-2">
            <!--Generation des boutons d'étages-->
            <button @click="addPickupPoint({from : currentFloor.key, to: floor.key, pathDirection : currentFloor.key - floor.key > 0 ? 'down' : 'up' })" v-for="floor in floors" :key="floor.key"
                    class="btn btn-info mr-1 btn-elevator"
                    v-show="floor.key !== currentFloor.key">
                {{ floor.key }}
            </button>
            <!--FIN - Generation boutons d'étages-->
        </div>
        <!--Generation des icons personnes-->
       <div class="d-flex listPickup">
           <span v-for="person in this.pickupList" :key="person.from">
               <img v-if="person.from === currentFloor.key" src="../assets/images/user.svg" class="person" alt="Jean" >
           </span>
       </div>
        <!--FIN : Generation des icons personnes-->
   </div>

</template>

<script>
   import {mapState, mapActions} from 'vuex'

   export default {
       name: 'Floor',
       props: {
           // Etage actuel
           currentFloor: Object
       },
       computed: {
           ...mapState('floors', {
               floors: state => state.floors
           }),
           ...mapState('elevator', {
               pickupList : state => state.pickupList
           })
       },
       methods: {
           ...mapActions('elevator', {
               addPickupPoint: 'addPickupPoint'
           }),
       }
   }
</script>

<style lang="scss" scoped>
    .btn-elevator{
        width: 40px;
    }
       .listPickup {
           margin-top: 20px;
           .person {
               width: 20px;
               height: 20px;
           }
       }
</style>
