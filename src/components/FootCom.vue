<template>
  <div class="index">
    <hr>
    <div class="main" @click="jump()">
      <img class="logo" src="@/assets/logo.png">
      <br>
      <span>Code,</span>
      <span>Paint,</span>
      <span>Story</span>
      <span>@ r1ader</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FootCom",
  data() {
    return {
      clickNum: 0
    };
  },
  methods: {
    jump() {
      // console.log(this.clickNum);
      this.clickNum++;
      if (this.clickNum >= 5) {
        this.$router.push("/create");
      }
    }
  },
  created() {
    setInterval(() => {
      // console.log(this.clickNum)
      if (this.clickNum > 0) {
        this.clickNum = 0;
      }
    }, 10000);
  }
};
</script>

<style scoped>
.index {
  margin-top: 50px;
  /*! autoprefixer: off */
  background: -webkit-linear-gradient(top, #efefef, #fff);
  background: -moz-linear-gradient(top, #efefef, #fff);
  background: -o-linear-gradient(top, #efefef, #fff);
  background: -ms-linear-gradient(top, #efefef, #fff);
  background: linear-gradient(top, #efefef, #fff);
  /* autoprefixer: on */

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.main {
  display: inline-block;
  /*width: 100%;*/
  /*max-width: 940px;*/
  background-color: #d6d6d6;
  margin: 15px;
  margin-top: 30px;
  margin-bottom: 50px;
  padding: 30px;
  border-radius: 10px;
  border-top: 1px solid grey;
  border-right: 0;
  /*border-bottom: 1px solid #d9d9d9;*/
  border-left: 0;
}

.logo {
  width: 50px;
}
</style>
