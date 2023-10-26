<template>
  <v-app>
    <home-app-bar
      :img-height="imgHeight"
      id="scroll-top"
    />
    <v-main>
      <app-toaster />
      <div class="background-image111">
        <nuxt />
      </div>
    </v-main>
    <logged-in-app-bar-mypage-button class="mypage_btn" />
  </v-app>
</template>

<script>
export default {
  name: 'default',
  middleware: ['authentication'],
  data () {
    return {
    }
  }
}
</script>
<style>
.v-application .display-1 {
  font-family: 'Alegreya Sans', sans-serif!important;
}

.mypage_btn {
  z-index: 100;
}
/* 背景画像の設定 */
.background-image111 {
  /* height: 2000px; */
  height: auto;
  /* background-image: url('https://www.illust-box.jp/db_img/sozai/00011/118201/watermark.jpg'); */
  /* background-size: cover; */
  /* background-repeat: no-repeat; */
}

.v-toolbar__content {
  justify-content: center;
}

</style>