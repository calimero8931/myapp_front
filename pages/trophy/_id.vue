<template>
  <div>
    <v-container>
      <h1 class="text-center mb-2">{{ trophyData.title }}</h1>
      <p class="text-center">
        <v-avatar size="150"><v-img :src="`${ trophyData.image_url }`"></v-img></v-avatar>
      </p>
      <h2 class="text-center reality"><span>{{ getRareness() }}</span></h2>
      <p style="display: none;">{{ [rarenessLabel] }}</p>
      <!-- <p>{{ "ラベル:"+rarenessLabel }}</p> -->
      <!-- <p>{{ [this.rate] }}</p> -->
      <p>{{ trophyData.description }}</p>
      <!-- <p>completion_rate:{{ achievementRate }}</p>
      <p>興味を持っている人数:{{ achievementRate.interested_users_count }}</p>
      <p>トロフィー取った人:{{ achievementRate.earned_users_count }}</p>
      <p>取得率:{{ achievementRate.completion_rate }}%</p>
      <p>このトロフィーのサブカテ{{ trophyData.category_id }}</p> -->
      <v-divider class="my-4"></v-divider>
      <apexchart
        :options="chartOptions"
        :labels="chartOptions.labels"
        :series="[this.rate]"
      ></apexchart>
      <!-- <p>achievementRate2:{{ [achievementRate2[2]] }}%</p> -->
      <v-row v-if="this.$store.state.user.current" justify="center" align="center">
        <v-col cols="6">
          <p>
            <a :href="googleMapUrl" target="_blank">
              <v-btn color="white" class="black--text no-text-decoration" block>
                <v-icon>mdi-google-maps</v-icon> Google Map</v-btn>
            </a>
          </p>
        </v-col>
        <v-col v-if="this.$store.state.interest.already" cols="6">
          <p v-if="this.$store.state.favorite.already">
            <v-btn color="green" class="black--text" @click="favorite" block><v-icon>mdi-star-minus</v-icon>リスト削除</v-btn>
          </p>
          <p v-else>
            <v-btn color="appyellow" class="black--text" @click="favorite" block><v-icon>mdi-star-plus</v-icon>チャレンジ</v-btn>
          </p>
        </v-col>
        <v-col v-else cols="6">
          <p>
            <v-btn color="pink" class="white--text" @click="interest" block><v-icon>mdi-thumb-up</v-icon>気になる</v-btn>
          </p>
        </v-col>
      </v-row>
      <div v-else></div>
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
  layout: 'default',
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
      rate: 0,
      chartOptions: {
        chart: {
          height: 350,
          type: "radialBar"
        },
        series: [22],
        plotOptions: {
          radialBar: {
            hollow: {
              size: '70%',
            },
            dataLabels: {
              showOn: "always",
              name: {
                offsetY: 10,
                show: true,
                color: "#F3DF4C",
                fontSize: "30px",
              },
              value: {
                offsetY: 20,
                color: "#F3DF4C",
                fontSize: "14px",
                show: true,
                formatter: function (val) {
                  return "希少性:" + val + '%'
                }
              }
            },
          },
        },
        // type: 'radialBar',
        colors: ['#F3DF4C'],
        labels: [],
        rarenessLabel: [],
        // labels: ["Progress"]
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
    },
    rarenessLabel() {
      // レアネスラベルを計算するコンピューテッドプロパティ
      if (this.rate >= 90) {
        this.chartOptions.labels.push("SSレア");
      } else if (this.rate >= 70) {
        this.chartOptions.labels.push("Sレア");
      } else if (this.rate >= 50) {
        this.chartOptions.labels.push("Aレア");
      } else if (this.rate >= 30) {
        this.chartOptions.labels.push("Bレア");
      } else if (this.rate >= 10) {
        this.chartOptions.labels.push("Cレア");
      } else {
        this.chartOptions.labels.push("Dレア");
      }
    },
  },
  mounted() {
    this.getRareness();
    this.$store.dispatch('getRememberPath', { name: this.$route.name, params: { key: this.$route.params.id } })
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
      if (!store.state.user.current) {
        return false
      }
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
    },
    getRareness() {
      this.rate = 100 - this.achievementRate2[2];
      console.log("レート" + this.achievementRate2[2]);
      console.log("レアリティ" + this.rate);
    },
  }
}
</script>
<style>

.trophy-page-btn {
  width: 300px;
}

#SvgjsText1015 {
  font-size: 16px;
  fill: #F3DF4C;
}
.reality {
  font-weight: bold;
}
.reality span {
    font-size: 30px;
    color: #F3DF4C;
  }

a {
  text-decoration: none!important;
}
</style>