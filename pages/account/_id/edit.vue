<template>
  <div>
    <h1 class="my-4">プロフィール設定</h1>
    <p>ここで設定した情報は誰でも見ることができるあなたのシェアページの情報として使われます。</p>
    <v-form
      ref="form"
    >
      <v-text-field
        v-model="profile.user_name"
        :name.sync="profile.user_name"
        label="ニックネーム"
        count="30"
        :rules="rules"
        set-validation
        outlined
        @input="validateForm"
        required></v-text-field>
        <!-- {{ profile.user_name }} -->
      <v-file-input
        v-model="profile.profile_image"
        label="プロフィール画像のアップロード"
        accept="image/*"
        outlined
      ></v-file-input>
      <v-textarea
        v-model="profile.bio"
        :setBio.sync="profile.bio"
        label="自己紹介"
        count="160"
        :rules="rulesBio"
        :error-messages="errorBio"
        @input="validateForm"
        outlined></v-textarea>
      <!-- {{ profile.bio }} -->
      <user-form-my-email
        v-model="profile.website"
        :email.sync="profile.website"
        placeholder="Email"
        ></user-form-my-email>
      <!-- {{ profile.website }} -->
      <v-btn color="primary" @click="saveProfile" class="black--text" :disabled="isSubmitDisabled" block>保存</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: 'logged-in',
  data() {
    const max = 30
    return {
      profile: {
        user_name: "",
        profile_image_url: "",
        profile_image: null,
        bio: "",
        website: "",
      },
      max,
      rules: [
        v => !!v || 'ユーザー名は必須です',
        v => (!!v && v.length <= 30) || `ユーザー名は30文字以内で入力してください`
      ],
      rulesBio: [
        v => !!v || '自己紹介は必須です',
        v => (v && v.length <= 160) || '自己紹介は160文字以内で入力してください'
      ],
      isSubmitDisabled: true,
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
          // console.log(response.message);
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
      // プロフィール画像のアップロード
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
          // console.log(response.message);
          this.profile.profile_image_url = response.file_url;
          } catch (error) {
            console.error('ファイルのアップロードに失敗しました', error);
          }
        } else {
          console.error('ファイルが選択されていません');
        }
        // console.log(response);
        const msg = response.message
        const color = 'success'
        const timeout = 3000
        this.$store.dispatch('getToast', { msg, color, timeout });
        setTimeout(() => {
          this.$router.push(`/account/public-profile/${this.$store.state.user.current.id}`);
        }, timeout);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
        const msg = response.message
      const color = 'success'
      const timeout = 4000
      this.$store.dispatch('getToast', { msg, color, timeout });
      setTimeout(() => {
          this.$router.push(`/account/public-profile/${this.$store.state.user.current.id}`);
        }, timeout);
      }
    },
    validateForm() {
      if(this.profile.user_name.length > 0 && this.profile.user_name.length <= 30 && this.profile.bio.length > 0 && this.profile.bio.length <= 160) {
        this.isSubmitDisabled = false
      } else {
        this.isSubmitDisabled = true
      }
    }
  }
}
</script>
