export default async ({ store, $axios, route }) => {
  if (!store.state.user.current) {
    return false
  }
  try {
    const response = await $axios.$get(`/api/v1/get_interested/`,
      {
        params: {
          user_id: store.state.user.current.id,
          trophy_id: route.params.id
        }
      }
    );
    store.commit('setInterestAlready', response);
  } catch (error) {
    console.error('データの取得に失敗しました', error);
  }
}