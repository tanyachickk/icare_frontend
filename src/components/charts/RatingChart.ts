import { HorizontalBar } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

@Component({
  extends: HorizontalBar,
})
export default class RatingChart extends mixins(HorizontalBar) {
  @Prop({ default: () => [1, 0, 2, 5, 4] }) public data!: number[];
  @Prop({ default: () => ['1', '2', '3', '4', '5'] }) public options!: string[];

  public mounted() {
    this.renderChart(
      {
        labels: this.options,
        datasets: [
          {
            backgroundColor: 'rgba(25, 136, 255, 0.15)',
            borderColor: '#349cec',
            borderWidth: 2,
            data: this.data,
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontFamily: 'Open Sans',
                fontSize: 14,
              },
              scaleLabel: {
                display: true,
                fontFamily: 'Open Sans',
                labelString: 'Оценка',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontFamily: 'Open Sans',
                fontSize: 14,
                stepSize: 1,
              },
              scaleLabel: {
                display: true,
                fontFamily: 'Open Sans',
                labelString: 'Количество проголосовавших пациентов',
              },
            },
          ],
        },
      },
    );
    // console.log(this.$data._chart);
  }
}
