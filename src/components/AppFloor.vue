<template>
    <div class="text-center">
        <slot></slot>
        <div class="btn-list row justify-content-center mt-2">
            <!--Generation des boutons d'étages-->
            <button @click="addPickupPoint({from : currentFloor.key, to: floor.key, pathDirection : currentFloor.key - floor.key > 0 ? 'down' : 'up' })"
                    v-for="floor in floors" :key="floor.key"
                    v-show="floor.key !== currentFloor.key"
                    class="btn btn-info mr-1 btn-elevator"
            >
                {{ floor.key }}
            </button>
            <!--FIN - Generation boutons d'étages-->
        </div>
        <!--Generation des icons personnes-->
       <div v-if="this.pickupList.filter(person => person.from === currentFloor.key).length > 0">
           <AppUsers :persons="this.pickupList.filter(person => person.from === currentFloor.key)"></AppUsers>
       </div>
        <!--FIN : Generation des icons personnes-->
   </div>

</template>

<script>
   import {mapState, mapActions} from 'vuex'
   import AppUsers from './AppUsers'

   export default {
       name: 'Floor',
       components : {
         AppUsers
       },
       props: {
           // Etage actuel
           currentFloor: { type : Object, required : true }
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
