<template>
  <div>
    <h2>
      Usersテーブルの取得
    </h2>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>created_at</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, i) in users"
          :key="`user-${i}`"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ dateFormat(user.created_at) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      ユーザーが取得できませんでした
    </div>
  </div>
</template>

<script>
export default {
  // コンポーネント（html）を読む前に実行される
  // async内のawaitは常にPromiseを返す
  async asyncData ({ $axios }) {
    let users = []
    //awaitはpromiseを返すまでJSを待たせる
    await $axios.$get('/api/v1/users')
      //axiosが成功した場合thenで受け取る
      .then(res => (users = res))
    return { users }
  },
  //computedが算出プロパティ
  computed: {
    dateFormat () {
      return (date) => {
        const dateTimeFormat = new Intl.DateTimeFormat(
          'ja', { dateStyle: 'medium', timeStyle: 'short' }
        )
        return dateTimeFormat.format(new Date(date))
      }
    }
  }
}
</script>