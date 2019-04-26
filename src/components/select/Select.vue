<template>
    <div class="n-select" v-click-hide="closePicker">
        <CInput class="n-select__display"
                readonly
                block
                :placeholder="placeholder"
                v-model="label"
                v-on="$listeners"
                @clear="handleClear"
                @focus="showPicker"
                @click="showPicker">
            <Icon type="chevron-down" slot="append"></Icon>
        </CInput>
        <transition name="select">
            <div class="n-select__dropdown" v-show="isShow" ref="dropdown">
                <label v-if="searchable">
                    <input type="text" ref="search" class="n-select__search">
                </label>
                <List v-if="options">
                    <Option v-for="op in options" :key="op.value">{{op.label}}</Option>
                </List>
                <List v-else>
                    <slot></slot>
                </List>
            </div>
        </transition>
    </div>
</template>

<script>
    import clickHide from '../../directives/click-hide';
    import {List, ListItem} from "../list";
    import CInput from '../input';
    import Option from './Option';
    import Icon from '../icon';
    import formMixin from '../form/mixins';
    import _ from 'lodash';

    /**
     * 若value是基本类型
     * 则先调用toSting后再进行比较
     * 否则使用全等比较
     */
    function isBasic(val) {
        return _.isString(val) || _.isNumber(val);
    }

    function isEq(a, b) {
        if (a === null || b === null) {
            return false;
        }
        if (isBasic(a) && isBasic(b)) {
            return a.toString() === b.toString();
        } else {
            return _.isEqual(a, b);
        }
    }

    export default {
        mixins: [formMixin],
        components: {List, ListItem, CInput, Option, Icon},
        directives: {
            clickHide,
        },
        provide() {
            return {
                select: this,
            }
        },
        watch: {
            value() {
                const {value, val} = this;
                if (!isEq(value, val)) {
                    this.val = value;
                }
            }
        },
        computed: {
            current: {
                get() {
                    return this.children.find(o => o.selected);
                },
                set(val) {
                    this.children.forEach(o => {
                        o.selected = o === val;
                    });
                }
            },
            val: {
                get() {
                    return this.current ? this.current.value : '';
                },
                set(val) {
                    this.children.forEach(o => {
                        if (isEq(o.value, val)) {
                            this.current = o;
                        }
                    });
                }
            },
            label: {
                get() {
                    return this.current ? this.current.label : '';
                },
                set(val) {
                    this.children.forEach(o => {
                        if (isEq(o.label, val)) {
                            this.current = o;
                        }
                    });
                }
            }
        },

        mounted() {
            this.$on('option-click', el => {
                this.closePicker();
                if (this.current === el) {
                    return;
                }
                this.current = el;
                this.$emit('change');
                this.$emit('input', this.val);
            });

            this.$nextTick(() => {
                this.children.forEach(o => {
                    if (isEq(o.value, this.value)) {
                        this.current = o;
                    }
                });
            })
        },

        props: {
            searchable: Boolean,
            remote: Function,
            options: Array,
        },
        data() {
            return {
                isShow: false,
                searchContent: '',
                children: [],
            }
        },

        methods: {
            handleClear() {
                this.$emit('option-click', null);
            },
            showPicker() {
                if (this.isShow) return;
                this.isShow = true;
                this.$nextTick(() => {
                    this.$el.querySelector('ul').scrollTop = this.scroll;
                });
            },
            closePicker() {
                if (!this.isShow) return;
                this.scroll = this.$el.querySelector('ul').scrollTop;
                this.isShow = false;
            }
        }
    }
</script>