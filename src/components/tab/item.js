let id = 0;

export default {
    props: {
        title: [Number, String],
    },
    inject: {
        tab: { default: null },
    },
    created() {
        this.instanceId = ++id;
        if (this.tab) {
            const find = this.tab.items.findIndex(o => o === this);
            find < 0 && this.tab.items.push(this);

        }
    },
    beforeDestroy() {
        const find = this.tab.items.findIndex(o => o === this);
        find >= 0 && this.tab.items.splice(find, 1);
    },
    render(h) {
        return null;
    }
}