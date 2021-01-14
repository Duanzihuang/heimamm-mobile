<template>
  <div class="my">
    <div class="header">
      <div class="top">
        <div class="left">
          <div class="title">{{ userInfo.nickname }}</div>
          <div class="subtitle">
            {{ userInfo.intro || '面试不求人，我有面试宝典' }}
          </div>
        </div>
        <div class="right">
          <img
            @click="$router.push('/layout/myinfo')"
            src="@/assets/avatar.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="tips">
        <div class="item">
          <div class="count">298</div>
          <div class="title">累计答题</div>
        </div>
        <div class="item">
          <div class="count">98</div>
          <div class="title">收藏题目</div>
        </div>
        <div class="item">
          <div class="count">198</div>
          <div class="title">我的错题</div>
        </div>
        <div class="item">
          <div class="count">76%</div>
          <div class="title">正确率</div>
        </div>
      </div>
      <div class="gangwei">
        <my-cell icon="&#xe64d;" title="我的岗位" value="产品经理"></my-cell>
      </div>
    </div>
    <div class="center">
      <div class="data">
        面试数据
      </div>
      <div class="detail-data" v-if="userInfo.shareData">
        <div class="item">
          <div class="tip">
            昨日阅读<span>+{{ userInfo.shareData.read.yesterday }}</span>
          </div>
          <div class="count">{{ userInfo.shareData.read.total }}</div>
          <div class="title">阅读总数</div>
        </div>
        <div class="item">
          <div class="tip">
            昨日获赞<span>+{{ userInfo.shareData.star.yesterday }}</span>
          </div>
          <div class="count">{{ userInfo.shareData.star.total }}</div>
          <div class="title">获赞总数</div>
        </div>
        <div class="item">
          <div class="tip">
            昨日新增<span>+{{ userInfo.shareData.comment.yesterday }}</span>
          </div>
          <div class="count">{{ userInfo.shareData.comment.total }}</div>
          <div class="title">评论总数</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <my-cell icon="&#xe655;" title="我的面试分享" :value="21"></my-cell>
      <my-cell
        icon="&#xe656;"
        title="我的消息"
        :value="userInfo.systemMessages"
      ></my-cell>
      <my-cell icon="&#xe654;" title="收藏的题库" :value="32"></my-cell>
      <my-cell icon="&#xe648;" title="收藏的企业" :value="32"></my-cell>
      <my-cell
        icon="&#xe64f;"
        title="我的错题"
        :value="userInfo.errorNum"
      ></my-cell>
      <my-cell icon="&#xe63c;" title="收藏的面试经验" :value="166"></my-cell>
    </div>
  </div>
</template>

<script>
import MyCell from './MyCell'
import { mapState } from 'vuex'
export default {
  name: 'My',
  components: {
    MyCell
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f7f4f5;
  height: 100%;
  overflow-y: auto;
  .header {
    padding: @p15;
    box-sizing: border-box;
    width: 375px;
    height: 260px;
    background: linear-gradient(45deg, #ce0031, #b8002c);
    position: relative;
    .top {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        .title {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #ffffff;
          line-height: 30px;
          letter-spacing: 0px;
        }
        .subtitle {
          margin-top: 8px;
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          line-height: 16px;
          letter-spacing: 0px;
        }
      }
      .right {
        img {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.38);
          border-radius: 50%;
        }
      }
    }
    .tips {
      margin-top: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .count {
          font-size: 21px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: center;
          color: #ffffff;
          line-height: 24px;
          letter-spacing: 0px;
        }
        .title {
          margin-top: 6px;
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #ffffff;
          line-height: 16px;
          letter-spacing: 0px;
        }
      }
    }
    .gangwei {
      position: absolute;
      bottom: -20px;
      left: @p15;
      right: @p15;
      // background-color: purple;
      height: 55px;
      border-radius: 8px;
    }
  }
  .center {
    margin: 25px auto 0px;
    width: 345px;
    height: 143px;
    background: #ffffff;
    border-radius: 8px;
    .data {
      font-size: 14px;
      padding-left: 15px;
      padding-top: 19px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: #181a39;
      line-height: 20px;
      letter-spacing: 0px;
    }
    .detail-data {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .tip {
          font-size: 10px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #b4b4bd;
          line-height: 14px;
          letter-spacing: 0px;
          span {
            color: #2cc4db;
          }
        }
        .count {
          margin-top: 10px;
          font-size: 21px;
          font-family: DINAlternate, DINAlternate-Bold;
          font-weight: 700;
          text-align: center;
          color: #181a39;
          line-height: 24px;
          letter-spacing: 0px;
        }
        .title {
          margin-top: 10px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          text-align: center;
          color: #545671;
          line-height: 16px;
          letter-spacing: 0px;
        }
      }
    }
  }
  .bottom {
    margin: 25px auto 0px;
    width: 345px;
    background: #ffffff;
    border-radius: 8px;
  }
}
</style>
