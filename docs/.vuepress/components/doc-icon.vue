<template>
  <div class="wrap">
    <div class="icon-cell" v-for="ic in list" @click="copy(ic)">
      <u-icon :type="ic" />
      <div>{{ic}}</div>
    </div>
    <input type="text" v-model="type" ref="inp" style="position:fixed;left:999999px" />
  </div>
</template>

<script>
const arr = [
  "plus-square",
  "plus",
  "pocket",
  "power",
  "printer",
  "radio",
  "refresh-ccw",
  "refresh-cw",
  "repeat",
  "rewind",
  "rotate-ccw",
  "rotate-cw",
  "rss",
  "save",
  "scissors",
  "search",
  "send",
  "server",
  "settings",
  "share-2",
  "share",
  "shield-off",
  "shield",
  "shopping-bag",
  "shopping-cart",
  "shuffle",
  "sidebar",
  "skip-back",
  "skip-forward",
  "slack",
  "slash",
  "sliders",
  "smartphone",
  "smile",
  "speaker",
  "square",
  "star",
  "stop-circle",
  "sun",
  "sunrise",
  "sunset",
  "tablet",
  "tag",
  "target",
  "terminal",
  "thermometer",
  "thumbs-down",
  "thumbs-up",
  "toggle-left",
  "toggle-right",
  "trash-2",
  "trash",
  "trello",
  "trending-down",
  "trending-up",
  "triangle",
  "truck",
  "tv",
  "twitter",
  "type",
  "umbrella",
  "underline",
  "unlock",
  "upload-cloud",
  "upload",
  "user-check",
  "user-minus",
  "user-plus",
  "user-x",
  "user",
  "users",
  "video-off",
  "video",
  "voicemail",
  "volume-1",
  "volume-2",
  "volume-x",
  "volume",
  "watch",
  "wifi-off",
  "wifi",
  "wind",
  "x-circle",
  "x-octagon",
  "x-square",
  "x",
  "youtube",
  "zap-off",
  "zap",
  "zoom-in",
  "zoom-out"
];
export default {
  data() {
    return {
      list: arr,
      type: ""
    };
  },
  methods: {
    copy(val) {
      this.type = `<u-icon type='${val}'/>`;
      this.$refs.inp.focus();
      this.$nextTick(() => {
        document.execCommand("selectAll");
        document.execCommand("copy");
        this.$Message.success("图标已复制");
      });
    }
  }
};
</script>
<style lang="scss">

.icon-cell {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  background: #fff;
  transition: transform 0.2s;
  white-space: nowrap;
  padding: 10px;
  box-sizing: border-box;
  width: calc(100% / 6);
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 7px -6px rgba(0, 0, 0, 0.3);
  }
}
</style>