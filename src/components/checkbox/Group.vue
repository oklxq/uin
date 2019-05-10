<template>
    <div class="n-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: "Group",
        provide() {
            return {
                group: this,
            }
        },
        props: {
            vertical: Boolean,
            value: Array,
        },
        data() {
            return {
                model: [],
            }
        },
        methods: {
            childClick(checked, val) {
                const find = this.model.findIndex(o => _.isEqual(o, val));
                if (checked) {
                    find < 0 && this.model.push(val);
                } else {
                    find >= 0 && this.model.splice(find, 1);
                }
                this.$emit('input', this.model);
            }
        }
    }
</script>

<style scoped>

</style>