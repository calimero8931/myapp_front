<template>
  <div>
    <!-- <home-price
        :menus="menus"
        :img-height="imgHeight"
        :test="test"
      /> -->
    <h1>my page</h1>
    <v-row justify="start" :align="'center'">
      <v-col cols="2">
        <v-text-field v-model="id_search" label="検索したいfriend id" @keydown.enter="searchFriend"></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-btn color="primary" @click="searchFriend"><v-icon>mdi-magnify</v-icon></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <p v-if="friend_name">
          {{ friend_name }}&nbsp&nbsp
        </p>
      </v-col>
      <v-col>
        <v-btn v-if="friend_name" rounded outlined color="orange" style="font-weight: bold;" @click="sendFriendship">フレンド申請を送る</v-btn>
      </v-col>
    </v-row>
    <v-row justify="start" :align="'center'">
      <v-col cols="2">
        <p>フレンドコード:{{ this.$store.state.user.current.id }}</p>
      </v-col>
      <v-col cols="1">
        <v-btn color="orange" class="white--text" @click="searchFriend"><v-icon>mdi-share-variant</v-icon></v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn color="green" class="white--text" @click="searchFriend"><v-icon>mdi-clipboard-text-multiple</v-icon></v-btn>
      </v-col>
    </v-row>

  </div>


</template>

<script>
import axios from 'axios';
export default {
  layout: 'logged-in',
  components: {
  },
  data () {
    return {
      id_search: null,
      friend_name : null
    }
  },
  computed: {
  },
  methods: {
    async searchFriend() {
      try {
        const response = await this.$axios.$get(`/api/v1/data/`,
          {
            params: {
              user_id: this.id_search
            }
          }
        );
        console.log("レスポンスオブジェクト", response);
        console.log("検索したID", response.id);
        console.log("ヒットした名前", response.name);
        this.friend_name = response.name;
      } catch (error) {
        console.error('データの取得に失敗しました', error);
        this.friend_name = "データが見つかりません";
      }
    },
    async sendFriendship() {
      try {
        console.log("フレンド申請を送りました");
        const response = await this.$axios.$post(`/api/v1/friend_request/`,
          {
            params: {
              user_id: this.$store.state.user.current.id,
              friend_id: this.id_search
            }
          });
      } catch (error) {
        console.error('データの取得に失敗しました', error);
        this.friend_name = "データが見つかりません";
      }
    }
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