export default {
    render(h) {
        return h('form', {
            'class': {
                'u-form': true,
                'u-form--horizontal': this.layout === 'horizontal',
            }
        }, this.$slots.default);
    },
    props: {
        layout: {
            type: String,
            default: 'vertical',
            validator(val) {
                return ['horizontal', 'vertical'].indexOf(val) >= 0;
            }
        }
    },
    provide() {
        return {
            form: this,
        }
    },
    methods: {
        validate() {

        }
    }
}

export const layout = {
    props: {
        layout: Object,
    }
};
