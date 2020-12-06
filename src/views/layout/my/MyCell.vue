<template>
  <van-cell class="my-cell" :value="value" size="large" center is-link>
    <template #icon>
      <i class="iconfont">
        <span v-html="icon"></span>
      </i>
    </template>
    <template #title>
      <span class="title">{{ title }}</span>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    value: [String, Number]
  }
}
</script>

<style lang="less" scoped>
.my-cell {
  .iconfont {
    font-size: 20px;
    padding-right: 12px;
  }
  .title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 20px;
    letter-spacing: 0px;
  }
  .van-cell__value {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #5b5d75;
    line-height: 20px;
    letter-spacing: 0px;
  }
}
</style>
