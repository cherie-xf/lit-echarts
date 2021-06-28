import { ECharts as EChartsInstance } from 'echarts';
// export interface Opts {
//   devicePixelRatio?: number;
//   renderer?: 'canvas' | 'svg';
//   useDirtyRect?: boolean; // from 5.0.0
//   width?: number | string;
//   height?: number | string;
//   locale?: string;
// }
export interface ChartReadyPayload {
  chart: EChartsInstance;
}