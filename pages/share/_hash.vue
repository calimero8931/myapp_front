<template>
  <v-container>
    <p v-if="img_url" class="text-center">
      <v-avatar size="150">
        <v-img :src="img_url" alt="プロフィール画像"></v-img>
      </v-avatar>
    </p>
    <p v-else class="text-center">
      <v-avatar size="200" color="appyellow">
        No Image
      </v-avatar>
    </p>
    <!-- <h1>{{ userProfile }}</h1> -->
    <h1 class="text-center" style="font-size: 20px;">{{ userProfile.username }}</h1>
    <p class="mb-6">
      {{ userProfile.bio }}<br>
      <a :href="'http://'+userProfile.website" target="_blank">{{ userProfile.website }}</a>
    </p>
    <v-divider class="my-6"></v-divider>
    <h2 class="text-center mb-8">achievements</h2>
    <!-- <p>{{ img_url }}</p> -->
    <div v-if="achievements">
      <v-row>
        <v-col
          v-for="(item, index) in displayedAchievements"
          :key="item.id"
          cols="6"
          class="cards"
          :style="index % 2 === 1 ? 'padding-left: 0;' : ''"
        >
          <v-card>
            <nuxt-link :to="`/trophy/${item.trophy_id}`">
              <v-img
                class="white--text align-end"
                height="100px"
                style="border-radius: 7px 7px 0 0;"
                :src="item.image_url"
              ></v-img>
            </nuxt-link>
            <v-card-title style=" justify-content: center; margin: 10px auto 0 auto;font-size: 16px;line-height: 1.2;">{{ item.title }}</v-card-title>
            <v-card-text style=" justify-content: center; text-align: center; margin:0 auto 8px auto;">{{ item.formattedSuccessAt }}</v-card-text>
            <!-- プロフィール画像のアップロード -->
          </v-card>
        </v-col>
      </v-row>
      <!-- ページネーションを追加 -->
      <v-pagination
        v-model="page"
        :length="totalPages"
        @input="paginateAchievements"
        class="my-8"
        v-if="achievements"
      ></v-pagination>
    </div>
    <p v-else>まだ取得したトロフィーはありません</p>
  </v-container>
</template>
<script>
import { format } from 'date-fns';
export default {
  layout: 'default',
  name: 'LayoutsDefault',
  data() {
    return {
      userProfile: [],
      img_url: "",
      achievements: [],
      displayedAchievements: [],
      page: 1, // 現在のページ
      itemsPerPage: 4, // 1ページに表示するアイテム数
      selectedTrophyId: null,
      formattedSuccessAt: '',
    };
  },
  async created() {
    try {
      const response = await this.$axios.$get(`/api/v1/share/${this.$route.params.hash}`);
      this.userProfile = response.public_profile;
      this.achievements = response.achievements;

      const img_response = await this.$axios.$get(`/api/v1/get_profile_img_hash/${this.$route.params.hash}`);
      this.img_url = img_response.image_url;
      this.paginateAchievements();

      if (this.displayedAchievements) {
        this.displayedAchievements.forEach((item) => {
          item.formattedSuccessAt = format(new Date(item.success_at), 'yyyy/MM/dd');
          console.log("successあっと" + item.formattedSuccessAt);
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.achievements.length / this.itemsPerPage);
    },
  },
  methods: {
    async getProfileAndAchievements(hash) {
      try {
        console.log("ハッシュ受け取れてるかな？" + hash);
        const response = await this.$axios.$get(`/api/v1/account/public-profile/${hash}`);
        this.userProfile = response.public_profile;
        this.achievements = response.achievements;
      } catch (error) {
        console.error(error.message);
      }
    },
    async getProfileImg (hash) {
      const img_response = await this.$axios.$get(`/api/v1/get_profile_img_hash/${hash}`);
      console.log(img_response);
      const img_url = img_response.image_url;
    },
    paginateAchievements() {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedAchievements = this.achievements.slice(startIndex, endIndex);
    },
  },
};

</script>
