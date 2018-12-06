<template>
  <div class="container">
    <HeadCom></HeadCom>
    <div class="title">{{artJson.title}}</div>
    <div>{{artJson.date}}</div>
    <div class="tag-list">
      Tags：
      <span v-for="(item,index) in artJson.tags" :key="index">{{item}}</span>
    </div>
    <hr>
    <div class="article-body">
      <p v-for="(item,index) in artJson.body" :class="item.type" v-html="item.res" :key="index"></p>
    </div>
    <FootCom></FootCom>
  </div>
</template>

<script>
import HeadCom from "@/components/HeadCom";
import FootCom from "@/components/FootCom";
import getDomain from "@/util/getDomain";

export default {
  name: "Article",
  data() {
    return {
      index: "2018-11-07T18:49:15+08:00",
      artJson: {}
    };
  },
  components: {
    HeadCom,
    FootCom
  },
  watch: {
    $route(to, from) {
      if (!this.$route.params.id) return;
      // console.log(to.name)
      this.index = this.$route.params.id;
      // console.log(this.$route.params.id)
      this.$http
        .get(
          `${getDomain()}:3000/article/?id=${encodeURIComponent(this.index)}`
        )
        .then(
          res => {
            this.artJson = res.body;
            // console.log(this.artJson)
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  methods: {},
  created() {},
  mounted() {
    this.index = this.$route.params.id || "2018-11-07T18:49:15+08:00";
    this.$http
      .get(`${getDomain()}:3000/article/?id=${encodeURIComponent(this.index)}`)
      .then(
        res => {
          this.artJson = res.body;
          console.log(this.artJson);
        },
        err => {
          console.log(err);
        }
      );
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: inline-block;
  width: 100%;
  max-width: 1000px;
  min-height: 50vh;
}

.tag-list {
  margin: 20px;
  span {
    background: #efefef;
    border: 1px grey solid;
    margin: 10px;
    padding: 4px;
    padding-left: 7px;
    padding-right: 7px;
    border-radius: 5px;
    font-weight: bold;
    color: #c33c66;
  }
}

.title {
  font-size: 30px;
  margin: 20px;
}

.article-body {
  min-height: 30vh;
}

p {
  text-align: left;
  /*text-indent: 2rem;*/
  margin: 15px;
}

img {
  background-color: #c33c66;
}
</style>
