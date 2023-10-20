<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in paginatedData"
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
          <v-card-text>{{ item.description }}</v-card-text>
          <v-card-actions>
            <nuxt-link :to="`/trophy/${item.id}`">詳細を表示</nuxt-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(responseData.length / itemsPerPage)"
      class="mt-4"
    />
  </v-container>
</template>


<script>
import axios from 'axios';

export default {
  layout: 'results',
  data () {
    return {
      responseData: [],
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    // ページネーションされたデータを返す計算プロパティ
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
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
