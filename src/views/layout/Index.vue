<template>
  <div style="height:100%;">
    <router-view></router-view>
    <van-tabbar
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
</style>
