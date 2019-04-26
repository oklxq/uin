<template>
    <li :selected="selected">
        <Flex>
            <FlexItem>
                <slot></slot>
            </FlexItem>
            <FlexItem width="auto" v-if="selected">
                <Icon type="check"></Icon>
            </FlexItem>
        </Flex>
    </li>
</template>

<script>
    import {FlexItem, Flex} from "../flex";
    import Icon from '../icon';

    export default {
        name: "Item",
        components: {Flex, FlexItem, Icon},
        props: {
            selected: Boolean,
        }
    }
</script>