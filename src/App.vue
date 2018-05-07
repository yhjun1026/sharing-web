<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="less">
// 这里是坑啊，文件路径中好像不能用@符号
// 引入全局样式
@import "./assets/styles/global.less";
</style>
<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
