<template>
  <div class="index">
    <img class="index-img" src="http://148.70.12.40:3000/5c35d783-d6a3-4281-81e7-b200e5a4c376.jpeg">
    <div class="shadow"></div>
    <div class="get-start">
      <span class="more">more picture</span>
      <span>Get Start</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Show",
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.index {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 200px;
  display: inline-block;
  text-align: center;
  width: 100%;
  max-width: 1000px;
  background: white;
  padding: 0;
  margin: 0;
  // background-image: url("http://148.70.12.40:3000/5c35d783-d6a3-4281-81e7-b200e5a4c376.jpeg");
  // background-size: 1000px;
  position: relative;
  overflow: hidden;
}

.index-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 1000px;
  // height: 200px;
  // overflow: ;
}
@media screen and (max-width: 980px) {
  .index-img {
    width: 100vw;
  }
}

.get-start {
  position: absolute;
  right: 70px;
  bottom: 50px;
  height: 50px;
  width: 150px;
  border-radius: 10px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: white;
    font-size: 25px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  .more {
    position: absolute;
    font-size: 15px;
    top: -25px;
    color: rgba(5, 5, 5, 0.432);
    letter-spacing: 2px;
    font-weight: 400;
  }
}
.shadow {
  width: 100%;
  height: 100%;
  background-color: grey;
  opacity: 0.3;
}
</style>
