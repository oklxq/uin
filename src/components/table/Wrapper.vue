<template>
    <div class="u-table-wrapper">
        <slot></slot>
        <span v-if="bordered" class="u-table-sim-border" top></span>
        <span v-if="bordered" class="u-table-sim-border" left></span>
        <span v-if="bordered" class="u-table-sim-border" right></span>
        <RawTable></RawTable>
        <RawTable fixed="top" v-if="maxHeight"></RawTable>
        <RawTable fixed="left" v-if="leftColumns.length"></RawTable>
        <RawTable fixed="top-left" v-if="leftColumns.length && maxHeight"></RawTable>
    </div>
</template>

<script>
    import RawTable from './Table';

    export default {
        name: "Wrapper",
        components: {RawTable},
        provide() {
            return {
                wrapper: this,
            }
        },
        props: {
            data: {
                type: Array,
                default: () => [],
            },
            bordered: Boolean,
            dashed: Boolean,
            hover: Boolean,
            showHeader: {
                type: Boolean,
                default: true,
            },
            maxHeight: Number,
        },
        data() {
            return {
                columns: [],
            }
        },
        computed: {
            sortedColumns() {
                const arr = [...this.columns];
                return arr.sort((a) => {
                    if (a.fixed === 'left') return -1;
                    if (a.fixed === 'right') return 1;
                    return 0;
                });
            },
            leftColumns() {
                return this.columns.filter(o => o.fixed === 'left');
            }
        },
        created() {
            const handleResize = () => {
                this.$emit('update');
            };
            window.addEventListener('resize', handleResize);
            this.$on('hook:beforeDestroy', handleResize);
        },
    }
</script>
