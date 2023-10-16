<template>
  <div>
    <h1>公開用のプロフィール設定</h1>
    <v-form>
      <!-- ユーザー名 -->
      <v-text-field v-model="profile.user_name" label="ニックネーム" required></v-text-field>

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
      <v-btn color="primary" @click="saveProfile" block>保存</v-btn>
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
        profile_image: null,
        bio: "",
        website: ""
      }
    };
  },
  methods: {
    async uploadFile() {
      if (this.profile.profile_image) {
        const file = this.profile.profile_image;
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await this.$axios.$post(`/api/v1/uploads/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            params: {
              user_id: this.$store.state.user.current.id
            }
          });
          console.log(response.message);
          this.profile.profile_image_url = response.file_url;
        } catch (error) {
          console.error('ファイルのアップロードに失敗しました', error);
        }
        } else {
          // ファイルが選択されていないか、存在しない場合
          console.error('ファイルが選択されていません');
        }
    },
    async saveProfile( $store ) {
      // step1.プロフィール画像のアップロード
      if (this.profile.profile_image) {
        const file = this.profile.profile_image;
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await this.$axios.$post(`/api/v1/uploads/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            params: {
              user_id: this.$store.state.user.current.id
            }
          });
          console.log(response.message);
          this.profile.profile_image_url = response.file_url;
        } catch (error) {
          console.error('ファイルのアップロードに失敗しました', error);
        }
        } else {
          console.error('ファイルが選択されていません');
        }
      // step2.プロフィール情報の保存
      console.log("プロフィールを保存します", this.profile);
      try {
        const response = await this.$axios.$post(`/api/v1/set_public_profile/`,
          {
            params: {
              user_id: this.$store.state.user.current.id,
              user_name: this.profile.user_name,
              bio: this.profile.bio,
              website: this.profile.website
            }
          }
        );
        console.log(response);
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
