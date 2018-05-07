<template>
  <div>
    <!-- 这是侧导航 -->
    <side-bar></side-bar>
    <top-bar></top-bar>
   <!-- <div class="con-wrap" :class="{conCollapse: isCollapse}">
      &lt;!&ndash; 这是顶部导航 &ndash;&gt;
      <top-bar></top-bar>
      &lt;!&ndash; 这是组件要插入的地方 &ndash;&gt;
      <div class="wrapper">
        &lt;!&ndash;<router-view class="page-component-wrap animated fadeIn content"></router-view>&ndash;&gt;
        <router-view class="content"></router-view>
      </div>
    </div>-->
    <div class="layout-container container">
      <div class="wrapper">
        <router-view class="content"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import TopBar from 'comp/TopBar'
  import SideBar from 'comp/SideBar'
  import 'directives/customTitle.js'
  import 'filters/handleNum.js'
  export default {
    name: 'layout',
    computed: {
      isCollapse() {
        return this.$store.state.common.isCollapse
      }
    },
    components: {
      'top-bar': TopBar,
      'side-bar': SideBar
    }
  }
</script>

<style lang="less">
  .layout-app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .layout-header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 65px;
    font-size: 22px;
    line-height: 65px;
    color: #fff;
    background: -webkit-linear-gradient(left, #20a0ff , #658df5); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #20a0ff, #658df5); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #20a0ff, #658df5); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #20a0ff , #658df5); /* 标准的语法（必须放在最后） */
  }
  .layout-menu {
    position: absolute;
    top: 65px;
    left: 0;
    right:0;
    bottom: 0;
    width: 200px;
    overflow: auto;
  }
  .layout-container {
    position: absolute;
    left: 160px;
    top: 57px;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    overflow: auto;
    background-color: #e5e9f2;
    width: auto;
    /*overflow-y: scroll;*/
  }
</style>
