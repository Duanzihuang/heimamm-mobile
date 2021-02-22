<template>
  <div class="my-info">
    <my-nav-bar title="我的资料" />
    <div class="content">
      <div class="avatar">
        <my-cell
          title="头像"
          :avatar="avatar"
          @click.native="editInfo('avatar')"
        />
      </div>
      <div class="nickname">
        <my-cell
          @click.native="editInfo('nickname')"
          title="昵称"
          :value="userInfo.nickname"
        />
        <my-cell
          @click.native="showGender = true"
          title="性别"
          :value="gender"
        />
        <my-cell
          @click.native="showArea = true"
          title="地区"
          :value="area.city_list[userInfo.area]"
        />
        <my-cell
          @click.native="editInfo('intro')"
          title="个人简介"
          :value="userInfo.intro"
        />
      </div>
      <div class="logout">
        <div @click="logout">退出登录</div>
      </div>
    </div>
    <!-- 性别修改弹出框 -->
    <van-popup
      v-model="showGender"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        :default-index="defaultIndex"
        @confirm="onConfirm"
        @cancel="showGender = false"
      />
    </van-popup>
    <!-- 地区修改弹出框 -->
    <van-popup v-model="showArea" position="bottom" :style="{ height: '40%' }">
      <van-area
        title="地区"
        :area-list="area"
        :columns-num="2"
        :value="userInfo.area"
        @confirm="onAreaConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
  </div>
</template>

<script>
import MyCell from './MyCell'
import { editUserInfo } from '@/api/my'
import { mapGetters } from 'vuex'
import { removeToken } from '@/utils/token'
import area from '@/assets/js/area'
export default {
  name: 'MyInfo',
  components: {
    MyCell
  },
  data () {
    return {
      avatar: '', // 头像地址
      area,
      showGender: false, // 是否显示性别修改框
      showArea: false, // 是否显示地区
      columns: ['男', '女', '未知'],
      defaultIndex: 0,
      defaultAreaIndex: 0
    }
  },
  computed: {
    ...mapGetters({ userInfo: 'getUserInfo' }),
    gender () {
      let genderName = '未知'
      switch (this.userInfo.gender) {
        case 0:
          genderName = '未知'
          break

        case 1:
          genderName = '男'
          break
        case 2:
          genderName = '女'
          break

        default:
          break
      }

      return genderName
    }
  },
  mounted () {
    switch (this.userInfo.gender) {
      case 0:
        this.defaultIndex = 2
        break

      case 1:
        this.defaultIndex = 0
        break
      case 2:
        this.defaultIndex = 1
        break

      default:
        break
    }

    if (this.userInfo.avatar) {
      this.avatar = process.env.VUE_APP_BASEURL + this.userInfo.avatar
    }
  },
  methods: {
    async onConfirm (val) {
      let genderId = 0
      switch (val) {
        case '男':
          genderId = 1
          break
        case '女':
          genderId = 2
          break
        case '未知':
          genderId = 0
          break

        default:
          break
      }

      await editUserInfo({ gender: genderId })

      this.$toast('修改用户信息成功~')
      // 更新仓库
      this.$store.commit('setUserInfo', { ...this.userInfo, gender: genderId })
      // 关闭弹框
      this.showGender = false
    },
    async onAreaConfirm (val) {
      await editUserInfo({ area: val[1].code })

      this.$toast('修改用户信息成功~')
      // 更新仓库
      this.$store.commit('setUserInfo', { ...this.userInfo, area: val[1].code })
      // 关闭弹框
      this.showArea = false
    },
    // 修改信息
    editInfo (type) {
      this.$router.push('/layout/infoedit?type=' + type)
    },
    // 退出登录
    logout () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出吗？'
        })
        .then(async () => {
          // on confirm
          // 清除token
          removeToken()

          // 设置登录状态，以及清除用户信息
          this.$store.commit('setUserInfo', null)
          this.$store.commit('setIsLogin', false)

          // 跳转到登录页面
          this.$router.push('/')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-info {
  height: 100%;
  background-color: #f7f4f5;
  .content {
    padding: 0 @p15 0 @p15;
  }
  .avatar {
    margin-top: 15px;
    // border-radius: 8px;
  }
  .nickname {
    margin-top: 15px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .logout {
    margin-top: 15px;
    border-radius: 8px;
    text-align: center;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #e40137;
    letter-spacing: 0px;
  }
}
</style>
