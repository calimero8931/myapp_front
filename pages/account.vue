<template>
  <v-container>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'AccountPage',
  layout: 'logged-in',
  comments: {

  },
  validate({ route }) {
    return route.name !== 'account'
  },
  data () {
    return {
      dashboardPath: 'project-id-dashboard'
    }
  }
}
</script>