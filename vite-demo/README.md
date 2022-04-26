### 项目结构
vue3 + ts + vite

### 实现功能
实现插件：vue3-highcharts

### 实现细节
#### 1. directive/index.ts
对vue3-highcharts进行全局注册

```js
import { App, Plugin } from "vue";
import vueHighcharts from "./vue3-highcharts";

const install = (app: App) => {
  app.component(vueHighcharts.name, vueHighcharts);
};

vueHighcharts.install = install;
export default vueHighcharts as unknown as Plugin;
```

#### 2. directive/vue3-highcharts.ts

props：

```js
props: {
  // 类型
  type: {
    type: String as PropType<keyof typeof Highcharts>,
    default: "chart",
  },
  // 图表数据
  options: {
    type: Object as PropType<Options>,
    required: true,
  },
  // 图表更新时是否重绘
  redrawOnUpdate: {
    type: Boolean,
    default: true,
  },
  // 图表更新时是否重置
  oneToOneUpdate: {
    type: Boolean,
    default: true,
  },
  // 图表更新时是否有动画
  animateOnUpdate: {
    type: Boolean,
    default: true,
  },
},
```

rendered

```js
// 图表初始化
onMounted(() => {
  chart.value = Highcharts[props.type](
    chartRef.value,
    options.value,
    () => {
      emit("rendered");
    }
  );
});
```

updated

```js
// 监听图表更新操作
watch(
  options,
  (newValue) => {
    if (chart.value !== null) {
      (chart as unknown as Ref<Chart>).value.update(
        newValue,
        props.redrawOnUpdate,
        props.oneToOneUpdate,
        props.animateOnUpdate
      );
      emit("updated");
    }
  },
  {
    deep: true,
  }
);
```

destroyed

```js
// 图表销毁
onUnmounted(() => {
  if (chart.value !== null) {
    chart.value.destroy();
    emit("destroyed");
  }
});
```

#### 3. main.js
引入vue3-highcharts

```js
app.use(VueHighcharts)
```

