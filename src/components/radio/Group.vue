<template>
    <div class="n-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Group",
        provide() {
            return {
                group: this,
            }
        },
        props: {
            vertical: Boolean,
            value: [Number, String],
        },
        data() {
            return {
                model: [],
            }
        },
        methods: {
            childClick(val) {
                this.model = val;
                this.$emit('input', this.model);
            }
        }
    }
</script>

<style scoped>

</style>