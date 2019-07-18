export default {
    render(h) {
        return h('div', {
            'class': {
                'u-btn-group': true,
                ['u-btn-group--' + this.align]: true,
            }
        }, this.$slots.default);
    },

    props: {
        align: {
            type: String,
            default: 'row',
            validator(val) {
                return ['column', 'row'].includes(val);
            }
        }
    }
}