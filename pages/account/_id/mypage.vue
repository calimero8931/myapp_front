<template>
  <div>
    <v-container>
      <h1 class="text-center white--text my-4">挑戦中<span class="h1-span">の</span>トロフィー</h1>
      <v-btn
        :disabled="loading"
        :loading="loading"
        color="#25BC91"
        @click="clickGetGeoButton()"
        block>
        <v-icon>mdi-map-marker</v-icon>
        現在の位置を取得する</v-btn>
      <v-row v-if="pagedAchievements.length > 0" class="mt-4">
        <v-col
          v-for="(item, index) in pagedAchievements"
          :key="item.id"
          cols="6"
          class="cards"
        >
          <v-card style="background-color: #313953;border-radius: 7px 7px 0 0;">
            <nuxt-link :to="`/trophy/${item.id}`">
              <v-img
                class="white--text align-end rounded-top"
                height="100px"
                :src="item.image_url"
                style="border-radius: 7px 7px 0 0;"
              ></v-img>
            </nuxt-link>
            <v-card-title style="justify-content: center; font-size: 14px!important;margin: 6px auto;line-height: 1.4;">{{ item.trophy_title }}</v-card-title>
            <v-card-text style="line-height: 1.4;">{{ item.description }}</v-card-text>
            <v-btn
              :disabled="loading"
              :loading="loading"
              color="primary"
              @click="getTrophy(item.trophy_id)"
              style="color:black; border-radius: 0 0 7px 7px;"
              block>
              <v-icon>mdi-trophy</v-icon> GET
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <p v-else class="my-8">
          挑戦中のトロフィーはありません
      </p>
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="totalPages"
        color="primary"
        class="my-8"
      ></v-pagination>
    </v-container>
    <div>
    <div class="dark-overlay congratulations" @click="hideCongratulations">
      <div class="center">
        <v-img src="/trophy.svg" style="margin: 0 auto; width: 150px;"></v-img>
        <h2 style="font-size: 30px;">トロフィー獲得！</h2>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { format } from 'date-fns';

export default {
  layout: 'logged-in',
  middleware: ['get-achievements-list'],
  components: {
  },
  data () {
    return {
      loading: false,
      drawer: null,
      geo1: null,
      id_search: null,
      friend_name : null,
      formattedSuccessAt: '',
      currentPage: 1,
      itemsPerPage: 6,
    }
  },
  computed: {
    achievements() {
      return this.$store.state.achievements.list;
    },
    totalPages() {
      return Math.ceil(this.achievements.length / this.itemsPerPage);
    },
    pagedAchievements() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.achievements.slice(startIndex, startIndex + this.itemsPerPage);
    },
  },
  async created() {
  },
  methods: {
    async clickGetGeoButton() {
        try {
            this.loading = true;
            const position = await this.getGeoLocation();
            this.geo1 = position;
            const msg = "現在地を取得しました";
            const color = 'success';
            const timeout = 4000;
            this.loading = false;
            return this.$store.dispatch('getToast', { msg, color, timeout });
        } catch (error) {
            console.error("位置情報の取得に失敗しました", error);
        }
    },
    getGeoLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const data = position.coords;
                    const lat = data.latitude;
                    const lng = data.longitude;
                    resolve({ lat, lng });
                },
                error => {
                    reject(error);
                }
            );
        });
    },

    async getTrophy(trophyId) {
      try {
        this.loading = true;
        // pagedAchievementsからtrophyIdに対応するデータを検索
        const trophyData = this.pagedAchievements.find(achievement => achievement.trophy_id === trophyId);

        if (trophyData) {
          // trophyData内のlatitudeおよびlongitudeを取得
          const trophyLatitude = trophyData.trophy_latitude;
          const trophyLongitude = trophyData.trophy_longitude;

          // geo1.latとgeo1.longと比較
          const latDiff = Math.abs(this.geo1.lat - trophyLatitude);
          const longDiff = Math.abs(this.geo1.lng - trophyLongitude);

          // 一致条件を定義 (0.00045はおよそ50m)
          const threshold = 0.00045;

          if (latDiff <= threshold && longDiff <= threshold) {
            // 条件に一致する場合の処理
            this.loading = false;
            const response = await this.$axios.$get(`/api/v1/achieve_trophy/`, {
              params: {
                user_id: this.$store.state.user.current.id,
                trophy_id: trophyId
              }
            });
            this.showCongratulations();
          } else {
            const msg = "トロフィー地点から離れています";
            const color = 'error';
            const timeout = 4000;
            this.loading = false;
            return this.$store.dispatch('getToast', { msg, color, timeout });
          }
        } else {
          alert('指定のトロフィーが見つかりません。');
        }
      } catch (error) {
        const msg = "まず現在地を取得してください";
        const color = 'error';
        const timeout = 4000;
        this.loading = false;
        return this.$store.dispatch('getToast', { msg, color, timeout });
      }
    },
    async searchFriend() {
      try {
        const response = await this.$axios.$post(`/api/v1/get_user_data/`,
          {
            params: {
              user_id: this.id_search
            }
          }
        );
        this.friend_name = response.name;
      } catch (error) {
        console.error('データの取得に失敗しました', error);
        this.friend_name = "データが見つかりません";
      }
    },
    async sendFriendship() {
      try {
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
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    showCongratulations() {
      const overlay = document.querySelector('.dark-overlay');
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    },
    hideCongratulations() {
      const overlay = document.querySelector('.dark-overlay');
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';
      this.$router.push({ name: 'account-id-public-profile-hash-hash' });
    }
  }
}
</script>

<style scoped>
h1 {
  color: #000;
  text-align: center;
}
#map {
  height: 400px;
  width: 100%;
}
.dark-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  animation-duration: 0.5s;
  transition-duration: 0.5s;
}

.congratulations {
  display: flex;
  align-items: center;
  justify-content: center;

}
.center {
  text-align: center;
}

</style>