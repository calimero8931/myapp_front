<template>
  <div>
    <!-- <home-price
        :menus="menus"
        :img-height="imgHeight"
        :test="test"
      /> -->
    <h1>my page</h1>
    <v-container>
      <h2>Challenging Trophies</h2>
      <v-list>
        <v-list-item v-for="item in achievements " :key="item.id" v-if="!item.achievement">
          <v-list-item-content>
            <v-list-item-title><nuxt-link :to="`/trophy/${item.trophy_id}`">{{ item.trophy_title }}</nuxt-link></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{ item.trophy_description }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn color="primary" @click="getTrophy(item.trophy_id)"><v-icon>mdi-trophy</v-icon>&nbsp;GET</v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container>
      <h2>Achieved Trophies</h2>
      <v-list>
        <v-list-item v-for="item in achievements" :key="item.id" v-if="item.achievement">
          <v-list-item-content>
            <v-list-item-title><nuxt-link :to="`/trophy/${item.trophy_id}`"><v-icon color="yellow">mdi-crown</v-icon>{{ item.trophy_title }}</nuxt-link></v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{ item.trophy_description }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>{{ item.success_at }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title>取得率(予定)</v-list-item-title>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-title><v-btn color="pink" class="white--text" @click=""><v-icon>mdi-camera-plus</v-icon></v-btn></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
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
    <p v-if="geo1">あなたは今、緯度:{{ geo1.lat }}経度{{ geo1.lng }}にいます</p>
      <p v-else>位置情報を取得できませんでした</p>
  </div>


</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
export default {
  layout: 'logged-in',
  middleware: ['get-achievements-list'],
  components: {
  },
  data () {
    return {
      geo1: null,
      id_search: null,
      friend_name : null
    }
  },
  computed: {
    achievements() {
      return this.$store.state.achievements.list;
    }
  },
  async created() {
    // コンポーネントが作成された後、非同期処理を行う
    try {
      const position = await this.getGeoLocation();
      this.geo1 = position; // 位置情報を geo1 プロパティに保存

    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    getGeoLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            var data = position.coords;
            var lat = data.latitude;
            var lng = data.longitude;
            resolve({ lat, lng });
          },
          error => {
            reject(error);
          }
        );
      });
    },
    async getTrophy (trophyId) {
      if( this.geo1.lat >= 34.6751698 - 0.0001 && this.geo1.lat <= 34.6751698 + 0.0001 ) {
      // if( true ) {
        try {
          const response = await this.$axios.$get(`/api/v1/achieve_trophy/`,
            {
              params: {
                user_id: this.$store.state.user.current.id,
                trophy_id: trophyId
              }
            }
          );
          alert(response.message);
          location.reload();
        } catch (error)  {
          alert(response.message);
        }
      }
    },
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
  color: #000;
  text-align: center;
}
#map {
  height: 400px;
  width: 100%;
}
/* .v-input {
  width: 200px;
} */
</style>