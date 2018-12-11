<template>
  <div class="index">
    <HeadCom></HeadCom>
    <Show></Show>
    <ArticleList></ArticleList>
    <FootCom></FootCom>
  </div>
</template>

<script>
import HeadCom from "@/components/HeadCom";
import Show from "@/components/Show";
import FootCom from "@/components/FootCom";
import ArticleList from "@/components/ArticleList";
import MarkDown from "markdown";

export default {
  name: "Index",
  data() {
    return {};
  },
  components: {
    HeadCom,
    Show,
    ArticleList,
    FootCom
  },
  methods: {},
  mounted() {
    // console.clear();
  }
};
</script>

<style lang="scss" scoped>
.index {
}
</style>
