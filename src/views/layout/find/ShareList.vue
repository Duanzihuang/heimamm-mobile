<template>
  <div>
    <my-nav-bar title="面经分享" />
    <van-search
      shape="round"
      placeholder="请输入搜索关键词"
      v-model="keyword"
      @focus="onFocus"
      @search="onSearch"
      @cancel="onCancel"
      :show-action="showAction"
    />
    <van-list
      v-model.trim="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="shareList"
      v-if="isShowList"
    >
      <share-item v-for="item in list" :item="item" :key="item.id" />
    </van-list>
    <div v-else>
      <div class="search">
        <h3>大家都在搜索</h3>
        <van-tag
          style="margin-right:8px;"
          color="#eceaea"
          text-color="#545671"
          size="large"
          v-for="item in shareTopSearchList"
          :key="item"
          @click="tagSearch(item)"
          >{{ item }}</van-tag
        >
      </div>
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <h3>历史记录</h3>
        </template>
        <template #default>
          <span @click="clear">清空</span>
        </template>
      </van-cell>
      <div style="padding:15px;">
        <van-tag
          style="margin-right:8px;"
          color="#eceaea"
          text-color="#545671"
          size="large"
          v-for="item in historyList"
          :key="item"
          @click="tagSearch(item)"
          >{{ item }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getArticlesShare, shareTopSearch } from '@/api/find'
import { setLocal, getLocal } from '@/utils/local'
import ShareItem from './ShareItem'
export default {
  components: {
    ShareItem
  },
  data () {
    return {
      keyword: '',
      showAction: false,
      loading: false,
      finished: false,
      page: 0,
      query: {
        start: 0,
        limit: 5,
        q: ''
      },
      isShowList: true,
      list: [], // 面经列表数据
      shareTopSearchList: [], // 搜索关键字列表
      historyList: JSON.parse(getLocal('history') || '[]')
    }
  },
  methods: {
    async onLoad () {
      // 页码++
      this.page++
      this.query.start = (this.page - 1) * this.query.limit

      const res = await getArticlesShare(this.query)

      if (res.code === 200) {
        res.data.list.forEach(item => {
          if (this.query.q !== '') {
            const _title = item.title.split(this.query.q)
            item.title = _title.join(
              `<span style='color:red;'>${this.query.q}</span>`
            )
          }
        })

        this.list = [...this.list, ...res.data.list]

        // 停止加载
        this.loading = false

        if (this.list.length >= res.data.total) {
          this.finished = true
        }
      }

      // 把搜索关键字保存到搜索历史中
      this.isShowList = true
      if (this.query.q !== '') {
        this.historyList.unshift(this.query.q)
        this.historyList = [...new Set(this.historyList)]
        this.historyList = this.historyList.slice(0, 5)

        setLocal('history', JSON.stringify(this.historyList))
      }
    },
    async onFocus () {
      this.showAction = true
      this.isShowList = false

      if (this.shareTopSearchList.length === 0) {
        const res = await shareTopSearch()

        this.shareTopSearchList = res.data
      }
    },
    onSearch (val) {
      this.page = 0
      this.list = []
      this.query.q = val

      this.onLoad()
    },
    onCancel () {
      this.showAction = false

      this.page = 0
      this.list = []
      this.query.q = ''

      this.onLoad()
    },
    tagSearch (val) {
      this.page = 0
      this.list = []
      this.query.q = val
      this.keyword = val

      this.onLoad()
    },
    // 清空
    clear () {
      this.historyList = []
      setLocal('history', JSON.stringify(this.historyList))
    }
  }
}
</script>

<style lang="less">
.shareList {
  padding: 0 10px 10px;
}
.search {
  padding: 15px;
  h3 {
    font-size: 18px;
  }
}
.van-cell {
  display: flex;
  align-items: center;
}
</style>
