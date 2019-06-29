import { HorizontalBar } from 'vue-chartjs';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

@Component({
  extends: HorizontalBar,
})
export default class BarChart extends mixins(HorizontalBar) {
  @Prop({ default: () => [1, 0, 2, 5, 4] }) public data!: number[];
  @Prop({ default: () => ['1*', '2*', '3*', '4*', '5*'] }) public options!: string[];

  public mounted() {
    this.renderChart(
      {
        labels: this.options,
        datasets: [
          {
            label: '',
            backgroundColor: '#63cbe4',
            data: this.data,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    );
  }
}
