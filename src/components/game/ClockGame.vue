<template>
  <div class="index">
    <HeadCom></HeadCom>
    <div class="hint">
      <span>提示:</span>
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
// let num = 9;
const bei = 30;
export default {
  name: "ClockGame",
  data() {
    return {
      mat0: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 2], [1, 2], [2, 3], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat1: [
        [[1, 2], [1, 3], [2, 3], [-1, -1]],
        [[0, 1], [2, 3], [0, 2], [-1, -1]],
        [[-1, -1], [0, 2], [0, 2], [-1, -1]],
        [[-1, -1], [0, 2], [0, 2], [-1, -1]],
        [[-1, -1], [0, 2], [0, 2], [-1, -1]],
        [[-1, -1], [0, 2], [0, 2], [-1, -1]],
        [[1, 2], [0, 3], [0, 1], [2, 3]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat2: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 1], [1, 3], [2, 3], [0, 2]],
        [[-1, -1], [-1, -1], [0, 2], [0, 2]],
        [[1, 2], [1, 3], [0, 3], [0, 2]],
        [[0, 2], [1, 2], [1, 3], [0, 3]],
        [[0, 2], [0, 2], [-1, -1], [-1, -1]],
        [[0, 2], [0, 1], [1, 3], [3, 2]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat3: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 1], [1, 3], [2, 3], [0, 2]],
        [[-1, -1], [-1, -1], [0, 2], [0, 2]],
        [[1, 2], [1, 3], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [2, 3], [0, 2]],
        [[-1, -1], [-1, -1], [0, 2], [0, 2]],
        [[2, 1], [1, 3], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat4: [
        [[1, 2], [2, 3], [-1, -1], [-1, -1]],
        [[0, 2], [0, 2], [-1, -1], [-1, -1]],
        [[0, 2], [0, 2], [1, 2], [3, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [2, 3], [0, 2]],
        [[-1, -1], [-1, -1], [0, 2], [0, 2]],
        [[-1, -1], [-1, -1], [0, 1], [0, 3]]
      ],
      mat5: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 2], [1, 2], [1, 3], [0, 3]],
        [[0, 2], [0, 2], [-1, -1], [-1, -1]],
        [[0, 2], [0, 1], [1, 3], [3, 2]],
        [[0, 1], [1, 3], [2, 3], [0, 2]],
        [[1, 2], [3, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat6: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 2], [1, 2], [1, 3], [0, 3]],
        [[0, 2], [0, 2], [-1, -1], [-1, -1]],
        [[0, 2], [0, 1], [1, 3], [3, 2]],
        [[0, 2], [1, 2], [2, 3], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat7: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 2], [1, 2], [2, 3], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 1], [0, 3], [0, 2], [0, 2]],
        [[-1, -1], [-1, -1], [0, 2], [0, 2]],
        [[-1, -1], [-1, -1], [0, 2], [0, 2]],
        [[-1, -1], [-1, -1], [0, 2], [0, 2]],
        [[-1, -1], [-1, -1], [0, 1], [0, 3]]
      ],
      mat8: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 2], [1, 2], [2, 3], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 2], [1, 2], [2, 3], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat9: [
        [[1, 2], [1, 3], [1, 3], [2, 3]],
        [[0, 2], [1, 2], [2, 3], [0, 2]],
        [[0, 2], [0, 2], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [2, 3], [0, 2]],
        [[1, 2], [2, 3], [0, 2], [0, 2]],
        [[0, 2], [0, 1], [0, 3], [0, 2]],
        [[0, 1], [1, 3], [1, 3], [0, 3]]
      ],
      mat: []
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
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 1200, 600);
      ctx.strokeStyle = "grey";
      //   for (let i = 0; i <= 1200; i += bei) {
      //     this.drawLine(i, 0, i, 600);
      //   }
      //   for (let j = 0; j <= 600; j += bei) {
      //     this.drawLine(0, j, 1200, j);
      //   }
    },
    drawBrick(x, y) {
      ctx.fillRect(x * bei, y * bei, 1 * bei, 1 * bei);
    },
    drawCircle(x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    },
    drawClock(i, j, t1, t2) {
      let cirX = i * bei + bei / 2;
      let cirY = j * bei + bei / 2;

      this.drawCircle(cirX, cirY, 1);
      let minuteX =
        cirX +
        Math.cos((t2 * Math.PI) / 2 - Math.PI / 2) * (bei / 2 - bei / 20);
      let minuteY =
        cirY +
        Math.sin((t2 * Math.PI) / 2 - Math.PI / 2) * (bei / 2 - bei / 20);
      this.drawLine(cirX, cirY, minuteX, minuteY);

      let hourX =
        cirX +
        Math.cos((t1 * Math.PI) / 2 - Math.PI / 2) * (bei / 2 - bei / 20);
      let hourY =
        cirY +
        Math.sin((t1 * Math.PI) / 2 - Math.PI / 2) * (bei / 2 - bei / 20);
      this.drawLine(cirX, cirY, hourX, hourY);
    }
  },

  created() {
    this.mat = [];
    for (let i = 0; i < 600 / bei; i++) {
      this.mat[i] = [];
      for (let j = 0; j < 1200 / bei; j++) {
        this.mat[i][j] = [0, 0];
      }
    }
  },
  mounted() {
    let c = this.$refs.can;
    ctx = c.getContext("2d");

    // for (let i = 0; i < 8; i++) {
    //   for (let j = 0; j < 4; j++) {
    //     ctx.strokeStyle = "black";
    //     ctx.lineWidth = 3;
    //     this.drawClock(
    //       j,
    //       i,
    //       (this["mat" + num.toString()][i][j][0] * Math.PI) / 2 - Math.PI / 2,
    //       (this["mat" + num.toString()][i][j][1] * Math.PI) / 2 - Math.PI / 2
    //     );
    //   }
    // }

    let min = 0;
    let hou = 0;
    let dm = 0;
    let dh = 0;
    console.log(Number.parseInt(moment().format("ss")));
    for (let i = 0; i < 600 / bei; i++) {
      for (let j = 0; j < 1200 / bei; j++) {
        dm = (i + j) / 20;
        dh = (i + j) / 10;
        this["mat"][i][j] = [dm, dh];
      }
    }
    let step = () => {
      min += 0.036;
      hou += 0.039;
      this.init();

      this.init();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      let timeNum = [];
      timeNum[0] = Math.floor(Number.parseInt(moment().format("HH")) / 10);
      timeNum[1] = Math.floor(Number.parseInt(moment().format("HH")) % 10);
      timeNum[2] = Math.floor(Number.parseInt(moment().format("mm")) / 10);
      timeNum[3] = Math.floor(Number.parseInt(moment().format("mm")) % 10);
      timeNum[4] = Math.floor(Number.parseInt(moment().format("ss")) / 10);
      timeNum[5] = Math.floor(Number.parseInt(moment().format("ss")) % 10);
      //   console.log(num1);
      //   console.log(num);
      let speed = 0.01;

      let offset = [[6, 6], [6, 10], [6, 16], [6, 20], [6, 26], [6, 30]];
      for (let i = 0; i < 600 / bei; i++) {
        for (let j = 0; j < 1200 / bei; j++) {
          //   dm = (i + j) / 1000;
          //   dh = (i + j) / 1000;
          dm = 0;
          dh = 0;
          if (this["mat"][i][j][0] >= 4) {
            this["mat"][i][j][0] = 0;
          }
          if (this["mat"][i][j][1] >= 4) {
            this["mat"][i][j][1] = 0;
          }
          let inWhich = -1;
          for (let k = 0; k < 6; k++) {
            if (
              i >= offset[k][0] &&
              j >= offset[k][1] &&
              i < offset[k][0] + 8 &&
              j < offset[k][1] + 4
            ) {
              inWhich = k;
              break;
            }
          }
          if (inWhich === -1) {
            this["mat"][i][j][0] += speed;
            this["mat"][i][j][1] += speed;
            continue;
          }
          let ti = i - offset[inWhich][0];
          let tj = j - offset[inWhich][1];
          //   console.log();
          if (this["mat" + timeNum[inWhich].toString()][ti][tj][0] !== -1) {
            if (inWhich === 5) speed = 0.1;
            if (
              Math.abs(
                this["mat"][i][j][0] -
                  this["mat" + timeNum[inWhich].toString()][ti][tj][0]
              ) >= 0.02
            ) {
              this["mat"][i][j][0] += speed;
            }
            if (
              Math.abs(
                this["mat"][i][j][1] -
                  this["mat" + timeNum[inWhich].toString()][ti][tj][1]
              ) >= 0.02
            ) {
              this["mat"][i][j][1] += speed;
            }

            speed = 0.01;
          } else {
            this["mat"][i][j][0] += speed;
            this["mat"][i][j][1] += speed;
          }
        }
      }
      for (let i = 0; i < 600 / bei; i++) {
        for (let j = 0; j < 1200 / bei; j++) {
          this.drawClock(j, i, this["mat"][i][j][0], this["mat"][i][j][1]);
        }
      }

      requestAnimationFrame(step);
    };

    step();

    c.onmousemove = e => {};
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
