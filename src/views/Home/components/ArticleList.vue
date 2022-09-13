<template>
  <div class="article">
    <van-pull-refresh v-model="refreshing" @refresh="getNextPageAritcle">
      <van-list
        v-model="loading"
        @load="getNextPageAritcle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多文章了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in article"
          :key="item.id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',

  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      article: [],
      loading: false,
      finished: false,
      error: false,
      refreshing: false,
      preTimestamp: ''
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // console.log(data)
        this.article = data.data.results
        // 用于分页
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // console.log(error)
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPageAritcle() {
      // 发送请求
      try {
        if (Math.random() < 0.5) {
          throw new Error()
        }
        const { data } = await getArticleList(this.id, +new Date())
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.article.push(...data.data.results)
        }
        // 更新时间搓
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        //  错误处理
        this.error = true
      } finally {
        // finally 语句一定会执行
        // 更改Loading
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #91bef0;

    border-radius: 10px;
  }
}
</style>
