<template>
  <div>
    <v-container>
      <h1>{{ trophyData.title }}</h1>
      <p>{{ trophyData.description }}</p>
      <v-layout row>
        <v-flex>
          <p><v-btn :href="googleMapUrl"><v-icon>mdi-google-maps</v-icon>Google Mapでみる</v-btn></p>
        </v-flex>
        <v-flex>
          <p v-if="this.$store.state.favorite.already"><v-btn color="green" class="white--text" @click="favorite"><v-icon>mdi-star-minus</v-icon></v-btn></p>
          <p v-else><v-btn color="yellow" class="white--text" @click="favorite"><v-icon>mdi-star-plus</v-icon></v-btn></p>
        </v-flex>
        <v-flex>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <iframe
      width="600"
      height="450"
      frameborder="0"
      style="border:0"
      :src="googleMapUrl"
      allowfullscreen
    ></iframe> -->
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
      apiKey: 'AIzaSyC6nX_ez1pxGPNEH4i6DVLUiRM52j5eZZU',
      trophyData: []
    }
  },
  computed: {
    favoriteAlready() {
      return this.$store.state.favorite.already;
    },
    googleMapUrl() {
      if (this.trophyData) {
        return `https://www.google.com/maps/search/${this.trophyData.latitude},${this.trophyData.longitude}`;
        // return `https://www.google.com/maps/embed/v1/place?key=${this.apiKey}&q=${this.geo1.lat},${this.geo1.lng}`;
      } else {
        return '';
      }
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