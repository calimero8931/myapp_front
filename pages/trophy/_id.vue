<template>
  <div>
    <v-container>
      <h1>{{ trophyData.title }}</h1>
      <p>{{ trophyData.description }}</p>
      <p>completion_rate:{{ achievementRate }}</p>
      <p>興味を持っている人数:{{ achievementRate.interested_users_count }}</p>
      <p>トロフィー取った人:{{ achievementRate.earned_users_count }}</p>
      <p>取得率:{{ achievementRate.completion_rate }}%</p>
      <p>このトロフィーのサブカテ{{ trophyData.category_id }}</p>
      <apexchart
        type="radialBar"
        height="400"
        :options="chart.options"
        :series="achievementRate2"
      ></apexchart>
      <v-layout row>
        <v-flex>
          <p>
            <a :href="googleMapUrl" target="_blank">
              <v-btn>
                <v-icon>mdi-google-maps</v-icon> Google Mapでみる
              </v-btn>
            </a>
          </p>
        </v-flex>
        <v-flex v-if="this.$store.state.interest.already">
          <p v-if="this.$store.state.favorite.already">
            <v-btn color="green" class="white--text" @click="favorite"><v-icon>mdi-star-minus</v-icon></v-btn>
          </p>
          <p v-else>
            <v-btn color="yellow" class="white--text" @click="favorite"><v-icon>mdi-star-plus</v-icon></v-btn>
          </p>
        </v-flex>
        <p v-else>
          <v-btn color="pink" class="white--text" @click="interest"><v-icon>mdi-thumb-up</v-icon></v-btn>
        </p>
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
import { ref } from 'vue';
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'LayoutsDefault',
  layout: 'logged-in',
  middleware: [
    'get-favorite',
    'get-interested',
  ],
  components: {
    apexchart: VueApexCharts,
  },
  data () {
    return {
      apiKey: 'AIzaSyC6nX_ez1pxGPNEH4i6DVLUiRM52j5eZZU',
      trophyData: [],
      achievementRate: [],
      achievementRate2: [],
      chart: {
        options: {
          labels: ['Interest', 'GET!', '取得率'],
          title: {
            text: 'トロフィー取得率',
            align: 'center',
          },
        },
        series: [ 44, 55, 41 ],
      },
    }
  },
  computed: {
    interestAlready() {
      return this.$store.state.interest.already;
    },
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
    try {
      const trophyResponse = await $axios.$get(`/api/v1/trophy/`, {
        params: {
          id: route.params.id
        }
      });
      const trophyData = trophyResponse;
      console.log("トロフィーの取得に成功しました", trophyData);

      const achievementResponse = await $axios.$get(`/api/v1/compute_achievement_rate/`, {
        params: {
          trophy_id: route.params.id
        }
      });
      const achievementRate = achievementResponse;
      const achievementRate2 = Object.values(achievementResponse);
      console.log("達成率の取得に成功しました", achievementRate);
      return { trophyData, achievementRate, achievementRate2 };
    } catch (error) {
      console.error('データの取得に失敗しました', error);
    }
  },
  methods: {
    async interest ( ) {
      try {
        const response = await this.$axios.$get(`/api/v1/check_interested_sub_categories/`,
          {
            params: {
              user_id: this.$store.state.user.current.id,
              sub_category_id: this.trophyData.category_id
            }
          }
        );
        console.log("興味が返ってきたのでセットしました");
        this.$router.go()
        const msg = "興味に追加しました";
        const color = 'success';
        const timeout = 4000;
        return this.$store.dispatch('getToast', { msg, color, timeout });
      } catch (error) {
        console.error('データの取得に失敗しました', error);
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
          const msg = response.message;
          const color = 'success';
          const timeout = 4000;
          return this.$store.dispatch('getToast', { msg, color, timeout });
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    }
  }
}
</script>