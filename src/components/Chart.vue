<template>
  <div>
    <canvas
      class = "myChart"
      ref="myChart"
      width="600"
      height="150"
    ></canvas>
  </div>
</template>
<script>
import Chart from 'chart.js';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      myChart: null,
    };
  },
  computed: {
    ...mapGetters(['getHobbySum', 'getExerciseSum', 'getEtcSum']),
  },
  /**
   * 차트 지우기
   */
  destroyed() {
    if (this.myChart) {
      this.myChart.destroy();
    }
  },
  /**
   * 차트 만들기
   */
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.myChart;
      if (!this.myChart) {
        this.myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['운동', '취미', '기타'],
            datasets: [
              { // 첫 번째 데이터셋
                label: 'Number of Moons',
                data: [this.getExerciseSum, this.getHobbySum, this.getEtcSum],
                backgroundColor: [
                  'rgb(144,238,144)',
                  'rgb(135,206,250)',
                  'rgb(255,182,193)',
                ],
                borderColor: [
                  '#36495d',
                  '#36495d',
                  '#36495d',
                ],
                borderWidth: 3,
              },
            ],
          },
        });
      }
    },
  },
  watch: {
    getExerciseSum(newVal) {
      console.log(this.myChart);
      if (this.myChart) {
        this.myChart.data.datasets[0].data[0] = newVal;
        this.myChart.update();
      } else {
        console.error('Chart is undefined');
      }
    },
    getHobbySum(newVal) {
      if (this.myChart) {
        this.myChart.data.datasets[0].data[1] = newVal;
        this.myChart.update();
      } else {
        console.error('Chart is undefined');
      }
    },
    getEtcSum(newVal) {
      if (this.myChart) {
        this.myChart.data.datasets[0].data[2] = newVal;
        this.myChart.update();
      } else {
        console.error('Chart is undefined');
      }
    },
  },
};
</script>
