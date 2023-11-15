
// export default async ({ $axios, context }) => {
//   try {
//     const response = await $axios.$get(`/api/v1/categories_request/`);
//     context.app.contextValue = response;
//   } catch (error) {
//     console.error('データの取得に失敗しました', error);
//   }
// }
// export default async ({ $axios, context }) => {
//     const response = await $axios.$get(`/api/v1/categories_request/`);
//     context.app.myData = response;

// }
export default function (context) {
  context.app.contextValue = "これはミドルウェアからのデータです";
  // console.log("context オブジェクト:", context.app.contextValue);
}