<template>
    <div class="text-center">
        Etage {{ this.nbr }}
        <div class="btn-list row justify-content-center mt-2" >
            <button @click="addDestination(stage.value)" v-for="stage in stages" :key="stage.value" class="btn btn-info mr-1 btn-elevator">{{ stage.name }}</button>
        </div>
    </div>

</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: 'Stage',
        props: {
            nbr: Number
        },
        computed: {
            ...mapState('stages', {
                stages: state => state.stages
            }),
            ...mapState('elevator', {
                waitingList: state => state.waitingList,
            })
        },
        methods : {
            addDestination : function (stage) {
                this.$store.dispatch("elevator/addDestination", stage)
            }
        }
    }
</script>
