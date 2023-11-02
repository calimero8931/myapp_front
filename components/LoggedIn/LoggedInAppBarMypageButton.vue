<template>
  <v-footer v-if="state.user.current"
   app fixed >
    <v-container>
      <v-layout
        class="fixed-bottom d-flex justify-center align-center"
        column
      >
        <nuxt-link
          id="mypage_btn"
          :class="{ mypage_btn: true, active: showBalloon }"
          color="appyellow"
          :to="`/account/${state.user.current.id}/mypage`"
        >
          <v-icon>mdi-account-circle</v-icon>
        </nuxt-link>
        <div :class="{ balloon: true, active: showBalloon }">
            マイページ
        </div>
      </v-layout>
    </v-container>
  </v-footer>
  <p v-else></p>
</template>

<script>
export default {
  data () {
    return {
      showBalloon: false,
    }
  },
  computed: {
    state() {
      return this.$store.state;
    }
  },
  mounted() {
    setTimeout(() => {
    // スクロール位置を監視
      window.addEventListener('scroll', this.handleScroll);
    }, 1000); // 0.5秒（500ミリ秒）の遅延を設定
  },
  beforeDestroy() {
    // コンポーネントが破棄される前にイベントリスナーを削除
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;

      // 一番下までスクロールされたかどうかをチェック
      const isBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight;

      // showBalloonデータを更新
      this.showBalloon = isBottom;
    }
  }
}
</script>
<style scoped>
.container {
  padding: 0;
}

#mypage_btn {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 60px;
  border: 1px solid yellow;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transform: translateY(20px);
  transition: transform 0.4s;
  /* animation: shake 0.5s ease-in-out infinite; アニメーション名, 時間, イージング, 無限繰り返し */
}
.mypage_btn i {
  font-size: 50px!important;
  color: #F3DF4C!important;
}

.mypage_btn.active i {
  font-size: 60px!important;
}

#mypage_btn.active {
  transform: translateY(0px);
  /* animation: shake 0.5s ease-in-out infinite; アニメーション名, 時間, イージング, 無限繰り返し */
}
/* @keyframes shake {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-1px, 0); }
  50% { transform: translate(0px, 0); }
  75% { transform: translate(1px, 0); }
  100% { transform: translate(0px, 0); }
} */
.balloon {
  /* 初期状態のスタイル */
  color: #F3DF4C;
  font-weight: bolder;
  font-family: 'Dela Gothic One', sans-serif!important;
  font-weight: 400!important;
  padding: 0 10px;
  margin-top: -2px;
  display: inline-block;
  opacity: 0;
  z-index: 99999;
  transform: translateY(50px);
  transition: opacity 0.4s, transform 0.4s;
}
.balloon.active {
  opacity: 1;
  transform: translateY(0);
}

</style>