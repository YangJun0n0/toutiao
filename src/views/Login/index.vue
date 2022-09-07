<template>
  <div>
    <van-nav-bar title="标题" class="nav-bar" />
    <van-form @submit="onSubmit" class="from" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma1"></span>
        </template>
        <template #button>
          <van-button
            class="btn"
            block
            type="default"
            size="small"
            native-type="button"
            round
            v-if="isshowcodebtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isshowcodebtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './relu.JS'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isshowcodebtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit() {
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.SET_TOKEN(data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (err) {
        // 细分失败 手机号或者验证码错误用户能知道
        // error:1. js抛出的错误 2. axios封装的error对象
        // axios 封装的error对象
        // - error.reponse.data 后端返回的数据
        // - error.reponse.status 后端返回的状态码
        if (err.response.data && err.response.status === 400) {
          this.$toast.fail(err.response.data.message)
        } else {
          // 1. js导致的错误, 2. 507
          this.$toast.clear()
          throw err
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      await this.$refs.from.validate('mobile')
      this.loading()
      try {
        const { data } = await sendCodeAPI(this.mobile)
        console.log(data)
        this.this.isshowcodebtn = false
        this.$toast.success('发送成功')
      } catch (err) {
        if (
          err.response &&
          (err.response.status === 429 || err.response.status === 404)
        ) {
          this.$toast.fail(err.response.data.message)
        } else {
          this.$toast.clear()
          throw err
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #5ca1e6;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.from) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
