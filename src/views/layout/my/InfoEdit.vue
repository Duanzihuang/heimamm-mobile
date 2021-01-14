<template>
  <div>
    <my-nav-bar
      :title="title"
      :rightText="rightText"
      @click-right="rightClick"
    />
    <div class="main-box">
      <van-field v-if="type !== 'avatar'" v-model="value" />
      <van-uploader
        v-else
        v-model="fileList"
        :after-read="afterRead"
        :max-count="1"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { editUserInfo, uploadFile } from '@/api/my'
export default {
  name: 'InfoEdit',
  data () {
    return {
      rightText: '',
      value: '',
      type: '',
      fileList: []
    }
  },
  watch: {
    value () {
      if (
        this.value !== '' &&
        this.value !== this.userInfo[this.$route.query.type]
      ) {
        this.rightText = '保存'
      } else {
        this.rightText = ''
      }
    }
  },
  computed: {
    ...mapGetters({ userInfo: 'getUserInfo' }),
    title () {
      let title = ''
      const type = this.$route.query.type
      switch (type) {
        case 'nickname':
          title = '昵称'
          break

        case 'intro':
          title = '用户简介'
          break

        case 'avatar':
          title = '头像'
          break

        default:
          break
      }

      return '修改' + title
    }
  },
  mounted () {
    this.type = this.$route.query.type
    this.value = this.userInfo[this.type]
    if (!this.value) {
      this.rightText = ''
    }

    // 判断是否是头像
    if (this.type === 'avatar') {
      if (this.userInfo.avatar) {
        this.fileList[0] = {
          url: process.env.VUE_APP_BASEURL + this.userInfo.avatar
        }
      }
    }
  },
  methods: {
    async rightClick () {
      if (!this.rightText) return

      if (!this.value) {
        this.$toast('内容不能为空~')

        return
      }

      const type = this.$route.query.type

      const res = await editUserInfo({ [type]: this.value })

      if (res.code === 200) {
        this.$toast('修改用户信息成功~')
        // 更新仓库
        this.$store.commit('setUserInfo', {
          ...this.userInfo,
          [type]: type === 'avatar' ? res.data.avatar : this.value
        })

        // 返回
        this.$router.back()
      }
    },
    async afterRead (res) {
      this.fileList[0].status = 'uploading'
      const res2 = await uploadFile(res.file)
      this.fileList[0].status = 'done'

      if (res2.code === 200) {
        this.value = res2.data[0].id
        this.rightText = '保存'
      } else {
        this.rightText = ''
      }
    }
  }
}
</script>

<style lang="less">
.main-box {
  .van-field:not(.icon-field) {
    background: #f7f4f5;
    border-radius: 0.10667rem;
    width: 9.2rem;
    margin: 0.4rem auto;
  }
  .van-uploader {
    width: 100%;
    .van-uploader__wrapper {
      margin: 10px auto;
      width: 200px;
      height: 200px;
      .van-uploader__upload {
        width: 200px;
        height: 200px;
      }
      .van-uploader__preview-image {
        width: 200px;
        height: 200px;
      }
    }
  }
}
</style>
