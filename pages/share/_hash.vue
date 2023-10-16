<template>
  <div>
    <v-container>
      <!-- <h1>{{ userProfile }}</h1> -->
      <h1>{{ userProfile.username }}</h1>
      <h2>{{ userProfile.bio }}</h2>
      <!-- <p>{{ achievements }}</p> -->
      <h2>achievements</h2>
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
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'default',
  name: 'LayoutsDefault',
  data() {
    return {
      userProfile: {},
      achievements: [],
    };
  },

  async created() {
    try {
      const response = await this.$axios.$get(`/api/v1/share/${this.$route.params.hash}`);
      this.userProfile = response.public_profile;
      this.achievements = response.achievements;
    } catch (error) {
      console.error(error.message);
    }
  },
}
</script>
