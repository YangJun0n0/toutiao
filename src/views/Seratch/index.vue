<template>
  <div>
    <form sction="/">
      <van-search
        class="search"
        shape="round"
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.push('/')"
        @focus="isShowSearchResult = false"
      >
      </van-search>
    </form>
    <components
      :keywords="keywords"
      :is="componentsName"
      @change-keywords="onSearch"
    ></components>
  </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'

import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    ...mapState(['history']),
    componentsName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      }

      if (this.isShowSearchResult) {
        return 'SearchResult'
      }

      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      // 第二种
      // 去重: 1. 获取没去重的数组 2. 放在new Set(arr) 3. 再将去重过的转换为数组 [...set]
      // arr = [1,2,3,1,]
      // new Set(arr)  {1,2,3}
      // [...set]  [1,2,3]
      const distinctHistors = [...new Set([keywords, ...this.history])]
      this.SET_HISTORIES(distinctHistors)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
