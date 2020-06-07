<template>
<!--    Système de configuration : Ajout et suppression d'étage-->
    <div class="config pb-3 pt-3">
        <h4>Configuration</h4>
        <p class="mt-4 ">Nombre d'étages</p>
        <div class="d-flex justify-content-center">
            <button class="btn btn-success" @click="removeFloor">-</button>
            <div class="config-text ml-2 mr-2">{{ floors.length }}</div>
            <button class="btn btn-success" @click="addFloor">+</button>
        </div>

    </div>
    <!--    FIN : Système de configuration-->
</template>
<script>
    export default {
        name: 'App',
        props: {
            floors: {
                type : Array,
                required : true,
            }
        },
        methods: {
            addFloor: function () {
                this.$store.dispatch("floors/addFloor");
            },
            removeFloor: function () {
                this.$store.dispatch("floors/removeFloor");
            }
        }
    }
</script>

<style lang="scss" scoped>
    div.config {
        position: absolute;
        top: 0;
        right: 0;
        width: 200px;
        background: #4d4d4d;
        text-align: center;

        .config-text {
            font-size: 25px
        }
    }
</style>