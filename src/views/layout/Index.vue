<template>
  <div style="height:100%;">
    <!--
     缓存页面组件
     keep-alive  可以理解成v-show的使用
     步骤:将需要缓存的页面对应的路由出口加一个keep-alive包住
     如果只需要缓存某个别页面
        include="页面组件对应的name值"
     除了某页面,其它页面都缓存
        exclude="页面组件对应的name值"
      -->
    <keep-alive include="Find">
      <router-view></router-view>
    </keep-alive>
    <transition name="tabbar">
      <van-tabbar
        v-if="$route.meta.needTab"
        inactive-color="#b4b4bd"
        active-color="#e40137"
        route
        placeholder
      >
        <van-tabbar-item to="/layout/company">
          <span class="title">公司</span>
          <template #icon>
            <i class="iconfont">&#xe63d;</i>
          </template></van-tabbar-item
        >
        <van-tabbar-item to="/layout/question">
          <span class="title">刷题</span>
          <template #icon>
            <i class="iconfont">&#xe63f;</i>
          </template></van-tabbar-item
        >
        <van-tabbar-item to="/layout/find">
          <span class="title">发现</span>
          <template #icon>
            <i class="iconfont">&#xe646;</i>
          </template></van-tabbar-item
        >
        <van-tabbar-item to="/layout/my">
          <span class="title">我的</span>
          <template #icon>
            <i class="iconfont">&#xe645;</i>
          </template></van-tabbar-item
        >
      </van-tabbar>
    </transition>
  </div>
</template>

<style lang="less" scoped>
.iconfont {
  font-size: 29px;
}
.title {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  // line-height: 100px;
  letter-spacing: 0px;
}
.tabbar-enter-active,
.tabbar-leave-active {
  transition: opacity 0.5s;
}
.tabbar-enter, .tabbar-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.tabbar-enter-to,
.tabbar-leave {
  opacity: 1;
}
</style>
