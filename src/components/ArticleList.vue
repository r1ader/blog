<template>
  <div class="index">
    <header>
      <span>Article List</span>
    </header>
    <article>
      <ul class="article-list">
        <li v-for="(item,index) in articleList" @click="seeArticle(item.index)" :key="index">
          <span>{{item.date}}</span>
          {{item.title}}
        </li>
      </ul>
    </article>
  </div>
</template>
<script>
import moment from "moment";
import HeadCom from "@/components/HeadCom";

import getDomain from "@/util/getDomain";

export default {
  name: "ArticleList",
  data() {
    return {
      articleList: []
    };
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
      if (to.name === "Index") {
        this.$http.get(`${getDomain()}:3000/article/?id=index`).then(res => {
          this.addContent(res.body);
        });
      }
    }
  },
  components: {
    HeadCom
  },
  methods: {
    toArticle(value) {
      this.$router.push({ path: `/${value}` });
    },
    addContent(res) {
      this.articleList = [];
      for (let prop in res) {
        // console.log(prop, res[prop])
        this.articleList.push({
          index: prop,
          title: res[prop],
          date: moment(prop, "YYYY-MM-DD-HH-mm-ss").format("YYYY-MM-DD")
        });
      }
    },
    seeArticle(index) {
      this.$router.push({ path: `/article/${index}` });
      // this.$router.push({path: `/create`})
    }
  },
  created() {
    this.$http.get(`${getDomain()}:3000/article/?id=index`).then(res => {
      this.addContent(res.body);
    });
  },
  mounted() {
    // console.clear()
  }
};
</script>

<style lang="scss" scoped>
.index {
  margin-top: 50px;
  display: inline-block;
  text-align: center;
  width: 100%;
  max-width: 1000px;
  min-height: 50vh;
  background: rgba(255, 255, 255, 0);
}

header {
  span {
    font-size: 32px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  margin-bottom: 30px;
}

article {
  display: inline-block;
  width: 100%;
  /*max-width: 1000px;*/
}

.article-list {
  padding: 0;
  margin: 0;
  text-align: left;
  text-decoration: none;
  list-style: none;
  background: white;
  li {
    border-top: 1px #c1c1c1 solid;
    // border-bottom: 1px #c1c1c1 solid;
    background: rgba(214, 214, 214, 0.39);
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    span {
      margin-left: 30px;
      float: right;
    }
  }
}
</style>
