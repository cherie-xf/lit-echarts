# lit-echarts

The simplest and useful Web Component wrapper for [Apache Echarts](https://github.com/apache/echarts)
### Introduce

- Components are built with [LitElement](https://lit-element.polymer-project.org/)
- Code bunlder and dev server are provided by [Vite](https://vitejs.dev/guide/)
- DOM element size watcher is  [size-sensor](https://github.com/hustcc/size-sensor)
- Deep equal comparison provided by  [fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal/)

### DEMO
There is a demo web component, please run dev server to have a look
```bash
npm run dev
```
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
| `onChartReady`    | Function  |  Call back function after chart init with echarts instance as param|

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
