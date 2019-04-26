import './style/index.scss'

export const Flex = {
    props: {
        verticalAlign: String,
    },
    render(h) {
        return h('div', {
            style:{
                'align-items':'center'
            },
            'class': 'n-flex',
        }, this.$slots.default);
    }
};

export const FlexItem = {
        props: {
            width: {
                type: String,
            }
        },
        render(h) {
            const style = {};
            if (this.width) {
                style.flexGrow = 0;
                style.width = this.width;
            }
            return h('div', {
                'class': 'n-flex__item',
                style,
            }, this.$slots.default);
        }
    }
;