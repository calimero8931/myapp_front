<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  layout: 'project',
  data () {
    return {
      drawer: null
    }
  }
}
</script>