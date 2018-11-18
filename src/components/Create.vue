<template>
  <div class="container">
    <head-com></head-com>
    <div>
      <label>Title: </label><input v-model="articleTitle" class="title" type="text" autofocus="autofocus"/>
    </div>
    <div class="create-body-input" ref="content">
      <div v-for="(item,index) in parghList">
        <div>
          <label>Content{{index+1}}: </label>
          <button @click="deletePargh(index)"><span style="color: rgba(255,0,0,0.58);">delete</span></button>
        </div>
        <textarea v-model="item.content" class="input" @input="parseMkdown(index)"></textarea>
      </div>
    </div>
    <div class="create-body-output">
      <div v-for="(item,index) in parghList">
        <div v-html="(item.res)">
        </div>
      </div>
    </div>
    <button @click="add">add</button>
    <button @click="preserve">submit</button>
  </div>
</template>

<script>
  import moment from 'moment'
  import HeadCom from '@/components/HeadCom'
  import MarkDown from 'markdown'
  export default {
    name: "Create",
    data() {
      return {
        parghList: [{
          type: 'mid',
          content: '',
          res:''
        }],
        articleTitle: ''
      }
    },
    components: {
      HeadCom
    },
    methods: {
      preserve() {
        let res = {
          title: this.articleTitle,
          date: moment().format('YYYY/MM/DD'),
          body: this.parghList,
        }
        let titleValue = moment().format()
        console.log(JSON.stringify(res))
        this.$http.post("http://localhost:3000/", {
            data: JSON.stringify(res, null, '\t'),
            title: titleValue
          },
          {
            emulateJSON: true
          }
        ).then((response) => {
          console.log(response);
          this.$router.push(`/article/${titleValue}`)
        }, (error) => {
          console.log(error);
        });
      },
      add() {
        this.parghList.push({
          type: 'mid',
          content: ''
        })
      },
      deletePargh(index) {
        if (confirm('Delete this paragraph')) {
          this.parghList.splice(index, 1)
        }
      },
      parseMkdown(index){
        this.parghList[index].res = MarkDown.parse(this.parghList[index].content)
      }
    },
    created() {
      console.clear()
    },
    mounted() {
      console.log(1, moment().format())
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: inline-block;
    width: 100%;
    max-width: 1000px;
  }

  .create-body-input > div {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .create-body-output {
    border: 1px solid grey;
    padding: 10px;
    margin: 20px;
    border-radius: 5px;
    text-align: left;
    div{
      padding: 0;
      margin: 0;
      word-break: keep-all;
      word-wrap: break-word;
    }
  }


  .title {
    font-size: 20px;
    width: 50%;
    margin: 20px;
    user-focus: true;
  }

  label {
    margin: 5px;
  }

  textarea {
    width: 100%;
    height: 8em;
    padding: 5px;
    border: 1px rgba(52, 48, 48, 0.47) solid;
    border-radius: 5px;
  }

  button {
    height: 25px;
    width: 75px;
    background-color: #bebebe;
    border: 1px rgba(0, 0, 143, 0.47) solid;
    border-radius: 4px;
    opacity: 0.7;
  }

  button:hover {
    opacity: 1;
  }
</style>
