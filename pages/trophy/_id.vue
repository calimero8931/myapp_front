<template>
  <div>
    <h1>{{ trophyData.title }}</h1>
    <p>{{ trophyData.description }}</p>

    <!-- <p>Description: {{ trophyData.description }}</p> -->
    <p v-if="geo1">あなたは今、緯度:{{ geo1.lat }}経度{{ geo1.lng }}にいます</p>
    <p v-else>位置情報を取得できませんでした</p>
    <p><v-btn color="primary" @click="getTrophy"><v-icon>mdi-trophy</v-icon>&nbsp;GET</v-btn></p>
    <p><v-btn color="pink" class="white--text" @click=""><v-icon>mdi-camera-plus</v-icon></v-btn></p>
    <p v-if="this.$store.state.favorite.already"><v-btn color="green" class="white--text" @click="favorite"><v-icon>mdi-star-minus</v-icon></v-btn></p>
    <p v-else><v-btn color="yellow" class="white--text" @click="favorite"><v-icon>mdi-star-plus</v-icon></v-btn></p>
    <!-- Google マップを表示する iframe -->
    <iframe
      width="600"
      height="450"
      frameborder="0"
      style="border:0"
      :src="googleMapUrl"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LayoutsDefault',
  layout: 'logged-in',
  middleware: ['get-favorite'],
  data () {
    return {
      geo1: null,
      apiKey: 'AIzaSyC6nX_ez1pxGPNEH4i6DVLUiRM52j5eZZU',
      trophyData: []
    }
  },
  computed: {
    favoriteAlready() {
      return this.$store.state.favorite.already;
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
  async asyncData({ params, $axios, route }) {
    // ページ遷移時にデータを取得
    const response = await $axios.$get(`/api/v1/trophy/`,
      {
        params: {
          id: route.params.id
        }
      });
    return { trophyData: response };
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
    getTrophy () {
      if( this.geo1.lat >= 34.6751698 - 0.0001 && this.geo1.lat <= 34.6751698 + 0.0001 ) {
        alert("とろふぃできたでぇ");
      } else {
        alert("あかんなぁ");
      }
    },
    async favorite ( ) {
      try {
        const response = await this.$axios.$get(`/api/v1/favorite_request/`,
          {
            params: {
              user_id: this.$store.state.user.current.id,
              trophy_id: this.$route.params.id
            }
          }
        );
        this.$store.commit('setFavoriteAlready', response.already);
        console.log(response);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }
  }
}
</script>