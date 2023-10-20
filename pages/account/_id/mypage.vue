<template>
  <div>
    <v-container>
      <h1 class="text-center white--text my-4">Challenging Trophies</h1>
      <v-row v-if="pagedAchievements.length > 0">
        <v-col
          v-for="(item, index) in pagedAchievements"
          :key="item.id"
          cols="6"
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
            <v-card-title style="justify-content: center; font-size: 16px;margin: 4px auto;">{{ item.trophy_title }}</v-card-title>
            <v-card-text>{{ item.description }}</v-card-text>
            <v-btn color="primary" @click="getTrophy(item.trophy_id)" block>
              <v-icon>mdi-trophy</v-icon> GET
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <p v-else>
          挑戦中のトロフィーはありません
      </p>
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :length="totalPages"
        color="primary"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { format } from 'date-fns';

export default {
  // layout: 'logged-in',
  layout: 'logged-in',
  middleware: ['get-achievements-list'],
  components: {
  },
  data () {
    return {
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
  try {
    const position = await this.getGeoLocation();
    this.geo1 = position;
    if (this.achievements) {
      this.achievements.forEach((item) => {
        achievements.SuccessAt = format(new Date(item.success_at), 'yyyy/MM/dd');
      });
    }
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
          this.$router.push({ name: 'account-id-public-profile-hash-hash' });
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