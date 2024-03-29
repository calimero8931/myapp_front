<template>
  <div>
    <div v-if="profile.check_admin">
      <h1 class="text-center mb-10">トロフィー申請</h1>
      <v-form ref="form">
        <p>当てはまるカテゴリと県を選んでください</p>
        <div v-for="(category, i) in categoriesData" :key="`category-${i}`" class="mt-2">
          <v-btn color="appyellow" @click="fetchSubCategories(category.id),toggleButtonVisibility()" style="font-weight: bold; color: #000;" block>
            {{ category.name }}
          </v-btn>
          <div v-if="category.id === selectedCategoryId && showButton" class="flex">
            <div v-for="(subCategory, i) in subCategoriesData" :key="`subCategory-${i}`" class="mr-2 mt-2">
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
                        :outlined="prefecture.id === selectedPrefectureId ? false : true"
                        color="orange"
                        @click="selectPrefecture(prefecture.id)"
                        style="font-weight: bold;"
                      >
                        {{ prefecture.name }}
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-10">以下の情報を入力してください</p>
        <v-text-field v-model="profile.user_name" label="登録したい場所の名前" required></v-text-field>
        <v-file-input
          v-model="profile.profile_image"
          label="メイン画像のアップロード"
          accept="image/*"
        ></v-file-input>
        <v-textarea v-model="profile.bio" label="紹介文"></v-textarea>
        <v-text-field v-model="profile.website" label="ウェブサイトリンク"></v-text-field>
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="#25BC91"
          @click="clickGetGeoButton()"
          class="my-8"
          block>
          <v-icon>mdi-map-marker</v-icon>
          現在の位置を取得して入力
        </v-btn>
        <v-text-field v-model="profile.latitude" label="緯度を入力"></v-text-field>
        <v-text-field v-model="profile.longitude" label="経度を入力"></v-text-field>
        <v-btn color="primary" @click="saveProfile" class="black--text" block>申請</v-btn>
      </v-form>
    </div>
    <div v-else>
      <p>あなたは管理者ではありません</p>
    </div>
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
        website: "",
        check_admin: false,
        latitude: "",
        longitude: "",
      },
      loading: false,
      showButton: false,
      selectedCountry: 1,
      categoriesData: [],
      selectedCategoryId: 1,
      subCategoriesData: [],
      selectedSubCategoryId: 1,
      regionsData: [],
      selectedRegionId: 5,
      prefecturesData: [],
      selectedPrefectureId: 29,
      selectedButton: false,
    };
  },
  mounted() {
    this.fetchCategories();
  },
  async created() {
    try {
      const response = await this.$axios.$post(`/api/v1/check_admin/`,
        {
          params: {
            user_id: this.$store.state.user.current.id
          }
        }
      );
      this.profile.check_admin = response.admin;
    } catch (error) {
      alert(error.message);
    }
  },
  methods: {
    async clickGetGeoButton() {
        try {
            this.loading = true;
            const position = await this.getGeoLocation();
            this.profile.latitude = position.lat;
            this.profile.longitude = position.lng;
            const msg = "現在地を取得しました";
            const color = 'success';
            const timeout = 4000;
            this.loading = false;
            return this.$store.dispatch('getToast', { msg, color, timeout });
        } catch (error) {
            console.error("位置情報の取得に失敗しました", error);
        }
    },
    getGeoLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const data = position.coords;
                    const lat = data.latitude;
                    const lng = data.longitude;
                    resolve({ lat, lng });
                },
                error => {
                    reject(error);
                }
            );
        });
    },
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
          this.profile.profile_image_url = response.file_url;
        } catch (error) {
          console.error(error.message);
        }
        } else {
          console.error('ファイルが選択されていません');
        }
    },
    async fetchCategories () {
      try {
        const response = await this.$axios.$get(`/api/v1/categories_request/`);
        this.categoriesData = response;
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
        this.subCategoriesData = response;
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
      } catch (error) {
        console.error('都道府県の取得に失敗しました', error);
      }
    },
    async selectPrefecture(prifectureId) {
      this.selectedPrefectureId = prifectureId;
    },
    toggleButtonVisibility() {
      this.showButton = !this.showButton;
    },
    async saveProfile( $store ) {
      if (this.profile.profile_image) {
        const file = this.profile.profile_image;
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await this.$axios.$post(`/api/v1/trophy/uploads/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            params: {
              user_id: this.$store.state.user.current.id,
              user_name: this.profile.user_name,
              bio: this.profile.bio,
              website: this.profile.website,
              latitude: this.profile.latitude,
              longitude: this.profile.longitude,
              country_id: this.selectedCountry,
              category_id: this.selectedCategoryId,
              sub_category_id: this.selectedSubCategoryId,
              region_id: this.selectedRegionId,
              prefecture_id: this.selectedPrefectureId,
            }
          });
          const msg = "トロフィーが申請されました";
          const color = 'success';
          const timeout = 4000;
          this.$store.dispatch('getToast', { msg, color, timeout });
          this.formReset();
        } catch (error) {
          console.error(error.message);
          const msg = error.message;
          const color = 'error';
          const timeout = 8000;
          this.$store.dispatch('getToast', { msg, color, timeout });
        }
      } else {
        const msg = "画像が選択されていません";
        const color = 'error';
        const timeout = 4000;
        this.$store.dispatch('getToast', { msg, color, timeout });
      }
    },
    formReset () {
      this.$refs.form.reset()
      for (const key in this.params.user) {
        this.params.user[key] = ''
      }
    }
  }
}
</script>