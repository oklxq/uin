<template>
    <div class="n-input" :class="{'n-input--block':block}">
        <div class="n-input__prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <label class="n-input__raw" :for="uid">
            <Flex style="height: 100%">
                <FlexItem style="height: 100%">
                    <input
                            :id="uid"
                            v-on="listeners"
                            :value="value||model"
                            :readonly="readonly"
                            :disabled="disabled"
                            :placeholder="placeholder"/>
                </FlexItem>
                <FlexItem width="auto" style="text-align: center" v-if="!!model.length" @click.native="handleClear">
                    <Icon class="n-input__clear" type="x" size="14"></Icon>
                </FlexItem>
            </Flex>
        </label>
        <div class="n-input__append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
    import mixins from '../form/mixins';
    import Icon from '../icon';
    import {FlexItem, Flex} from "../flex";

    let instanceId = 0;
    export default {
        mixins: [mixins],
        name: "Input",
        components: {Icon, Flex, FlexItem},
        watch: {
            value() {
                this.model = this.value;
            }
        },
        computed: {
            listeners() {
                return Object.assign({}, this.$listeners, {
                    input: e => {
                        this.model = e.target.value;
                        this.$emit('input', e.target.value);
                    }
                })
            }
        },
        props: {
            block: Boolean,
            clearable: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                model: this.value,
                uid: 'input' + (instanceId++)
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
                this.$emit('input', '');
                this.$emit('clear');
            }
        }
    }
</script>