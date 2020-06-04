<template>
  <div>
    Etage {{ this.nbr }}
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    nbr: String
  }
}
</script>
