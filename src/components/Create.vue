<template>
  <div class="container">
    <head-com></head-com>
    <div>
      <label>Title: </label><input v-model="articleTitle" class="title" type="text" autofocus="autofocus"/>
    </div>
    <div class="create-body">
      <div class="create-body-input" ref="input">
        <div v-for="(item,index) in parghList">
          <div class="create-body-edit">
            <label>Content{{index+1}}: </label>
            <button @click="addPar(index,'Title')">Title</button>
            <button @click="addPar(index,'HalfTitle')">HalfTitle</button>
            <button @click="addPar(index,'javascript')">javascript</button>
            <button @click="addPar(index,'line')">line</button>
            <button @click="deletePargh(index)"><span style="color: rgba(255,0,0,0.58);">delete</span></button>
          </div>
          <textarea v-model="item.content" class="input" @input="parseMkdown(index)"></textarea>
        </div>
      </div>
      <div class="create-body-output">
        <div v-for="(item,index) in parghList">
          <!--{{item.res}}-->
          <div v-html="(item.res)">
          </div>
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
  import marked from 'marked'
  import hljs from 'highlight.js'

  export default {
    name: "Create",
    data() {
      return {
        parghList: [{
          content: '',
          res: ''
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
      parseMkdown(index) {
        marked.setOptions({
          highlight: function (code) {
            return hljs.highlightAuto(code).value
          }
        })
        this.parghList[index].res = marked(this.parghList[index].content)
      },
      addPar(index, type) {
        let res = ''
        switch (type) {
          case 'Title':
            res = '\n# '
            break;
          case 'HalfTitle':
            res = '\n## '
            break;
          case 'javascript':
            res = '\n```javascript\n\n```\n'
            break;
          case 'line':
            res = '\n-----\n'
            break;
        }
        this.parghList[index].content += res
        let getNode = this.$refs.input.children[index].getElementsByTagName('textarea')[0]
        console.log(getNode)
        getNode.focus()
        switch (type) {
          case 'javascript':
            setTimeout(function () {
              getNode.setSelectionRange(getNode.value.length - 5, getNode.value.length - 5)
            }, 0)
            break;
        }
        // this.parghList[index].content += res
      },
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

  .create-body {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  .create-body-input {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  @media screen and (max-width: 980px) {
    .create-body {
      display: flex;
      flex: 1;
      flex-direction: column;
    }
  }

  .create-body-input > div {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .create-body-output {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid grey;
    padding: 10px;
    margin: 20px;
    border-radius: 5px;
    text-align: left;
    overflow: auto;
    div {
      padding: 0;
      margin: 0;
      word-break: keep-all;
      word-wrap: break-word;
    }
  }

  .create-body-edit {
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 20px;
    width: 50%;
    margin: 20px;
    user-focus: true;
    border-radius: 5px;
    border: 1px grey solid;
    padding: 7px;
  }

  label {
    margin: 5px;
  }

  textarea {
    width: 100%;
    height: 15em;
    padding: 5px;
    border: 1px rgba(52, 48, 48, 0.47) solid;
    border-radius: 5px;
    resize: none;
  }

  button {
    height: 25px;
    width: 75px;
    background-color: #bebebe;
    border: 1px rgba(0, 0, 143, 0.47) solid;
    border-radius: 4px;
    opacity: 0.7;
    margin-bottom: 5px;
  }

  button:hover {
    opacity: 1;
  }

</style>
