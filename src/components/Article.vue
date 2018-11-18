<template>
  <div class="container">
    <HeadCom></HeadCom>
    <div class="title">{{artJson.title}}</div>
    <div>{{artJson.date}}</div>
    <div>
      <p v-for="(item,index) in artJson.body" :class="item.type">
        {{item.content}}
      </p>
    </div>
  </div>
</template>

<script>
  import HeadCom from '@/components/HeadCom'

  export default {
    name: "Article",
    data() {
      return {
        index: "2018-11-07T18:49:15+08:00",
        artJson: {}
      }
    },
    components: {
      HeadCom
    },
    watch: {
      '$route'(to, from) {
        if (!this.$route.params.id) return
        console.log(to.name)
        this.index = this.$route.params.id
        // console.log(this.$route.params.id)
        this.$http.get(`static/${this.index}.json`).then(res => {
          this.artJson = res.body
          console.log(this.artJson)
        }, (err) => {
          console.log(err)
        })
      }
    },
    methods: {},
    created() {
    },
    mounted() {
      this.index = this.$route.params.id || "2018-11-07T18:49:15+08:00"
      this.$http.get(`static/${this.index}.json`).then(res => {
        this.artJson = res.body
        console.log(this.artJson)
      }, (err) => {
        console.log(err)
      })

    }
  }
</script>

<style scoped>
  .container {
    display: inline-block;
    width: 100%;
    max-width: 1000px;

  }

  .title {
    font-size: 30px;
    margin: 20px;
  }

  p {
    text-align: left;
    text-indent: 2rem;
    margin: 15px;
  }

  .big {
    font-size: 20px;
  }

  .mid {
    font-size: 15px;
  }

  .small {
    font-size: 10px;
  }
</style>
