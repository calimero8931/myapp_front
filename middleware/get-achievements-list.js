export default async ({ store, $axios }) => {
  try {
    // railsのactive storageを設定してあるカラムがjoin先にある場合、上手くいかなかった為2段階でデータ取得後マージ
    const response = await $axios.$get(`/api/v1/get_favorite_list/`, {
      params: {
        user_id: store.state.user.current.id
      }
    });
    const response2 = await $axios.$get(`/api/v1/get_trophy_image/`, {
      params: {
        user_id: store.state.user.current.id
      }
    });
    // 画像以外のデータ (response) に対応する画像のURL (response2) をマージ
    const mergedData = response.map(item => {
      const imageInfo = response2.find(imgItem => imgItem.id === item.trophy_id);

      if (imageInfo) {
        return {
          ...item,
          image_url: imageInfo.image_url
        };
      } else {
        return item;
      }
    });

    store.commit('setAchievementsList', mergedData);
  } catch (error) {
    console.error('データの取得に失敗しました', error);
  }
}
