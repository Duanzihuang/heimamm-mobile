<template>
  <div class="questionInfo">
    <my-nav-bar title="刷题" rightText="答题卡" />
    <!-- 题目部分(标题、类别、选项) -->
    <div class="content" v-if="detail">
      <!-- 题型 -->
      <div class="title">
        <!-- 题型 -->
        【{{ typeObj[detail.type] }}】{{ detail.title }}
      </div>
      <!-- 类别 -->
      <van-tag
        v-for="item in detail.tag"
        :key="item"
        class="tag"
        color="#f7f4f5"
        text-color="#bdbdc4"
        >{{ item }}</van-tag
      >
      <!-- 选项 -->
      <div class="select">
        <!-- 单选选项 -->
        <div
          v-show="detail.type === 1"
          v-for="(item, index) in detail.option"
          :key="item"
          class="select-item"
          @click="singleClick(optionsStr[index])"
          :class="{
            active: ans1 === optionsStr[index],
            right:
              rightAnswer && rightAnswer.singleAnswer === optionsStr[index],
            error:
              ans1 === optionsStr[index] &&
              rightAnswer &&
              rightAnswer.singleAnswer !== optionsStr[index]
          }"
        >
          {{ optionsStr[index] }}. {{ item }}
        </div>
        <!-- 多选选项 -->
        <div
          v-show="detail.type === 2"
          v-for="(item, index) in detail.option"
          :key="index"
          class="select-item"
          @click="multipleClick(optionsStr[index])"
          :class="{
            active: ans2.includes(optionsStr[index]),
            right:
              rightAnswer &&
              rightAnswer.multipleAnswer &&
              rightAnswer.multipleAnswer.includes(optionsStr[index])
          }"
        >
          {{ optionsStr[index] }}. {{ item }}
        </div>
        <!-- 简答选项 -->
        <div v-show="detail.type === 3">
          <van-field
            @input="inputEvent"
            type="textarea"
            rows="8"
            v-model.trim="ans3"
            class="field"
          >
          </van-field>
        </div>
      </div>
      <!-- 答案解析部分 -->
      <div class="answer" v-if="rightAnswer">
        <div class="answer-title">答案解析</div>
        <div class="answer-right">
          正确答案：
          <span v-if="detail.type === 1">{{ rightAnswer.singleAnswer }}</span>
          <span v-if="detail.type === 2">{{
            rightAnswer.multipleAnswer.join(',')
          }}</span>
        </div>
        <div class="other">
          <span>难度：{{ difficultyObj[rightAnswer.difficulty] }}</span>
          <span>提交次数：{{ rightAnswer.submitNum }}</span>
          <span>正确次数{{ rightAnswer.correntNum }}</span>
        </div>
        <div class="answer-content">
          {{ rightAnswer.answerAnalysis }}
        </div>
      </div>
    </div>
    <!-- 底部工具栏部分 -->
    <div class="footer">
      <div class="f1">
        <i class="iconfont">&#xe63c;</i>
        <div>收藏</div>
      </div>
      <div class="f2">
        <i class="iconfont">&#xe606;</i>
        <div>反馈</div>
      </div>
      <div class="f3">
        <span class="num">{{ currentIndex + 1 }}</span
        >/{{ this.list.length }}题
      </div>
      <div class="f4">
        <van-button
          v-if="step === 3"
          color="red"
          style="width:80px;border-radius:5px;"
          @click="end"
          >结束</van-button
        >
        <van-button
          v-else-if="step === 2"
          color="red"
          style="width:80px;border-radius:5px;"
          @click="next"
          >下一题</van-button
        >
        <van-button
          v-else
          :disabled="step === 0"
          color="red"
          style="width:80px;border-radius:5px;"
          @click="submit"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { interviewQuestions, questionSubmit, question } from '@/api/question'
export default {
  data () {
    return {
      city: this.$route.query.city,
      type: this.$route.query.type,
      list: [], // 题目列表
      currentIndex: 0, // 当前索引
      detail: null, // 题目具体信息
      typeObj: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      optionsStr: 'ABCD',
      ans1: '', // 单选答案
      ans2: [], // 多选答案
      ans3: '', // 简答答案
      /*
        0:表示只是读取题目,但是还没有选择答案,提交按钮不可点击
        1:选择答案,提交按钮可点击,但是还没点击
        2:点击了提交,出现答案,渲染答案,出现下一题
        3:点击了提交,出现答案,渲染答案,但是是最后一题出现结束
        */
      step: 0, // 阶段
      questionId: null, // 问题id
      rightAnswer: null, // 正确答案
      difficultyObj: {
        1: '简单',
        2: '一般',
        3: '困难'
      }
    }
  },
  created () {
    this.getInterviewQuestionsData()
  },
  methods: {
    async getInterviewQuestionsData () {
      const res = await interviewQuestions({
        city: this.city,
        type: this.type
      })

      if (res.code === 200) {
        this.list = res.data // 题目数组
        this.detail = this.list[this.currentIndex].detail
        this.questionId = this.list[this.currentIndex].id
      }
    },
    // 单选点击
    singleClick (item) {
      this.ans1 = item
      this.step = 1
    },
    // 多选点击
    multipleClick (item) {
      const _index = this.ans2.indexOf(item)
      if (_index > -1) {
        // 存在
        this.ans2.splice(_index, 1)
      } else {
        this.ans2.push(item)
      }

      if (this.ans2.length > 0) {
        this.step = 1
      } else {
        this.step = 0
      }
    },
    // 简答事件处理
    inputEvent (val) {
      if (val.length > 0) {
        this.step = 1
      } else {
        this.step = 0
      }
    },
    // 提交答案
    async submit () {
      this.$toast.loading({
        duration: 0
      })

      const res = await questionSubmit({
        id: this.questionId,
        singleAnswer: this.ans1,
        multipleAnswer: this.ans2
      })

      this.$toast.clear()

      if (res.code === 200) {
        this.rightAnswer = res.data
        this.step = this.list.length - 1 === this.currentIndex ? 3 : 2
      }
    },
    // 下一题
    async next () {
      this.step = 0
      this.currentIndex++
      this.detail = null
      this.rightAnswer = null
      this.ans1 = ''
      this.ans2 = []
      this.ans3 = ''
      this.questionId = this.list[this.currentIndex].id

      // 根据新的题目的id，获取题目信息
      const res = await question(this.list[this.currentIndex].id)
      if (res.code === 200) {
        this.detail = res.data
      }
    },
    // 结束
    end () {
      console.log('---end---')
    }
  }
}
</script>

<style lang="less" scoped>
.questionInfo {
  padding-bottom: 60px;
  .content {
    padding: 15px @p15 0;
    .title {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 22px;
    }
    .tag {
      padding: 5px 8px;
      margin-right: 15px;
    }
    .select {
      margin-top: 15px;
      .select-item {
        border: 1px solid #f7f4f5;
        border-radius: 4px;
        line-height: 24px;
        font-size: 14px;
        padding: 6px 10px;
        margin-bottom: 15px;
      }
      .active {
        border-color: #b6b6bf;
      }
    }
    .answer {
      .answer-title {
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;
      }
      .answer-right {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #1dc779;
        line-height: 22px;
        margin: 10px 0;
      }
      .other {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 6px;
        color: #7b7b90;
        background-color: #f7f4f5;
        font-size: 12px;
      }
      .answer-content {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
        line-height: 22px;
        margin-top: 10px;
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 @p15;
    text-align: center;
    border-top: 1px solid #f7f4f5;
    .f1,
    .f2 {
      flex: 1;
      color: #ccc;
      font-size: 12px;
      .iconfont {
        font-size: 28px;
      }
    }

    .f3 {
      flex: 2;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #000;
      line-height: 31px;
      letter-spacing: 1px;
      .num {
        font-size: 22px;
        color: red;
      }
    }
    .f4 {
      flex: 2;
    }
  }
  .field {
    border: 2px solid #ccc;
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    padding: 20px @p15 0;
    justify-content: space-between;
    height: 300px;
    .item {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
      color: #fff;
      font-size: 12px;
      background-color: #999999;
      margin-right: 15px;
      margin-bottom: 15px;
    }
    .noUse {
      width: 30px;
      height: 0;
      margin-right: 15px;
    }
  }
  //   正确
  .right {
    background-color: #22e908 !important;
  }
  // 错误
  .error {
    background-color: #ff4400 !important;
  }
}
</style>
