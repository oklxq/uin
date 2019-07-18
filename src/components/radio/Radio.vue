<template>
    <label class="n-radio" :for="uid">
        <input :disabled="disabled" :name="name" :id="uid" type="radio" v-on="listeners" :checked="isChecked">
        <span class="n-radio__icon"></span>
        <span class="n-radio__content">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    import _ from 'lodash';

    let instanceId = 0;
    export default {
        name: "radio",
        model: {
            event: 'change',
            prop: 'checked',
        },
        props: {
            name:String,
            disabled:Boolean,
            checked: [Boolean, Number, String],
        },
        watch: {
            checked() {
                this.isChecked = _.isEqual(this.checked, this.$attrs.value);
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
        },
        data() {
            return {
                isChecked: false,
                uid: 'radio-' + (instanceId++),
            }
        },
        methods: {
            handleChange(evt) {
                this.isChecked = evt.target.checked;
                this.$emit('change', this.$attrs.value);
            }
        }
    }
</script>
