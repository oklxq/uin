<template>
    <div class="u-table-group">
        <div class="u-table-wrapper">
            <slot></slot>
            <span v-if="bordered" class="u-table-sim-border" top></span>
            <span v-if="bordered" class="u-table-sim-border" left></span>
            <span v-if="bordered" class="u-table-sim-border" right></span>
            <RawTable></RawTable>
            <RawTable ref="top" fixed="top" v-if="showHeader && maxHeight"></RawTable>
            <RawTable ref="left" fixed="left" v-if="leftColumns.length"></RawTable>
            <RawTable ref="topLeft" fixed="top-left" v-if="showHeader && leftColumns.length && maxHeight"></RawTable>
        </div>
        <div class="u-table__footer">
            <Pagination :total-page="100"></Pagination>
        </div>
    </div>
</template>

<script>
    import RawTable from './Table';
    import Pagination from './Pagination';
    export default {
        name: "Wrapper",
        components: {RawTable, Pagination},
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

        methods: {
            __resize__(data) {
                const {top, left, topLeft} = this.$refs;
                [top,left,topLeft].forEach(o=>{
                   o && o.resize(data);
                });
            },
            __scroll__(data){
                const {top, left, topLeft} = this.$refs;
                [top,left,topLeft].forEach(o=>{
                    o && o.scroll(data);
                });
            }

        }
    }
</script>
