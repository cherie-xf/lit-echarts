# lit-echarts

The simplest and useful Web Component wrapper for [Apache Echarts](https://github.com/apache/echarts)
### Introduce

- Components are built with [LitElement](https://lit-element.polymer-project.org/)
- Code bunlder and dev server are provided by [Vite](https://vitejs.dev/guide/)
- DOM element size watcher is  [size-sensor](https://github.com/hustcc/size-sensor)
- Deep equal comparison provided by  [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal/)

### Install

Once you've cloned the repo, run the following command.

```bash
npm install
```
### Start Dev Server

To spin up the dev server

```bash
npm run dev
```
### Building

To generate a production build, run the following command.

```bash
npm run build
```

## Properties

| Property          | Type      | Description                                                        |
| ----------------- | ----------|------------------------------------------------------------------- |
| `theme`           | String    | Theme to be applied                                                |
| `option`          | Object    | Configuration item and data. Please refer to [configuration item manual](https://echarts.apache.org/en/option.html#title) for more information|
| `replaceMerge`    | String or String[] | users can specify "component main types" here, which are the properties under the `root` of the option tree.(e.g., xAxis, series). The specified types of component will be merged in the mode "replaceMerge". If users intending to remove some part of components, replaceMerge can be used.|
| `noMerge`         | Boolean   | states whether not to merge with previous option; false by default, means merge.If true, all of the current components will be removed and new components will be created according to the new option|
| `showLoading`     | Boolean   | Shows loading animation, If set false after previous true value, will hide current loading animation |
| `loadingOption`   | Object    | configuration item of loading animation |
| `opts`            | Object    | Initialize chart Instance chart configurationsLines in loaded buffers. Please refer to [configuration details](https://echarts.apache.org/en/api.html#echarts.init)|
| `onEvents`        | Object    |  Binding events {eventName: handleFuntion}|

## Resize
Chart watch dom size changing by bind with [size-sensor](https://github.com/hustcc/size-sensor) to resize itself
No need to handle resize outside of component

## Examples

### Simple Examples
Draw a simple chart by just given option
```html preview
<lit-echarts id="my-chart"></lit-echarts>
<script>
  // specify chart configuration item and data
  const option = {
      title: {
          text: 'ECharts entry example'
      },
      tooltip: {},
      legend: {
          data:['Sales']
      },
      xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };
  const dom = document.querySelector('#my-chart');
  dom.option = option;
</script>
<style>
  #my-chart{
    width: 800px;
    height: 400px;
  }
</style>
```
### Theme
Initialize with theme name
```html preview
<lit-echarts id="theme-chart" theme="dark"></lit-echarts>
<script>
  const option = {
    xAxis: {},
    yAxis: {},
    series: [{
        symbolSize: 20,
        data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.20],
            [11.5, 7.20],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68]
        ],
        type: 'scatter'
    }]
};
  const dom = document.querySelector('#theme-chart');
  dom.option = option;
</script>
<style>
  #theme-chart{
    width: 800px;
    height: 400px;
  }
</style>
```
### showLoading
Show loading animation
```html preview
<button id="toggle-button"> Toggle Loading</button>
<lit-echarts id="loading-chart" showLoading="true"></lit-echarts>
<script>
  const option = {
    xAxis: {},
    yAxis: {},
    series: [{
        symbolSize: 20,
        data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [9.05, 8.81],
            [11.0, 8.33],
            [10.0, 6.33],
            [9.15, 7.20],
            [12.2, 7.83],
            [2.02, 4.47],
            [4.05, 4.96],
            [12.0, 6.26],
            [12.0, 8.84],
            [5.02, 5.68]
        ],
        type: 'scatter'
    }]
};
  const dom = document.querySelector('#loading-chart');
  const btnDom = document.querySelector('#toggle-button');
  dom.option = option;
  dom.loadingOption = {
    text: 'my chart is loading...',
    color: '#c23531',
    textColor: '#333',
    maskColor: 'rgba(255, 255, 255, 0.8)',
    // Font size. Available since `v4.8.0`.
    fontSize: 16,
    // Show an animated "spinner" or not. Available since `v4.8.0`.
    showSpinner: true,
    // Radius of the "spinner". Available since `v4.8.0`.
    spinnerRadius: 10,
  }
  btnDom.addEventListener('click', (e) => {console.log(e)
    dom.showLoading = !dom.showLoading
  });

</script>
<style>
  #loading-chart{
    width: 800px;
    height: 400px;
  }
</style>
```
### Option Merge
post re-set option like wating for data is ready, option will merge with old option if noMerge is false.
also can replaceMerge part of root properties in option
```html preview
<button id="data-button"> Set Data</button>
<button id="bar-type-button"> Set Bar Type</button>
<button id="line-type-button"> Set Line Type</button>
<button id="mix-type-button"> Set Mix Type</button>
<button id="toggle-decal-button"> Toggle Decal Pattern</button>
<lit-echarts id="merge-chart"></lit-echarts>
<script>
  const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        // data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
    }]
  };
  const dom = document.querySelector('#merge-chart');
  const dataBtnDom = document.querySelector('#data-button');
  const lineBtnDom = document.querySelector('#line-type-button');
  const barBtnDom = document.querySelector('#bar-type-button');
  const mixBtnDom = document.querySelector('#mix-type-button');
  const decalBtnDom = document.querySelector('#toggle-decal-button');
  let showDecal = false;
  const getData = ()=> [...Array(7)].map(_=>Math.ceil(Math.random()*100));
  dom.option = option;
  dataBtnDom.addEventListener('click', (e) => {
    const data = getData();
    if(dom.replaceMerge === 'series'){
      dom.option = {
          series: [
          {data: data, type: 'line', smooth: true},
        ]
      }
    } else {
      // when data is ready, only specify the data, will merge with old series configs
      dom.option = {
          series: [
          {data: data},
        ]
      }
    }
  });
  lineBtnDom.addEventListener('click', (e) => {
    const data1 = getData();
    const data2 = getData();
    dom.replaceMerge = 'series'
    dom.option = {
        series: [
        {name: 'line1', type: 'line', data: data1, smooth: true},
        {name: 'line2', type: 'line', data: data2, smooth: true},
       ]
    }
  });
  barBtnDom.addEventListener('click', (e) => {
    const data1 = getData();
    const data2 = getData();
    dom.replaceMerge = 'series'
    dom.option = {
        series: [
        {name: 'bar1', type: 'bar', data: data1},
        {name: 'bar2', type: 'bar', data: data2},
       ]
    }
  });
  mixBtnDom.addEventListener('click', (e) => {
    const data1 = getData();
    const data2 = getData();
    const data3 = getData();
    dom.replaceMerge = 'series'
    dom.option = {
        series: [
        {name: 'bar1', type: 'bar', data: data1},
        {name: 'bar2', type: 'bar', data: data2},
        {name: 'line3', type: 'line', data: data3, smooth: true},
       ]
    }
  });
  decalBtnDom.addEventListener('click', (e) => {
    dom.replaceMerge = 'aria'
    dom.option = {
      aria:{
        enabled: showDecal,
        decal:{
            show: true
        }
      },
    }
    showDecal = !showDecal
  });

</script>
<style>
  #merge-chart{
    width: 800px;
    height: 400px;
  }
</style>
```
### Custom Event
Listen to chart-ready custom events
```html preview
<lit-echarts id="event-chart"></lit-echarts>
<script>
  // specify chart configuration item and data
  const dom = document.querySelector('#event-chart');
  const option = {
    dataset: {
      source: [
          ['score', 'amount', 'product'],
          [89.3, 58212, 'Matcha Latte'],
          [57.1, 78254, 'Milk Tea'],
          [74.4, 41032, 'Cheese Cocoa'],
          [50.1, 12755, 'Cheese Brownie'],
          [89.7, 20145, 'Matcha Cocoa'],
          [68.1, 79146, 'Tea'],
          [19.6, 91852, 'Orange Juice'],
          [10.6, 101852, 'Lemon Juice'],
          [32.7, 20112, 'Walnut Brownie']
      ]
    },
    grid: {containLabel: true},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        text: ['High Score', 'Low Score'],
        dimension: 0,
        inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
        }
    },
    series: [
        {
            type: 'bar',
            encode: {
                x: 'amount',
                y: 'product'
            }
        }
    ]
  };
  dom.onChartReady = function(chart) {
    console.log('chart-ready', chart)
    alert('chart is ready');
  }
  dom.option = option;
  dom.onEvents = events;
</script>
<style>
  #event-chart{
    width: 800px;
    height: 400px;
  }
</style>
```
### Bind Chart Events
Bind Chart Events with callback functions
```html preview
<lit-echarts id="on-event-chart"></lit-echarts>
<script>
  // specify chart configuration item and data
  const dom = document.querySelector('#on-event-chart');
  const option = {
      title: {
          text: 'ECharts entry example'
      },
      tooltip: {},
      legend: {
          data:['Sales']
      },
      xAxis: {
          data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
  };
  const events = {
    click: function(obj){
      console.log('chart click');
      const str = `click at ${obj.name}: ${obj.data}`
      alert(str);
    }
  }
  dom.onEvents = events;
  dom.option = option;
</script>
<style>
  #on-event-chart{
    width: 800px;
    height: 400px;
  }
</style>
```
## License

lit-echarts is designed in Vancouver by Cherie Fu. It’s available under the terms of the MIT license.
