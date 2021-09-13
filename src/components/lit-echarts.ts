import {
  LitElement,
  html,
  css,
  customElement,
  query,
  property,
  PropertyValues
} from "lit-element";

import * as echarts from "echarts";
import { bind, clear } from "size-sensor";
import isEqual from "fast-deep-equal";
import { ChartReadyPayload } from "./chart.types";
import { EChartOption } from "echarts";
interface ChartOption extends EChartOption {
  notMerge?: boolean;
}

/**
 * lit-echarts.
 *
 */
@customElement("lit-echarts")
export default class LitECharts extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .chart {
      width: 100%;
      height: 100%;
    }
  `;
  @query("[part=\"base\"]") base: HTMLDivElement;
  /** Theme to be */
  @property({ type: String, reflect: true }) theme = "";
  /** Configuration item and data. Please refer to [configuration item manual](https://echarts.apache.org/en/option.html#title) for more information */
  @property({ type: Object }) option = {} as ChartOption;
  /** States whether not to merge with previous option; false by default, means merge.If true, all of the current components will be removed and new components will be created according to the new option */
  @property({ type: Boolean, reflect: true }) notMerge = false;
  /** replace part of option as given */
  @property({ reflect: true }) replaceMerge = undefined;
  /** Shows loading animation, If set false after previous true value, will hide current loading animation*/
  @property({ type: Boolean }) showLoading = false;
  /** Shows No Data and stop loading animation*/
  @property({ type: Boolean, reflect: true }) noData = false;
  /** configuration item of loading animation */
  @property({ type: Object, reflect: true })
  loadingOption = {} as echarts.EChartsLoadingOption;
  /** Initialize chart Instance chart configurationsLines in loaded buffers. Please refer to [configuration details](https://echarts.apache.org/en/api.html#echarts.init)*/
  @property({ type: Object, reflect: true }) opts = {};
  /** Binding events {eventName: handleFuntion} */
  @property({ type: Object, reflect: true }) onEvents = {};
  /** Call back function after chart init return with echarts instance, you can get echarts public api through this instance, like: "getOption"*/
  @property({ reflect: true }) onChartReady: (o: echarts.ECharts) => void;

  firstUpdated() {
    if (echarts) {
      this.renderNewEchart();
    }
  }

  updated(properties: PropertyValues) {
    if (
      properties.has("theme") &&
      properties.get("theme") !== this.theme &&
      this.theme
    ) {
      // this.loadingOption = theme.getLoadingOpt(this.theme);
      this.dispose();
      this.renderNewEchart(); // re-created chart
    }
    if (
      properties.has("option") &&
      !isEqual(properties.get("option"), this.option && !this.noData)
    ) {
      this.updateEChartsOption();
    }
    if (
      properties.has("showLoading") &&
      properties.get("showLoading") !== this.showLoading &&
      this.showLoading !== undefined
    ) {
      this.updateEChartsOption();
    }
    if (
      properties.has("onEvents") &&
      !isEqual(properties.get("onEvents"), this.onEvents)
    ) {
      this.dispose();
      this.renderNewEchart(); // re-created chart
    }
    if (properties.has("noData") && this.noData) {
      this.showNoData();
    }
    if (properties.has("onChartReady")) {
      this.onChartReady(this.getEchartsInstance());
    }
  }

  disconnectedCallback() {
    this.dispose();
  }

  render() {
    return html`<div part="base" class="chart"></div>`;
  }

  public getEchartsInstance(): echarts.ECharts {
    return (
      echarts.getInstanceByDom(this.base) ||
      echarts.init(this.base, this.theme, this.opts)
    );
  }

  private renderNewEchart() {
    // 1. new echarts instance
    const echartsInstance = this.updateEChartsOption();

    // 2. bind events
    this.bindEvents(echartsInstance, this.onEvents || {});

    // 3. on chart ready callback
    if (typeof this.onChartReady === "function") {
      this.onChartReady(echartsInstance);
    }

    // 3. emit chart ready event
    let event = new CustomEvent("chart-ready", {
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
      notMerge: this.notMerge || this.option.notMerge,
      replaceMerge: this.replaceMerge
    } as echarts.EChartsOptionConfig);
    // 3. set loading mask
    if (this.showLoading) {
      echartInstance.showLoading("default", this.loadingOption);
    } else {
      echartInstance.hideLoading();
      if (this.noData) {
        this.showNoData();
      }
    }
    return echartInstance;
  }

  private showNoData(): void {
    const echartsInstance = this.getEchartsInstance();
    if (echartsInstance) {
      echartsInstance.hideLoading();
      echartsInstance.setOption(
        {
          title: {
            subtext: "No Data",
            left: "center",
            top: "center",
            subtextStyle: {
              fontSize: 20
            }
          }
        },
        { notMerge: true }
      );
    }
  }

  private bindEvents(
    instance: echarts.ECharts,
    events: Record<string, Function>
  ): void {
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
    "lit-echarts": LitECharts;
  }
}
