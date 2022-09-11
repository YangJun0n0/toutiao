<template>
  <div>
    <!-- 导航区 -->
    <router-view></router-view>
    <van-tabbar class="tabbar" route>
      <van-tabbar-item to="/ "
        ><template #icon
          ><span class="toutiao toutiao-shouye"></span
          ><span>首页</span></template
        ></van-tabbar-item
      >
      <van-tabbar-item to="/video"
        ><template #icon
          ><span class="toutiao toutiao-shipin"></span
          ><span>视频</span></template
        ></van-tabbar-item
      >
      <van-tabbar-item to="/qa"
        ><template #icon
          ><span class="toutiao toutiao-wenda"></span
          ><span>问答</span></template
        ></van-tabbar-item
      >
      <van-tabbar-item to="/profile"
        ><template #icon
          ><span class="toutiao toutiao-wode"></span
          ><span>{{ isLogin ? '我的' : '未登录' }}</span></template
        ></van-tabbar-item
      >
    </van-tabbar>
    <!-- / 导航区 -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.tabbar {
  :deep(.van-tabbar-item__icon) {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-size: 30px;
  }
  .toutiao {
    font-size: 40px;
  }
}
</style>
