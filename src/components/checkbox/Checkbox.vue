<template>
    <label class="n-checkbox" :for="uid">
        <input :id="uid" type="checkbox" v-on="listeners" :checked="isChecked">
        <span class="n-checkbox__icon"></span>
        <div class="n-checkbox__content">
            <slot></slot>
        </div>
    </label>
</template>

<script>
    let instanceId = 0;
    export default {
        name: "Checkbox",
        inject: {
            group: {
                from: 'group',
                default: null
            }
        },
        props: {
            checked: Boolean,
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
