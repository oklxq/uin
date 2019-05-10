<template>
    <button class="u-btn" :class="classList">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            type: {
                type: String,
                validator(val) {
                    return ['primary', 'success', 'warning', 'error'].indexOf(val) >= 0;
                }
            }
        },
        computed: {
            classList() {
                return {
                    ['u-btn--' + this.type]: !!this.type,
                }
            }
        }
    }
</script>
