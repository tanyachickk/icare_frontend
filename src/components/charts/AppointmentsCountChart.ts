import { Line } from 'vue-chartjs';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import moment from 'moment';

function getDate() {
  return moment().format('DD.MM.YYYY');
}

@Component({
  extends: Line,
})
export default class AppointmentsCountChart extends mixins(Line) {
  @Prop({ default: () => [5, 5, 4, 5, 5, 6, 4, 7, 5, 4, 5, 3] }) public data!: number[];
  @Prop({
    default: () => [
      getDate(),
      getDate(),
      getDate(),
      getDate(),
      getDate(),
      getDate(),
      getDate(),
      getDate(),
      getDate(),
      getDate(),
      getDate(),
    ],
  })
  public options!: string[];

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
                stepSize: 1,
              },
              scaleLabel: {
                display: true,
                fontFamily: 'Open Sans',
                labelString: 'Количество пациентов',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontFamily: 'Open Sans',
                fontSize: 12,
              },
            },
          ],
        },
      },
    );
  }
}
