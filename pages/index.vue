<template>
  <v-app>
    <v-parallax :speed="1" :src="imageUrl" style="height: 100%;">
      <template>
        <h2 class="text-center my-4">リコメンド</h2>
        <v-sheet class="slide" style="width: 100vw; padding-left: 12px; margin-left: -1rem;">
          <v-slide-group multiple style="margin: 0px 0;">
            <v-slide-item v-for="(recommend, i) in recommendData" :key="`recommend-${i}`">
              <v-card :to="`/trophy/${recommend.id}`" style="margin: 0 10px 0 0; width: 150px; height: auto;">
                <v-img
                  class="white--text align-end"
                  height="100px"
                  :src="recommend.image_url"
                ></v-img>
                <v-card-title class="mt-2" style="font-size: 14px; justify-content: center;">
                  {{ recommend.title  }}
                </v-card-title>
                <v-card-text class="text--primary mb-4" style="margin-top: -6px;">
                  <div class="v-text-truncate text-center">
                    {{ recommend.prefecture_name }}
                  </div>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </template>
      <template>
        <h2 class="text-center my-4">New!</h2>
        <v-sheet class="slide" style="width: 100vw; padding-left: 12px; margin-left: -1rem;">
          <v-slide-group multiple style="margin: 0px 0;">
            <v-slide-item v-for="(new_trophy, i) in newTrophyData" :key="`recommend-${i}`">
              <v-card :to="`/trophy/${new_trophy.id}`" style="margin: 0 10px 0 0; width: 150px; height: auto;">
                <v-img
                  class="white--text align-end"
                  height="100px"
                  :src="new_trophy.image_url"
                ></v-img>
                <v-card-title class="mt-2" style="font-size: 14px; justify-content: center;">
                  {{ new_trophy.title  }}
                </v-card-title>
                <v-card-text class="text--primary mb-4" style="margin-top: -6px;">
                  <div class="v-text-truncate text-center">
                    {{ new_trophy.prefecture_name }}
                  </div>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </template>
      <section>
        <h2 class="text-center mt-8 mb-4">トロフィー<span style="font-size: 18px;">を</span>探<span style="font-size: 18px;">す</span></h2>
        <v-sheet style="margin-top: 0;">
          <v-container class="elevation-6" >
            <div v-for="(category, i) in categoryData" :key="`category-${i}`" class="my-2">
              <v-card
                :class="{ 'mt-4': i !== 0 }"
              >
                <v-img
                  :src="category_image[i]"
                  :height="imgHeight"
                  style="border-radius: 7px 7px 0 0;"
                  @click="fetchSubCategories(category.id),toggleButtonVisibility()"
                ></v-img>
                <v-btn
                  :disabled="loading"
                  :loading="loading"
                  color="appyellow"
                  @click="fetchSubCategories(category.id),toggleButtonVisibility()"
                  style="font-weight: bold; color: #1B2440!important; border-radius: 0 0 6px 6px;"
                  block>
                  {{ category.name }}
                </v-btn>
              </v-card>
              <div v-if="category.id === selectedCategoryId && showButton" class="flex">
                <div v-for="(subCategory, i) in subCategoryData" :key="`subCategory-${i}`"
                  :class="{ 'mr-2': selectedSubCategoryId !== subCategory.id, 'mt-2': true }"
                >
                  <v-btn
                    :disabled="loading"
                    :loading="loading"
                    :outlined="selectedSubCategoryId != subCategory.id"
                    color="#2AC4DB"
                    @click="fetchRegions(subCategory.id)"
                    style="font-weight: bold;"
                    block
                    >
                    {{ subCategory.name }}
                  </v-btn>
                  <!-- 以下にregionsデータを羅列 -->
                  <div v-if="subCategory.id === selectedSubCategoryId" class="flex">
                    <div v-for="(region, i) in regionsData" :key="`region-${i}`"
                      :class="{ 'mr-2': selectedRegionId !== region.id, 'mt-2': true }"
                    >
                      <v-btn
                        :disabled="loading"
                        :loading="loading"
                        :outlined="selectedRegionId != region.id"
                        color="#FB515A"
                        @click="fetchPrefectures(region.id)"
                        style="font-weight: bold;"
                        block
                        >
                        {{ region.name }}
                      </v-btn>
                      <!-- 以下にprefecturesデータを羅列 -->
                      <div v-if="region.id === selectedRegionId" class="flex">
                        <div v-for="(prefecture, i) in prefecturesData" :key="`prefecture-${i}`" class="mr-2 mt-2">
                          <v-btn
                            outlined
                            color="#25BC91"
                            @click="fetchTrophies(prefecture.id)"
                            style="font-weight: bold;"
                          >
                            <nuxt-link
                              :to="{ name: 'results-param1-param2',
                              params:{ param1:selectedSubCategoryId, param2:prefecture.id }}"
                              style="text-decoration: none;color: #25BC91;"
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
        </v-sheet>
      </section>
      <p class="my-4" style="width: 100vw;margin-left: -1rem;">
        <nuxt-link
          :to="{ name: 'about' }"
          style="text-decoration: none;color: white!important; font-size: 16px;"
        >
          <v-img
            src="how_to.png"
            style="width: 100vw; max-width: 650px;"
          ></v-img>
        </nuxt-link>
      </p>
      <v-dialog v-model="isDesktop" width="500" rounded>
        <template v-slot:default="{ props }">
          <v-card title="Dialog">
            <h3
            class="text-center pt-6 pb-4"
            style="font-weight: bold; font-size: 28px;"
            >notice</h3>
            <v-card-text>
              このwebアプリはGPSを使う特性上、スマートフォンでのみご利用できます。<br>
              デザインもスマートフォン向けに最適化しておりますので、ぜひスマートフォンでご利用ください。
            </v-card-text>
            <v-btn
              id="close_btn"
              color="error"
              @click="closeDialog"
              block>閉じる</v-btn>
          </v-card>
        </template>
      </v-dialog>
      <app-footer />
    </v-parallax>
  </v-app>
</template>

<script>
import VParallax from 'vue-parallax';
import axios from 'axios';
import AppFooter from '../components/App/AppFooter.vue';

export default {
  layout: 'default',
  middleware: ['logged-in-redirect'],
  components: {
    AppFooter,
    VParallax
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
      loading: false,
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
      trophies: [],
      showButton: false,
      newTrophyData: [],
      isDesktop: false,
      isDialogOpen: false,
      imageUrl: 'parallax.png',
      category_image: [
        "AdobeStock_273329877.jpeg",
        "AdobeStock_611857064.jpeg",
        "AdobeStock_629948844.jpeg"
      ]
    }
  },
  mounted() {
    this.fetchCategories();
    this.isDesktop = window.innerWidth > 768;
  },
  async created( $store ) {
    try {
        const response = await this.$axios.$get(`/api/v1/recommend_request/`);
        this.recommendData = response;
        const response_new_trophy = await this.$axios.$get(`/api/v1/get_new_trophy/`);
        this.newTrophyData = response_new_trophy;
      } catch (error) {
        console.error(error.message);
      }
  },
  methods: {
    async fetchCategories () {
      try {
        this.loading = true;
        const response = await this.$axios.$get(`/api/v1/categories_request/`);
        this.categoryData = response;
        this.loading = false;
      } catch (error) {
        console.error('カテゴリデータの取得に失敗しました', error);
        this.loading = false;
      }
    },
    async fetchSubCategories (categoryId) {
      try {
        this.loading = true;
        const response = await this.$axios.$get(`/api/v1/sub_categories_request/`,
          {
            params: {
              category_id: categoryId
            }
          }
        );
        this.selectedCategoryId = categoryId;
        this.subCategoryData = response;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async fetchRegions (subCategoryId) {

      try {
        this.loading = true;
        const response = await this.$axios.$get(`/api/v1/regions_request/`,
          {
            params: {
              country_id: 1
            }
          }
        );
        this.selectedSubCategoryId = subCategoryId;
        this.regionsData = response;
        this.loading = false;
      } catch (error) {
        console.error('地域の取得に失敗しました', error);
        this.loading = false;
      }
    },
    async fetchPrefectures (regionId) {
      try {
        this.loading = true;
        const response = await this.$axios.$get(`/api/v1/prefectures_request/`,
          {
            params: {
              region_id: regionId
            }
          }
        );
        this.selectedRegionId = regionId;
        this.prefecturesData = response;
        this.loading = false;
      } catch (error) {
        console.error('都道府県の取得に失敗しました', error);
        this.loading = false;
      }
    },
    async fetchTrophies (subCategoryId) {
      try {
        this.loading = true;
        const response = await this.$axios.$get(`/api/v1/trophies_request/`,
          {
            params: {
              category_id: subCategoryId
            }
          }
        );
        this.selectedSubCategoryId = subCategoryId;
        this.trophies = response;
        this.loading = false;
      } catch (error) {
        console.error('データの取得に失敗しました', error);
        this.loading = false;
      }
    },
    toggleButtonVisibility() {
      this.showButton = !this.showButton;
      this.buttonClicked = true;
      this.selectedCategoryId = null;
      this.selectedSubCategoryId = null;
      this.selectedRegionId = null;
      this.selectedPrefectureId = null;
    },
    closeDialog(){
      this.isDesktop = false;
    }
  }
}
</script>
<style>

  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  h2 {
    font-size: 30px!important;
    margin: 0;
  }

  .v-sheet.theme--dark {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .slide {
    padding: 10px 0;
  }

  .v-card__subtitle, .v-card__text, .v-card__title {
    padding: 0 8px 0 8px;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 10px;
  }

  v-spacer {
    height: 20px;
  }

  .v-dialog.v-dialog--active {
    z-index: 10000;
    background-color: #1B2440!important;
  }

  .v-dialog.v-dialog--active .v-card__text {
    color: #fff!important;
    padding: 0 30px 30px 30px;
  }
</style>