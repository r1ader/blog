<template>
  <div class="index">
    <HeadCom></HeadCom>
    <ArticleList></ArticleList>
    <FootCom></FootCom>
  </div>
</template>

<script>
  import HeadCom from '@/components/HeadCom'
  import FootCom from '@/components/FootCom'
  import ArticleList from '@/components/ArticleList'
  import MarkDown from 'markdown'

  export default {
    name: "Index",
    data() {
      return {}
    },
    components: {
      HeadCom,
      ArticleList,
      FootCom
    },
    methods: {},
    mounted() {
      console.clear()
      let doc = '# saffas'
      console.log(MarkDown.parse(doc))
    }
  }
</script>

<style lang="scss" scoped>

</style>
