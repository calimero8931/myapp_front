<template>
  <v-container>
    <p v-if="img_url" class="text-center">
      <v-avatar size="150">
        <v-img :src="'http://localhost:3000' + img_url" alt=""></v-img>
      </v-avatar>
    </p>
    <p v-else class="text-center">
      <v-avatar size="200" color="appyellow">
        No Image
      </v-avatar>
    </p>
    <!-- <h1>{{ userProfile }}</h1> -->
    <h1 class="text-center">{{ userProfile.username }}</h1>
    <h2>{{ userProfile.bio }}</h2>
    <!-- <p>{{ achievements }}</p> -->
    <h2>achievements</h2>
    <!-- <p>{{ img_url }}</p> -->
    <v-row>
      <v-col
        v-for="(item, index) in displayedAchievements"
        :key="item.id"
        cols="6"
        :style="index % 2 === 1 ? 'padding-left: 0;' : ''"
      >
        <v-card>
          <v-img
            class="white--text align-end"
            height="100px"
            :src="item.image_url"
          ></v-img>
          <v-card-title style=" justify-content: center;">{{ item.title }}</v-card-title>
          <v-card-text style=" justify-content: center;">{{ item.success_at }}</v-card-text>
          <v-btn color="red" @click="openFileInput(item.id)" block>
            <v-icon>mdi-image</v-icon> 記念写真
          </v-btn>
          <!-- プロフィール画像のアップロード -->
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

    <!-- ページネーションを追加 -->
    <v-pagination
      v-model="page"
      :length="totalPages"
      @input="paginateAchievements"
      class="my-8"
    ></v-pagination>
    <p>
      <v-btn color="primary"  @click="copyToClipboard" block><v-icon>mdi-clipboard</v-icon>クリップボードにコピー</v-btn>
    </p>
    <p>
      <v-btn color="appyellow" block>
        <a :href="xShareLink" target="_blank" data-toggle="tooltip" data-placement="bottom" title="Xでシェア">
          <v-icon>mdi-twitter</v-icon> share
        </a>
      </v-btn>
    </p>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  name: 'LayoutsDefault',
  data() {
    return {
      userProfile: [],
      img_url: "",
      achievements: [],
      displayedAchievements: [],
      page: 1, // 現在のページ
      itemsPerPage: 4, // 1ページに表示するアイテム数
      selectedFile: null,
      selectedTrophyId: null,
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
        console.log("リダイレクトできませんでした");
      }
      const img_response = await this.$axios.$get(`/api/v1/get_profile_img/${this.$store.state.user.current.id}`);
      this.img_url = img_response.image_url;
    } catch (error) {
      console.error(error.message);
    }
  },
  computed: {
    xShareLink() {
      return `https://twitter.com/share?url=${this.postUrl}&text=${this.postText}%0a%0a#${this.postTitle}&hashtags=appyellow`
    },
    postUrl() {
      // @postから投稿のURLを取得するコードを追加
      // 例: return this.$route.fullPath;
      return `http://localhost:8080/share/${this.userProfile.unique_hash}`;
    },
    postTitle() {
      // @postから投稿のタイトルを取得するコードを追加
      // 例: return this.$route.meta.title;
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
      this.getProfileAndAchievements();
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
      console.log(img_response);
      const img_url = img_response.image_url;
    },
    copyToClipboard() {
      const textToCopy = "http://localhost:8080/share/" + this.userProfile.unique_hash;
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
          const msg = response.message
          const color = 'success'
          const timeout = 4000
          // this.$router.push(`/account/public-profile/${this.userProfile.unique_hash}`);
          this.getProfileAndAchievements( this.userProfile.unique_hash );
          return this.$store.dispatch('getToast', {  msg, color, timeout })
        } catch (error) {
          console.error('ファイルのアップロードに失敗しました', error);
        }
        } else {
          // ファイルが選択されていないか、存在しない場合
          console.error('ファイルが選択されていません');
        }
    }
  },
}
</script>
