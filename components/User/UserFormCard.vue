<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >

      <v-card
        flat
        width="100%"
        max-width="320"
        color="transparent"
      >
        <slot name="user-form-card-content" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data ({ $route, $config: { appName }, $my }) {
    return {
      appName,
      pageTitle: $my.pageTitle($route.name)
    }
  }
}
</script>