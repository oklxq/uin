<template>
    <label class="n-checkbox" :class="{'n-checkbox--ind':indeterminate}" :for="uid">
        <input :disabled="disabled" :id="uid" type="checkbox" v-on="listeners" :checked="isChecked">
        <span class="n-checkbox__icon"><Icon type="check"></Icon></span>
        <div class="n-checkbox__content">
            <slot></slot>
        </div>
    </label>
</template>

<script>
    import Icon from '../icon';
    let instanceId = 0;
    export default {
        name: "Checkbox",
        components:{Icon},
        inject: {
            group: {
                from: 'group',
                default: null
            }
        },
        props: {
            checked: Boolean,
            disabled: Boolean,
            value: {
                type: [Boolean, String, Number],
            },
            trueValue: {
                type: [Boolean, String, Number],
                default: true,
            },
            falseValue: {
                type: [Boolean, String, Number],
                default: false,
            },
            indeterminate: Boolean,
        },
        watch: {
            value() {
                this.isChecked = this.value === this.trueValue;
            }
        },


        computed: {
            listeners() {
                const obj = Object.assign({}, this.$listeners, {
                    change: this.handleChange.bind(this)
                });
                delete obj.input;
                return obj;
            },
            rawTrueVal() {
                return this.trueValue;
            },
            rawFalseVal() {
                return this.falseValue;
            }
        },
        data() {
            return {
                isChecked: false,
                uid: 'checkbox-' + (instanceId++),
            }
        },
        methods: {
            handleChange(evt) {
                const {checked} = evt.target;
                this.isChecked = checked;
                const val = checked ? this.rawTrueVal : this.rawFalseVal;
                this.$emit('input', val);

                if (this.group) {
                    this.group.childClick(checked, this.value);
                }
            }
        }
    }
</script>
