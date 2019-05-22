import {getCssSize} from "../../utils";

export default {
    props: {
        gutter: [Number, String]
    },
    provide() {
        return {
            gutter: this.gutter,
        }
    },
    render(h) {
        const style = {};
        if (this.gutter) {
            style.marginLeft = '-' + getCssSize(this.gutter);
        }
        return h('div', {
            style,
            'class': 'u-row'
        }, this.$slots.default);
    }
}