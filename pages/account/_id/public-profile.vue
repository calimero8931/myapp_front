<template>
  <div>
    <app-toaster />
    <h1>公開用のプロフィール設定</h1>
    <v-form>
    <!-- ユーザー名 -->
    <v-text-field v-model="profile.user_name" label="ニックネーム"></v-text-field>

    <!-- プロフィール画像のアップロード -->
    <v-file-input
      v-model="profile.profile_image"
      label="プロフィール画像のアップロード"
      accept="image/*"
    ></v-file-input>

    <!-- 自己紹介文 -->
    <v-textarea v-model="profile.bio" label="自己紹介"></v-textarea>

    <!-- ウェブサイトリンク -->
    <v-text-field v-model="profile.website" label="ウェブサイトリンク"></v-text-field>

    <!-- 保存ボタン -->
    <v-btn color="primary" @click="saveProfile" >保存</v-btn>
  </v-form>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  data() {
    return {
      profile: {
        user_name: "",
        profile_image_url: "",
        bio: "",
        website: ""
      }
    };
  },
  methods: {
    async saveProfile( $store ) {
      // ここでプロフィール情報をサーバーに保存するロジックを追加します
      console.log("プロフィールを保存します", this.profile);
      try {
        const response = await this.$axios.$post(`/api/v1/set_public_profile/`,
          {
            params: {
              user_id: this.$store.state.user.current.id,
              user_name: this.profile.user_name,
              profile_image_url: this.profile.profile_image_url,
              bio: this.profile.bio,
              website: this.profile.website
            }
          }
        );
      const msg = response.message
      const color = 'success'
      const timeout = 4000
      return this.$store.dispatch('getToast', {  msg, color, timeout })
      } catch (error) {
        console.error('データの取得に失敗しました', error);
        const msg = response.message
      const color = 'success'
      const timeout = 4000
      return this.$store.dispatch('getToast', {  msg, color, timeout })
      }
    }
  }
}
</script>
