<template>
  <div class="question" v-if="info">
    <div>
      <van-dropdown-menu>
        <van-dropdown-item ref="dropdownItemRef">
          <template #title>
            <div class="title">
              面试宝典 <span class="city">{{ city }}</span>
            </div>
          </template>
          <template>
            <van-index-bar :index-list="Object.keys(info.citys)">
              <div v-for="(value, key, index) in info.citys" :key="index">
                <van-index-anchor :index="key">{{ key }}</van-index-anchor>
                <van-cell
                  @click="toggleCity(item)"
                  v-for="item in value"
                  :key="item"
                  :title="item"
                />
              </div>
            </van-index-bar>
          </template>
        </van-dropdown-item>
      </van-dropdown-menu>
      <!-- 岗位栏 -->
      <div class="content">
        <div class="tag-list">
          <van-tag
            class="tag"
            v-for="(item, index) in info.cityPositions[city]"
            :key="item.id"
            :class="{ active: currentIndex === index }"
            @click="currentIndex = index"
            >{{ item.name }}</van-tag
          >
        </div>
      </div>
      <!-- 中间刷题部分 -->
      <div class="middle">
        <div class="top">
          <div class="middle-item">
            <div class="icon">
              <i class="iconfont">&#xe64f;</i>
            </div>
            <div class="txt">常错题库</div>
          </div>
          <div class="middle-item">
            <div class="icon c2">
              <i class="iconfont">&#xe654;</i>
            </div>
            <div class="txt">收藏题库</div>
          </div>
        </div>
        <div class="top mt33">
          <div class="middle-item">
            <div class="icon c3">
              <i class="iconfont">&#xe648;</i>
            </div>
            <div class="txt">企业题库</div>
          </div>
          <div class="middle-item">
            <div class="icon c4">
              <i class="iconfont">&#xe655;</i>
            </div>
            <div class="txt">已答题库</div>
          </div>
        </div>
        <div class="center">
          <!--
            van-circle
              v-model:当前进度
              rate:目标值
              speed:多少rate/秒
              layer-color:轨道背景色
              color:进度条颜色
         -->
          <van-circle
            class="circle"
            v-model="currentRate"
            layer-color="none"
            :rate="30"
            :speed="100"
            :color="gradientColor"
          >
            <div class="circle-num">
              <div style="padding-top:30px;">顺序刷题</div>
              <div style="margin-top:10px;">50/233</div>
            </div>
          </van-circle>
        </div>
      </div>
      <!-- 下面提示部分 -->
      <div class="total">
        <div class="total-txt">
          累计收录
        </div>
        <div class="total-num">
          {{ total.toLocaleString() }}
        </div>
      </div>
      <div class="content2">
        <van-button block color="#00b8d4" @click="goQuestionInfo"
          >模拟面试</van-button
        >
        <!--
          1:获取题目,渲染了题目,提交按钮不可点击
          2:选择答案,可提交答案到服务器,
          3:返回答案是否正确和答案解析,显示正确与否和答案解析,出现下一题
          4:返回答案是否正确和答案解析,显示正确与否和答案解析,出现结束
       -->
      </div>
    </div>
  </div>
</template>

<script>
import { interviewFilters } from '@/api/question'
export default {
  data () {
    return {
      city: '全国',
      info: null,
      currentIndex: 0, // 类别选中的索引
      currentRate: 0,
      gradientColor: {
        '0%': '#e40137',
        '100%': '#ff6f92'
      },
      total: 0
    }
  },
  created () {
    this.getInterviewFiltersData()
  },
  methods: {
    async getInterviewFiltersData () {
      const res = await interviewFilters()
      if (res.code === 200) {
        this.info = res.data
        this.total = res.data.totalCount
      }
    },
    // 切换城市
    toggleCity (city) {
      this.city = city
      this.currentIndex = 0

      // 关闭索引栏
      this.$refs.dropdownItemRef.toggle(false)
    },
    // 跳转到面试题详情
    goQuestionInfo () {
      this.$router.push(
        `/layout/questionInfo?city=${this.city}&type=${
          this.info.cityPositions[this.city][this.currentIndex].id
        }`
      )
    }
  }
}
</script>

<style lang="less" scoped>
.question {
  min-height: 100%;
  background-color: #f7f4f5;
  .title {
    font-size: 20px;
    color: black;
    .city {
      font-size: 14px;
      color: #818296;
    }
  }
  .van-index-anchor {
    background-color: #f7f4f5;
  }
  .content {
    padding: 25px @p15 10px;
    background-color: #fff;
    .tag-list {
      display: flex;
      width: 100%;
      overflow: auto;
      .tag {
        flex-shrink: 0;
        padding: 6px 8px;
        border-radius: 5px;
        margin-right: 15px;
      }
      .active {
        background-color: #00b8d4 !important;
        color: #fff !important;
      }
    }
  }
  .middle {
    margin-top: 15px;
    padding: 16px 39px;
    background-color: #fff;
    position: relative;
    .top {
      display: flex;
      justify-content: space-between;
      .middle-item {
        width: 50px;
        text-align: center;
        .icon {
          width: 44px;
          height: 44px;
          display: inline-block;
          border-radius: 50%;
          line-height: 44px;
          color: #fff;
          background: linear-gradient(180deg, #ff8080, #ff4949);
          .iconfont {
            font-size: 24px;
          }
        }
        .c2 {
          background: linear-gradient(180deg, #ffda05, #ffb302);
        }
        .c3 {
          background: linear-gradient(180deg, #00ddec, #00b8d4);
        }
        .c4 {
          background: linear-gradient(180deg, #3ee5b1, #1dc779);
        }
        .txt {
          margin-top: 8px;
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
    .mt33 {
      margin-top: 33px;
    }
    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      // border: 1px solid red;
      background: url('~@/assets/circleBg.png');
      background-size: 100%;
      .circle {
        // width: 100% !important;
        // height: 100% !important;
        padding: 10px;
        .circle-num {
          // padding-top: 35px;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #ff6f92, #e40137);
          border-radius: 50%;
          font-size: 16px;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
  .total {
    background-color: #fff;
    margin-top: 15px;
    text-align: center;
    font-size: 24px;
    .total-txt {
      padding: 21px 0;
    }
    .total-num {
      padding: 0 0 21px;
    }
  }
  .content2 {
    padding: 15px @p15 0;
  }
}
</style>
