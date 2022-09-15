<template>
  <div class="result">
    <van-list
      v-model="loading"
      @load="getrResults"
      :finished="finished"
      finished-text="没有更多了哦！"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="item in results"
        :key="item.art_id"
        :title="item.title"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getrResultsAPI } from '@/api'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      error: false,
      page: 1,
      perPage: 10,
      results: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },

  // watch: {
  //   keywords: {
  //     handler: 'getrResults'
  //   }
  // },
  methods: {
    async getrResults() {
      try {
        // if (Math.random() < 0.8) {
        //   // 测试代码
        //   throw new Error()
        // }
        const { data } = await getrResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results
        console.log(results)
        if (results.length === 0) {
          this.finished = true
        }
        // this.results.push(...data.data.results) 获取数据两种写法 第一种
        this.results = [...this.results, ...results] // 第二种
        this.loading = false
      } catch {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.result {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
