<template>
    <ListItem @click.native.stop="handleClick" :selected="selected" :key="_uid">
        <slot v-if="$slots.default"></slot>
        <span v-else>{{label}}</span>
    </ListItem>
</template>

<script>
    import {ListItem} from "../list";

    export default {
        name: "Option",
        components: {ListItem},
        props: {
            label: String,
            value: [Number, String, Object],
        },
        inject: {
            select: {
                default: false,
            }
        },
        data() {
            return {
                selected: false,
            }
        },
        mounted() {
            this.selected = this.select && this.select.value == this.value;
        },

        created() {
            if (this.select) {
                const {children} = this.select;
                const exist = children.some(o => o === this);
                !exist && this.select.children.push(this);
            }
        },

        beforeDestroy() {
            if (this.select) {
                const {children} = this.select;
                const exist = children.findIndex(o => o === this);
                exist >= 0 && this.select.children.splice(exist, 1);
            }
        },
        methods: {
            handleClick() {
                !!this.select && this.select.$emit('option-click', this);
            }
        }
    }
</script>
