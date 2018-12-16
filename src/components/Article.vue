<template>
  <div>
    <HeadCom></HeadCom>
    <div class="header">
      <div class="title">{{artJson.title}}</div>
      <div>{{artJson.date}}</div>
      <div class="tag-list">Tags：
        <div v-for="(item,index) in artJson.tags" :key="index">
          <span>{{item}}</span>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
    <div class="container">
      <!-- <hr> -->
      <div class="article-body">
        <p v-for="(item,index) in artJson.body" :class="item.type" v-html="item.res" :key="index"></p>
      </div>
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

.header {
  background: rgba(128, 128, 128, 0.205);
  padding: 0;
  margin: 0;
}

.tag-list {
  padding: 20px;
  // width: 1000px;
  div {
    display: inline-block;
    margin-bottom: 10px;
  }
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
    overflow: hidden;
  }
}

.title {
  font-size: 30px;
  padding: 20px;
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
.bottom {
  position: absolute;
  width: 100%;
  // max-width: 1000px;
  height: 10px;
  background: gray;
  z-index: 2;
  /*! autoprefixer: off */
  background: -webkit-linear-gradient(top, grey, rgba(255, 255, 255, 0));
  background: -moz-linear-gradient(top, grey, rgba(255, 255, 255, 0));
  background: -o-linear-gradient(top, grey, rgba(255, 255, 255, 0));
  background: -ms-linear-gradient(top, grey, rgba(255, 255, 255, 0));
  background: linear-gradient(top, grey, rgba(255, 255, 255, 0));
  /* autoprefixer: on */
}
</style>
