<template>
  <v-textarea
    v-model="setBio"
    :rules="rules"
    :counter="max"
    label="自己紹介を入力"
    placeholder="自己紹介文"
    outlined
  />
</template>

<script>
export default {
  props: {
    setBio: {
      type: String,
      default: ''
    }
  },
  data () {
    const max = 160
    return {
      max,
      rules: [
        v => !!v || '',
        v => (!!v && v.length <= max) || `${max}文字以内で入力してください`
      ]
    }
  },
  computed: {
    setBio: {
      get () {
        return this.name
      },
      set (newVal) {
        return this.$emit('update:setBio', newVal)
      }
    }
  }
}
</script>