<template>
  <v-container>
    <div v-if="prefecture">
      <h2 class="text-center mb-4">{{ prefecture }}</h2>
    </div>
    <p v-else></p>
    <v-row>
      <v-col
        v-for="(item, index) in paginatedData"
        :key="item.id"
        cols="6"
        :style="index % 2 === 1 ? 'padding-left: 0;' : ''"
      >
        <v-card>
          <nuxt-link :to="`/trophy/${item.id}`">
            <v-img
              class="white--text align-end"
              height="100px"
              :src="item.image_url"
              style="border-radius: 7px 7px 0 0;"
            ></v-img>
          </nuxt-link>
          <v-card-title style="font-size: 16px; justify-content: center;">{{ item.title }}</v-card-title>
          <v-btn :to="`/trophy/${item.id}`" color="primary" style="color:black; border-radius: 0 0 7px 7px;" block>
              詳細
            </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(responseData.length / itemsPerPage)"
      class="my-4"
    />
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  layout: 'default',
  data () {
    return {
      responseData: [],
      currentPage: 1,
      itemsPerPage: 10,
      prefecture: null
    }
  },
  mounted() {
    this.$store.dispatch('getRememberPath', {
      name: this.$route.name,
      params: {
        param1: this.$route.params.param1,
        param2: this.$route.params.param2
      }
    })
  },
  computed: {
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.responseData.slice(startIndex, endIndex);
    }
  },
  async created() {
    try {
      const response = await this.$axios.$get(`/api/v1/results/`, {
        params: {
          param1: this.$route.params.param1,
          param2: this.$route.params.param2
        }
      });
      this.responseData = response;
      this.prefecture = response[0].prefecture_name;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
