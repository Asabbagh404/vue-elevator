<template>
    <!--Affichage de l'ascenseur-->
        <div class="d-flex listPerson">
            <img src="../assets/images/user.svg" class="person" alt="Jean" v-for="person in this.persons"
                 :key="person.to">
        </div>
    <!--FIN : Affichage de l'ascenseur-->
</template>
<script>
    export default {
        name: 'Users',
        props:{
            persons : {type : [Array, Object], required : true},
        }
    }
</script>
<style lang="scss" scoped>
    .listPerson {
        margin-top: 20px;
        .person {
            width: 20px;
            height: 20px;
        }
    }
</style>

