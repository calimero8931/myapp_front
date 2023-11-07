<template>
  <div>
    <h2 class="text-center my-4">あなた<span class="h1-span">の</span>興味</h2>
    <app-toaster />

    <div>
      <v-btn
        v-for="(subCategory, i) in processedData"
        :key="`subCategory-${i}`"
        :color="subCategory.isSelected ? 'red' : ''"
        @click="handleButtonClick(subCategory)"
        class="mr-2 mb-2"
        outlined
      >
        {{ subCategory.name }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutsDefault',
  layout: 'logged-in',
  data() {
    return {
      subCategoryData: [],
      processedData: [],
    };
  },
  mounted() {
    this.SelectedSubCategories ();
  },
  methods: {
    async SelectedSubCategories(){
      try {
      const loggedInUserId = this.$store.state.user.current.id;
      const response = await this.$axios.$get(`/api/v1/interested_sub_categories/`,
        {
          params: {
            user_id: loggedInUserId
          }
        });
      // console.log("サブカテゴリの取得に成功しました", response);
      if (Array.isArray(response)) {
        this.processedData = response.map(data => {
        const isSelected = data.interested_sub_category_id === loggedInUserId ? true : false;
        return {
          ...data,
          isSelected,
        };
      });
    } else {
      console.error("サブカテゴリの取得に失敗しました", "レスポンスが配列ではありません");
    }
  } catch (error) {
    console.error("サブカテゴリの取得に失敗しました", error);
  }
    },
    async handleButtonClick (subCategory) {
      subCategory.isSelected = !subCategory.isSelected;
      const response = await this.$axios.$get(`/api/v1/check_interested_sub_categories/`,
        {
          params: {
            user_id: this.$store.state.user.current.id,
            sub_category_id: subCategory.id
          }
        }
      );
    }
  }
}
</script>
<style>
</style>
