<template>
  <van-skeleton title avatar :row="30" :loading="loading">
    <div class="shareInfo">
      <my-nav-bar />
      <div class="content">
        <h3 class="title">{{ info.title }}</h3>
        <div class="other">
          <div class="o1">{{ info.updated_at | formatTime }}</div>
          <i class="iconfont o2">&#xe644;</i>
          <div class="o3">{{ info.read }}</div>
          <i class="iconfont o2">&#xe638;</i>
          <div class="o3">{{ info.star }}</div>
        </div>
        <div class="txt" v-html="info.content"></div>
      </div>
      <!-- 分割线 -->
      <div class="line"></div>
      <!-- 评论列表 -->
      <van-list
        v-model="listLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="comment">
          <div class="comment-title">
            评论<span class="num">{{ total }}</span>
          </div>
          <div
            class="comment-item"
            v-for="(item, index) in commentList"
            :key="index"
          >
            <div class="item1">
              <img
                @click="sendParentMessage(item)"
                class="i1"
                v-if="item.author.avatar"
                :src="$baseUrl + item.author.avatar"
                alt=""
              />
              <img
                class="i1"
                @click="sendParentMessage(item)"
                v-else
                src="@/assets/logo.png"
                alt=""
              />
              <div class="i2">
                <div class="i2-name">{{ item.author.nickname }}</div>
                <div class="i2-time">{{ item.created_at | formatTime }}</div>
              </div>

              <div class="i3" @click="commentStar(item)">
                {{ item.star }}
              </div>
              <i
                class="iconfont"
                :class="{ red: isRed('starComments', item.id) }"
                @click="commentStar(item)"
                >&#xe638;</i
              >
            </div>
            <div class="item2">
              {{ item.content }}
            </div>
            <div class="item3" v-if="item.children_comments.length > 0">
              <div
                class="item3-item"
                :key="index2"
                v-for="(item2, index2) in item.children_comments"
              >
                <span class="item3-name">{{ item2.author }}:</span
                ><span class="item3-txt">{{ item2.content }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <!-- 发表评论区域 -->
      <!-- 发表评论区域 -->
      <div class="other-info">
        <div class="f1" @click="sendMessage">
          我来补充两句
        </div>
        <!-- 显示红色:用户信息的collectArticles包含当前文章id -->
        <div
          class="f2"
          @click="collectClick"
          :class="{ red: isRed('collectArticles', this.$route.query.id) }"
        >
          <div class="iconfont">
            &#xe63c;
          </div>
          <div class="f2-num">
            {{ info.collect }}
          </div>
        </div>
        <div
          class="f2"
          @click="starClick"
          :class="{ red: isRed('starArticles', this.$route.query.id) }"
        >
          <div class="iconfont">
            &#xe638;
          </div>
          <div class="f2-num">
            {{ info.star }}
          </div>
        </div>
        <div class="f2">
          <div class="iconfont">
            &#xe63e;
          </div>
          <div class="f2-num">
            {{ info.share ? info.share : 0 }}
          </div>
        </div>
      </div>
      <!-- 弹框
        van-popup
           v-model:是否显示弹框
           position:bottom
          van-field
          v-model:双向绑定
             type:textarea
             rows:多少行
       -->
      <van-popup v-model="showSend" position="bottom">
        <div class="send-area">
          <van-field
            v-model="message"
            placeholder="我来补充两名"
            type="textarea"
            rows="5"
          ></van-field>
          <div class="send-btn">
            <span
              v-if="message.length > 0"
              class="btn"
              style="color:#000;"
              @click="send"
              >发送</span
            >
            <span v-else class="btn">发送</span>
          </div>
        </div>
      </van-popup>
    </div>
  </van-skeleton>
</template>

<script>
import {
  shareInfo,
  articlesComments,
  addArticlesComments,
  collect,
  star,
  commentsStar
} from '@/api/find'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
export default {
  data () {
    return {
      info: {},
      loading: true,
      listLoading: false,
      finished: false,
      page: 0,
      limit: 5,
      commentList: [],
      total: 0,
      showSend: false,
      parent: '',
      parentObj: null,
      message: ''
    }
  },
  mounted () {
    this.getShareInfoData()
  },
  watch: {
    showSend (newValue) {
      if (!newValue) {
        this.message = ''
      }
    }
  },
  computed: {
    ...mapGetters(['isRed'])
  },
  methods: {
    async getShareInfoData () {
      const res = await shareInfo(this.$route.query.id)

      if (res.code === 200) {
        this.loading = false
        this.info = res.data
      }
    },
    async onLoad () {
      this.page++

      const res = await articlesComments(this.$route.query.id, {
        start: (this.page - 1) * this.limit,
        limit: this.limit
      })

      if (res.code === 200) {
        this.listLoading = false

        this.commentList.push(...res.data.list)
        this.total = res.data.total

        if (this.commentList.length >= this.total) {
          this.finished = true
        }
      }
    },
    // 弹出发表评论弹框
    sendMessage () {
      this.showSend = true
      this.parent = ''
    },
    // 弹出回复评论弹框
    sendParentMessage (item) {
      this.showSend = true
      this.parent = item.id
      this.parentObj = item
    },
    // 发表评论及回复评论
    async send () {
      const res = await addArticlesComments({
        content: this.message,
        article: this.$route.query.id,
        parent: this.parent
      })

      if (res.code === 200) {
        res.data.star = 0
        if (this.parent) {
          // 回复评论
          this.parentObj.children_comments.unshift(res.data)
        } else {
          // 评论
          this.commentList.unshift(res.data)
        }

        this.showSend = false
      }
    },
    // 文章收藏、文章点赞、评论点赞
    async collectClick () {
      const res = await collect({
        id: Number(this.$route.query.id)
      })

      if (res.code === 200) {
        this.info.collect = res.data.num
        if (res.data.list.includes(Number(this.$route.query.id))) {
          Toast.success('收藏成功')
        } else {
          Toast.fail('取消收藏')
        }

        // 更新用户信息
        this.$store.dispatch('refreshUserInfo')
      }
    },
    async starClick () {
      const res = await star({
        article: Number(this.$route.query.id)
      })

      if (res.code === 200) {
        this.info.star = res.data.num

        if (res.data.list.includes(Number(this.$route.query.id))) {
          Toast.success('点赞成功')
        } else {
          Toast.fail('取消点赞')
        }

        // 更新用户信息
        this.$store.dispatch('refreshUserInfo')
      }
    },
    async commentStar (item) {
      const res = await commentsStar({
        id: item.id
      })

      if (res.code === 200) {
        item.star = res.data.num

        if (res.data.list.includes(item.id)) {
          Toast.success('点赞成功')
        } else {
          Toast.fail('取消点赞')
        }

        // 更新用户信息
        this.$store.dispatch('refreshUserInfo')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.shareInfo {
  padding-bottom: 60px;
  .content {
    padding: 19px @p15;
    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #181a39;
      line-height: 25px;
    }
    .other {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #ccc;
      margin: 9px 0 28px;
      .o1 {
        flex: 1;
      }
    }
    .txt {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
      //   ::v-deep img {
      //     width: 100%;
      //   }
      /deep/ img {
        width: 100%;
      }
    }
  }
  .line {
    height: 10px;
    background-color: #f7f4f5;
  }
  .comment {
    padding: 25px @p15;
    .comment-title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
      position: relative;
      .num {
        position: absolute;
        top: -5px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #b4b4bd;
        line-height: 16px;
        letter-spacing: 0px;
      }
    }
    .comment-item {
      .item1 {
        margin-top: 15px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #ccc;
        .i1 {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 9px;
        }
        .i2 {
          flex: 1;
          .i2-name {
            color: #000;
          }
        }
      }
      .item2 {
        margin-left: 44px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
        line-height: 27px;
        letter-spacing: 0px;
        word-break: break-all;
        word-wrap: break-word;
      }
      .item3 {
        margin-top: 10px;
        margin-left: 44px;
        padding: 10px;
        background-color: #f7f4f5;
        font-size: 12px;
        .item3-name {
          color: #000;
          font-weight: 600;
        }
        .item3-txt {
          color: #545671;
          word-break: break-all;
          word-wrap: break-word;
        }
      }
    }
  }
  .other-info {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    // width: 100%;
    padding: @p15;
    height: 40px;
    color: #b4b4bd;
    background-color: #fff;
    .f1 {
      flex: 1;
      background-color: #f7f4f5;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #b4b4bd;
      line-height: 35px;
      letter-spacing: 0px;
      padding-left: 8px;
    }
    .f2 {
      margin-left: 10px;
      text-align: center;
      .iconfont {
        font-size: 27px;
      }
      .f2-num {
        font-size: 12px;
      }
    }
  }
  // 发送评论
  .send-area {
    padding: @p15;
    .van-field {
      background-color: #f7f4f5;
    }
    .send-btn {
      text-align: right;
      .btn {
        font-size: 14px;
        color: #ccc;
      }
    }
  }
  .red {
    color: red !important;
  }
}
</style>
