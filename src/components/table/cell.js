function getContent(h, val) {
    return h('div', {
        'class': 'u-table__cell',
    }, val);
}

function renderHead(h) {
    const customContent = this.column.$scopedSlots.header ? this.column.$scopedSlots.header() : null;
    return h('th', {
        attrs: {
            width: this.fixed ? false : this.column.width,
            'data-fixed': this.column.fixed,
        },

    }, [
        getContent(h, customContent || this.column.title)
    ]);
}

function renderContent(h) {
    const customContent = this.column.$scopedSlots.default ? this.column.$scopedSlots.default() : null;
    return h('td', {}, [
        getContent(h, customContent || this.data[this.column.field])
    ]);
}

export default {
    props: {
        type: String,
        column: Object,
        data: Object,
        fixed: String,
    },
    render(h) {
        if (this.type === 'th') {
            return renderHead.call(this, h);
        }

        return renderContent.call(this, h);
    },
}