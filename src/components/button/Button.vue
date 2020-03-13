<template>
  <button
    v-on="$listeners"
    :disabled="disabled||loading"
    class="u-btn"
    :class="classList"
    :type="htmlType"
  >
    <Spin v-if="loading" size="1em" color="inherit"></Spin>
    <span class="u-btn__content">
      <slot></slot>
    </span>
    <Icon v-if="!!icon" :type="icon"></Icon>
  </button>
</template>

<script>
import Icon from "../icon";
import Spin from "../spin";

export default {
  name: "Button",
  components: { Icon, Spin },
  props: {
    type: {
      type: String,
      default: "default",
      validator(val) {
        return (
          ["primary", "success", "warning", "error", "link", "default"].indexOf(
            val
          ) >= 0
        );
      }
    },
    icon: String,
    loading: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      validator(val) {
        return ["sm", "md", "lg"].includes(val);
      },
      default: "md"
    },
    htmlType: {
      type: String,
      default: "button"
    }
  },
  computed: {
    classList() {
      return {
        ["u-btn--" + this.type]: !!this.type,
        ["u-btn--" + this.size]: !!this.size
      };
    }
  }
};
</script>
