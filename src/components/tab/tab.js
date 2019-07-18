function tabClick(target, index) {
    const item = this.items[index];
    if (this.current === item.instanceId) {
        return;
    }
    const {scroll, bar} = this.$refs;
    scroll.style.left = -index + '00%';
    if(bar){
        bar.style.left = target.offsetLeft + 'px';
        bar.style.width = target.clientWidth + 2 + 'px';

    }


    this.current = item.instanceId;
    this.$emit('input', item.title);
    this.$emit('change', this.title);
    this.$nextTick(() => {
        const content = this.$el.querySelector(`.u-tab__item--active .u-tab__content`);
        content.style.display = 'block';
        const h = content.clientHeight;
        content.style.display = null;
        scroll.style.height = h + 'px';
    });
}

export default {
    name: "Tab",
    provide() {
        return {
            tab: this,
        }
    },
    props: {
        value: [Number, String],
        card: Boolean,
    },
    data() {
        return {
            items: [],
            current: 0,
        }
    },
    render(h) {
        const bar = !this.card ? h('li', {
            'class': 'u-tab__header-bar',
            ref: 'bar'
        }) : '';
        const headers = h('ul', {
            'class': {
                'u-tab__header': true,
                'u-tab__header--card': this.card,
            },
        }, [...this.items.map((o, index) => {
            return h('li', {
                attrs: {
                    active: this.current === o.instanceId,
                },
                on: {
                    click: (evt) => {
                        tabClick.call(this, evt.currentTarget, index);
                    }
                }
            }, o.title);
        }), bar]);

        const scroll = h('div', {
            'class': 'u-tab__scroll',
            ref: 'scroll'
        }, this.items.map(o => {
            const content = h('div', {
                'class': 'u-tab__content',
            }, o.$slots.default);
            return h('div', {
                'class': {
                    'u-tab__item': true,
                    'u-tab__item--active': this.current === o.instanceId,
                },
            }, [content]);
        }));
        const body = h('div', {
            'class': 'u-tab__body',
            ref: 'body',
        }, [scroll]);

        return h('div', {
            'class': 'u-tab'
        }, [headers, body, ...this.$slots.default]);
    },
    mounted() {
        if (!this.items.length) {
            return;
        }
        this.$nextTick(() => {
            if (this.value) {
                const index = this.items.findIndex(o => o.title === this.value);
                if (index >= 0) {
                    tabClick.call(this, this.$el.querySelector(`li:nth-child(${index + 1})`), index);
                }
            } else {
                tabClick.call(this, this.$el.querySelector(`li:first-child`), 0);
            }
        })

    }
}