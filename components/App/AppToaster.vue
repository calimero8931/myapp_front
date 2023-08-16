<template>
  <v-snackbar
    v-model="setSnackbar"
    app
    top
    text
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.msg }}
    <template v-slot:action="{ attrs }">
      <v-btn
        v-bind="attrs"
        text
        :color="toast.color"
        @click="resetToast"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    toast () {
      return this.$store.state.toast
    },
    setSnackbar: {
      get () { return !!this.toast.msg },
      // set () => timeout: -1の場合は通過しない
      set (val) { return this.resetToast() && val }
    }
  },
  beforeDestroy () {
    // Vueインスタンスが破棄される直前にVuexのtoast.msgを削除する(無期限toastにならないように)
    this.resetToast()
  },
  methods: {
    resetToast () {
      return this.$store.dispatch('getToast', { msg: null })
    }
  }
}
</script>
