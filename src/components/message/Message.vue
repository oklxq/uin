<template>
    <div class="u-message":class="{['u-message--'+type]:true}">
        <span class="u-message__icon" ></span>
        <div class="u-message__content">{{content}}</div>
    </div>
</template>

<script>
    import {FlexItem, Flex} from "../flex";

    export default {
        name: "Message",
        components: {Flex, FlexItem},
        props: {
            visible: Boolean,
            type: {
                type: String,
                validator(val) {
                    return ['success', 'error', 'warning', 'confirm'].indexOf(val) >= 0;
                }
            },
            content:String,
        }
    }
</script>

<style scoped>

</style>