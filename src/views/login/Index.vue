<template>
  <div class="login">
    <van-nav-bar>
      <template #left>
        <i class="iconfont iconbtn_nav_back"></i>
      </template>
    </van-nav-bar>
    <h3 class="title">您好，请登录</h3>
    <van-form ref="form">
      <van-field
        v-model="form.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, validator: validateMobile, message: '手机号不合法' }
        ]"
      >
        <template #left-icon>
          <i style="margin-right:10px;" class="iconfont iconbianzu1"></i>
        </template>
      </van-field>
      <van-field
        v-model="form.code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '验证码不能为空' }]"
      >
        <template #left-icon>
          <i style="margin-right:10px;" class="iconfont iconyanzhengma"></i>
        </template>
        <template #button>
          <span class="code" @click="getCode">{{ tipName }}</span>
        </template>
      </van-field>
    </van-form>
    <div class="tips">
      登录即同意<span class="color">《用户使用协议》</span>和<span class="color"
        >《隐私协议》</span
      >
    </div>
    <div style="margin-top: 50px;">
      <van-button
        round
        block
        type="info"
        native-type="submit"
        color="#e40137"
        @click="login"
      >
        确 定
      </van-button>
    </div>
  </div>
</template>

<script>
import { getAuCode, auLogin } from '@/api/login'
import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      tipName: '获取验证码', // 倒计时的提示文字
      count: 10, // 倒计时的总秒数
      isCountDown: false, // 是否正在倒计时
      timer: null, // 定时器
      form: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validateMobile (val) {
      return /1[3456789][0-9]{9}$/.test(val)
    },
    // 获取验证码
    getCode () {
      if (this.isCountDown) return
      this.$refs.form
        .validate('mobile')
        .then(async () => {
          // 开始倒计时
          this.tipName = `${this.count}s后重试`
          this.isCountDown = true

          this.timer = setInterval(() => {
            if (this.count <= 1) {
              clearInterval(this.timer)
              // 重置
              this.isCountDown = false
              this.count = 10
              this.tipName = '获取验证码'
              return
            }

            this.count--
            this.tipName = `${this.count}s后重试`
          }, 1000)

          const res = await getAuCode({ mobile: this.form.mobile })

          if (res.code === 200) {
            this.$toast(res.data)

            this.form.code = res.data
          } else {
            this.$toast(res.message)
          }
        })
        .catch(err => {
          console.log('err is ', err)
        })
    },
    // 登录
    async login () {
      try {
        await this.$refs.form.validate()

        const res = await auLogin(this.form)

        if (res.code === 200) {
          // 提示
          this.$toast.success('登录成功~')

          // 保存到本地
          setToken(res.data.jwt)

          // vuex中设置用户信息和是否登录
          this.$store.commit('setUserInfo', res.data.user)
          this.$store.commit('setIsLogin', true)

          // 路由跳转
          this.$router.push('/layout')
        } else {
          this.$toast.fail(res.message)
        }
      } catch (error) {
        console.log('error is ', error)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.login {
  padding: 0 @p15;
  .iconbtn_nav_back {
    font-size: 40px;
  }
  &::v-deep .van-nav-bar__left {
    padding: 0;
    text-align: left;
  }
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
    margin-bottom: 50px;
  }
  .code {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #00b8d4;
    line-height: 22px;
    letter-spacing: 0px;
  }
  .tips {
    margin-top: 30px;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #181a39;
    line-height: 16px;
    letter-spacing: 0px;
    .color {
      color: #00b8d4;
    }
  }
}
</style>
