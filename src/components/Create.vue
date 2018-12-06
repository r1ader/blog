<template>
  <div class="container">
    <head-com></head-com>
    <div>
      <label>Title:</label>
      <input v-model="articleTitle" class="title" type="text" autofocus="autofocus">
    </div>
    <div class="tag-list">
      Tags：
      <span v-for="(item,index) in tags" :key="index">{{item}}</span>
      <input type="text" v-model="tagInput">
      <button @click="addTig()">add</button>
    </div>
    <div class="create-body">
      <div class="create-body-input" ref="input">
        <div v-for="(item,index) in parghList" :key="index">
          <div class="create-body-edit">
            <label>Content{{index+1}}:</label>
            <button @click="addPar(index,'Title')">Title</button>
            <button @click="addPar(index,'HalfTitle')">HalfTitle</button>
            <button @click="addPar(index,'javascript')">javascript</button>
            <button @click="addPar(index,'line')">line</button>
            <!-- <button @click="upload(index)"> -->
            <input @change="fileChange($event)" type="file" id="upload_file" style="display:none">
            <button @click="uploadFile(index)">file</button>
            <!-- upload -->
            <!-- </button> -->
            <button @click="deletePargh(index)">
              <span style="color: rgba(255,0,0,0.58);">delete</span>
            </button>
          </div>
          <textarea v-model="item.content" class="input" @input="parseMkdown(index)"></textarea>
        </div>
      </div>
      <div class="create-body-output">
        <div v-for="(item,index) in parghList" :key="index">
          <!--{{item.res}}-->
          <div v-html="(item.res)"></div>
        </div>
      </div>
    </div>
    <button @click="add">add</button>
    <button @click="preserve">submit</button>
  </div>
</template>

<script>
import moment from "moment";
import HeadCom from "@/components/HeadCom";
import marked from "marked";

import getDomain from "@/util/getDomain";

export default {
  name: "Create",
  data() {
    return {
      tags: [],
      parghList: [
        {
          content: "",
          res: ""
        }
      ],
      articleTitle: "",
      filename: "",
      tagInput: ""
    };
  },
  watch: {
    $route(to, from) {
      if (from.name === "Article") {
        this.filename = from.params.id;
      } else {
        this.filename = "";
      }
    },
    filename: function() {
      if (this.filename === "") {
        this.parghList = [
          {
            content: "",
            res: ""
          }
        ];
        this.articleTitle = "";
        return;
      }
      this.$http
        .get(
          `${getDomain()}:3000/article/?id=${encodeURIComponent(this.filename)}`
        )
        .then(
          res => {
            this.parghList = res.body.body || [];
            this.articleTitle = res.body.title || "";
            this.tags = res.body.tags || [];

            // console.log(res.body)
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  components: {
    HeadCom
  },
  methods: {
    fileChange(el) {
      if (!el.target.files[0].size) return;
      console.log(el.target.files[0]);
      var formData = new FormData();
      formData.append("picture", el.target.files[0]);
      // specify Content-Type, with formData as well
      this.$http
        .post(`${getDomain()}:3000/uploadimage`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(
          function(res) {
            console.log(res.body.data);
            let fileUrl = `${getDomain()}:3000/${res.body.data}`;
            this.parghList[0].content += "\n";
            this.parghList[0].content += `![${res.body.data}](${fileUrl})`;
          },
          function(res) {
            console.log(res.body);
          }
        );
    },
    uploadFile(index) {
      document.getElementById("upload_file").click();
    },
    preserve() {
      let res = {
        title: this.articleTitle,
        tags: this.tags,
        date: moment().format("YYYY/MM/DD"),
        body: this.parghList
      };
      let titleValue =
        this.filename === ""
          ? moment().format("YYYY-MM-DD-HH-mm-ss")
          : this.filename;
      console.log(JSON.stringify(res));
      this.$http
        .post(
          `${getDomain()}:3000/create`,
          {
            data: JSON.stringify(res, null, "\t"),
            title: titleValue
          },
          {
            emulateJSON: true
          }
        )
        .then(
          response => {
            console.log(response);
            this.$router.push(`/article/${titleValue}`);
          },
          error => {
            console.log(error);
          }
        );
    },
    add() {
      this.parghList.push({
        type: "mid",
        content: ""
      });
    },
    deletePargh(index) {
      if (confirm("Delete this paragraph")) {
        this.parghList.splice(index, 1);
      }
    },
    parseMkdown(index) {
      marked.setOptions({
        highlight: function(code) {
          return hljs.highlightAuto(code).value;
        }
      });
      this.parghList[index].res = marked(this.parghList[index].content);
    },
    addPar(index, type) {
      let res = "";
      switch (type) {
        case "Title":
          res = "\n# ";
          break;
        case "HalfTitle":
          res = "\n## ";
          break;
        case "javascript":
          res = "\n```javascript\n\n```\n";
          break;
        case "line":
          res = "\n-----\n";
          break;
      }
      this.parghList[index].content += res;
      let getNode = this.$refs.input.children[index].getElementsByTagName(
        "textarea"
      )[0];
      console.log(getNode);
      getNode.focus();
      switch (type) {
        case "javascript":
          setTimeout(function() {
            getNode.setSelectionRange(
              getNode.value.length - 5,
              getNode.value.length - 5
            );
          }, 0);
          break;
      }
      // this.parghList[index].content += res
    },
    addTig() {
      if (this.tags.indexOf(this.tagInput) === -1) {
        this.tags.push(this.tagInput);
      }
      this.tagInput = "";
    }
  },
  created() {
    console.clear();
  },
  mounted() {
    // console.log(1, moment().format())
  }
};
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

.tag-list {
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
  input {
    font-size: 12px;
    width: 5rem;
    margin: 20px;
    border-radius: 5px;
    border: 1px grey solid;
    padding: 7px;
  }
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
