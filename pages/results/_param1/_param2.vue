<template>
  <v-container>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>タイトル</v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>説明</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="item in responseData" :key="item.id">
        <v-list-item-content>
          <v-list-item-title><nuxt-link :to="`/trophy/${item.id}`">{{ item.title }}</nuxt-link></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title>{{ item.description }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'logged-in',
  components: {
  },
  data () {
    return {
      responseData: []
    }
  },
  computed: {
  },
  // コンポーネント作成前に実行
  async created() {
    // コンポーネントが作成された後、非同期処理を行う
    try {
      const response = await this.$axios.$get(`/api/v1/results/`,
        {
          params: {
            param1: this.$route.params.param1, // _param1 ではなく param1 で受け取る
            param2: this.$route.params.param2  // _param2 ではなく param2 で受け取る
          }
        }
      );
      this.responseData = response;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {

  }
}
</script>

<style scoped>
/* スタイル部分 */
h1 {
  color: blue;
}
#map {
  height: 400px;
  width: 100%;
}
/* .v-input {
  width: 200px;
} */
</style>