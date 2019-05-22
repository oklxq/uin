function check() {
    const {columns} = this.wrapper;
    const find = columns.findIndex(o => o === this);
    if (find >= 0) {
        columns.splice(index, 1);
    } else {
        columns.push(this);
    }
}

export default {
    render() {
        return null;
    },
    inject: ['wrapper'],
    props: {
        title: [String, Number],
        width: [String, Number],
        field: String,
        fixed: {
            type: String,
            validator(val) {
                return ['left', 'right'].indexOf(val) >= 0;
            }
        }

    },

    mounted() {
        check.call(this);
    },

    beforeDestroy() {
        check.call(this);
    }
}