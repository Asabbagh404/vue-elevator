<template>
  <div id="app">
    <div class="container" v-for="stage in stages" :key="stage">
      <div class="row border-top pt-3 pb-3">
        <div class="col-6"></div>
        <div class="col-6"><Stage :nbr="stage"></Stage></div>
      </div>
    </div>
  </div>
</template>

<script>
import Stage from './components/Stage'
export default {
  name: 'App',
  components: {
    Stage
  },
  computed : {
  },
  data() {
    return {
      stages : [0,1,2,3,4,5,6],

      elevator: {
        currentStage : ''
      }
    }
  }
}
</script>
<style lang="scss">
    /* Ajout de tous les CSS */
    @import "./assets/styles/init.scss";
</style>