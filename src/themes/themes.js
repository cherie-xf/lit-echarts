import themesConst from './const';

const themeNames = ['light', 'dark', 'contrast'];
const getValidTheme = theme => {
  if (!themeNames.includes(theme)) {
    theme = 'light';
  }
  return theme;
};
// theme names are 'chart-light', 'chart-dark', 'chart-contrast'
const getColorPalette = (themeName = 'light') => {
  const themeColors = themesConst[themeName];
  const getColor = color => themeColors[color];
  if (!themeColors) return undefined;
  if (themeName === 'contrast') {
    return Object.keys(themeColors)
      .filter(str => str.startsWith('misc-2-'))
      .map(getColor);
  }
  if (themeName === 'dark') {
    return Object.keys(themeColors)
      .filter(str => str.startsWith('misc-2-'))
      .map(getColor);
  }
  return Object.keys(themeColors)
    .filter(str => str.startsWith('misc-1-'))
    .map(getColor);
};
function getThemeConfig(themeName) {
  const themeColors = themesConst[themeName];
  if (!themeColors) {
    console.warn('no such theme:', themeName, 'in chart themes');
    return undefined;
  }
  const getColor = color => themeColors[color];
  const ColorPalette = getColorPalette(themeName);
  const BgColor = getColor('background-color');
  const OnBgColor = getColor('on-background-color');
  const OnBgColorLt = getColor('on-background-color-lt');
  const AxisColor = getColor('axis-color');
  const treemapLabelColor = getColor('grid-background-color');
  const hexToRgb = hex => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };
  const BgColorToRgb = hexToRgb(BgColor);
  const TooltipBgColor = `rgba(${BgColorToRgb.r}, ${BgColorToRgb.g}, ${BgColorToRgb.b}, 0.8)`;
  const AxisCommon = {
    axisLine: {
      lineStyle: {
        color: AxisColor
      }
    },
    axisTick: {
      lineStyle: {
        color: AxisColor
      }
    },
    axisLabel: {
      textStyle: {
        color: AxisColor
      }
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: AxisColor
      }
    },
    splitArea: {
      areaStyle: {
        color: AxisColor
      }
    }
  };

  return {
    color: ColorPalette,
    timeAxis: AxisCommon,
    logAxis: AxisCommon,
    valueAxis: AxisCommon,
    categoryAxis: AxisCommon,
    visualMap: {
      textStyle: {
        color: OnBgColor
      }
    },
    backgroundColor: BgColor,
    title: {
      textStyle: {
        color: OnBgColor
      },
      subtextStyle: {
        color: OnBgColorLt
      }
    },
    line: {
      symbolSize: 0
    },
    radar: {
      axisLabel: {
        lineStyle: {
          color: AxisColor
        }
      }
    },
    bar: {},
    pie: {},
    scatter: {},
    boxplot: {},
    parallel: {},
    treemap: {
      itemStyle: {
        // borderColor: 'white',
        borderColor: treemapLabelColor,
        gapWidth: 2
      },
      label: {
        color: treemapLabelColor
      }
    },
    sankey: {
      lineStyle: {
        color: OnBgColorLt
      },
      label: {
        color: OnBgColor
      }
    },
    funnel: {
      itemStyle: {
        borderColor: OnBgColor
      }
    },
    gauge: {
      itemStyle: {
        borderColor: AxisColor
      },
      axisLabel: {
        color: AxisColor
      },
      detail: {
        color: OnBgColor
      },
      axisTick: {
        lineStyle: {
          color: AxisColor
        }
      },
      splitLine: {
        lineStyle: {
          color: AxisColor
        }
      }
    },
    candlestick: {
      itemStyle: {
        color: OnBgColor,
        color0: OnBgColorLt
      }
    },
    graph: {
      itemStyle: {
        borderWidth: 0,
        borderColor: OnBgColor
      }
    },
    map: {
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#444',
        borderWidth: 0.5,
        emphasis: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444',
          borderWidth: 1
        }
      },
      label: {
        textStyle: {
          color: OnBgColor
        },
        emphasis: {
          textStyle: {
            color: OnBgColor
          }
        }
      }
    },
    geo: {
      itemStyle: {
        areaColor: '#eee',
        borderColor: '#444',
        borderWidth: 0.5,
        emphasis: {
          areaColor: 'rgba(255,215,0,0.8)',
          borderColor: '#444',
          borderWidth: 1
        }
      },
      label: {
        textStyle: {
          color: OnBgColor
        },
        emphasis: {
          textStyle: {
            color: OnBgColor
          }
        }
      }
    },
    legend: {
      textStyle: {
        color: OnBgColor
      },
      selectorLabel: {
        color: OnBgColor
      },
      pageIconColor: OnBgColor,
      pageIconInactiveColor: OnBgColorLt,
      pageTextStyle: {
        color: OnBgColor
      }
    },
    tooltip: {
      backgroundColor: TooltipBgColor,
      borderColor: OnBgColorLt,
      textStyle: {
        color: OnBgColor
      },
      axisPointer: {
        lineStyle: {
          color: OnBgColor
        },
        crossStyle: {
          color: OnBgColor
        }
      }
    },
    timeline: {
      lineStyle: {
        color: OnBgColorLt
      },
      label: {
        color: OnBgColorLt,
        borderColor: OnBgColorLt
      },
      itemStyle: {
        color: OnBgColorLt
      },
      progress: {
        lineStyle: {
          color: OnBgColor
        },
        label: {
          color: OnBgColor,
          borderColor: OnBgColor
        },
        itemStyle: {
          color: OnBgColor
        }
      },
      controlStyle: {
        color: OnBgColorLt,
        borderColor: OnBgColorLt,
        emphasis: {
          color: OnBgColor,
          borderColor: OnBgColor
        }
      },
      checkpointStyle: {
        color: OnBgColorLt,
        borderColor: OnBgColorLt
      },
      emphasis: {
        label: {
          color: OnBgColor,
          borderColor: OnBgColor
        },
        itemStyle: {
          color: OnBgColor
        },
        controlStyle: {
          color: OnBgColor,
          borderColor: OnBgColor
        },
        checkpointStyle: {
          color: OnBgColor,
          borderColor: OnBgColor
        }
      }
    },
    dataZoom: {
      backgroundColor: 'rgba(47,69,84,0)',
      dataBackgroundColor: 'rgba(255,255,255,0.3)',
      fillerColor: 'rgba(167,183,204,0.4)',
      handleColor: '#a7b7cc',
      handleSize: '100%',
      textStyle: {
        color: OnBgColor
      }
    },
    markPoint: {
      label: {
        color: OnBgColor
      },
      emphasis: {
        label: {
          color: OnBgColor
        }
      }
    }
  };
}

export function initTheme(echarts) {
  themeNames.map(name => {
    const themeCofig = getThemeConfig(name);
    if (themeCofig) {
      echarts.registerTheme(name, themeCofig);
    }
  });
  return echarts;
}
export function getColorsByNumber(number = 0, themeName = 'light') {
  let theme = getValidTheme(themeName);
  let colors = getColorPalette(theme);
  const getColorByNum = num => {
    if (colors?.length && num > colors.length) {
      colors = [...colors, ...colors];
      return getColorByNum(num);
    }
    return colors;
  };
  return getColorByNum(number);
}

export function getLoadingOpt(themeName = 'light') {
  let theme = getValidTheme(themeName);
  const themeColors = themesConst[theme];
  const getColor = color => themeColors[color];
  const BgColor = getColor('background-color');
  const OnBgColor = getColor('on-background-color');
  return {
    text: '',
    textColor: OnBgColor,
    maskColor: BgColor
  };
}
