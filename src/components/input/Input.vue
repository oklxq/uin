<template>
    <div class="n-input" :class="{'n-input--block':block}">
        <div class="n-input__prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <div class="n-input__raw">
            <input
                    v-on="listeners"
                    v-model="model"
                    :type="type"
                    :style="{paddingRight:clearable?'1.8rem':0}"
                    :readonly="readonly"
                    :disabled="disabled"
                    :placeholder="placeholder"/>
            <span v-if="hasValue" class="n-input__clear" @click="handleClear">
                <Icon type="x"></Icon>
            </span>
        </div>
        <div class="n-input__append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
    import mixins from '../form/mixins';
    import Icon from '../icon';
    import {FlexItem, Flex} from "../flex";
    import {size} from "../../utils/props";
    import validateMixin from '../form/validate/inject-mixin';

    export default {
        mixins: [mixins, size, validateMixin],
        name: "Input",
        components: {Icon, Flex, FlexItem},
        watch: {
            value() {
                if (this.model !== this.value) {
                    this.model = this.value;
                }
            }
        },
        computed: {
            listeners() {
                return Object.assign({}, this.$listeners, {
                    input: e => {
                        this.model = e.target.value;
                        this.$emit('input', this.model);
                    },
                    blur: e => {
                        if (this.formItem) {
                            this.formItem.$emit(this.formItem.validateTrigger, {value: e.target.value});
                        }
                        this.$emit('blur', e);
                    }
                })
            },
            hasValue() {
                return this.model.toString().length > 0;
            }
        },
        props: {
            block: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            clearable: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                model: this.value,
            };
        },
        methods: {
            handleClear() {
                this.focus();
                this.clear();
            },
            focus() {
                this.$el.querySelector('input').focus();
            },
            blur() {
                this.$el.querySelector('input').blur();
            },
            clear() {
                this.model = '';
                this.$emit('input', this.model);
                this.$emit('clear');
            }
        }
    }
</script>