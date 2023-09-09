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
        <v-btn color="primary" @click="searchFriend">検索</v-btn>
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

    <p v-if="geo1">あなたは今、緯度:{{ geo1.lat }}経度{{ geo1.lng }}にいます</p>
    <p v-else>位置情報を取得できませんでした</p>
    <p><v-btn color="primary" @click="trophy">トロフィー取得</v-btn></p>
    <!-- Google マップを表示する iframe -->
    <iframe
      width="600"
      height="450"
      frameborder="0"
      style="border:0"
      :src="googleMapUrl"
      allowfullscreen
    ></iframe>

    <!-- <p>{{ this.$store.state.project.list }}</p> -->
    <n-link to="login" class="button--grey">Login</n-link>
    <p>{{ projects[0] }}</p>
    <div v-for="(project, i) in projects" :key="`project-${i}`">
      <p>{{ project.name }}</p>
      <p>{{ project.description }}</p>
      <p>{{ project.createdAt }}</p>
      <p>{{ project.updatedAt }}</p>
    </div>
  </div>


</template>

<script>
import axios from 'axios';
import HomePrice from '~/components/Home/HomePrice';
export default {
  middleware: ['get-project-list'],
  components: {
    HomePrice
  },
  data () {
    return {
      test : 'てすとじゃないで',
      // imgHeight: 500,
      menus: [
        { title: 'about', subtitle: 'このサイトはブログ"独学プログラマ"で公開されているチュートリアルのデモアプリケーションです' },
        { title: 'products', subtitle: '他にはない優れた機能の数々' },
        { title: 'price', subtitle: '会社の成長に合わせた3つのプラン' },
        { title: 'contact', subtitle: 'お気軽にご連絡を' },
        { title: 'company', subtitle: '私たちの会社' }
      ],
      geo1: null, // 初期値を null に設定
      apiKey: 'AIzaSyC6nX_ez1pxGPNEH4i6DVLUiRM52j5eZZU',
      id_search: null,
      friend_name : null,
    }
  },
  computed: {
    projects () {
      return this.$store.state.project.list
    },
    googleMapUrl() {
      if (this.geo1) {
        // 緯度と経度を元に Google マップの URL を構築
        // return `https://www.google.com/maps/embed/v1/place?key=${this.apiKey}&q=${this.geo1.lat},${this.geo1.lng}`;
      } else {
        return '';
      }
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
    trophy () {
      if( this.geo1.lat >= 34.6751698 - 0.0001 && this.geo1.lat <= 34.6751698 + 0.0001 ) {
        alert("とろふぃできたでぇ");
      } else {
        alert("あかんなぁ");
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