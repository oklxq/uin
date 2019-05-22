<template>
    <div class="u-table" :class="classList" :style="style">
        <table>
            <thead v-if="wrapper.showHeader">
            <tr>
                <TableCell v-for="col in wrapper.sortedColumns"
                           :key="col._uid"
                           :fixed="fixed"
                           type="th"
                           :column="col"></TableCell>
            </tr>
            </thead>

            <tbody v-if="!isTop">
            <tr v-for="data in wrapper.data">
                <TableCell v-for="col in wrapper.sortedColumns"
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

    const EVENT_UPDATE_SIZE = 'update-size';
    const EVENT_SCROLL = 'scroll';


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
        const hasHScroll = $el.scrollHeight > $el.clientHeight;
        const hasVScroll = $el.scrollWidth > $el.clientWidth;
        this.wrapper.$emit(EVENT_UPDATE_SIZE, {
            colSize: sizes,
            wrapperSize: table.scrollWidth,
            hasVScroll,
            hasHScroll,
        });
    }

    // 计算固定表格尺寸
    function computeFixedSize(data) {
        const {$el} = this;
        const table = $el.querySelector('table');
        const old = $el.querySelector('colgroup');
        old && old.remove();
        const {colSize, wrapperSize} = data;
        const group = document.createElement('colgroup');
        const arr = [];
        for (let i = 0; i < colSize.length; i++) {
            arr.push(`<col width="${colSize[i].width}"/>`)
        }
        group.innerHTML = arr.join('');
        table.appendChild(group);
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

    function init() {
        this.$el.addEventListener('scroll', evt => {
            const {scrollLeft, scrollTop} = evt.target;
            this.wrapper.$emit(EVENT_SCROLL, {
                scrollLeft,
                scrollTop,
            });
        });
        this.wrapper.$on('update', () => {
            computeSize.call(this);
        });
    }

    function initFixed() {
        this.wrapper.$on(EVENT_SCROLL, updatePosition.bind(this));
        this.wrapper.$on(EVENT_UPDATE_SIZE, data => {
            computeFixedSize.call(this, data);
        });
    }

    export default {
        name: "Table",
        inject: ['wrapper'],
        components: {TableCell},
        props: {
            fixed: String,
        },
        computed: {
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
            this.fixed ? initFixed.call(this) : init.call(this);
            setTimeout(() => {
                if (!this.fixed) {
                    computeSize.call(this);
                } else {
                }
            }, 0);
        },
        methods: {}
    }
</script>
