<template>
  <div class="my-nav-bar">
    <van-nav-bar @click-left="$router.back()" @click-right="rightClick">
      <template #left>
        <i class="iconfont">&#xe637;</i>
      </template>
      <template #title>
        <span class="title">{{ title }}</span>
      </template>
      <template #right>
        <span>{{ rightText }}</span>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'MyNavBar',
  props: {
    title: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    }
  },
  methods: {
    rightClick () {
      this.$emit('click-right')
    }
  }
}
</script>

<style lang="less" scoped>
.my-nav-bar {
  .iconfont {
    font-size: 44px;
  }
  /deep/ .van-nav-bar__left,
  .van-nav-bar__right {
    padding: 0;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }
}
</style>
