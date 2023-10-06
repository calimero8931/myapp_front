<template>
  <v-container>
    <v-btn
      small
      plain
      color="primary"
    >
      <v-icon
        left
      >
        mdi-chevron-double-left
      </v-icon>
      ここはaccount.vueの領域
    </v-btn>
    <nuxt-child />
  </v-container>
</template>

<script>
export default {
  name: 'public-profile',
  layout: 'logged-in',
  comments: {

  },
  validate({ route }) {
    return route.name !== 'public-profile'
  },
  data () {
    return {
      dashboardPath: 'project-id-dashboard'
    }
  }
}
</script>