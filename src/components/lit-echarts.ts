import {
  LitElement,
  html,
  css,
  customElement,
  query,
  property,
  PropertyValues
} from 'lit-element';

import * as echarts from 'echarts';
import { bind, clear } from 'size-sensor';
import isEqual from 'fast-deep-equal';
import { ChartReadyPayload } from './chart.types';
import { EChartOption } from 'echarts';

/**
 * An example element.
 *
 */
@customElement('lit-echarts')
export default class LitECharts extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .chart {
      width: 100%;
      height: 100%;
    }
  `;
  @query('[part="base"]') base: HTMLDivElement;
  @property({ type: String, reflect: true }) theme = '';
  @property({ type: Object, reflect: true }) option = {} as EChartOption;
  @property({ reflect: true }) replaceMerge = undefined;
  @property({ type: Boolean, reflect: true }) notMerge = false;
  @property({ type: Boolean, reflect: true }) showLoading = false;
  @property({ type: Object, reflect: true }) loadingOption = {} as echarts.EChartsLoadingOption;
  @property({ type: Object, reflect: true }) opts = {};
  @property({ reflect: true }) onChartReady: (o: echarts.ECharts) => {};
  @property({ type: Object, reflect: true }) onEvents = {};

  firstUpdated() {
    this.renderNewEchart();
  }

  updated(properties: PropertyValues) {
    console.log('update prop', properties);
    if (properties.has('theme') && properties.get('theme') !== this.theme) {
      this.dispose();
      this.renderNewEchart(); // re-created chart
    }
    if (properties.has('option') && !isEqual(properties.get('option'), this.option)) {
      this.updateEChartsOption();
    }
    if (properties.has('showLoading') && properties.get('showLoading') !== this.showLoading) {
      this.updateEChartsOption();
    }
    if (properties.has('onEvents') && !isEqual(properties.get('onEvents'), this.onEvents)) {
      this.dispose();
      this.renderNewEchart(); // re-created chart
    }
  }

  disconnectedCallback() {
    this.dispose();
  }

  render() {
    return html`<div part="base" class="chart"></div>`;
  }

  public getEchartsInstance(): echarts.ECharts {
    return echarts.getInstanceByDom(this.base) || echarts.init(this.base, this.theme, this.opts);
  }

  private renderNewEchart() {
    // 1. new echarts instance
    const echartsInstance = this.updateEChartsOption();

    // 2. bind events
    this.bindEvents(echartsInstance, this.onEvents || {});

    // 3. on chart ready callback
    if (typeof this.onChartReady === 'function') {
      console.log('chart ready function');
      this.onChartReady(echartsInstance);
    }

    // 3. emit chart ready event
    let event = new CustomEvent('chart-ready', {
      detail: {
        chart: echartsInstance
      } as ChartReadyPayload
    });
    this.dispatchEvent(event);

    // 4. on resize
    if (this.base) {
      bind(this.base, () => {
        try {
          echartsInstance.resize();
        } catch (e) {
          console.warn(e);
        }
      });
    }
  }

  private updateEChartsOption(): echarts.ECharts {
    // 1. get or initial the echarts object
    const echartInstance = this.getEchartsInstance();
    // 2. set the echarts option
    echartInstance.setOption(this.option, {
      notMerge: this.notMerge,
      replaceMerge: this.replaceMerge
    } as echarts.EChartsOptionConfig);
    // 3. set loading mask
    if (this.showLoading) echartInstance.showLoading('default', this.loadingOption);
    else echartInstance.hideLoading();
    return echartInstance;
  }

  private bindEvents(instance: echarts.ECharts, events: Record<string, Function>): void {
    if (instance && events && Object.keys(events).length) {
      Object.keys(events).forEach(eventName => {
        instance.off(eventName);
        instance.on(`${eventName}`, events[eventName]);
      });
    }
  }
  /**
   * dispose echarts and clear size-sensor
   */
  private dispose() {
    if (this.base) {
      try {
        clear(this.base);
      } catch (e) {
        console.warn(e);
      }
      // dispose echarts instance
      echarts.dispose(this.base);
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-echarts': LitECharts;
  }
}
