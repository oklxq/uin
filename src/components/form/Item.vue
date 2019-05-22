<template>
    <Row gutter="10" class="u-form__item">
        <Col class="u-form__label" :span="labelSpan">
            <span>
                <slot name="label" v-if="$slots.label"></slot>
                <template v-else>{{label}}</template>
            </span>
        </Col>
        <Col :span="wrapperSpan">
            <slot></slot>
            <div v-if="attach||$slots.attach" class="u-form__attach">
                <slot name="attach" v-if="$slots.attach"></slot>
                <template v-else>{{attach}}</template>
            </div>
        </Col>
    </Row>

</template>

<script>
    import {layout} from "./form";
    import {Row, Col} from "../grid";

    export default {
        components: {Row, Col},
        name: "FormItem",
        mixins: [layout],
        props: {
            label: [String, Number],
            labelSpan: {
                type: [String, Number],
                default: 2,
            },
            wrapperSpan: {
                type: [String, Number],
                default: 22,
            },
            attach: [String, Number]
        }
    }
</script>

<style scoped>

</style>