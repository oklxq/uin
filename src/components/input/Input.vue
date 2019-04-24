<template>
    <div class="n-input">
        <div class="n-input__prepend" v-if="$slots.prepend">
            <slot name="prepend"></slot>
        </div>
        <input class="n-input__raw"
               v-on="listeners"
               :value="value"
               :readonly="readonly"
               :disabled="disabled"
               :placeholder="placeholder"/>
        <div class="n-input__append" v-if="$slots.append">
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
    import mixins from '../form/mixins';

    export default {
        mixins: [mixins],
        name: "Input",
        computed: {
            listeners() {
                return Object.assign(this.$listeners, {
                    input: e => {
                        this.$emit('input', e.target.value);
                    }
                })
            }
        },
        props: {
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
            focus() {
                this.$el.querySelector('input').focus();
            },
            blur() {
                this.$el.querySelector('input').blur();
            },
            clear() {
                this.$emit('input', '');
                this.$emit('clear');
            }
        }
    }
</script>