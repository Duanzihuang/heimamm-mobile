<template>
  <div class="item">
    <div class="content">
      <div class="title van-multi-ellipsis--l2">
        {{ item.title }}
      </div>
      <div class="info">
        <div class="time">{{ item.created_at | formatTime }}</div>
        <div class="see">
          <i class="iconfont iconicon_liulanliang"></i>
          <span>{{ item.read }}</span>
        </div>
        <div class="zan">
          <i class="iconfont iconbtn_dianzan_small_nor"></i>
          <span>{{ item.star }}</span>
        </div>
      </div>
    </div>
    <div class="cover">
      <img :src="img" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    img () {
      return process.env.VUE_APP_BASEURL + this.item.cover
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  padding-bottom: 30px;
  display: flex;
  min-height: 100px;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 75px;
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #181a39;
    }
    .info {
      color: #b4b4bd;
      font-size: 12px;
      display: flex;
      margin-top: 10px;
      align-items: center;
      .time {
        flex: 1;
      }
      .see {
        margin-right: 30px;
        display: flex;
        align-items: center;
      }
      .zan {
        display: flex;
        align-items: center;
      }
      .iconfont {
        margin-right: 5px;
        font-size: 12px;
        line-height: 1;
      }
    }
  }
  .cover {
    width: 113px;
    height: 75px;
    margin-left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
