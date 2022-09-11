<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
              />
              <span>2324</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row>
              <van-button size="mini" round class="edit-btn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="文字">
              <template #icon>111</template>
            </van-grid-item>
            <van-grid-item text="文字">
              <template #icon>111</template>
            </van-grid-item>
            <van-grid-item text="文字">
              <template #icon>111</template>
            </van-grid-item>
            <van-grid-item text="文字">
              <template #icon>111</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          width="1.76rem"
          height="1.76rem"
          :src="mobileSrc"
        ></van-image>
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 头部 -->
    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- /主体 -->
    <!-- 底部 -->
    <footer>
      <van-button v-if="isLogin" block @click="logout">退出</van-button>
    </footer>
    <!-- / 底部 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      mobileSrc,
      userIofo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
      // .then(() => {
      //   this.$store.commit('SET_TOKEN', {})
      // })
    },
    async getUserInfo() {
      try {
        // console.log(this.isLogin)
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        this.userIofo = data.data

        console.log(data.data)
      } catch (e) {
        if (e.response && e.response.status === 400) {
          this.$toast.fail('用户认证失败')
        } else {
          console.log('错误')
          throw e
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: orange;
  }
}
.banner {
  width: 100%;
  height: 5.3333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
  // background-size: cover;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
.login {
  display: flex;
  flex-direction: column;

  > .van-row {
    flex: 1;

    .mobile {
      font-size: 30px;
      color: #fff;
    }

    .edit-btn {
      width: 2rem;
      height: 0.6rem;
      color: #666;
    }
  }

  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
