<template>
  <div>
    <div class="item van-hairline--bottom">
      <div class="title van-multi-ellipsis--l2">
        {{ item.title }}
      </div>
      <div class="content ">
        {{ item.content }}
      </div>
      <div class="info-box">
        <div class="userinfo">
          <img :src="$baseUrl + item.author.avatar" alt="" /><span>{{
            item.author.nickname
          }}</span>
        </div>
        <div class="time">{{ item.created_at | formatTime }}</div>
        <div class="mes">
          <i class="iconfont iconicon_pinglunliang"></i
          ><span>{{ item.read }}</span>
        </div>
        <div class="zan">
          <i class="iconfont iconbtn_dianzan_small_nor actived"></i
          ><span>{{ item.star }}</span>
        </div>
      </div>
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
  }
}
</script>

<style lang="less" scoped>
.item {
  padding-top: 15px;
  padding-bottom: 15px;

  .title {
    font-size: 16px;
    color: #181a39;
    margin-bottom: 10px;
  }
  .content {
    color: #545671;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .info-box {
    margin-top: 15px;
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #b4b4bd;
    .userinfo {
      flex: 1;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    .time {
      margin-right: 20px;
    }
    .mes {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
    .zan {
      display: flex;
      align-items: center;
    }
    .iconfont {
      margin-right: 5px;
    }
  }
}
</style>
