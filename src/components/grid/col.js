import {getCssSize} from "../../utils";

export default {
    props: {
        span: [Number, String],
        spanXs: [Number, String],
        spanSm: [Number, String],
        spanLg: [Number, String],
    },
    inject: {
        gutter: {default: 0}
    },
    render(h) {
        const style = {};
        if (this.gutter) {
            style.paddingLeft = getCssSize(this.gutter);
        }
        return h('div', {
            style,
            'class': {
                'u-col': true,
                ['u-col--span-' + this.span]: !!this.span,
                ['u-col--span-xs-' + this.spanXs]: !!this.spanXs,
                ['u-col--span-sm-' + this.spanSm]: !!this.spanSm,
                ['u-col--span-lg-' + this.spanLg]: !!this.spanLg,
            }
        }, this.$slots.default);
    }
}