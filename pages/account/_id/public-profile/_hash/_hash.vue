<template>
  <v-container>
    <p v-if="img_url" class="text-center">
      <v-avatar size="200">
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
    <v-list v-for="achievement in achievements" :key="achievement.id">
      <v-list-item>
        <v-list-content>
          <v-list-item-title link>{{ achievement.title }}</v-list-item-title>
        </v-list-content>
      </v-list-item>
      <v-list-item>
        <v-list-content>
          {{ achievement.updated_at }}
        </v-list-content>
      </v-list-item>
    </v-list>
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
      achievements: [],
      img_url: ""
    };
  },
  async created() {
    try {
      const response = await this.$axios.$get(`/api/v1/account/get_hash/${this.$store.state.user.current.id}`);
      const hash = response.unique_hash;
      if (hash) {
        await this.$router.push(`/account/public-profile/${hash}`);
        await this.getProfile(hash);
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
      return "Trophées(トロフェ)で今まで達成した人生のトロフィーを見せ合おう"
    }
  },
  methods: {
    async getProfile(hash) {
      try {
        const response = await this.$axios.$get(`/api/v1/account/public-profile/${hash}`);
        this.userProfile = response.public_profile;
      this.achievements = response.achievements;
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
    }
  },
}
</script>
