import { customElement, LitElement, css, html } from 'lit-element';
import './elements';

@customElement('lit-echarts-demo')
export default class LitEChartsDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 800px;
      height: 400px;
    }
    lit-echarts {
      height: 100%
    }
  `;
  render() {
    const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
    };
    return html` <lit-echarts .option=${option}></lit-echarts> `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-echarts-demo': LitEChartsDemo;
  }
}
