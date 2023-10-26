<template>
  <div>
    <div :style="{ marginTop: `${height}px`}">
      <v-footer
        absolute
        dark
        color="black"
        :height="height"
      >
        <v-col
            cols="6"
            class="py-0"
          >
          <nuxt-link
            :to="{ name: 'contact' }"
            style="text-decoration: none; color: white!important; font-size: 12px;"
          >
          <v-icon>mdi-email-outline</v-icon>
              お問い合わせ
          </nuxt-link>
        </v-col>
        <v-col
            cols="6"
            class="py-0"
          >
          <nuxt-link
            :to="{ name: 'privacy' }"
            style="text-decoration: none; color: white!important; font-size: 12px;"
          >
          <v-icon>mdi-lock</v-icon>
              プライバシーポリシー
          </nuxt-link>
        </v-col>
        <v-col
          cols="12"
          class="py-0"
        >
          <div class="text-center text-body-2">
            &copy;{{ copyRightYear }}
            <strong>{{ appName }}. All Rights Reserved.</strong>
          </div>
        </v-col>
      </v-footer>
    </div>
  </div>
</template>

<script>
export default {
  data ({ $config: { appName } }) {
    return {
      appName,
      height: 100
    }
  },
  computed: {
    copyRightYear () {
      const beginningYear = 2023
      const thisYear = new Date().getFullYear()
      return (beginningYear < thisYear)
        ? `${beginningYear} - ${thisYear}` : beginningYear
    }
  }
}
</script>
