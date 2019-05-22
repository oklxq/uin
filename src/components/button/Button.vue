<template>
    <button :disabled="disabled||loading" class="u-btn" :class="classList" :type="htmlType">
        <Icon class="u-btn__loader" v-if="loading" type="rotate-cw"></Icon>
        <span style="display: inline-block;vertical-align: middle">
            <slot></slot>
        </span>
    </button>
</template>

<script>
    import Icon from '../icon';

    export default {
        name: "Button",
        components: {Icon},
        props: {
            type: {
                type: String,
                validator(val) {
                    return ['primary', 'success', 'warning', 'error'].indexOf(val) >= 0;
                }
            },
            transparent: Boolean,
            loading: Boolean,
            disabled:Boolean,
            htmlType:{
                type:String,
                default:'button'
            }
        },
        computed: {
            classList() {
                return {
                    ['u-btn--' + this.type]: !!this.type,
                    'u-btn--transparent': this.transparent,

                }
            }
        }
    }
</script>
