<template>
  <v-container>
    <div v-if="userProfile.username">
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
      <h1 class="text-center" style="font-size: 20px;">{{ userProfile.username }}</h1>
      <p class="mb-6">
        {{ userProfile.bio }}<br>
        <a :href="'http://'+userProfile.website" target="_blank">{{ userProfile.website }}</a>
      </p>
      <p>
        <v-btn color="primary" @click="copyToClipboard" class="black--text" style="margin-bottom: -4px;" block><v-icon>mdi-clipboard</v-icon>shareページのURLをコピー</v-btn>
      </p>
      <p>
        <v-btn outlined :href="xShareLink" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Xでシェア" color="appyellow" class="black--text" block>
            <v-icon>mdi-twitter</v-icon> share
        </v-btn>
      </p>
      <v-divider class="my-6"></v-divider>
      <h2 class="text-center mb-8">achievements</h2>
      <div v-if="achievements[0]">
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
              <v-btn color="#FB515A" @click="openFileInput(item.id)" style="border-radius: 0 0 7px 7px;" block>
                <v-icon>mdi-image</v-icon> 記念写真
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
        <v-form>
          <v-file-input
            v-model="selectedFile"
            label="ファイルを選択"
            accept="image/*"
            @change="uploadFile"
            style="display: none;"
            ref="fileInput"
          ></v-file-input>
        </v-form>
        <v-pagination
          v-model="page"
          :length="totalPages"
          @input="paginateAchievements"
          class="my-8"
          v-if="achievements"
        ></v-pagination>
      </div>
      <p v-else>まだ取得したトロフィーはありません</p>
    </div>
    <div v-else>
      <p>まずプロフィールを設定してください。</p>
    </div>
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
      page: 1,
      itemsPerPage: 4,
      selectedFile: null,
      selectedTrophyId: null,
      formattedSuccessAt: '',
    };
  },
  async created() {
    try {
      const response = await this.$axios.$get(`/api/v1/account/get_hash/${this.$store.state.user.current.id}`);
      const hash = response.unique_hash;
      if (hash) {
        await this.$router.push(`/account/public-profile/${hash}`);
        await this.getProfileAndAchievements(hash);
      } else {
        console.error("リダイレクトできませんでした");
      }
      const img_response = await this.$axios.$get(`/api/v1/get_profile_img/${this.$store.state.user.current.id}`);
      this.img_url = img_response.image_url;
      if (this.displayedAchievements) {
        this.displayedAchievements.forEach((item) => {
          item.formattedSuccessAt = format(new Date(item.success_at), 'yyyy/MM/dd');
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  computed: {
    xShareLink() {
      return `https://twitter.com/share?url=${this.postUrl}&text=${this.postText}%0a%0a#${this.postTitle}&hashtags=appyellow`
    },
    postUrl() {
      return `${window.location.origin}/share/${this.userProfile.unique_hash}`;
    },
    postTitle() {
      return this.userProfile.username;
    },
    postText() {
      return "Trophées(トロフェ)で今までクリアした人生のトロフィーを見せ合おう"
    },
    totalPages() {
      return Math.ceil(this.achievements.length / this.itemsPerPage);
    },
  },
  watch: {
    $route(to, from) {
      if (to.hash) {
        this.getProfileAndAchievements();
      }
    },
  },
  methods: {
    async getProfileAndAchievements(hash) {
      try {
        const response = await this.$axios.$get(`/api/v1/account/public-profile/${hash}`);
        this.userProfile = response.public_profile;
        this.achievements = response.achievements;
        this.paginateAchievements();
      } catch (error) {
        console.error(error.message);
      }
    },
    async getProfileImg () {
      const img_response = await this.$axios.$get(`/api/v1/get_profile_img/${this.$store.state.user.current.id}`);
      const img_url = img_response.image_url;
    },
    copyToClipboard() {
      const textToCopy = `${window.location.origin}` + "/share/" + this.userProfile.unique_hash;
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      const msg = "クリップボードにコピーしました";
      const color = 'success';
      const timeout = 4000;
      return this.$store.dispatch('getToast', { msg, color, timeout });
    },
    paginateAchievements() {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.displayedAchievements = this.achievements.slice(startIndex, endIndex);
    },
    openFileInput(trophyId) {
      this.$refs.fileInput.$refs.input.click()
      this.selectedTrophyId = trophyId;
    },
    async uploadFile() {
      if (this.selectedFile) {
        const file = this.selectedFile;
        if (this.containsNullByte(file)) {
          console.error('ファイルにnullバイトが含まれています');
          return; // アップロードを中止
        }

        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await this.$axios.$post(`/api/v1/upload_achievement_image/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            params: {
              user_id: this.$store.state.user.current.id,
              achievement_id: this.selectedTrophyId
            }
          });
          const msg = response.message;
          const color = 'success';
          const timeout = 4000;
          this.getProfileAndAchievements(this.userProfile.unique_hash);
          return this.$store.dispatch('getToast', { msg, color, timeout });
        } catch (error) {
          console.error('ファイルのアップロードに失敗しました', error);
        }
      } else {
        console.error('ファイルが選択されていません');
      }
    },
    containsNullByte(file) {
      const fileData = new Uint8Array(file);
      for (let i = 0; i < fileData.length; i++) {
        if (fileData[i] === 0) {
          return true;
        }
      }
      return false;
    }
  }
}
</script>
