import {
  defineComponent,
  h,
  Ref,
  ref,
  PropType,
  toRefs,
  watch,
  onMounted,
  onUnmounted,
} from "vue";
import Highcharts, { Options, Chart } from "highcharts";
const VueHighcharts = defineComponent({
  name: "VueHighcharts",
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
  setup(props, { emit }) {
    const chartRef = ref(null); // 元素
    const chart: Ref<Chart | null> = ref(null); // 图表
    const { options } = toRefs(props); // props中的options转为ref
    if (options.value) {
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
      // 图表销毁
      onUnmounted(() => {
        if (chart.value !== null) {
          chart.value.destroy();
          emit("destroyed");
        }
      });
    } else {
      console.error("options is null");
    }
    return {
      chartRef,
      chart,
    };
  },
  render() {
    return h("div", {
      class: "vue-highcharts",
      ref: "chartRef",
    });
  },
});

export default VueHighcharts;
