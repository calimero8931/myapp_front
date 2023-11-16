<template>
  <div>
    <h1 class="text-center mb-10">簡易トロフィー削除</h1>
    <v-list v-if="check_admin">
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in displayedTrophyList"
          :key="i"
          :value="item.id"
        >
          <v-list-item-content>
            <v-list lines="one" class="flex">
              <div
                @click="$router.push(`/trophy/${item.id}`)"
              >
                <v-list-item-text class="full-width">
                  ID:{{ item.id }}
                </v-list-item-text>
                <v-list-item-text class="full-width">
                  {{ item.title }}
                </v-list-item-text>
              </div>
              <v-list-action>
                <v-btn
                  color="red"
                  class="text-right"
                  @click="deleteTrophy(item.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-action>
            </v-list>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="changePage"
      ></v-pagination>
    </v-list>
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
      check_admin: false,
      trophy_list: [],
      itemsPerPage: 10,
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.trophy_list.length / this.itemsPerPage);
    },
    displayedTrophyList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.trophy_list.slice(startIndex, endIndex);
    },
  },
  async created() {
    try {
      const response = await this.$axios.$post(`/api/v1/check_admin/`, {
        params: {
          user_id: this.$store.state.user.current.id,
        },
      });
      this.check_admin = response.admin;
      const list_response = await this.$axios.$get(`/api/v1/get_all_trophy_list/`);
      this.trophy_list = list_response;
    } catch (error) {
      alert(error.message);
    }
  },
  methods: {
    formReset() {
      this.$refs.form.reset();
      for (const key in this.params.user) {
        this.params.user[key] = '';
      }
    },
    deleteTrophy(id) {
      if (confirm('本当に削除しますか？')) {
        try {
          const response = this.$axios.$post(`/api/v1/delete_trophy/`, {
            params: {
              trophy_id: id,
            },
          });
          alert('削除しました');
          this.$router.go();
        } catch (error) {
          alert(error.message);
        }
      }
    },
    changePage(newPage) {
      this.currentPage = newPage;
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}

.flex {
  display: flex;
  justify-content: space-between;
}
</style>
