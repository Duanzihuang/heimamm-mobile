<template>
  <div class="find">
    <van-pull-refresh v-model="isLoading" @refresh="handleRefresh">
      <van-nav-bar title="发现" />
      <div class="interview-box">
        <div class="title-box">
          <div class="title">面试技巧</div>
          <div class="arrow-box">
            <span>查看更多</span>
            <i class="iconfont iconicon_more"></i>
          </div>
        </div>
        <div class="interview-list">
          <technic-item
            :item="item"
            v-for="item in technicList"
            :key="item.id"
          />
        </div>
      </div>
      <div class="shop-box">
        <div class="title-box">
          <div class="title">市场数据</div>
          <div class="arrow-box">
            <span>查看更多</span>
            <i class="iconfont iconicon_more"></i>
          </div>
        </div>
        <span class="tag">中山</span>
        <span class="tag">设计师</span>
        <div
          class="item"
          v-for="(item, index) in chart.yearSalary"
          :key="item.year"
          v-show="index < showSize"
        >
          <span> {{ item.year }}</span>
          <div class="process">
            <div class="step" :style="{ width: item.width + '%' }">
              ¥{{ item.salary }}
            </div>
          </div>
          <div class="arrow-box">
            <i
              v-if="item.percent && item.percent > 0"
              class="iconfont iconicon_shangsheng"
            ></i>
            <i
              v-if="item.percent && item.percent < 0"
              class="iconfont iconicon_xiajiang"
            ></i>
            <i v-if="!item.percent" class="iconfont"></i
            ><span class="percent-span" v-if="item.percent"
              >{{ item.percent }}%</span
            >
            <span class="percent-span" v-else></span>
          </div>
        </div>
        <div
          v-if="chart.yearSalary.length > showSize"
          @click="showSize = 100"
          class="more"
        >
          <span>展开更多</span>
          <i class="iconfont iconicon_zhankai"></i>
        </div>
        <div
          v-if="chart.yearSalary.length < showSize"
          @click="showSize = 3"
          class="more"
        >
          <span>收起显示</span>
          <i class="iconfont iconicon_zhankai rotate"></i>
        </div>
      </div>
      <div class="experience-box">
        <div class="title-box">
          <div class="title">面经分享</div>
          <div class="arrow-box">
            <span @click="$router.push('/layout/shareList')">查看更多</span>
            <i class="iconfont iconicon_more"></i>
          </div>
        </div>
        <div class="experience-list">
          <share-item v-for="item in shareList" :key="item.id" :item="item" />
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import TechnicItem from './TechnicItem'
import ShareItem from './ShareItem'
import { getTechnicList, chartDataHot, getArticlesShare } from '@/api/find'
export default {
  name: 'Find', // keep-alive 缓存使用
  components: {
    TechnicItem,
    ShareItem
  },
  data () {
    return {
      technicList: [], // 面试技巧列表
      shareList: [], // 面经列表
      chart: {
        yearSalary: []
      },
      showSize: 3, // 展开的个数
      query: {
        start: 0,
        limit: 5,
        q: ''
      },
      shareQuery: {
        start: 0,
        limit: 5,
        q: ''
      },
      isLoading: false
    }
  },
  mounted () {
    // this.getTechnicList()
    // this.getChartDataHot()
    // this.getArticlesShareList()

    this.handleRefresh()
  },
  activated () {
    window.scrollTo(0, this.$route.meta.top ? this.$route.meta.top : 0)
  },
  methods: {
    // 获取面试技巧的数据
    // async getTechnicList () {
    //   const res = await getTechnicList(this.query)

    //   if (res.code === 200) {
    //     this.technicList = res.data.list
    //   }
    // },
    // 获取市场数据
    // async getChartDataHot () {
    //   const res = await chartDataHot()

    //   res.data.yearSalary.forEach(item => {
    //     item.width = (parseInt(item.salary) / res.data.topSalary) * 100
    //   })

    //   this.chart = res.data
    // },
    // 获取面试分享的数据
    // async getArticlesShareList () {
    //   const res = await getArticlesShare(this.shareQuery)

    //   if (res.code === 200) {
    //     this.shareList = res.data.list
    //   }
    // }
    async handleRefresh () {
      const resList = await Promise.all([
        getTechnicList(this.query),
        chartDataHot(),
        getArticlesShare(this.shareQuery)
      ])
      // 保存到仓库中
      this.$store.commit('setResList', resList)
      // 取到各自的数据进行处理
      const res1 = resList[0]
      const res2 = resList[1]
      const res3 = resList[2]

      this.technicList = res1.data.list

      res2.data.yearSalary.forEach(item => {
        item.width = (parseInt(item.salary) / res2.data.topSalary) * 100
      })
      this.chart = res2.data

      this.shareList = res3.data.list

      // 停止下拉刷新
      this.isLoading = false

      // 滚动到之前的位置
      this.$nextTick(() => {
        window.scrollTo(0, this.$route.meta.top ? this.$route.meta.top : 0)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.find {
  .interview-box {
    background: #fff;
    padding: @p15;
    margin-bottom: 10px;
  }
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: #181a39;
    }
    .arrow-box {
      span {
        font-size: 400;
        font-size: 14px;
        color: #545671;
      }
    }
  }
  .shop-box {
    padding: 0 10px 10px;
    background: #fff;
    margin-bottom: 10px;
    .tag {
      margin-right: 10px;
      display: inline-block;
      padding: 6px;
      border-radius: 5px;
      font-size: 14px;
      color: #545671;
      background-color: #eceaea;
      margin-bottom: 20px;
    }
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 18px;
      span {
        color: #545671;
        font-size: 14px;
      }
      .process {
        margin-left: 5px;
        margin-right: 5px;
        flex: 1;
        background-color: #ebdfdf;
        height: 12px;
        border-radius: 5px;
      }
      .step {
        border-radius: 5px;
        background-color: #fe6d67;
        height: 100%;
        width: 50%;
        font-size: 11px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 10px;
        color: #fff;
      }
      .arrow-box {
        display: flex;
        align-items: center;
      }
      .iconfont {
        font-size: 12px;
        width: 15px;
      }
      .iconicon_shangsheng {
        color: #60d183;
      }
      .iconicon_xiajiang {
        color: #fe6d67;
      }
      .percent-span {
        width: 30px;
        text-align: right;
      }
    }
    .more {
      text-align: center;
      margin-top: 10px;
      font-size: 14px;
      color: #545671;
      display: flex;
      justify-content: center;
      .iconfont {
        margin-left: 6px;
        font-size: 12px;
        color: #b4b4bc;
      }
      .rotate {
        transform: rotate(180deg);
      }
    }
  }
  .experience-box {
    padding: 0 10px 10px;
    background: #fff;
  }
  background-color: #f9f9f9;
}
</style>
