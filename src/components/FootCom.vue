<template>
  <div class="index">
    <hr>
    <div class="main">
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
    name: "FootCom"
  }
</script>

<style scoped>
  .index {
    margin-top: 50px;
    background: linear-gradient(top, #efefef, #FFF);
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
