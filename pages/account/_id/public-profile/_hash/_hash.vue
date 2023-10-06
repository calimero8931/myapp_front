<template>
  <v-container>
    <h1>{{ userProfile }}</h1>
  </v-container>
</template>

<script>
export default {
  layout: 'logged-in',
  name: 'LayoutsDefault',
  data() {
    return {
      userProfile: []
    };
  },
  async created() {
    try {
      const response = await this.$axios.$get(`/api/v1/account/get_hash/${this.$store.state.user.current.id}`);
      const hash = response.unique_hash;

      if (hash) {
        await this.$router.push(`/account/public-profile/${hash}`);
        console.log("リダイレクトしました");
        await this.getProfile(hash);
      } else {
        console.log("リダイレクトできませんでした");
      }
    } catch (error) {
      console.error(error.message);
    }
  },
  methods: {
    async getProfile(hash) {
      try {
        const response = await this.$axios.$get(`/api/v1/account/public-profile/${hash}`);
        this.userProfile = response;
        console.log(this.userProfile);
      } catch (error) {
        console.error(error.message);
      }
    },
  },
}
</script>
