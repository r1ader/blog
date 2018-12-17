<template>
  <div class="index">
    <header>
      <div class="header-left">
        <span @click="toIndex">r1ader</span>
        <div>
          <a href="https://github.com/r1ader" target="_blank">
            <img src="@/assets/github.svg">
          </a>
        </div>
        <div>
          <a href="https://weibo.com/u/6353368751" target="_blank">
            <img src="@/assets/sina.svg">
          </a>
        </div>
        <div>
          <img src="@/assets/mail.svg">
        </div>
        <!-- <div @click="toCreate"></div> -->
      </div>
      <div class="header-right">
        <div :class="(route)==='/'?`pic pic-select`:`pic`" @click="jump('')">ARTICLE</div>
        <div :class="/demo/.test(route)?`pic pic-select`:`pic`" @click="jump('demo/clock')">DEMO</div>
      </div>
    </header>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "HeadCom",
  data() {
    return {
      // route: ""
    };
  },
  computed: {
    route: function() {
      return this.$route.path;
    }
  },
  methods: {
    toIndex() {
      this.$router.push("/");
    },
    toCreate() {
      this.$router.push("/create");
    },
    displayMail() {
      console.log("asdf");
    },
    jump(path) {
      // console.log(this.$route);
      this.$router.push(`/${path}`);
    }
  },
  watch: {
    // '$route'(to, from) {
    //   console.log(this.route)
    // }
  },
  created() {
    // console.log("$router", this.$router)
    // this.route = this.$route.name;
    // console.log("$route", this.route);
  }
};
</script>

<style lang="scss" scoped>
.index {
  display: inline-block;
  text-align: center;
  width: 100%;
  // max-width: 1000px;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background: darkgrey;
  position: relative;
}

header {
  display: inline-block;
  width: 100%;
  max-width: 1000px;
  height: 50px;
  padding: 0;
  vertical-align: bottom;
}

.header {
  &-left {
    float: left;
    margin: 10px;
    span {
      font-size: 25px;
      margin-left: 10px;
      margin-right: 10px;
      cursor: pointer;
    }
    img {
      width: 20px;
      height: 20px;
      margin: 5px;
      /*color: #ffffff;*/
      /*background: white;*/
    }
    div {
      vertical-align: top;
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: #6f6f6f;
      cursor: pointer;
    }
  }
}

.header-right {
  float: right;
}

.pic {
  line-height: 50px;
  display: inline-block;
  width: 100px;
  height: 50px;
  background: darkgray;
  // border: 1px solid grey;
}

@media screen and (max-width: 580px) {
  .pic {
    display: none;
  }
}

.pic-select {
  background: -webkit-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: -moz-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: -o-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: -ms-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
}

.pic:hover {
  background: -webkit-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: -moz-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: -o-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: -ms-linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
  background: linear-gradient(bottom, grey, rgba(255, 255, 255, 0));
}

.bottom {
  position: absolute;
  width: 100%;
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
