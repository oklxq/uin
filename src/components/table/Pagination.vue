<template>
    <ul class="u-pagination">
        <li @click="prev">
            <Icon type="chevron-left"></Icon>
        </li>
        <li @click="goto(1)" :active="page===1">1</li>
        <li v-for="(p,index) in body" :key="p.page+'-'+index" @click="_handleClick(p)" :active="page===p.page">
            {{p.page}}
        </li>
        <li v-if="totalPage>1" @click="goto(totalPage)" :active="page===totalPage">{{totalPage}}</li>
        <li @click="next">
            <Icon type="chevron-right"></Icon>
        </li>
        <li class="u-pagination__jump">
            <label :for="'jump'+_uid">
                <span>跳转到</span>
                <input :id="'jump'+_uid" type="number" min="1" :max="totalPage" :value="page">
                <span>页</span>
            </label>

        </li>
    </ul>
</template>

<script>
    import Icon from '../icon';

    const DISPLAY_NUM = 4;
    const HALF_NUM = 2;

    function setPage(p, change) {
        if (p < 1) p = 1;
        if (p > this.totalPage) p = this.totalPage;
        if (p !== this.page) {
            this.page = p;
            change && this.$emit('on-change', this.page);
        }
    }

    export default {
        name: "Pagination",
        components: {Icon},
        props: {
            totalPage: {
                type: Number,
                default: 1,
            },
        },
        computed: {
            pages() {
                const {totalPage} = this;
                if (totalPage === 1) return [];
                const arr = [];
                for (let i = 2; i < totalPage; i++) {
                    arr.push({
                        page: i,
                    });
                }
                return arr;
            },
            body() {
                const len = this.pages.length;
                const pos = this.page - 1;
                let start = 0;
                let end = 0;
                if (pos <= HALF_NUM) {
                    end = DISPLAY_NUM;
                } else if (pos >= len - HALF_NUM) {
                    start = len - DISPLAY_NUM;
                    end = Number.MAX_VALUE;
                } else {
                    start = pos - HALF_NUM;
                    end = pos + HALF_NUM - 1;
                }
                if (start < 0) start = 0;
                const arr = this.pages.slice(start, end);
                if (arr.length) {
                    if (arr[0].page !== 2) {
                        arr.unshift({
                            page: '...',
                            prev: true,
                        });
                    }
                    if (arr[arr.length - 1].page !== this.totalPage - 1) {
                        arr.push({
                            page: '...',
                            next: true,
                        });
                    }
                }

                return arr;
            },
        },
        data() {
            return {
                page: 1,
            }
        },
        methods: {
            _handleClick(data) {
                let p = this.page;
                const {next, prev, page} = data;
                if (next) {
                    p += DISPLAY_NUM + 1;
                } else if (prev) {
                    p -= DISPLAY_NUM + 1;
                } else {
                    p = page;
                }
                this.goto(p);
            },
            /**
             * 跳转到指定页
             * @param page 页码
             * @param change 是否触发on-change事件
             */
            goto(page, change = true) {
                setPage.call(this, page, change);
            },
            next() {
                this.goto(this.page + 1);
            },
            prev() {
                this.goto(this.page - 1);
            },
            gotoFirst() {
                this.goto(1);
            },
            gotoLast() {
                this.goto(this.totalPage);
            }
        }
    }
</script>

<style scoped>

</style>