<template>
  <div>
    <article-item
      v-for="item in article"
      :key="item.id"
      :article="item"
    ></article-item>
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
      article: []
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        console.log(data)
        this.article = data.data.results
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
    }
  }
}
</script>

<style></style>
