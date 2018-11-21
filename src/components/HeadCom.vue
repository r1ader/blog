<template>
  <div class="index">
    <header>
      <div class="header-left">
        <span @click="toIndex">r1ader</span>
        <div>
          <a href="https://github.com/r1ader" target="_blank">
            <img src="@/assets/github.svg"/>
          </a>
        </div>
        <div>
          <a href="https://weibo.com/u/6353368751" target="_blank">
            <img src="@/assets/sina.svg"/>
          </a>
        </div>
        <div>
          <img src="@/assets/mail.svg"/>
        </div>
        <div @click="toCreate"></div>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    name: "HeadCom",
    data() {
      return {
        route: ''
      }
    },
    methods: {
      toIndex() {
        this.$router.push('/')
      },
      toCreate() {
        this.$router.push('/create')
      },
      displayMail() {
        console.log('asdf')
      }
    },
    watch: {
      // '$route'(to, from) {
      //   console.log(this.route)
      // }
    },
    created() {
      // console.log("$route", this.$route)
      // console.log("$router", this.$router)
      this.route = this.$route.name
    }
  }
</script>

<style lang="scss" scoped>
  .index {
    display: inline-block;
    text-align: center;
    width: 100%;
    max-width: 1000px;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  header {
    display: inline-block;
    width: 100%;
    /*max-width: 1000px;*/
    padding: 0;
    background: darkgrey;
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

</style>
