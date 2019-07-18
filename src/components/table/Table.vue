<template>
    <div class="u-table" :class="classList" :style="style">
        <table>
            <thead v-if="wrapper.showHeader">
            <tr>
                <TableCell v-for="col in columns"
                           :key="col._uid"
                           :fixed="fixed"
                           type="th"
                           :column="col"></TableCell>
            </tr>
            </thead>

            <tbody v-if="!isTop">
            <tr v-for="data in wrapper.data">
                <TableCell v-for="col in columns"
                           :key="col._uid"
                           :fixed="fixed"
                           type="td"
                           :column="col"
                           :data="data"></TableCell>
            </tr>
            </tbody>

        </table>
    </div>
</template>

<script>
    import TableCell from './cell';
    import {getScrollBarSize} from "../../utils";
    /**
     * 完整的表格分为6个部分
     * 1.主表
     * 2.左侧固定列
     * 3.右侧固定列
     * 4.头部固定行
     * 5.左上角固定单元格
     * 6.右上角固定单元格
     * 表格宽度同步流程：
     * 1.计算主表中每个th的宽度
     * 2.其它副表动态设置自身th宽度
     * 3.设置副表wrapper为合适的高度/宽度
     * 4.滚动时，同步主表滚动位置到副表
     */
    // 计算主表格尺寸
    function computeSize() {
        const {$el} = this;
        const table = $el.querySelector('table');
        const hs = $el.querySelectorAll('thead th');
        const sizes = [];
        for (let i = 0; i < hs.length; i++) {
            sizes.push({
                width: hs[i].offsetWidth,
                height: hs[i].offsetHeight,
                fixed: hs[i].dataset.fixed,
            });
        }
        const hasHScroll = $el.offsetHeight > $el.clientHeight;
        const hasVScroll = $el.offsetWidth > $el.clientWidth;
        this.wrapper.__resize__({
            colSize: sizes,
            wrapperSize: table.clientWidth,
            hasHScroll,
            hasVScroll
        });
    }
    // 计算固定表格尺寸
    function computeFixedSize(data) {
        const {$el} = this;
        const table = $el.querySelector('table');
        const hs = $el.querySelectorAll('thead th');
        const {colSize, wrapperSize} = data;
        for (let i = 0; i < colSize.length; i++) {
            hs[i] && hs[i].setAttribute('width', colSize[i].width);
        }
        table.style.width = wrapperSize + 'px';
        if (this.isLeft) {
            const leftSize = colSize.filter(o => o.fixed === 'left').reduce((a, b) => a + b.width, 0);
            $el.style.width = leftSize + 'px';
            if (data.hasHScroll) {
                $el.style.bottom = getScrollBarSize() + 'px';
            }
        }
        if (this.isTop) {
            this.$el.style.height = colSize[0].height + 'px';
            if (data.hasVScroll) {
                $el.style.right = getScrollBarSize() + 'px';
            }
        }
    }
    // 更新滚动位置
    function updatePosition(data) {
        if (this.isLeft && this.isTop) {
            return;
        }
        const {scrollLeft, scrollTop} = data;
        if (this.isTop) {
            this.$el.scrollLeft = scrollLeft;
        }
        if (this.isLeft) {
            this.$el.scrollTop = scrollTop;
        }
    }
    export default {
        name: "Table",
        inject: ['wrapper'],
        components: {TableCell},
        props: {
            fixed: String,
        },
        computed: {
            columns() {
                if (this.isLeft) {
                    return this.wrapper.leftColumns;
                }
                return this.wrapper.sortedColumns;

            },
            classList() {
                return {
                    'u-table--hover': this.wrapper.hover,
                    'u-table--dashed': this.wrapper.dashed,
                    'u-table--bordered': this.wrapper.bordered,
                    ['u-table--fixed-' + this.fixed]: !!this.fixed,
                }
            },
            style() {
                if (this.fixed) {
                    return {};
                }
                const obj = {};
                if (this.wrapper.maxHeight) {
                    obj.maxHeight = this.wrapper.maxHeight + 'px';
                    obj.overflow = 'auto';
                }
                return obj;
            },
            isTop() {
                if (!this.fixed) return false;
                return /top/.test(this.fixed);
            },
            isLeft() {
                if (!this.fixed) return false;
                return /left/.test(this.fixed);
            },
        },
        mounted() {
            if (!this.fixed) {
                this.$el.addEventListener('scroll', evt => {
                    const {scrollLeft, scrollTop} = evt.target;
                    this.wrapper.__scroll__({
                        scrollLeft, scrollTop
                    });
                });
                setTimeout(() => {
                    computeSize.call(this);
                }, 0);
            }
        },
        methods: {
            resize(data) {
                computeFixedSize.call(this, data);
            },
            scroll(data) {
                updatePosition.call(this, data);
            }
        }
    }
</script>
