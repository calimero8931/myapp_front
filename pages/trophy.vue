<template>
  <div>
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
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LayoutsDefault',
  layout: 'logged-in',
  data () {
    return {
      geo1: null,
      apiKey: 'AIzaSyC6nX_ez1pxGPNEH4i6DVLUiRM52j5eZZU'
    }
  },
  computed: {
    googleMapUrl() {
      if (this.geo1) {
        // 緯度と経度を元に Google マップの URL を構築
        return `https://www.google.com/maps/embed/v1/place?key=${this.apiKey}&q=${this.geo1.lat},${this.geo1.lng}`;
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
    }
  }
}
</script>