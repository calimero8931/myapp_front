<template>
  <v-app>
    <home-app-bar
      :img-height="imgHeight"
    />
    <v-img
      id="scroll-top"
      dark
      src="https://picsum.photos/id/20/1920/1080?blur=5"
      gradient="to top right, rgba(19,84,122,.6), rgba(128,208,199,.9)"
      :height="imgHeight"
    >
      <v-row
        align="center"
        justify="center"
        :style="{ height: `${imgHeight}px` }"
      >
        <v-col
          cols="12"
          class="text-center"
        >
          <h1 class="display-1 mb-4">
            LIFE IS TROPHY
          </h1>
        </v-col>
      </v-row>
    </v-img>
    <v-sheet>
      <v-spacer></v-spacer>
      <h2>カテゴリから選ぶ</h2>
      <div v-for="(category, i) in categoryData" :key="`category-${i}`">
        <v-btn outlined color="purple" @click="fetchSubCategories(category.id)" style="font-weight: bold;">
          {{ category.name }}
        </v-btn>
        <div v-if="category.id === selectedCategoryId">
          <div v-for="(subCategory, i) in subCategoryData" :key="`subCategory-${i}`">
            <v-btn outlined color="green" @click="fetchRegions(subCategory.id)" style="font-weight: bold;">
              {{ subCategory.name }}
            </v-btn>
            <!-- 以下にregionsデータを羅列 -->
            <div v-if="subCategory.id === selectedSubCategoryId">
              <div v-for="(region, i) in regionsData" :key="`region-${i}`">
                <v-btn outlined color="blue" @click="fetchPrefectures(region.id)" style="font-weight: bold;">
                  {{ region.name }}
                </v-btn>
                <!-- 以下にprefecturesデータを羅列 -->
                <div v-if="region.id === selectedRegionId">
                  <div v-for="(prefecture, i) in prefecturesData" :key="`prefecture-${i}`">
                    <v-btn outlined color="orange" @click="fetchTrophies(prefecture.id)" style="font-weight: bold;">
                      <nuxt-link :to="{ name: 'results-param1-param2' , params:{ param1:selectedSubCategoryId, param2:prefecture.id }}">
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
  data () {
    return {
      imgHeight: 2500,
      menus: [
        { title: 'about', subtitle: 'このサイトはブログ"独学プログラマ"で公開されているチュートリアルのデモアプリケーションです' },
        { title: 'products', subtitle: '他にはない優れた機能の数々' },
        { title: 'price', subtitle: '会社の成長に合わせた3つのプラン' },
        { title: 'contact', subtitle: 'お気軽にご連絡を' },
        { title: 'company', subtitle: '私たちの会社' }
      ],
      categoryData: [],
      selectedCategoryId: null,
      subCategoryData: [],
      selectedSubCategoryId: null,
      regionsData: [],
      selectedRegionId: null,
      prefecturesData: [],
      selectedPrefectureId: null,
      trophies : []
    }
  },
  mounted() {
    this.fetchCategories();
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
    }
  }
}
</script>