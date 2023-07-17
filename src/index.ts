import { Controller } from '@hotwired/stimulus'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Trendline from 'chartjs-plugin-trendline`;

export default class extends Controller {
  // @ts-ignore
  element: HTMLCanvasElement
  canvasTarget: HTMLCanvasElement

  chart: Chart
  typeValue: Chart.ChartType
  optionsValue: Chart.ChartOptions
  dataValue: Chart.ChartData

  hasDataValue: boolean
  hasCanvasTarget: boolean

  static targets: Array<string> = ['canvas']
  static values = {
    type: {
      type: String,
      default: 'line'
    },
    data: Object,
    options: Object
  }

  connect (): void {
    const element: HTMLCanvasElement = this.hasCanvasTarget ? this.canvasTarget : this.element

    // @ts-ignore
    this.chart = new Chart(element.getContext('2d'), {
      // @ts-ignore
      type: this.typeValue, // @ts-ignore
      data: this.chartData, // @ts-ignore
      options: this.chartOptions,
      plugins: [ChartDataLabels, Trendline]
    })
  }

  disconnect (): void {
    this.chart.destroy()
    this.chart = undefined
  }

  get chartData (): Chart.ChartData {
    if (!this.hasDataValue) {
      console.warn('[stimulus-chartjs] You need to pass data as JSON to see the chart.')
    }

    return this.dataValue
  }

  get chartOptions (): Chart.ChartOptions {
    return {
      ...this.defaultOptions,
      ...this.optionsValue
    }
  }

  get defaultOptions (): Chart.ChartOptions {
    return {}
  }
}
