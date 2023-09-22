export default async ({ store, $axios }) => {
  try {
    const response = await $axios.$get(`/api/v1/get_achievements_list/`,
      {
        params: {
          user_id: store.state.user.current.id
        }
      }
    );
    store.commit('setAchievementsList', response);
  } catch (error) {
    console.error('データの取得に失敗しました', error);
  }
}