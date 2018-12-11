<template>
  <div class="index">
    <HeadCom></HeadCom>
    <div class="hint">
      <span>提示:左键或按‘W’键 开始/暂停</span>
    </div>
    <div class="canvas-container">
      <canvas ref="can" width="1200" height="600" class="main"></canvas>
    </div>
    <FootCom></FootCom>
  </div>
</template>

<script>
import HeadCom from "@/components/HeadCom";
import FootCom from "@/components/FootCom";
let ctx = null;
const bei = 5;
export default {
  name: "LifeGame",
  data() {
    return {
      width: 1200,
      height: 600,
      mat: [],
      points: [],
      points2: [],
      forword: false,
      mat2: [],
      dir: [
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [1, 0],
        [-1, 1],
        [-1, -1],
        [-1, 0]
      ]
    };
  },
  components: {
    HeadCom,
    FootCom
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.closePath();
      ctx.stroke();
    },
    init() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 1200, 600);
      ctx.strokeStyle = "grey";
      for (let i = 0; i < 1200; i += bei) {
        this.drawLine(i, 0, i, 600);
      }
      for (let j = 0; j < 600; j += bei) {
        this.drawLine(0, j, 1200, j);
      }
    },
    drawBrick(x, y, color) {
      color = color || "white";
      ctx.fillStyle = color;
      ctx.fillRect(x * bei, y * bei, 1 * bei, 1 * bei);
      // ctx.fillRect(20, 20, 9, 9);
    }
  },

  created() {
    this.mat = [];
    for (let i = 0; i < 1200 / bei; i++) {
      this.mat[i] = [];
      this.mat2[i] = [];
      for (let j = 0; j < 600 / bei; j++) {
        this.mat[i][j] = 0;
        this.mat2[i][j] = 0;
      }
    }
    // let temp = [[10, 10], [11, 10], [10, 11], [11, 11], [9, 10]];
    // temp.map(o => {
    //   this.points.push(o);
    // });
    let seed = Math.floor(Math.random() * 10000000);
    console.log(seed);
    // let seed = 5;
    let rnd;
    // return;
    for (let i = 0; i < 32000 / bei; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      rnd = seed / 233280.0;

      // let x = Math.floor(1190 / bei / 4 + (rnd * 1190) / bei / 2);
      let x = Math.floor((rnd * 1190) / bei);
      seed = (seed * 9301 + 49297) % 233280;
      rnd = seed / 233280.0;

      // let y = Math.floor(590 / bei / 4 + (rnd * 590) / bei / 2);
      let y = Math.floor((rnd * 590) / bei);
      if (this.points.indexOf([x, y]) === -1) {
        this.points.push([x, y]);
      }
      this.mat[x][y] = 1;
    }
    // console.log(this.points);
  },
  mounted() {
    console.log("moun");
    const c = this.$refs.can;
    ctx = this.$refs.can.getContext("2d");

    // this.drawBrick(16, 45, "white");

    let step = () => {
      this.init();
      this.points.map((o, i) => {
        this.drawBrick(o[0], o[1]);
        this.mat[o[0]][o[1]] = 0;
        this.dir.map(q => {
          if (this.mat[o[0] + q[0]] !== undefined) {
            if (this.mat[o[0] + q[0]][o[1] + q[1]] !== undefined) {
              this.mat2[o[0] + q[0]][o[1] + q[1]]++;
            }
          }
        });
      });

      // ctx.fillStyle = "red";
      // this.mat2.map((o, i) => {
      //   o.map((p, j) => {
      //     ctx.fillText(p.toString(), i * bei + bei / 2, j * bei + bei / 2);
      //   });
      // });

      this.points.map((o, i) => {
        if (this.mat2[o[0]][o[1]] === 2 || this.mat2[o[0]][o[1]] === 3) {
          this.points2.push(o);
          this.mat[o[0]][o[1]] = 1;
        }
        this.mat2[o[0]][o[1]] = 0;
      });
      this.points.map((o, i) => {
        this.dir.map(q => {
          if (this.mat[o[0] + q[0]] !== undefined) {
            if (this.mat[o[0] + q[0]][o[1] + q[1]] !== undefined) {
              if (
                this.mat2[o[0] + q[0]][o[1] + q[1]] === 3 &&
                this.mat[o[0] + q[0]][o[1] + q[1]] === 0
              ) {
                this.points2.push([o[0] + q[0], o[1] + q[1]]);
                this.mat[o[0] + q[0]][o[1] + q[1]] = 1;
              }
              this.mat2[o[0] + q[0]][o[1] + q[1]] = 0;
            }
          }
        });
      });
      this.points = [];
      this.points2.map(o => {
        // ctx.fillText("Y", o[0] * bei + bei / 2, o[1] * bei + bei / 2);
        this.points.push(o);
      });
      this.points2 = [];
      if (this.forword) requestAnimationFrame(step);
    };

    step();
    let self = this;
    document.onkeypress = function(e) {
      if (e.key === "w") {
        if (self.forword) {
          self.forword = false;
        } else {
          self.forword = true;
          step();
        }
      }
      console.log(e);
    };

    c.onclick = () => {
      if (self.forword) {
        self.forword = false;
      } else {
        self.forword = true;
        step();
      }
    };

    // c.onmousemove = e => {
    // let x = e.clientX - 20;
    // let y = e.clientY - 80;
    // let sf = x / c.clientWidth;
    // let tx = sf * 1200;
    // let ty = y * (tx / x);
    // tx = Math.floor(tx / bei);
    // ty = Math.floor(ty / bei);
    // this.drawBrick(tx, ty);
    // // this.points.push([tx, ty]);
    // for (let i = 0; i < 5; i++) {
    //   let randx = tx + Math.floor(Math.random() * 6 - 3);
    //   let randy = ty + Math.floor(Math.random() * 6 - 3);
    //   // this.drawBrick(randx, randy);
    //   // this.points.push([randx, randy]);
    // }
    // // console.log(c.clientWidth);
    // };
    // setInterval(() => {
    //   step();
    // }, 30);
  }
};
</script>

<style lang="scss" scoped>
.index {
}

.canvas-container {
  display: inline-block;
  width: 100%;
  max-width: 1000px;
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
}
.main {
  width: 95%;
  border: 1px solid black;
}
.hint {
  padding-top: 30px;
  font-size: 30px;
}
</style>
