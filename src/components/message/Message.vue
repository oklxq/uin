<template>
    <transition name="message" @after-leave="handleAfterLeave">
        <div v-show="visible" class="u-message-row">
            <div class="u-message" :class="{['u-message--'+type]:true}">
                <Icon class="u-message__icon" type="c-success" v-if="type==='success'"></Icon>
                <Icon class="u-message__icon" type="c-alert" v-if="type==='warning'"></Icon>
                <Icon class="u-message__icon" type="c-error" v-if="type==='error'"></Icon>
                <div class="u-message__content">{{content}}</div>
                <div class="u-message__extra" v-if="extra.length">
                    <a href="javascript:;" v-for="(e,index) in extra" :key="e"
                       @click="handleExtraClick(index,e)">{{e}}</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {Flex, FlexItem} from "../flex";
    import Icon from '../icon';

    export default {
        name: "Message",
        components: {Flex, FlexItem, Icon},
        props: {
            visible: Boolean,
            type: {
                type: String,
                validator(val) {
                    return ['success', 'error', 'warning'].indexOf(val) >= 0;
                }
            },
            content: String,
            extra: {
                type: [String, Array],
                default: () => [],
            }
        },

        methods: {
            handleExtraClick(index, value) {
                this.$emit('on-extra', {
                    index, value
                });
            },
            handleAfterLeave() {
                this.$emit('dispose');
            }
        }
    }
</script>