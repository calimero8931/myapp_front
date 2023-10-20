<template>
  <v-app>
    <home-app-bar
      :img-height="imgHeight"
      id="scroll-top"
    />
    <div style="height: 60px;"></div>
    <!-- 以下にrecommendDataの中をv-forで全出力する -->
    <!-- <div v-for="(recommend, i) in recommendData" :key="`recommend-${i}`">
      {{ recommend.name  }}
    </div> -->
    <template>
      <v-sheet>
        <v-slide-group multiple style="margin: 20px 0;">
          <v-slide-item v-for="(recommend, i) in recommendData" :key="`recommend-${i}`">
            <v-card :to="`/trophy/${recommend.id}`" style="margin: 0 20px 0 0; width: 150px; height: 150px;">
              <v-img
                class="white--text align-end"
                height="100px"
                :src="recommend.image_url"
              ></v-img>
              <v-card-title style="font-size: 14px; justify-content: center;">
                {{ recommend.title  }}
              </v-card-title>
              <!-- <v-card-text class="text--primary">
                <div class="v-text-truncate">
                  {{ recommend.description | truncate(40) }}
                </div>
              </v-card-text> -->
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </template>
    <v-sheet style="margin-top: 20px;">
      <v-container class="elevation-6">
        <h2 class="text-center">どこへ行きたいですか？</h2>
        <div v-for="(category, i) in categoryData" :key="`category-${i}`" class="mt-2">
          <v-btn color="appyellow" @click="fetchSubCategories(category.id),toggleButtonVisibility()" style="font-weight: bold; color: #1B2440!important;" block>
            {{ category.name }}
          </v-btn>
          <div v-if="category.id === selectedCategoryId && showButton" class="flex">
            <div v-for="(subCategory, i) in subCategoryData" :key="`subCategory-${i}`" class="mr-2 mt-2">
              <v-btn outlined color="appyellow" @click="fetchRegions(subCategory.id)" style="font-weight: bold;">
                {{ subCategory.name }}
              </v-btn>
              <!-- 以下にregionsデータを羅列 -->
              <div v-if="subCategory.id === selectedSubCategoryId" class="flex">
                <div v-for="(region, i) in regionsData" :key="`region-${i}`" class="mr-2 mt-2">
                  <v-btn outlined color="blue" @click="fetchPrefectures(region.id)" style="font-weight: bold;">
                    {{ region.name }}
                  </v-btn>
                  <!-- 以下にprefecturesデータを羅列 -->
                  <div v-if="region.id === selectedRegionId" class="flex">
                    <div v-for="(prefecture, i) in prefecturesData" :key="`prefecture-${i}`" class="mr-2 mt-2">
                      <v-btn
                        outlined
                        color="orange"
                        @click="fetchTrophies(prefecture.id)"
                        style="font-weight: bold;"
                      >
                        <nuxt-link
                          :to="{ name: 'results-param1-param2',
                          params:{ param1:selectedSubCategoryId, param2:prefecture.id }}"
                          style="text-decoration: none;color: orange;"
                        >
                        {{ prefecture.name }}
                      </nuxt-link>
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-container>
      <v-spacer></v-spacer>
    </v-sheet>
    <app-footer />
  </v-app>
</template>

<script>
import axios from 'axios';
import AppFooter from '../components/App/AppFooter.vue'

export default {
  layout: 'default',
  middleware: ['logged-in-redirect'],
  components: {
    AppFooter
  },
  filters: {
    truncate(text, length) {
      if (text.length > length) {
        return text.slice(0, length) + '...';
      } else {
        return text;
      }
    }
  },
  data () {
    return {
      imgHeight: 150,
      recommendData: [],
      categoryData: [],
      selectedCategoryId: null,
      subCategoryData: [],
      selectedSubCategoryId: null,
      regionsData: [],
      selectedRegionId: null,
      prefecturesData: [],
      selectedPrefectureId: null,
      trophies : [],
      showButton: false,
    }
  },
  mounted() {
    this.fetchCategories();
  },
  async created( $store ) {
    if( !this.$store.state.user.current ){
      try {
        const response = await this.$axios.$get(`/api/v1/recommend_request/`,
          {
            params: {
              // user_id: this.$store.state.user.current.id
            }
          }
        );
        this.recommendData = response;
      } catch (error) {
        // console.error('リコメンドデータの取得に失敗しました', error);
        console.error(error.message);
        // console.log("送ったid"+ this.$store.state.user.current.id);
      }
    } else {
      try {
        const response = await this.$axios.$get(`/api/v1/recommend_request/`,
          {
            params: {
              user_id: this.$store.state.user.current.id
            }
          }
        );
        this.recommendData = response;
      } catch (error) {
        // console.error('リコメンドデータの取得に失敗しました', error);
        console.error(error.message);
        // console.log("送ったid"+ this.$store.state.user.current.id);
      }
    }
  },
  methods: {
    async fetchCategories () {
      try {
        const response = await this.$axios.$get(`/api/v1/categories_request/`);
        this.categoryData = response;
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    },
    async fetchSubCategories (categoryId) {
      try {
        const response = await this.$axios.$get(`/api/v1/sub_categories_request/`,
          {
            params: {
              category_id: categoryId
            }
          }
        );
        this.selectedCategoryId = categoryId;
        this.subCategoryData = response;
        console.log("サブカテゴリの取得に成功しました", response);
      } catch (error) {
        console.error('サブカテゴリの取得に失敗しました', error);
      }
    },
    async fetchRegions (subCategoryId) {
      try {
        const response = await this.$axios.$get(`/api/v1/regions_request/`,
          {
            params: {
              country_id: 1
            }
          }
        );
        this.selectedSubCategoryId = subCategoryId;
        this.regionsData = response;
        console.log("地域の取得に成功しました", response);
      } catch (error) {
        console.error('地域の取得に失敗しました', error);
      }
    },
    async fetchPrefectures (regionId) {
      try {
        const response = await this.$axios.$get(`/api/v1/prefectures_request/`,
          {
            params: {
              region_id: regionId
            }
          }
        );
        this.selectedRegionId = regionId;
        this.prefecturesData = response;
        console.log("都道府県の取得に成功しました", response);
      } catch (error) {
        console.error('都道府県の取得に失敗しました', error);
      }
    },
    async fetchTrophies (subCategoryId) {
      try {
        const response = await this.$axios.$get(`/api/v1/trophies_request/`,
          {
            params: {
              category_id: subCategoryId
            }
          }
        );
        this.selectedSubCategoryId = subCategoryId;
        this.trophies = response;
        console.log("トロフィーの取得に成功しました", response);
      } catch (error) {
        console.error('データの取得に失敗しました', error);
      }
    },
    toggleButtonVisibility() {
      this.showButton = !this.showButton;
    },
  }
}
</script>
<style>

  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
  }

  .v-sheet.theme--dark {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .v-card__subtitle, .v-card__text, .v-card__title {
    padding: 0 8px;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 10px;
  }

  v-spacer {
    height: 20px;
  }
</style>