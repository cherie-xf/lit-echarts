import { customElement, LitElement, css, html, property } from "lit-element";
import "./elements";

interface ChartOption extends echarts.EChartOption {
  notMerge?: boolean;
}
@customElement("lit-echarts-demo")
export default class LitEChartsDemo extends LitElement {
  static styles = css`
    :host {
      margin: 20px auto;
      display: block;
      width: 800px;
      height: 400px;
    }
    lit-echarts {
      height: 100%;
    }
    button {
      cursor: pointer;
    }
  `;
  @property({ type: Boolean, reflect: true }) showLoading = false;
  @property({ type: Boolean, reflect: true }) showNoData = false;
  @property({ type: Boolean, reflect: true }) showDecal = false;
  @property({ type: Boolean, reflect: true }) notMerge = false;
  @property({ type: String, reflect: true }) theme = "";
  @property({ reflect: true }) replaceMerge = "series";
  @property({ type: Object, reflect: true })
  option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line"
      }
    ]
  } as ChartOption;
  render() {
    const loadingOption = {
      text: "my chart is loading...",
      color: "#c23531",
      textColor: "#333",
      maskColor: "rgba(255, 255, 255, 1)",
      fontSize: 16,
      showSpinner: true,
      spinnerRadius: 10
    };
    const getData = () =>
      [...Array(7)].map(_ => Math.ceil(Math.random() * 100));
    const toggleShowLoading = () => {
      console.log("toggle showLoading");
      this.showLoading = !this.showLoading;
    };
    const setBarType = () => {
      const data1 = getData();
      const data2 = getData();
      this.replaceMerge = "series";
      this.option = {
        series: [
          { name: "bar1", type: "bar", data: data1 },
          { name: "bar2", type: "bar", data: data2 }
        ]
      };
    };
    const setLineType = () => {
      const data1 = getData();
      const data2 = getData();
      this.replaceMerge = "series";
      this.option = {
        series: [
          { name: "line1", type: "line", data: data1, smooth: true },
          { name: "line2", type: "line", data: data2, smooth: true }
        ]
      };
    };
    const setMixType = () => {
      const data1 = getData();
      const data2 = getData();
      const data3 = getData();
      this.replaceMerge = "series";
      this.option = {
        series: [
          { name: "bar1", type: "bar", data: data1 },
          { name: "bar2", type: "bar", data: data2 },
          { name: "line3", type: "line", data: data3, smooth: true }
        ]
      };
    };
    const setMonthAxis = () => {
      this.replaceMerge = "xAxis";
      this.option = {
        xAxis: {
          type: "category",
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Spe",
            "Oct",
            "Nov",
            "Dec"
          ]
        }
      };
    };
    const setDayAxis = () => {
      this.replaceMerge = "xAxis";
      this.option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
      };
    };
    const toggleShowNoData = () => {
      this.showNoData = !this.showNoData;
      if (!this.showNoData) {
        this.option = {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: "line"
            }
          ],
          notMerge: true,
        };
      }
    };
    return html`
      <button
        id="toggle-button"
        @click=${toggleShowLoading}
        title="toggle show loading animation"
      >
        Toggle Loading
      </button>
      <button
        id="show-noData-button"
        @click=${toggleShowNoData}
        title="show no Data"
      >
        Toggle No Data
      </button>
      <button id="bar-type-button" @click=${setBarType}>Set Bar Type</button>
      <button id="line-type-button" @click=${setLineType}>Set Line Type</button>
      <button id="mix-type-button" @click=${setMixType}>Set Mix Type</button>
      <button id="xasix-button" @click=${setMonthAxis}>
        Set Month xAxis Data
      </button>
      <button id="xasix-button" @click=${setDayAxis}>Set Day xAxis Data</button>
      <lit-echarts
        class="my-chart"
        .replaceMerge=${this.replaceMerge}
        .notMerge=${this.notMerge}
        .option=${this.option}
        .loadingOption=${loadingOption}
        .showLoading=${this.showLoading}
        .noData=${this.showNoData}
      ></lit-echarts>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "lit-echarts-demo": LitEChartsDemo;
  }
}
